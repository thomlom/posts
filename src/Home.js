import React, { useState } from "react";
import { navigate } from "@reach/router";
import moment from "moment";

import { useAuth } from "./AuthProvider";
import { useDialog } from "./DialogProvider";
import { useEvent } from "./EventProvider";

import IconDelete from "./IconDelete";

import empty from "./assets/empty.svg";

import { Button } from "./shared.styles";
import {
  FilterButtons,
  FilterButton,
  EventGrid,
  EventCard,
  NoEvents,
} from "./Home.styles";

const ALL = "All";
const INVOLVED = "Involved";
const UPCOMING = "Upcoming";
const PAST = "Past";

function Home() {
  const { events, participate, remove } = useEvent();
  const { isAuthenticated, user } = useAuth();
  const { openDialog } = useDialog();

  const [activeFilter, setActiveFilter] = useState(ALL);
  const [filteredEvents, setFilteredEvents] = useState(events);

  const filters = [ALL, UPCOMING, PAST, ...(isAuthenticated ? [INVOLVED] : [])];

  const isInvolved = event =>
    event.participants.some(participant => participant._id === user._id);

  function filterEvents(filter) {
    if (filter === ALL) {
      setFilteredEvents(events);
    }

    if (filter === INVOLVED) {
      setFilteredEvents(events.filter(isInvolved));
    }

    if (filter === UPCOMING) {
      setFilteredEvents(
        events.filter(event => moment(event.date).isAfter(Date.now()))
      );
    }

    if (filter === PAST) {
      setFilteredEvents(
        events.filter(event => moment(event.date).isBefore(Date.now()))
      );
    }

    setActiveFilter(filter);
  }

  return (
    <>
      <FilterButtons>
        {filters.map(filter => (
          <FilterButton
            key={filter}
            active={filter === activeFilter}
            onClick={() => filterEvents(filter)}
          >
            {filter}
          </FilterButton>
        ))}
      </FilterButtons>
      <EventGrid>
        {filteredEvents.length === 0 ? (
          <NoEvents>
            <img
              src={empty}
              alt="Illustration of a man carrying an empty box"
            />
            <p>No events.</p>
          </NoEvents>
        ) : (
          filteredEvents.map(event => {
            return (
              <EventCard
                key={event._id}
                onClick={e => {
                  e.preventDefault();
                  isAuthenticated
                    ? navigate(`/event/${event._id}`)
                    : openDialog();
                }}
              >
                <span>{moment(event.date).fromNow()}</span>
                {isAuthenticated && event.createdBy === user._id && (
                  <IconDelete
                    onClick={e => {
                      e.stopPropagation();
                      if (
                        window.confirm(
                          "Are you sure you want to delete this event?"
                        )
                      ) {
                        remove(event._id);
                      }
                    }}
                  />
                )}
                <img src={event.image} alt={event.title} />
                <div>
                  <h2>{event.title}</h2>
                  {isAuthenticated ? (
                    <Button
                      small
                      secondary={isInvolved(event)}
                      onClick={e => {
                        e.stopPropagation();
                        participate(event._id);
                      }}
                    >
                      {isInvolved(event) ? "Leave" : "Join"}
                    </Button>
                  ) : (
                    <Button
                      small
                      onClick={e => {
                        e.stopPropagation();
                        openDialog();
                      }}
                    >
                      Join
                    </Button>
                  )}
                </div>
              </EventCard>
            );
          })
        )}
      </EventGrid>
    </>
  );
}

export default Home;
