import React from "react";
import styled from "styled-components";
import { navigate } from "@reach/router";

import { Button } from "./shared.styles";

import { useAuth } from "./AuthProvider";
import { useEvent } from "./EventProvider";

const Container = styled.div`
  display: flex;
`;

const EventImage = styled.div`
  flex: 1 1 0;

  img {
    display: block;
    width: 100%;
    max-height: 400px;
    object-fit: cover;
    border-radius: 5px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
      0 2px 4px -1px rgba(0, 0, 0, 0.06);
  }

  div {
    margin-top: 1rem;
    display: flex;

    button {
      flex: 1 1 0;

      &:not(:first-child) {
        margin-left: 1rem;
      }
    }
  }
`;

const EventInfos = styled.div`
  flex: 1 1 0;
  margin-left: 2.5rem;
  paddin-top: 1rem;

  h2 {
    font-size: 3rem;
    font-weight: 700;
    margin: 0;
    color: hsl(211, 39%, 23%);
  }

  button,
  span {
    margin-top: 1rem;
  }

  span {
    font-size: 1.2rem;
    color: hsl(209, 23%, 60%);
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  button {
    flex-shrink: 1;
    width: auto;
  }

  p {
    font-size: 1.6rem;
    color: hsl(209, 28%, 39%);
  }
`;

function EventDetail({ eventId }) {
  const { events, participate, remove } = useEvent();
  const { isAdmin, user } = useAuth();

  const event = events.find(event => {
    return event._id === eventId;
  });

  if (!event) {
    return <div>No event for {eventId}</div>;
  }

  const { title, description, participants, image } = event;

  const participantsText = `${participants.length} participant${
    participants.length > 1 ? "s" : ""
  }`;

  return (
    <Container>
      <EventImage>
        <img src={image} alt={title} />
        <div>
          <Button
            onClick={e => {
              e.stopPropagation();
              participate(event._id);
            }}
          >
            {event.participants.includes(user._id) ? "Leave" : "Join"}
          </Button>
          {isAdmin && (
            <Button
              secondary
              onClick={e => {
                e.stopPropagation();
                if (
                  window.confirm("Are you sure you want to delete this event?")
                ) {
                  remove(event._id);
                  navigate("/");
                }
              }}
            >
              Delete
            </Button>
          )}
        </div>
      </EventImage>
      <EventInfos>
        <h2>{title}</h2>
        {isAdmin ? (
          <Button small secondary>
            {participantsText}
          </Button>
        ) : (
          <span>{participantsText}</span>
        )}
        <p>
          {description} Lorem ipsum dolor sit amet, consectetur adipisicing
          elit. Distinctio nemo facere ab veniam cupiditate qui corporis
          incidunt culpa! Eius, veritatis. Incidunt minus eveniet reiciendis
          inventore autem! Nihil harum reiciendis quasi.
        </p>
      </EventInfos>
    </Container>
  );
}

export default EventDetail;
