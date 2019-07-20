import React, { useState } from "react";
import { navigate } from "@reach/router";

import { useEvent } from "./EventProvider";

function CreateEvent() {
  const { create } = useEvent();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  function handleFormChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  return (
    <form
      onSubmit={async e => {
        e.preventDefault();
        const newEvent = await create(formData);
        navigate(`/event/${newEvent._id}`);
      }}
    >
      <label htmlFor="title">Title</label>
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleFormChange}
      />
      <label htmlFor="description">Description</label>
      <input
        type="text"
        name="description"
        value={formData.description}
        onChange={handleFormChange}
      />
      <button type="submit">Create</button>
    </form>
  );
}

export default CreateEvent;
