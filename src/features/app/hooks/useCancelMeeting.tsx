import dayjs from "dayjs";
import { useState } from "react";

import { useTimeZone } from "./useTimezone";
import { IMeeting } from "~types/models/IMeeting";
import { deleteMeeting } from "../services/meeting.service";

export const useCancelMeeting = () => {
  const [timezone] = useTimeZone();
  const [loading, setLoading] = useState(false);

  const cancelMeeting = async (meeting: IMeeting) => {
    setLoading(true);

    try {
      await deleteMeeting(meeting.id);
    } finally {
      setLoading(false);
    }
  };

  const isMeetingCancelable = (meeting: IMeeting) => {
    const meetingTime = dayjs(meeting.startTimestamp).tz(timezone);
    const now = dayjs().tz(timezone);
    return meetingTime.diff(now, "hours") > 24;
  };

  return { isMeetingCancelable, cancelMeeting, loading };
};
