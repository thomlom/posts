import React, { useState } from "react";
import axios from "axios";
import { navigate } from "@reach/router";
import styled from "styled-components";
import Datetime from "react-datetime";

import "./styles/datetime.css";

import { useEvent } from "./EventProvider";

import {
  Form,
  FormButton,
  FormError,
  FormInput,
  Label,
  Input,
  Textarea,
} from "./shared.styles";

const FormContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
`;

const PreviewImage = styled.img`
  display: block;
  border-radius: 5px;
  margin-top: 1rem;
  max-height: 300px;
  object-fit: cover;
`;

function CreateEvent() {
  const { create } = useEvent();

  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    date: null,
  });
  const [isUploading, setIsUploading] = useState(false);

  async function uploadFile(e) {
    setIsUploading(true);
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "events");

    const res = await axios.post(
      "https://api.cloudinary.com/v1_1/thomlom/image/upload",
      data
    );

    const file = res.data;
    setFormData(formData => ({
      ...formData,
      image: file.secure_url,
    }));
    setIsUploading(false);
  }

  function handleFormChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  function handleDateChange(momentInstance) {
    setFormData({
      ...formData,
      date: momentInstance.toDate(),
    });
  }

  async function submitEventForm(e) {
    e.preventDefault();

    const { title, description, image, date } = formData;

    if (!title || !description || !image || !date) {
      setError("Title, description, image and date are required.");
      return;
    }

    try {
      const newEvent = await create(formData);
      navigate(`/event/${newEvent._id}`);
    } catch ({ response: { data } }) {
      setError(data);
    }
  }

  return (
    <FormContainer>
      <Form onSubmit={submitEventForm}>
        {error && <FormError>{error}</FormError>}
        <FormInput>
          <Label htmlFor="image">Image</Label>
          <Input type="file" name="file" onChange={uploadFile} />
          {isUploading && <span>Uploading...</span>}
          {formData.image && (
            <PreviewImage src={formData.image} alt="Upload Preview" />
          )}
        </FormInput>
        <FormInput>
          <Label htmlFor="title">Title</Label>
          <Input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleFormChange}
          />
        </FormInput>
        <FormInput>
          <Label htmlFor="description">Description</Label>
          <Textarea
            type="text"
            name="description"
            value={formData.description}
            onChange={handleFormChange}
            rows={5}
          />
        </FormInput>
        <FormInput>
          <Label htmlFor="date">Date</Label>
          <Datetime onChange={handleDateChange} />
        </FormInput>
        <FormButton type="submit" disabled={isUploading}>
          Create
        </FormButton>
      </Form>
    </FormContainer>
  );
}

export default CreateEvent;
