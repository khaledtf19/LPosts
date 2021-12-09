import React, { useState, useContext } from "react";
import "./makeComment.css";

import { CgProfile } from "react-icons/cg";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoCreateOutline } from "react-icons/io5";
import { UserContext } from "../../context/user/UserContext";

function MakeComment({ postComments, setPostComments, postId }) {
  const { user } = useContext(UserContext);
  const [userData, setUserData] = user;

  const [newCommentContent, setNewCommentContent] = useState("");

  const createComment = () => {
    fetch(`https://first-posts.herokuapp.com/api/comments/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("auth-token"),
      },
      body: JSON.stringify({ commentContent: newCommentContent, postId }),
    })
      .then((res) => res.json())
      .then((data) => {
        setPostComments([...postComments, data]);
      });
  };
  return (
    <div className="comment__container">
      <div className="comment__user-info__container">
        <div className="comment__user-info">
          <div className="comment__user-info-photo">
            <CgProfile size="30" />
          </div>
        </div>
        <div className="comment__user-info-button">
          <BsThreeDotsVertical size="20" />
        </div>
      </div>

      <div className="comment__content">
        <div className="comment__content__content">
          <textarea
            className="makeComment__input"
            resize="hide"
            placeholder={`Add comment ${userData.name}`}
            onChange={(event) => setNewCommentContent(event.target.value)}
          />
        </div>
        <div className="comment__content__create-icon" onClick={createComment}>
          <IoCreateOutline size="30" />
        </div>
      </div>
    </div>
  );
}

export default MakeComment;
