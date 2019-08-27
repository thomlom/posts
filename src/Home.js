import React, { useState, useCallback, useMemo } from "react";
import { navigate } from "@reach/router";
import { formatDistanceToNow, isAfter, isBefore } from "date-fns";

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

const isInvolved = (event, user) =>
  event.participants.some(participant => participant._id === user._id);

function Home() {
  const { events, participate, remove } = useEvent();
  const { isAuthenticated, user } = useAuth();
  const { openDialog } = useDialog();

  const [activeFilter, setActiveFilter] = useState(ALL);

  const filters = [ALL, UPCOMING, PAST, ...(isAuthenticated ? [INVOLVED] : [])];

  const filteredEvents = useMemo(() => {
    if (activeFilter === ALL) {
      return events;
    }

    if (activeFilter === INVOLVED) {
      return events.filter(event => isInvolved(event, user));
    }

    if (activeFilter === UPCOMING) {
      return events.filter(event => isAfter(new Date(event.date), Date.now()));
    }

    if (activeFilter === PAST) {
      return events.filter(event => isBefore(new Date(event.date), Date.now()));
    }

    return events;
  }, [activeFilter, events, user]);

  return (
    <>
      <FilterButtons>
        {filters.map(filter => (
          <FilterButton
            key={filter}
            active={filter === activeFilter}
            onClick={() => setActiveFilter(filter)}
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
                <span>{formatDistanceToNow(new Date(event.date))}</span>
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
                      secondary={isInvolved(event, user)}
                      onClick={e => {
                        e.stopPropagation();
                        participate(event._id);
                      }}
                    >
                      {isInvolved(event, user) ? "Leave" : "Join"}
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
