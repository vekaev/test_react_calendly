import { useEffect, useState } from "react";

import { IMeeting } from "~types/models/IMeeting";
import { useAuth } from "~features/auth/hooks/useAuth";
import { getMeetings } from "../services/meeting.service";

export const useMeetings = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [meetings, setMeetings] = useState<IMeeting[]>([]);

  async function fetchMeetings() {
    try {
      setLoading(true);

      const data = await getMeetings(user!.id);

      setMeetings(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchMeetings();
  }, []);

  return { meetings, fetchMeetings, loading };
};
