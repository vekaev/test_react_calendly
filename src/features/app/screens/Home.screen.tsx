import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { Button, Empty, List } from "antd";

import { RoutePath } from "~constants";
import { useMeetings } from "../hooks/useMeetings";
import { useTimeZone } from "../hooks/useTimezone";

export const Home = () => {
  const { meetings, loading } = useMeetings();
  const [timezone] = useTimeZone();

  return (
    <div>
      <Link to={RoutePath.BOOKING_MEETING}>
        <Button>Book a meeting</Button>
      </Link>
      <List
        loading={loading}
        dataSource={meetings}
        renderItem={(meeting) => (
          // TODO: move styles to scss
          <List.Item>
            <div>
              {dayjs(meeting.startTimestamp)
                .tz(timezone)
                .format("ddd, MMMM D, h:mm A")}
            </div>
          </List.Item>
        )}
        locale={{ emptyText: <Empty description='No booked meetings' /> }}
      />
    </div>
  );
};
