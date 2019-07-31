import React, { useState } from "react";
import axios from "axios";
import { navigate } from "@reach/router";
import styled from "styled-components";
import {
  setMinutes,
  setHours,
  setDate,
  setMonth,
  setYear,
  format,
} from "date-fns";

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

const FormInputsSideBySide = styled.div`
  display: flex;
  margin-top: 1rem;

  div {
    flex: 1 1 0;

    &:not(:first-child) {
      margin: 0;
      margin-left: 1rem;
    }
  }
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
    date: new Date(),
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

  function handleDateChange(e) {
    const [year, month, day] = e.target.value.split("-");
    const date = setYear(
      setMonth(setDate(formData.date, parseInt(day)), parseInt(month) - 1),
      parseInt(year)
    );
    setFormData(formData => ({
      ...formData,
      date,
    }));
  }

  function handleTimeChange(e) {
    const [hours, minutes] = e.target.value.split(":");
    const date = setHours(setMinutes(formData.date, minutes), hours);
    setFormData(formData => ({
      ...formData,
      date,
    }));
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

  // TODO: Add uploading indication
  // TODO: Add custom choose file button
  return (
    <FormContainer>
      <Form onSubmit={submitEventForm}>
        {error && <FormError>{error}</FormError>}
        <FormInput>
          <Label htmlFor="image">Image</Label>
          <Input type="file" name="file" onChange={uploadFile} />
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
        <FormInputsSideBySide>
          <FormInput>
            <Label htmlFor="date">Date</Label>
            <Input
              type="date"
              name="date"
              value={format(formData.date, "YYYY-MM-DD")}
              onChange={handleDateChange}
            />
          </FormInput>
          <FormInput>
            <Label htmlFor="time">Time</Label>
            <Input
              type="time"
              name="time"
              value={format(formData.date, "HH:mm")}
              onChange={handleTimeChange}
            />
          </FormInput>
        </FormInputsSideBySide>

        <FormButton type="submit" disabled={isUploading}>
          Create
        </FormButton>
      </Form>
    </FormContainer>
  );
}

export default CreateEvent;
