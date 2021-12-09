import React from "react";
import { Link } from "react-router-dom";
import { Like, InfoPopUp } from "../";

import "../post/post.css";

import { CgProfile } from "react-icons/cg";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Spinner } from "react-bootstrap";

function LoadingPost() {
  return (
    <div>
      <div className="post__container">
        <div className="post__user-info__container">
          <div className="post__user-info">
            <div className="post__user-info-photo">
              <CgProfile size="40" />
            </div>
            <div className="post__user-info-user">
              <Link to={"/user/"} className="post__user-info-name">
                Loading...
              </Link>
              <Link to={"/user/"} className="post__user-info-email">
                Loading...
              </Link>
            </div>
          </div>
          <div className="post__user-info-button">
            <BsThreeDotsVertical size="25" />
          </div>
          <InfoPopUp />
        </div>

        <div className="post__content">
          <div className="post__content-title">
            <div className="post__content-title-time">
              <span>Loading...</span>
              <span>Loading...</span>
            </div>

            <p className="post__content-title-short">Loading...</p>
          </div>
          <div className="post__content-content">
            <div className="post__content-content-short">
              <Spinner animation="border" variant="primary">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          </div>
        </div>
        <div className="post__action">
          <Like post_id={"2"} likes={0} />
          <Link to={"/post/"} className="post__comment-container">
            <p>Comments: {0}</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LoadingPost;
