import React from "react";
import { Link } from "@reach/router";

import { useAuth } from "./AuthProvider";
import { useDialog } from "./DialogProvider";
import { useEvent } from "./EventProvider";

function Events() {
  const { events, participate } = useEvent();
  const { isAuthenticated, user } = useAuth();
  const { openDialog } = useDialog();

  return (
    <ul>
      {events.map(event => (
        <div>
          <Link to={`/event/${event._id}`}>{event.title}</Link>
          {isAuthenticated ? (
            <button onClick={() => participate(event._id)}>
              {event.participants.includes(user._id) ? "Leave" : "Join"}
            </button>
          ) : (
            <button onClick={openDialog}>Join</button>
          )}
        </div>
      ))}
    </ul>
  );
}

export default Events;
