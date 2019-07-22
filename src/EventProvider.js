import React, { useState, useEffect, createContext, useContext } from "react";
import axios from "axios";

const EventContext = createContext();

function EventProvider({ children }) {
  const [isFetchingEvents, setIsFetchingEvents] = useState(true);
  const [events, setEvents] = useState([]);

  async function participate(eventId) {
    const { data } = await axios.post(
      `http://localhost:3001/event/participate`,
      { eventId }
    );

    const updatedEvent = data.data;

    setEvents(events =>
      events.map(event => (event._id === eventId ? updatedEvent : event))
    );
  }

  async function create(formData) {
    try {
      const { data } = await axios.post(
        "http://localhost:3001/event",
        formData
      );

      const newEvent = data.data;
      setEvents(events => [...events, newEvent]);
      return newEvent;
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    async function fetchEvents() {
      const { data } = await axios.get("http://localhost:3001/event/all");
      setEvents(data.data);
      setIsFetchingEvents(false);
    }

    fetchEvents();
  }, []);

  if (isFetchingEvents) {
    return <div>Loading</div>;
  }

  return (
    <EventContext.Provider value={{ events, create, participate }}>
      {children}
    </EventContext.Provider>
  );
}

export const useEvent = () => useContext(EventContext);

export default EventProvider;
