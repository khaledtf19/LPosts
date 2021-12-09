import React, { useState } from "react";
import "./popupC.css";
import { RiCloseLine } from "react-icons/ri";

import { PostUpdate, PostDelete } from "./PostControl";
import { CommentUpdate, CommentDelete } from "./CommentControl";

function PopupC({
  id,
  trigger,
  setTrigger,
  post,
  comment,
  setUpdateRerender,
  updateRerender,
}) {
  console.log("here3");
  return (
    <div>
      <div className="popupC__container">
        {console.log("here2")}
        <div className="popupC__popup">
          <div className="popupC__popup-closeBtn">
            <RiCloseLine size={30} onClick={() => setTrigger(false)} />
          </div>
          {post ? (
            post === "update" ? (
              <PostUpdate
                setTrigger={setTrigger}
                id={id}
                setUpdateRerender={setUpdateRerender}
                updateRerender={updateRerender}
              />
            ) : (
              <PostDelete
                setTrigger={setTrigger}
                id={id}
                setUpdateRerender={setUpdateRerender}
                updateRerender={updateRerender}
              />
            )
          ) : (
            ""
          )}
          {comment ? (
            comment === "update" ? (
              <CommentUpdate
                setTrigger={setTrigger}
                id={id}
                setUpdateRerender={setUpdateRerender}
                updateRerender={updateRerender}
              />
            ) : (
              <CommentDelete
                setTrigger={setTrigger}
                id={id}
                setUpdateRerender={setUpdateRerender}
                updateRerender={updateRerender}
              />
            )
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}

export default PopupC;
