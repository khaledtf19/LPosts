import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { Post, LoadingPost } from "../../components";

import { ErrorContext } from "../../context/errorContext/ErrorContext";

function User() {
  const prams = useParams();
  const userId = prams.id;

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const { errorTrigger, message } = useContext(ErrorContext);
  const [errorTriggers, setErrorTriggers] = errorTrigger;
  const [errorMassage, setErrorMessage] = message;

  useEffect(() => {
    const getUserPosts = () => {
      fetch(`https://first-posts.herokuapp.com/api/posts/user?id=${userId}`, {
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
            setPosts(data);
          }
        })
        .catch((err) => console.log(err));
    };
    getUserPosts();
  }, [userId]);
  return (
    <div className="page__margin">
      {loading ? (
        <LoadingPost />
      ) : (
        posts.map((post) => <Post key={post._id} post={post} comments={""} />)
      )}
    </div>
  );
}

export default User;
