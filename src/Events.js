import React from "react";
import { Link } from "@reach/router";

import { useEvent } from "./EventProvider";
import { useAuth } from "./AuthProvider";

function Events() {
  const { events, participate } = useEvent();
  const { isAuthenticated, user } = useAuth();

  return (
    <ul>
      {events.map(event => (
        <div>
          <Link to={`/event/${event._id}`}>{event.title}</Link>
          {isAuthenticated && (
            <button onClick={() => participate(event._id)}>
              {event.participants.includes(user._id) ? "Leave" : "Join"}
            </button>
          )}
        </div>
      ))}
    </ul>
  );
}

export default Events;
