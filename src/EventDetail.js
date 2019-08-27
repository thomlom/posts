import React, { useState } from "react";
import { navigate } from "@reach/router";
import { format } from "date-fns";

import callApi from "./services/callApi";

import { useAuth } from "./AuthProvider";
import { useEvent } from "./EventProvider";

import CustomDialog from "./CustomDialog";
import IconCalendar from "./IconCalendar";
import IconLocation from "./IconLocation";

import { Button } from "./shared.styles";
import {
  Container,
  Image,
  Infos,
  ParticipantsText,
  Info,
  Description,
  Participants,
} from "./EventDetail.styles";

const EventDetail = ({ eventId }) => {
  const [showParticipants, setShowParticipants] = useState(false);
  const { user } = useAuth();
  const { events, participate, remove, dispatch } = useEvent();

  const event = events.find(event => {
    return event._id === eventId;
  });

  if (!event) {
    return <div>No event for {eventId}</div>;
  }

  const removeParticipant = async (eventId, participantId) => {
    const {
      data: { data: updatedEvent },
    } = await callApi(`/event/participants`, {
      method: "DELETE",
      data: {
        eventId,
        participantId,
      },
    });

    dispatch({
      type: "REMOVE_PARTICIPANT",
      payload: { eventId, updatedEvent },
    });
  };

  const removeEvent = () => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      remove(event._id);
      navigate("/");
    }
  };

  const { image, title, date, address, description, participants } = event;

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
          <Button
            style={{ marginTop: "1rem" }}
            secondary
            small
            onClick={() => setShowParticipants(true)}
          >
            {participantsText}
          </Button>
        ) : (
          <ParticipantsText>{participantsText}</ParticipantsText>
        )}
        <Info>
          <IconCalendar />
          <span>{format(new Date(date), "MMMM dd, yyyy | hh:mm")}</span>
        </Info>
        {address && (
          <Info>
            <IconLocation />
            <span>{address}</span>
          </Info>
        )}
        {description && <Description>{description}</Description>}
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
                    onClick={() =>
                      removeParticipant(event._id, participant._id)
                    }
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
