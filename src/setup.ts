import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

import "./firebase";

dayjs.extend(utc);
dayjs.extend(timezone);
