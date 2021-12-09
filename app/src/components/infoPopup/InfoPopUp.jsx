import React, { useState, useEffect } from "react";
import "./infoPopup.css";
import { PopupC } from "../";

function InfoPopUp({
  setPopperElement,
  styles,
  attributes,
  element,
  id,
  setInfoPopup,
  infoPopup,
  setUpdateRerender,
  updateRerender,
}) {
  const [trigger, setTrigger] = useState(false);
  const [post, setPost] = useState("");
  const [comment, setComment] = useState("");

  const handleUpdate = () => {
    if (element === "post") {
      setPost("update");
    } else if (element === "comment") {
      setComment("update");
    }
  };
  const handleDelete = () => {
    if (element === "post") {
      setPost("delete");
    } else if (element === "comment") {
      setComment("delete");
    }
  };

  return (
    <>
      {infoPopup ? (
        <div
          className="info__popUp-container"
          style={styles.popper}
          {...attributes.popper}
          ref={setPopperElement}
        >
          <div className="info__popUp">
            <div
              className="info__popUp-btn"
              onClick={() => {
                setTrigger(true);
                handleUpdate();
                setInfoPopup(false);
              }}
            >
              <span>Update</span>
            </div>
          </div>
          <div className="info__popUp">
            <div
              className="info__popUp-btn"
              onClick={() => {
                setTrigger(true);
                handleDelete();
                setInfoPopup(false);
              }}
            >
              <span>Delete</span>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}

      {trigger ? (
        <PopupC
          setUpdateRerender={setUpdateRerender}
          updateRerender={updateRerender}
          setTrigger={setTrigger}
          trigger={trigger}
          post={post}
          comment={comment}
          id={id}
        />
      ) : (
        ""
      )}
    </>
  );
}

export default InfoPopUp;
