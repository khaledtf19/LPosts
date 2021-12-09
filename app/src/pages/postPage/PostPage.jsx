import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Post, LoadingPost } from "../../components";
import "./postPage.css";

import { ErrorContext } from "../../context/errorContext/ErrorContext";

function PostPage() {
  const prams = useParams();
  const postId = prams.id;

  const [updateRerender, setUpdateRerender] = useState(false);

  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState("");

  const { errorTrigger, message } = useContext(ErrorContext);
  const [errorTriggers, setErrorTriggers] = errorTrigger;
  const [errorMassage, setErrorMessage] = message;

  useEffect(() => {
    const getPost = async () => {
      setLoading(true);
      fetch(`https://first-posts.herokuapp.com/api/posts/?id=${postId}`, {
        method: "POST",
        headers: { "auth-token": localStorage.getItem("auth-token") },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.Error) {
            console.log("error", data.Error);
            setErrorMessage(data.Error);

            setErrorTriggers(true);
          } else {
            setPost(data);
            setLoading(false);
          }
        })
        .catch((err) => console.log(err));
    };
    getPost();
    console.log(updateRerender);
  }, [updateRerender]);

  return (
    <div className="page__margin">
      {loading ? (
        <LoadingPost />
      ) : (
        post && (
          <Post
            post={post}
            comments={post.comments}
            updateRerender={updateRerender}
            setUpdateRerender={setUpdateRerender}
          />
        )
      )}
    </div>
  );
}

export default PostPage;
