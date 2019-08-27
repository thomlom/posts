import React, {
  createContext,
  useState,
  useReducer,
  useEffect,
  useContext,
} from "react";

import callApi from "./services/callApi";

import Loading from "./Loading";

const EventContext = createContext();

function eventReducer(events, action) {
  switch (action.type) {
    case "GET":
      return action.payload;
    case "ADD":
      const newEvents = [...events, action.payload];
      newEvents.sort(
        (a, b) => new Date(a.date).getTime() > new Date(b.date).getTime()
      );
      return newEvents;
    case "PARTICIPATE":
      return events.map(event =>
        event._id === action.payload.eventId
          ? action.payload.updatedEvent
          : event
      );
    case "REMOVE":
      return events.filter(event => event._id !== action.payload.eventId);
    case "REMOVE_PARTICIPANT":
      return events.map(event =>
        event._id === action.payload.eventId
          ? action.payload.updatedEvent
          : event
      );
    default:
      return events;
  }
}

function EventProvider({ children }) {
  const [isFetchingEvents, setIsFetchingEvents] = useState(true);
  const [events, dispatch] = useReducer(eventReducer, []);

  async function participate(eventId) {
    const {
      data: { data: updatedEvent },
    } = await callApi("/event/participate", {
      method: "POST",
      data: { eventId },
    });

    dispatch({ type: "PARTICIPATE", payload: { eventId, updatedEvent } });
  }

  async function remove(id) {
    const {
      data: { data: removedEvent },
    } = await callApi(`/event/${id}`, {
      method: "DELETE",
    });

    dispatch({ type: "REMOVE", payload: { eventId: removedEvent._id } });
  }

  useEffect(() => {
    async function fetchEvents() {
      const {
        data: { data },
      } = await callApi("/event/all", {
        method: "GET",
      });
      dispatch({ type: "GET", payload: data });
      setIsFetchingEvents(false);
    }

    fetchEvents();
  }, []);

  if (isFetchingEvents) {
    return <Loading />;
  }

  return (
    <EventContext.Provider value={{ events, dispatch, participate, remove }}>
      {children}
    </EventContext.Provider>
  );
}

export const useEvent = () => useContext(EventContext);

export default EventProvider;
