import React, { useState, useContext } from "react";
import "./comment.css";
import { usePopper } from "react-popper";

import { CgProfile } from "react-icons/cg";
import { BsThreeDotsVertical } from "react-icons/bs";
import { InfoPopUp } from "../";

import { UserContext } from "../../context/user/UserContext";

function Comment({ comment, setUpdateRerender, updateRerender }) {
  const [infoPopup, setInfoPopup] = useState(false);

  const [popperElement, setPopperElement] = useState(null);
  const [popperRef, setPopperRef] = useState(null);
  const { styles, attributes } = usePopper(popperRef, popperElement);

  let date = new Date(comment.updated);
  let dateHM = `${date.getHours() % 12}:${date.getMinutes()} ${
    date.getHours() > 12 ? "PM" : "AM"
  } `;
  let dateByNum = new Intl.DateTimeFormat(["ban", "id"]).format(date);

  const { user } = useContext(UserContext);
  const [userData, setUserData] = user;

  return (
    <div className="comment__container">
      <div className="comment__user-info__container">
        <div className="comment__user-info">
          <div className="comment__user-info-photo">
            <CgProfile size="30" />
          </div>
        </div>
        <div
          className="comment__user-info-button"
          ref={setPopperRef}
          onClick={() => setInfoPopup(!infoPopup)}
        >
          {userData._id === comment.madeBy._id ? (
            <BsThreeDotsVertical size="25" />
          ) : (
            ""
          )}
        </div>
        <InfoPopUp
          setInfoPopup={setInfoPopup}
          setPopperElement={setPopperElement}
          infoPopup={infoPopup}
          styles={styles}
          attributes={attributes}
          element={"comment"}
          id={comment._id}
          setUpdateRerender={setUpdateRerender}
          updateRerender={updateRerender}
        />
      </div>

      <div className="comment__content">
        <div className="comment__content-info-container">
          <div className="comment__content-info-user">
            <span className="comment__content-info-name">
              {comment.madeBy.name}
            </span>
            <span className="comment__content-info-email">
              {comment.madeBy.email}
            </span>
          </div>
          <div className="comment__content-info-time">
            <span>{dateHM}</span>
            <span>{dateByNum}</span>
          </div>
        </div>

        <p className="comment__content__content">{comment.commentContent}</p>
      </div>
    </div>
  );
}

export default Comment;
