import React, { useState, useEffect, createContext, useContext } from "react";
import axios from "axios";

const EventContext = createContext();

function EventProvider({ children }) {
  const [isFetchingEvents, setIsFetchingEvents] = useState(true);
  const [events, setEvents] = useState([]);

  async function participate(eventToUpdateId) {
    const { data } = await axios.get(
      `http://localhost:3001/event/${eventToUpdateId}/participate`
    );

    const updatedEvent = data.data;

    setEvents(events =>
      events.map(event =>
        event._id === eventToUpdateId ? updatedEvent : event
      )
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
      const { data } = await axios.get("http://localhost:3001/event");
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
