import React, { useState, useContext, useEffect } from "react";
import "./profile.css";
import { Post, LoadingPost } from "../../components";

import { UserContext } from "../../context/user/UserContext";
import { ErrorContext } from "../../context/errorContext/ErrorContext";

function Profile() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const { user, render } = useContext(UserContext);
  const [userData, setUserData] = user;
  const [rerender, setRerender] = render;

  const { errorTrigger, message } = useContext(ErrorContext);
  const [errorTriggers, setErrorTriggers] = errorTrigger;
  const [errorMassage, setErrorMessage] = message;

  useEffect(() => {
    const getUserPosts = () => {
      setLoading(true);
      fetch(
        `https://first-posts.herokuapp.com/api/posts/user?id=${userData._id}`,
        {
          method: "POST",
          headers: { "auth-token": localStorage.getItem("auth-token") },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.Error) {
            console.log("error", data.Error);
            setErrorMessage(data.Error);

            setErrorTriggers(true);
          } else {
            setPosts(data);
          }
          setLoading(false);
        })
        .catch((err) => console.log(err));
    };

    getUserPosts();
  }, []);

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

export default Profile;
