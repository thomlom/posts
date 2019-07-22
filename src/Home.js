import React from "react";
import { Link } from "@reach/router";

import { useAuth } from "./AuthProvider";
import { useEvent } from "./EventProvider";
import Signout from "./Signout";

function Home() {
  const { events, participate } = useEvent();
  const { user } = useAuth();

  return (
    <div>
      <p>Hello {user.name}</p>
      <Link to="/create">Create an event</Link>
      <Signout />
      <ul>
        {events.map(event => (
          <div>
            <Link to={`/event/${event._id}`}>{event.title}</Link>
            <button onClick={() => participate(event._id)}>
              {event.participants.includes(user._id) ? "Leave" : "Join"}
            </button>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default Home;
