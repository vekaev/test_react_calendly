import dayjs from "dayjs";
import { db } from "~firebase";

import { IMeeting } from "~types/models/IMeeting";
import { generateTimeSlotsForRange } from "~utils/generateTimeSlotsForRange";

export const getMeetings = async (userId: string): Promise<IMeeting[]> => {
  return db
    .collection("meetings")
    .where("userId", "==", userId)
    .orderBy("startTimestamp", "asc")
    .get()
    .then((querySnapshot) => {
      const meetings: IMeeting[] = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();

        data.startTimestamp = data.startTimestamp.toDate();
        data.endTimestamp = data.endTimestamp.toDate();

        meetings.push({
          ...(data as IMeeting),
          id: doc.id,
        });
      });

      return meetings;
    });
};

export const createMeeting = async (
  userId: string,
  start: Date,
  end: Date
): Promise<IMeeting> => {
  const meeting = {
    userId,
    startTimestamp: start,
    endTimestamp: end,
  };
  const docRef = await db.collection("meetings").add(meeting);
  const doc = await docRef.get();
  return {
    ...(doc.data() as IMeeting),
    id: doc.id,
  };
};

export const deleteMeeting = async (meetingId: string): Promise<void> => {
  await db.collection("meetings").doc(meetingId).delete();
};

export const fetchAvailableTimeSlots = async (date: Date): Promise<Date[]> => {
  const startTimestamp = dayjs(date).startOf("day");
  const endTimestamp = startTimestamp.add(1, "day");

  const bookedMeetings: string[] = await db
    .collection("meetings")
    .where("startTimestamp", ">=", startTimestamp.toDate())
    .where("startTimestamp", "<=", endTimestamp.toDate())
    .get()
    .then((querySnapshot) =>
      querySnapshot.docs.map((doc) =>
        doc.data().startTimestamp.toDate().toUTCString()
      )
    )
    .catch(() => []);

  // TODO: Optimize this implementation
  return generateTimeSlotsForRange(date, 9, 15, 30, "PST")
    .map((timeSlot) => timeSlot.toDate())
    .filter((timeSlot) => !bookedMeetings.includes(timeSlot.toUTCString()));
};
