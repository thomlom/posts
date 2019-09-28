import React from "react";
import { formatDistanceToNow } from "date-fns";

import { useAuth } from "./AuthProvider";
import { usePost } from "./PostProvider";

import IconDelete from "./IconDelete";

import empty from "./assets/empty.svg";

import { PostCard, NoPosts } from "./Home.styles";

function Home({ history }) {
  const { posts, remove } = usePost();
  const { user } = useAuth();

  return (
    <div>
      {posts.length === 0 ? (
        <NoPosts>
          <img src={empty} alt="Illustration of a man carrying an empty box" />
          <p>No posts.</p>
        </NoPosts>
      ) : (
        posts.map(post => {
          return (
            <PostCard
              key={post._id}
              data-testid={`post-${post._id}`}
              onClick={e => {
                e.preventDefault();
                history.push(`/post/${post._id}`);
              }}
            >
              <span>{formatDistanceToNow(new Date(post.date))}</span>
              {user && post.createdBy._id === user._id && (
                <IconDelete
                  onClick={e => {
                    e.stopPropagation();
                    if (
                      window.confirm(
                        "Are you sure you want to delete this post?"
                      )
                    ) {
                      remove(post._id);
                    }
                  }}
                />
              )}
              <img src={post.image} alt={post.title} />
              <div>
                <h2>{post.title}</h2>
                <p>Written by {post.createdBy.name}</p>
              </div>
            </PostCard>
          );
        })
      )}
    </div>
  );
}

export default Home;
