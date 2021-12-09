import React, { useState, useContext } from "react";
import "./makePost.css";
import { CgProfile } from "react-icons/cg";
import { RiCloseLine } from "react-icons/ri";

import { UserContext } from "../../context/user/UserContext";

function MakePost({ posts, setPosts, trigger, setTrigger, name }) {
  const [newPostContent, setNewPostContent] = useState("");
  const [newPostTitle, setNewPostTitle] = useState("");
  const [post, setPost] = useState("");
  const { user } = useContext(UserContext);
  const [userData, setUserData] = user;

  const createPost = () => {
    fetch(`https://first-posts.herokuapp.com/api/posts/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("auth-token"),
      },
      body: JSON.stringify({
        postContent: newPostContent,
        postTitle: newPostTitle,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setPost(data);
        setPosts([data, ...posts]);
        setTrigger(false);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="makePost__container">
      <div className="makePost__user-photo">
        <CgProfile size="40" />
      </div>
      <div className="makePost__button" onClick={() => setTrigger(true)}>
        <span className="makePost__button-text">Create new post</span>
      </div>
      {trigger ? (
        <div className="makePost__popup__container ">
          <div className="makePost__popup scale-up-center">
            <div className="makePost__popup-closeBtn">
              <RiCloseLine size="30" onClick={() => setTrigger(false)} />
            </div>

            <div className="makePost__popup-container-input">
              <textarea
                className="makePost__popup-input makePost__popup-input-title"
                placeholder={`Post title`}
                resize="hide"
                maxLength="70"
                onChange={(event) => setNewPostTitle(event.target.value)}
              />
              <textarea
                className="makePost__popup-input makePost__popup-input-content"
                placeholder={`What's on your mind ${userData.name}`}
                maxLength="300"
                resize="hide"
                onChange={(event) => setNewPostContent(event.target.value)}
              />
            </div>
            <div className="makePost__popup-buttons">
              <button
                className="primary__btn"
                onClick={() => setTrigger(false)}
              >
                Cancel
              </button>
              <button className="primary__btn" onClick={createPost}>
                Create
              </button>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default MakePost;
