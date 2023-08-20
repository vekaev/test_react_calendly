import { Dayjs } from "dayjs";
import { Button, Empty, List } from "antd";
import { useState } from "react";

export const TimeSlots = ({
  value,
  loading,
  onSelect,
}: {
  value: Dayjs[];
  loading: boolean;
  onSelect: (timeSlot: Dayjs) => void;
}) => {
  const [selectedSlot, setSelectedSlot] = useState<Dayjs | null>(null);

  return (
    <List
      loading={loading}
      dataSource={value}
      renderItem={(timeSlot) => (
        // TODO: move styles to scss
        <List.Item style={{ padding: 2, border: 0 }}>
          <Button
            size='large'
            style={{ width: "100%", marginRight: 4 }}
            onClick={() => setSelectedSlot(timeSlot)}
          >
            {timeSlot.format("h:mm A")}
          </Button>
          {selectedSlot === timeSlot && (
            <Button
              type='primary'
              size='large'
              onClick={() => onSelect(timeSlot)}
            >
              Next
            </Button>
          )}
        </List.Item>
      )}
      locale={{ emptyText: <Empty description='No time slots available' /> }}
    />
  );
};
