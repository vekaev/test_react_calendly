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
    startTimestamp: start.toUTCString(),
    endTimestamp: end.toUTCString(),
  };

  data.push(meeting);

  localStorage.setItem(
    `meetings-${userId}`,
    JSON.stringify(
      data.sort((a, b) => {
        return (
          new Date(a.startTimestamp).getTime() -
          new Date(b.startTimestamp).getTime()
        );
      })
    )
  );

  localStorage.setItem(
    `meeting-${meeting.startTimestamp}`,
    JSON.stringify(meeting)
  );

  return meeting;
};

export const deleteMeeting = async (
  userId: string,
  meetingId: string
): Promise<void> => {
  const data = await getMeetings(userId);

  await sleep(500);

  const index = data.findIndex((meeting) => meeting.id === meetingId);
  const meeting = data[index];

  if (index > -1) {
    data.splice(index, 1);
  }

  localStorage.removeItem(`meeting-${meeting.startTimestamp}`);

  localStorage.setItem(`meetings-${userId}`, JSON.stringify(data));
};

// TODO: change implementation to fetch from API
export const fetchAvailableTimeSlots = async (
  date: Date,
  userId: string
): Promise<Date[]> => {
  await sleep(500);
  console.info("fetching time slots for", date, userId);
  return generateTimeSlotsForRange(date, 9, 15, 30, "PST")
    .map((timeSlot) => timeSlot.toDate())
    .filter((date) => !localStorage.getItem(`meeting-${date.toUTCString()}`));
};
