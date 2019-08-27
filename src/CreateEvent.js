import React, { useState, useCallback } from "react";
import axios from "axios";
import { navigate } from "@reach/router";

import "flatpickr/dist/themes/light.css";
import flatpickr from "flatpickr";

import callApi from "./services/callApi";

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
import { FormContainer, PreviewImage } from "./CreateEvent.styles";

function CreateEvent() {
  const { dispatch } = useEvent();

  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    image: "",
    title: "",
    date: null,
    address: "",
    description: "",
  });
  const [isUploading, setIsUploading] = useState(false);

  const inputRef = useCallback(node => {
    if (node !== null) {
      const now = new Date();
      flatpickr(node, {
        defaultDate: now,
        minDate: now,
        dateFormat: "F j, Y H:i",
        enableTime: true,
        time_24hr: true,
        onChange: ([date]) =>
          setFormData(formData => ({
            ...formData,
            date,
          })),
      });
    }
  }, []);

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

  async function submitEventForm(e) {
    e.preventDefault();

    const { image, title, date } = formData;

    if (!image || !title || !date) {
      setError("Image, title and date and description are required.");
      return;
    }

    try {
      const {
        data: { data: newEvent },
      } = await callApi("/event", {
        method: "POST",
        data: formData,
      });
      dispatch({ type: "ADD", payload: newEvent });
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
          <Label htmlFor="image">Image*</Label>
          <Input type="file" name="file" onChange={uploadFile} />
          {isUploading && <span>Uploading...</span>}
          {formData.image && (
            <PreviewImage src={formData.image} alt="Upload Preview" />
          )}
        </FormInput>
        <FormInput>
          <Label htmlFor="title">Title*</Label>
          <Input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleFormChange}
          />
        </FormInput>
        <FormInput>
          <Label htmlFor="date">Date*</Label>
          <Input ref={inputRef} />
        </FormInput>
        <FormInput>
          <Label htmlFor="address">Address</Label>
          <Input
            type="text"
            name="address"
            value={formData.address}
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
        <FormButton type="submit" disabled={isUploading}>
          Create
        </FormButton>
      </Form>
    </FormContainer>
  );
}

export default CreateEvent;
