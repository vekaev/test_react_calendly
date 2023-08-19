import dayjs from "dayjs";
import { useState } from "react";

// TODO: move to App context
export const useTimeZone = () => {
  const [timezone, setTimezone] = useState(() => dayjs.tz.guess());

  return [timezone, setTimezone] as const;
};
