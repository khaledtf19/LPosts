import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Comment, Like, MakeComment, InfoPopUp } from "../";

import { usePopper } from "react-popper";

import { UserContext } from "../../context/user/UserContext";

import "./post.css";

import { CgProfile } from "react-icons/cg";
import { BsThreeDotsVertical } from "react-icons/bs";

function Post({ post, comments, setUpdateRerender, updateRerender }) {
  const [infoPopup, setInfoPopup] = useState(false);
  const [postComments, setPostComments] = useState(comments);

  const [popperElement, setPopperElement] = useState(null);
  const [popperRef, setPopperRef] = useState(null);
  const { styles, attributes } = usePopper(popperRef, popperElement);

  let date = new Date(post.updated);
  let dateHM = `${date.getHours() % 12}:${date.getMinutes()} ${
    date.getHours() > 12 ? "PM" : "AM"
  }`;
  let dateByNum = new Intl.DateTimeFormat(["ban", "id"]).format(date);

  const { user } = useContext(UserContext);
  const [userData, setUserData] = user;

  return (
    <div className="post__container">
      <div className="post__user-info__container">
        <div className="post__user-info">
          <div className="post__user-info-photo">
            <CgProfile size="40" />
          </div>
          <div className="post__user-info-user">
            <Link
              to={"/user/" + post.madeBy._id}
              className="post__user-info-name"
            >
              {post.madeBy.name}
            </Link>
            <Link
              to={"/user/" + post.madeBy._id}
              className="post__user-info-email"
            >
              {post.madeBy.email}
            </Link>
          </div>
        </div>
        <div
          className="post__user-info-button"
          ref={setPopperRef}
          onClick={() => setInfoPopup(!infoPopup)}
        >
          {userData._id === post.madeBy._id ? (
            <BsThreeDotsVertical size="25" />
          ) : (
            ""
          )}
        </div>
        <InfoPopUp
          setInfoPopup={setInfoPopup}
          infoPopup={infoPopup}
          setPopperElement={setPopperElement}
          element={"post"}
          id={post._id}
          styles={styles}
          attributes={attributes}
          setUpdateRerender={setUpdateRerender}
          updateRerender={updateRerender}
        />
      </div>

      <div className="post__content">
        <div className="post__content-title">
          <div className="post__content-title-time">
            <span>{dateHM}</span>
            <span>{dateByNum}</span>
          </div>

          {post.postTitle.length <= 20 ? (
            <p className="post__content-title-short">{post.postTitle}</p>
          ) : (
            <p className="post__content-title-long">{post.postTitle}</p>
          )}
        </div>
        <div className="post__content-content">
          {post.postContent.length <= 50 ? (
            <p className="post__content-content-short">{post.postContent}</p>
          ) : (
            <p className="post__content-content-long">{post.postContent}</p>
          )}
        </div>
      </div>
      <div className="post__action">
        <Like post_id={post._id} likes={post.likes} />
        <Link to={"/post/" + post._id} className="post__comment-container">
          <p>Comments: {post.commentsCount}</p>
        </Link>
      </div>
      {comments && (
        <>
          {postComments.map((comment) => (
            <Comment
              key={comment._id}
              comment={comment}
              setUpdateRerender={setUpdateRerender}
              updateRerender={updateRerender}
            />
          ))}
          <MakeComment
            postComments={postComments}
            setPostComments={setPostComments}
            postId={post._id}
          />
        </>
      )}
    </div>
  );
}

export default Post;
