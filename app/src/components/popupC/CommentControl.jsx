import React, { useState } from "react";
import "./popupC.css";

export const CommentUpdate = ({
  setTrigger,
  id,
  setUpdateRerender,
  updateRerender,
}) => {
  const [newCommentContent, setNewCommentContent] = useState("");

  const updateComment = () => {
    fetch("https://first-posts.herokuapp.com/api/comments/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("auth-token"),
      },
      body: JSON.stringify({
        commentId: id,
        commentContentUpdate: newCommentContent,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setUpdateRerender(!updateRerender);
        setTrigger(false);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="makePost__popup-container-input">
        <textarea
          className="makePost__popup-input makePost__popup-input-content"
          placeholder={`New comment content`}
          resize="hide"
          onChange={(event) => setNewCommentContent(event.target.value)}
        />
      </div>
      <div className="makePost__popup-buttons">
        <button className="primary__btn" onClick={() => setTrigger(false)}>
          Cancel
        </button>
        <button className="primary__btn" onClick={updateComment}>
          Update
        </button>
      </div>
    </>
  );
};

export const CommentDelete = ({
  setTrigger,
  id,
  setUpdateRerender,
  updateRerender,
}) => {
  const deleteComment = () => {
    fetch("https://first-posts.herokuapp.com/api/comments/delete", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("auth-token"),
      },
      body: JSON.stringify({
        commentId: id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setUpdateRerender(!updateRerender);
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
        <button className="primary__btn" onClick={deleteComment}>
          Delete
        </button>
      </div>
    </>
  );
};
