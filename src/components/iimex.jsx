import * as React from "react";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";

export default function TimePickerViews(props) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["MobileTimePicker"]}>
        <DemoItem label={''}>
          <TimePicker
            views={["hours", "minutes", "seconds"]}
            format={"HH:mm:ss"}
            onChange={console.log}
            onAccept={(value) => {
              props.onChange(value.$s);
              props.onChange1(value.$m);
              props.onChange2(value.$H);
            }}
            ampm={false}
            ampmInClock={false}
          />
        </DemoItem>
      </DemoContainer>
    </LocalizationProvider>
  );
}
