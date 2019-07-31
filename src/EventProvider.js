import React, { useState, useEffect, createContext, useContext } from "react";

import callApi from "./services/callApi";

const EventContext = createContext();

function EventProvider({ children }) {
  const [isFetchingEvents, setIsFetchingEvents] = useState(true);
  const [events, setEvents] = useState([]);

  async function participate(eventId) {
    const { data } = await callApi(`http://localhost:3001/event/participate`, {
      method: "POST",
      data: { eventId },
    });

    const updatedEvent = data.data;

    setEvents(events =>
      events.map(event => (event._id === eventId ? updatedEvent : event))
    );
  }

  async function create(formData) {
    const { data } = await callApi("http://localhost:3001/event", {
      method: "POST",
      data: formData,
    });

    const newEvent = data.data;
    setEvents(events => [...events, newEvent]);
    return newEvent;
  }

  async function remove(id) {
    const { data } = await callApi(`http://localhost:3001/event/${id}`, {
      method: "DELETE",
    });
    setEvents(events => events.filter(event => event._id !== data.data._id));
  }

  useEffect(() => {
    async function fetchEvents() {
      const { data } = await callApi("http://localhost:3001/event/all", {
        method: "GET",
      });
      setEvents(data.data);
      setIsFetchingEvents(false);
    }

    fetchEvents();
  }, []);

  if (isFetchingEvents) {
    return <div>Loading</div>;
  }

  return (
    <EventContext.Provider value={{ events, create, participate, remove }}>
      {children}
    </EventContext.Provider>
  );
}

export const useEvent = () => useContext(EventContext);

export default EventProvider;
