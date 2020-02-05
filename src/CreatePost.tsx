import React from "react";
import axios from "axios";
import { RouteComponentProps } from "react-router-dom";

import callApi from "./services/callApi";

import { usePost } from "./PostProvider";

import {
  FormButton,
  FormError,
  FormInput,
  Label,
  Input,
  Textarea,
} from "./shared.styles";
import { PreviewImage } from "./CreatePost.styles";

interface FormData {
  image: string;
  title: string;
  content: string;
}

const CreateEvent: React.FC<RouteComponentProps> = ({ history }) => {
  const { dispatch } = usePost();

  const [error, setError] = React.useState("");
  const [isUploading, setIsUploading] = React.useState(false);
  const [formData, setFormData] = React.useReducer(
    (s: FormData, a: Partial<FormData>) => ({ ...s, ...a }),
    {
      image: "",
      title: "",
      content: "",
    }
  );

  async function uploadFile(e: React.ChangeEvent<HTMLInputElement>) {
    setIsUploading(true);
    const files = e.target.files;

    if (!files) {
      return;
    }

    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "events");

    const res = await axios.post(
      "https://api.cloudinary.com/v1_1/thomlom/image/upload",
      data
    );

    const file = res.data;
    setFormData({ image: file.secure_url });
    setIsUploading(false);
  }

  function handleFormChange(
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) {
    setFormData({ [e.target.name]: e.target.value });
  }

  async function submitEventForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const { image, title, content } = formData;

    if (!image || !title || !content) {
      setError("Image, title and content are required.");
      return;
    }

    try {
      const {
        data: { data: newPost },
      } = await callApi("/post", {
        method: "POST",
        data: formData,
      });
      dispatch({ type: "ADD", payload: newPost });
      history.push(`/post/${newPost._id}`);
    } catch ({ response: { data } }) {
      setError(data);
    }
  }

  return (
    <form onSubmit={submitEventForm}>
      {error && <FormError>{error}</FormError>}
      <FormInput>
        <Label htmlFor="image">Image</Label>
        <Input type="file" name="image" id="image" onChange={uploadFile} />
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
          id="title"
          value={formData.title}
          onChange={handleFormChange}
        />
      </FormInput>
      <FormInput>
        <Label htmlFor="content">Content</Label>
        <Textarea
          name="content"
          id="content"
          value={formData.content}
          onChange={handleFormChange}
          rows={15}
        />
      </FormInput>
      <FormButton type="submit" disabled={isUploading}>
        Create
      </FormButton>
    </form>
  );
};

export default CreateEvent;
