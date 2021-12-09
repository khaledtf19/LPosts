import React, { useState, useEffect, useContext } from "react";
import "./home.css";
import { Post, MakePost, LoadingPost } from "../../components";

import { UserContext } from "../../context/user/UserContext";
import { ErrorContext } from "../../context/errorContext/ErrorContext";

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const [trigger, setTrigger] = useState(false);
  const [updateRerender, setUpdateRerender] = useState(false);

  const { user } = useContext(UserContext);
  const [userData, setUserData] = user;

  const { errorTrigger, message } = useContext(ErrorContext);
  const [errorTriggers, setErrorTriggers] = errorTrigger;
  const [errorMassage, setErrorMessage] = message;

  useEffect(() => {
    const getPosts = async () => {
      const url = `https://first-posts.herokuapp.com/api/posts`;
      setLoading(true);

      fetch(url, {
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
          setLoading(false);
        })
        .catch((err) => console.log(err));
    };
    getPosts();
  }, [updateRerender]);

  return (
    <div className="page__margin">
      <MakePost
        posts={posts}
        setPosts={setPosts}
        trigger={trigger}
        setTrigger={setTrigger}
        name={"Khaled"}
      />
      {loading ? (
        <LoadingPost />
      ) : (
        posts.map((post) => (
          <Post
            key={post._id}
            post={post}
            comments={""}
            updateRerender={updateRerender}
            setUpdateRerender={setUpdateRerender}
          />
        ))
      )}
    </div>
  );
}

export default Home;
