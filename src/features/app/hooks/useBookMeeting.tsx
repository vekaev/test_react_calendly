import dayjs from "dayjs";
import { useCallback, useState } from "react";

import { useAuth } from "~features/auth/hooks/useAuth";
import { createMeeting } from "../services/meeting.service";

export const useBookMeeting = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const bookMeeting = useCallback(
    async (timeSlot: Date) => {
      try {
        setLoading(true);

        await createMeeting(
          user!.id,
          timeSlot,
          dayjs(timeSlot).add(60, "minutes").toDate()
        );
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    },
    [user]
  );

  return { loading, bookMeeting };
};
