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
`;

function CreateEvent() {
  const { create } = useEvent();

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

    // TODO: fix this hacky thing by setting up authorization on necessary requests
    delete axios.defaults.headers.common["Authorization"];
    const res = await axios.post(
      "https://api.cloudinary.com/v1_1/thomlom/image/upload",
      data
    );
    const token = window.localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

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

  return (
    <FormContainer>
      <Form
        onSubmit={async e => {
          e.preventDefault();
          const newEvent = await create(formData);
          navigate(`/event/${newEvent._id}`);
        }}
      >
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
