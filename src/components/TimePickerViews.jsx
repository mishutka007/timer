import * as React from "react";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";

export default function TimePickerViews(props) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["MobileTimePicker"]}>
        <DemoItem label={""}>
          <TimePicker
            views={["hours", "minutes", "seconds"]}
            format={"HH:mm:ss"}
            onAccept={(value) => {
              props.sabaka(value.$s + value.$m * 60 + value.$H * 60 * 60);
            }}
            ampm={false}
            ampmInClock={false}
          />
        </DemoItem>
      </DemoContainer>
    </LocalizationProvider>
  );
}
