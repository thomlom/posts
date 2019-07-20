import React from "react";
import { useEvent } from "./EventProvider";

function EventDetail({ eventId }) {
  const { events } = useEvent();

  const event = events.find(event => {
    return event._id === eventId;
  });

  if (!event) {
    return <div>No event for {eventId}</div>;
  }

  const { title, description } = event;

  return (
    <div>
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
}

export default EventDetail;
