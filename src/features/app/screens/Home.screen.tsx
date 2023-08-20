import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { App, Button, Empty, List, Modal } from "antd";

import { useMeetings, useTimeZone, useCancelMeeting } from "../hooks";

import { RoutePath } from "~constants";
import { IMeeting } from "~types/models/IMeeting";

export const Home = () => {
  const { message } = App.useApp();
  const [timezone] = useTimeZone();
  const { meetings, loading, fetchMeetings } = useMeetings();
  const {
    cancelMeeting,
    isMeetingCancelable,
    loading: isCancelingMeetingLoading,
  } = useCancelMeeting();

  const handleCancelMeeting = async (meeting: IMeeting) => {
    Modal.confirm({
      okText: "Confirm",
      cancelText: "Cancel",
      title: "Confirm cancel",
      content: (
        <div>
          Are you sure you want to cancel a meeting on{" "}
          {dayjs(meeting.startTimestamp)
            .tz(timezone)
            .format("dddd, MMMM D, h:mm A")}
        </div>
      ),
      async onOk() {
        try {
          await cancelMeeting(meeting);
          message.success("Meeting canceled");
          await fetchMeetings();
        } catch (error) {
          message.error("Failed to cancel meeting");
        }
      },
    });
  };

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
            {isMeetingCancelable(meeting) && (
              <Button
                disabled={isCancelingMeetingLoading}
                onClick={() => handleCancelMeeting(meeting)}
              >
                Cancel
              </Button>
            )}
          </List.Item>
        )}
        locale={{ emptyText: <Empty description='No booked meetings' /> }}
      />
    </div>
  );
};
