// import { db } from "~firebase";

import { sleep } from "~utils";
import { generateTimeSlotsForRange } from "~utils/generateTimeSlotsForRange";

import { IMeeting } from "~types/models/IMeeting";

// TODO: change implementation to fetch meetings via API
export const getMeetings = async (userId: string): Promise<IMeeting[]> => {
  return JSON.parse(localStorage.getItem(`meetings-${userId}`) || "[]");

  // return db
  //   .collection("meetings")
  //   .where("userId", "==", user?.id)
  //   .get()
  //   .then((querySnapshot) => {
  //     const meetings: IMeeting[] = [];

  //     querySnapshot.forEach((doc) => {
  //       meetings.push({
  //         ...(doc.data() as IMeeting),
  //         id: doc.id,
  //       });
  //     });

  //     return meetings;
  //   })
};

// TODO: change implementation to fetch meetings via API
export const createMeeting = async (
  userId: string,
  start: Date,
  end: Date
): Promise<IMeeting> => {
  const data = await getMeetings(userId);

  const meeting: IMeeting = {
    userId,
    id: `${data.length + 1}`,
    startTimestamp: start.toISOString(),
    endTimestamp: end.toISOString(),
  };

  data.push(meeting);

  localStorage.setItem(`meetings-${userId}`, JSON.stringify(data));

  return meeting;
};

// TODO: change implementation to fetch from API
export const fetchAvailableTimeSlots = async (
  date: Date,
  userId: string
): Promise<Date[]> => {
  await sleep(500);
  console.info("fetching time slots for", date, userId);
  return generateTimeSlotsForRange(9, 15, 30, "PST").map((timeSlot) =>
    timeSlot.toDate()
  );
};
