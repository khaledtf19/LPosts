import React, { useState } from "react";
import "./popupC.css";
import { useNavigate } from "react-router-dom";

export const PostUpdate = ({
  setTrigger,
  id,
  setUpdateRerender,
  updateRerender,
}) => {
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostContent, setNewPostContent] = useState("");

  const updatePost = () => {
    fetch("https://first-posts.herokuapp.com/api/posts/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("auth-token"),
      },
      body: JSON.stringify({
        postId: id,
        postContentUpdate: newPostContent,
        postTitleUpdate: newPostTitle,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setUpdateRerender(!updateRerender);
        console.log(data);
        setTrigger(false);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="makePost__popup-container-input">
        <textarea
          className="makePost__popup-input makePost__popup-input-title"
          placeholder={`New post title`}
          resize="hide"
          maxLength="70"
          onChange={(event) => setNewPostTitle(event.target.value)}
        />
        <textarea
          className="makePost__popup-input makePost__popup-input-content"
          placeholder={`New post content`}
          resize="hide"
          onChange={(event) => setNewPostContent(event.target.value)}
        />
      </div>
      <div className="makePost__popup-buttons">
        <button className="primary__btn" onClick={() => setTrigger(false)}>
          Cancel
        </button>
        <button className="primary__btn" onClick={updatePost}>
          Update
        </button>
      </div>
    </>
  );
};

export const PostDelete = ({
  setTrigger,
  id,
  setUpdateRerender,
  updateRerender,
}) => {
  let navigate = useNavigate();

  const deletePost = () => {
    fetch("https://first-posts.herokuapp.com/api/posts/delete", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("auth-token"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setUpdateRerender(!updateRerender);
        navigate("/");
        setTrigger(false);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="popup__message">
        <span>Want to Delete the Post</span>
      </div>
      <div className="makePost__popup-buttons">
        <button className="primary__btn" onClick={() => setTrigger(false)}>
          Cancel
        </button>
        <button className="primary__btn" onClick={deletePost}>
          Delete
        </button>
      </div>
    </>
  );
};
