import React from "react";
import { format } from "date-fns";
import marked from "marked";

import { useAuth } from "./AuthProvider";
import { usePost } from "./PostProvider";

import IconCalendar from "./IconCalendar";
import IconDelete from "./IconDelete";

import { Container, Image, Infos, Info, Content } from "./PostDetail.styles";

const PostDetail = ({
  history,
  match: {
    params: { postId },
  },
}) => {
  const { user } = useAuth();
  const { posts, remove } = usePost();

  const post = posts.find(post => {
    return post._id === postId;
  });

  if (!post) {
    return <div>No post for {postId}</div>;
  }

  const removePost = () => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      remove(post._id);
      history.push("/");
    }
  };

  const { image, title, date, content } = post;

  const loggedUserIsCreator = post.createdBy._id === user._id;

  return (
    <Container>
      <Image>
        <img src={image} alt={title} />
        <div>{loggedUserIsCreator && <IconDelete onClick={removePost} />}</div>
      </Image>
      <Infos>
        <h2>
          <span>{title}</span>
          <span>Written by {post.createdBy.name}</span>
        </h2>
        <Info>
          <IconCalendar />
          <span>{format(new Date(date), "MMMM dd, yyyy | hh:mm")}</span>
        </Info>
        {content && (
          <Content
            dangerouslySetInnerHTML={{
              __html: marked(content, { sanitize: true }),
            }}
          />
        )}
      </Infos>
    </Container>
  );
};

export default PostDetail;
