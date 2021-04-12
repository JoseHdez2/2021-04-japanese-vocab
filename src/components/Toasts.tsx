import { Toast } from "react-bootstrap";
import { format, formatDistance, formatRelative, subDays, subMinutes } from "date-fns";
import * as React from "react";

export const Toasts = () => (
  <div
    style={{
      position: "absolute",
      top: 0,
      right: 0
    }}
  >
    <Toast>
      <Toast.Header>
        <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
        <strong className="mr-auto">Bootstrap</strong>
        <small>just now</small>
      </Toast.Header>
      <Toast.Body>See? Just like this.</Toast.Body>
    </Toast>
    <MyToast title="title" msg="message." date={subMinutes(new Date(), 60)} />
    <Toast>
      <Toast.Header>
        <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
        <strong className="mr-auto">Bootstrap</strong>
        <small>2 seconds ago</small>
      </Toast.Header>
      <Toast.Body>Heads up, toasts will stack automatically</Toast.Body>
    </Toast>
  </div>
);

const MyToast = ({ title, msg, date }: { title: string; msg: string; date: Date }) => {
  return (
    <Toast key={date.getTime()}>
      <Toast.Header>
        <strong className="mr-auto">{title}</strong>
        <small>{formatDistance(date, new Date(), { addSuffix: true })}</small>
      </Toast.Header>
      <Toast.Body>{msg}</Toast.Body>
    </Toast>
  );
};
