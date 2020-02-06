import React, {
  createContext,
  useState,
  useReducer,
  useEffect,
  useContext,
} from "react";

import callApi from "./services/callApi";

import ErrorMessage from "./Error";
import Loading from "./Loading";

import { User } from "./AuthProvider";

interface Post {
  _id: string;
  image: string;
  title: string;
  content: string;
  date: Date;
  createdBy: User;
}

type PostAction =
  | { type: "GET"; payload: Post[] }
  | { type: "ADD"; payload: Post }
  | { type: "REMOVE"; payload: { postId: string } };

interface PostContextType {
  posts: Post[];
  dispatch: React.Dispatch<PostAction>;
  remove: (id: string) => void;
}

export const PostContext = createContext<PostContextType | null>(null);

function postReducer(posts: Post[], action: PostAction) {
  switch (action.type) {
    case "GET":
      return action.payload;
    case "ADD":
      return [action.payload, ...posts];
    case "REMOVE":
      return posts.filter(post => post._id !== action.payload.postId);
    default:
      return posts;
  }
}

const PostProvider: React.FC = ({ children, ...rest }) => {
  const [hasError, setHasError] = useState(false);
  const [isFetchingPosts, setIsFetchingPosts] = useState(true);
  const [posts, dispatch] = useReducer(postReducer, []);

  async function remove(id: string) {
    const {
      data: { data: removedPost },
    } = await callApi(`/post/${id}`, {
      method: "DELETE",
    });

    dispatch({ type: "REMOVE", payload: { postId: removedPost._id } });
  }

  useEffect(() => {
    async function fetchPosts() {
      try {
        const {
          data: { data },
        } = await callApi("/post/all", {
          method: "GET",
        });
        dispatch({ type: "GET", payload: data });
      } catch (e) {
        setHasError(true);
      } finally {
        setIsFetchingPosts(false);
      }
    }

    fetchPosts();
  }, []);

  if (hasError) {
    return <ErrorMessage />;
  }

  if (isFetchingPosts) {
    return <Loading />;
  }

  return (
    <PostContext.Provider value={{ posts, dispatch, remove }} {...rest}>
      {children}
    </PostContext.Provider>
  );
};

export const usePost = () => {
  const ctx = useContext(PostContext);

  if (ctx === null) {
    throw new Error("usePost must be used within a PostProvider");
  }

  return ctx;
};

export default PostProvider;
