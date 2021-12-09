import React, { useState } from "react";
import { BiLike } from "react-icons/bi";

function Like({ post_id, likes }) {
  const [likesUpdate, setLikesUpdate] = useState(likes);

  const likeClick = async () => {
    fetch(`https://first-posts.herokuapp.com/api/posts/like?id=${post_id}`, {
      method: "POST",
      headers: { "auth-token": localStorage.getItem("auth-token") },
    })
      .then((res) => res.json())
      .then((data) => setLikesUpdate(data))
      .catch((err) => console.log(err));
  };
  return (
    <div className="post__like-container" onClick={() => likeClick()}>
      <BiLike size="20" />
      <span>{likesUpdate}</span>
    </div>
  );
}

export default Like;
