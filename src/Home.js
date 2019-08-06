import React from "react";
import { navigate } from "@reach/router";
import moment from "moment";

import { useAuth } from "./AuthProvider";
import { useDialog } from "./DialogProvider";
import { useEvent } from "./EventProvider";

import IconDelete from "./IconDelete";

import { Button } from "./shared.styles";
import { EventListContainer, Title, EventGrid, EventCard } from "./Home.styles";

function Home() {
  const { events, participate, remove } = useEvent();
  const { isAuthenticated, user } = useAuth();
  const { openDialog } = useDialog();

  function getEventsList(events) {
    return (
      <EventGrid>
        {events.map(event => {
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
                    secondary={event.participants.some(
                      participant => participant._id === user._id
                    )}
                    onClick={e => {
                      e.stopPropagation();
                      participate(event._id);
                    }}
                  >
                    {event.participants.some(
                      participant => participant._id === user._id
                    )
                      ? "Leave"
                      : "Join"}
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
        })}
      </EventGrid>
    );
  }

  const [upcomingEvents, pastEvents] = events.reduce(
    (acc, event) => {
      if (moment(event.date).isAfter(Date.now())) {
        return [[...acc[0], event], [...acc[1]]];
      } else {
        return [[...acc[0]], [...acc[1], event]];
      }
    },
    [[], []]
  );

  return (
    <>
      <EventListContainer>
        <Title>
          <span>Upcoming</span> Events
        </Title>
        {getEventsList(upcomingEvents)}
      </EventListContainer>
      <EventListContainer>
        <Title>
          <span>Past</span> Events
        </Title>
        {getEventsList(pastEvents)}
      </EventListContainer>
    </>
  );
}

export default Home;
