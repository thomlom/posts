import React, { useState, useEffect, createContext, useContext } from "react";

import callApi from "./services/callApi";

const EventContext = createContext();

function EventProvider({ children }) {
  const [isFetchingEvents, setIsFetchingEvents] = useState(true);
  const [events, setEvents] = useState([]);

  async function participate(eventId) {
    const { data } = await callApi("/event/participate", {
      method: "POST",
      data: { eventId },
    });

    const updatedEvent = data.data;

    setEvents(events =>
      events.map(event => (event._id === eventId ? updatedEvent : event))
    );
  }

  async function create(formData) {
    const { data } = await callApi("/event", {
      method: "POST",
      data: formData,
    });

    const newEvent = data.data;
    setEvents(events => [...events, newEvent]);
    return newEvent;
  }

  async function remove(id) {
    const { data } = await callApi(`/event/${id}`, {
      method: "DELETE",
    });
    setEvents(events => events.filter(event => event._id !== data.data._id));
  }

  async function removeParticipant(eventId, participantId) {
    const { data } = await callApi(`/event/participants`, {
      method: "DELETE",
      data: {
        eventId,
        participantId,
      },
    });

    const updatedEvent = data.data;

    setEvents(events =>
      events.map(event => (event._id === eventId ? updatedEvent : event))
    );
  }

  useEffect(() => {
    async function fetchEvents() {
      const { data } = await callApi("/event/all", {
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
    <EventContext.Provider
      value={{ events, create, participate, remove, removeParticipant }}
    >
      {children}
    </EventContext.Provider>
  );
}

export const useEvent = () => useContext(EventContext);

export default EventProvider;
