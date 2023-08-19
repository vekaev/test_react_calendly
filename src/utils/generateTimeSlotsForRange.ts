import dayjs from "dayjs";

export function generateTimeSlotsForRange(
  startHour: number,
  endHour: number,
  interval: number,
  timezone: string
) {
  const timeSlots = [];
  let startTime = dayjs().tz(timezone).hour(startHour).minute(0).second(0);
  const endTime = dayjs().tz(timezone).hour(endHour).minute(1).second(0);

  while (startTime.isBefore(endTime)) {
    timeSlots.push(startTime);
    startTime = startTime.add(interval, "minute");
  }

  return timeSlots;
}
