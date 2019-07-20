import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "@reach/router";

import { useEvent } from "./EventProvider";
import Signout from "./Signout";

function Home() {
  const { events, participate } = useEvent();
  const [user, setUser] = useState({});

  useEffect(() => {
    async function getUser() {
      const { data } = await axios.get("http://localhost:3001/me");
      setUser(data.user);
    }

    getUser();
  }, []);
  return (
    <div>
      <p>Hello {user.name}</p>
      <Link to="/create">Create an event</Link>
      <Signout />
      <ul>
        {events.map(event => (
          <div>
            <p>{event.title}</p>
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
