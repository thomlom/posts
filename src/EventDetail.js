import React, { useState } from "react";
import styled from "styled-components";
import { navigate } from "@reach/router";
import moment from "moment";

import { Button } from "./shared.styles";
import CustomDialog from "./CustomDialog";

import { useAuth } from "./AuthProvider";
import { useEvent } from "./EventProvider";

const Container = styled.div`
  display: flex;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Image = styled.div`
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

const Infos = styled.div`
  flex: 1 1 0;
  margin-left: 2.5rem;
  padding-top: 1rem;

  @media (max-width: 768px) {
    margin-left: 0;
  }

  h2 {
    font-size: 3rem;
    font-weight: 700;
    margin: 0;
    color: hsl(211, 39%, 23%);
  }
`;

const ParticipantsText = styled.p`
  font-size: 1.2rem;
  color: hsl(209, 23%, 60%);
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin: 0;
  margin-top: 0.5rem;
`;

const Date = styled.p`
  font-size: 1.4rem;
  color: hsl(209, 28%, 39%);
  font-weight: 600;
`;

const Description = styled.p`
  font-size: 1.6rem;
  color: hsl(209, 28%, 39%);
`;

const Participants = styled.div`
  padding: 2rem;

  h2 {
    font-size: 2.4rem;
    font-weight: 700;
    color: hsl(211, 39%, 23%);
    margin: 2rem 0;
    text-align: center;
  }

  div {
    display: flex;
    justify-content: space-between;
    align-items: center;

    p {
      font-size: 1.8rem;
      color: hsl(209, 34%, 30%);
    }
  }
`;

const EventDetail = ({ eventId }) => {
  const [showParticipants, setShowParticipants] = useState(false);
  const { user } = useAuth();
  const { events, participate, remove, removeParticipant } = useEvent();

  const event = events.find(event => {
    return event._id === eventId;
  });

  if (!event) {
    return <div>No event for {eventId}</div>;
  }

  const removeEvent = () => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      remove(event._id);
      navigate("/");
    }
  };

  const { title, description, date, participants, image } = event;

  const participantsText = `${participants.length} participant${
    participants.length > 1 ? "s" : ""
  }`;

  const loggedUserIsCreator = event.createdBy === user._id;

  return (
    <Container>
      <Image>
        <img src={image} alt={title} />
        <div>
          <Button onClick={() => participate(event._id)}>
            {event.participants.some(
              participant => participant._id === user._id
            )
              ? "Leave"
              : "Join"}
          </Button>
          {loggedUserIsCreator && (
            <Button secondary onClick={removeEvent}>
              Delete
            </Button>
          )}
        </div>
      </Image>
      <Infos>
        <h2>{title}</h2>
        {loggedUserIsCreator && participants.length > 0 ? (
          <Button secondary small onClick={() => setShowParticipants(true)}>
            {participantsText}
          </Button>
        ) : (
          <ParticipantsText>{participantsText}</ParticipantsText>
        )}
        <Date>{moment(date).format("MMMM DD, YYYY | hh:mm")}</Date>
        <Description>{description}</Description>
      </Infos>
      {loggedUserIsCreator && participants.length > 0 && (
        <CustomDialog
          isOpen={showParticipants}
          onDismiss={() => setShowParticipants(false)}
        >
          <Participants>
            <h2>Participants</h2>
            {participants.map(participant => {
              return (
                <div key={participant._id}>
                  <p>{participant.name}</p>
                  <Button
                    small
                    onClick={() => {
                      removeParticipant(event._id, participant._id);
                    }}
                  >
                    Remove
                  </Button>
                </div>
              );
            })}
          </Participants>
        </CustomDialog>
      )}
    </Container>
  );
};

export default EventDetail;
