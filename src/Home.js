import React from "react";
import { navigate } from "@reach/router";
import styled from "styled-components";

import { Button } from "./shared.styles";

import { useAuth } from "./AuthProvider";
import { useDialog } from "./DialogProvider";
import { useEvent } from "./EventProvider";

const EventGrid = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(25rem, 1fr));
  grid-gap: 2.5rem;
  list-style: none;
  margin: 0;
  padding: 0;
`;

const EventCard = styled.li`
  display: flex;
  flex-direction: column;
  background-color: hsl(210, 36%, 96%);
  border-radius: 5px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  cursor: pointer;
  position: relative;
`;

const Trash = styled.svg`
  background-color: hsl(210, 36%, 96%);
  border-radius: 5px;
  padding: 0.25rem;
  position: absolute;
  top: 5px;
  right: 5px;
  height: 3rem;
  width: 3rem;

  .primary {
    fill: hsl(210, 22%, 49%);
  }

  .secondary {
    fill: hsl(209, 34%, 30%);
  }
`;

const EventImage = styled.img`
  display: block;
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
`;

const EventContent = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1.5rem 0.75rem;
`;

const EventTitle = styled.h2`
  margin: 0.5rem 0;
  color: hsl(211, 39%, 23%);
  font-size: 1.8rem;
  font-weight: 700;
`;

function Home() {
  const { events, participate, remove } = useEvent();
  const { isAuthenticated, isAdmin, user } = useAuth();
  const { openDialog } = useDialog();

  return (
    <EventGrid>
      {events.map(event => (
        <EventCard onClick={() => navigate(`/event/${event._id}`)}>
          {isAdmin && (
            <Trash
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              onClick={e => {
                e.stopPropagation();
                if (
                  window.confirm("Are you sure you want to delete this event?")
                ) {
                  remove(event._id);
                }
              }}
            >
              <path
                className="primary"
                d="M5 5h14l-.89 15.12a2 2 0 0 1-2 1.88H7.9a2 2 0 0 1-2-1.88L5 5zm5 5a1 1 0 0 0-1 1v6a1 1 0 0 0 2 0v-6a1 1 0 0 0-1-1zm4 0a1 1 0 0 0-1 1v6a1 1 0 0 0 2 0v-6a1 1 0 0 0-1-1z"
              />
              <path
                className="secondary"
                d="M8.59 4l1.7-1.7A1 1 0 0 1 11 2h2a1 1 0 0 1 .7.3L15.42 4H19a1 1 0 0 1 0 2H5a1 1 0 1 1 0-2h3.59z"
              />
            </Trash>
          )}
          <EventImage src={event.image} alt={event.title} />
          <EventContent>
            <EventTitle>{event.title}</EventTitle>
            {isAuthenticated ? (
              <Button
                small
                onClick={e => {
                  e.stopPropagation();
                  participate(event._id);
                }}
              >
                {event.participants.includes(user._id) ? "Leave" : "Join"}
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
          </EventContent>
        </EventCard>
      ))}
    </EventGrid>
  );
}

export default Home;
