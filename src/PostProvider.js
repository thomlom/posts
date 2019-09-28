import React, {
  createContext,
  useState,
  useReducer,
  useEffect,
  useContext,
} from "react";

import callApi from "./services/callApi";

import Loading from "./Loading";

const PostContext = createContext();

function postReducer(posts, action) {
  switch (action.type) {
    case "GET":
      return action.payload;
    case "ADD":
      const newPosts = [...posts, action.payload];
      newPosts.sort(
        (a, b) => new Date(a.date).getTime() > new Date(b.date).getTime()
      );
      return newPosts;
    case "REMOVE":
      return posts.filter(post => post._id !== action.payload.postId);
    default:
      return posts;
  }
}

function PostProvider({ children, ...rest }) {
  const [isFetchingPosts, setIsFetchingPosts] = useState(true);
  const [posts, dispatch] = useReducer(postReducer, []);

  async function remove(id) {
    const {
      data: { data: removedPost },
    } = await callApi(`/post/${id}`, {
      method: "DELETE",
    });

    dispatch({ type: "REMOVE", payload: { postId: removedPost._id } });
  }

  useEffect(() => {
    async function fetchPosts() {
      const {
        data: { data },
      } = await callApi("/post/all", {
        method: "GET",
      });
      dispatch({ type: "GET", payload: data });
      setIsFetchingPosts(false);
    }

    fetchPosts();
  }, []);

  if (isFetchingPosts) {
    return <Loading />;
  }

  return (
    <PostContext.Provider value={{ posts, dispatch, remove }} {...rest}>
      {children}
    </PostContext.Provider>
  );
}

export const usePost = () => useContext(PostContext);

export default PostProvider;
