import dayjs, { Dayjs } from "dayjs";
import { App, Calendar, Modal, Spin, Typography } from "antd";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

import { RoutePath } from "~constants";

import { TimeSlots } from "../../components/TimeSlots";
import { useTimeSlots } from "../../hooks/useTimeSlots";
import { useBookMeeting } from "../../hooks/useBookMeeting";

import styles from "./BookingMeeting.module.scss";
import { useTimeZone } from "~features/app/hooks/useTimezone";

export const BookingMeeting = () => {
  const navigate = useNavigate();
  const { message } = App.useApp();
  const [timezone] = useTimeZone();
  const [selectedDate, setSelectedDate] = useState<Dayjs>(() => dayjs());
  const { bookMeeting, loading: isBookMeetingLoading } = useBookMeeting();
  const { timeSlots, loading: isTimeSlotsLoading } = useTimeSlots(
    selectedDate,
    timezone
  );

  const handleTimeSlotSelect = (timeSlot: Dayjs) => {
    Modal.confirm({
      okText: "Confirm",
      cancelText: "Cancel",
      title: "Confirm booking",
      content: (
        <div>
          Are you sure you want to book a meeting on{" "}
          {timeSlot.format("dddd, MMMM D, [at] h:mm A")}
        </div>
      ),
      async onOk() {
        try {
          await bookMeeting(timeSlot.toDate());
          message.success("Meeting booked successfully");
          navigate(RoutePath.HOME);
        } catch {
          message.error("Failed to book meeting");
        }
      },
    });
  };

  const disabledDate = useCallback(
    (date: Dayjs) => date.isBefore(dayjs(), "date"),
    []
  );

  return (
    <>
      <Spin spinning={isBookMeetingLoading}>
        <div className={styles.container}>
          <div className={styles.calendar}>
            <Typography.Title level={3}>Timezone: {timezone}</Typography.Title>
            <Calendar
              fullscreen={false}
              value={selectedDate}
              onSelect={setSelectedDate}
              disabledDate={disabledDate}
              onPanelChange={setSelectedDate}
            />
          </div>
          <div className={styles.timeSlots}>
            <Typography.Title level={3}>
              Selected date: {selectedDate.format("dddd, MMMM D")}
            </Typography.Title>
            <TimeSlots
              value={timeSlots}
              loading={isTimeSlotsLoading}
              onSelect={handleTimeSlotSelect}
            />
          </div>
        </div>
      </Spin>
    </>
  );
};
