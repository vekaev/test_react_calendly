import dayjs, { Dayjs } from "dayjs";
import { useEffect, useState } from "react";

import { useAuth } from "~features/auth/hooks/useAuth";
import { fetchAvailableTimeSlots } from "../services/meeting.service";

export const useTimeSlots = (date: Dayjs, timezone: string) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [timeSlots, setTimeSlots] = useState<Dayjs[]>([]);

  useEffect(() => {
    (async () => {
      setLoading(true);

      const now = dayjs();
      const result = (
        await fetchAvailableTimeSlots(date.toDate()).catch(() => [])
      ).map((timeSlot) => dayjs(timeSlot).tz(timezone).date(date.date()));

      setLoading(false);
      setTimeSlots(
        date.isSame(dayjs(), "date")
          ? result.filter((slot) => slot.isAfter(now))
          : result
      );
    })();
  }, [timezone, date, user]);

  return { timeSlots, loading };
};
