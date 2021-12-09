import React, { useState, createContext, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = (props) => {
  const [userData, setUserData] = useState(null);
  const [rerender, setRerender] = useState(false);
  const [token, setToken] = useState("");

  useEffect(() => {
    if (localStorage.getItem("auth-token") !== null) {
      const getUserData = () => {
        fetch(`https://first-posts.herokuapp.com/api/user/me`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "auth-token": token,
          },
        })
          .then((res) => res.json())
          .then((data) => setUserData(data))
          .catch((err) => console.log(err));
      };
      getUserData();
    }

    setToken(localStorage.getItem("auth-token"));
  }, [token, rerender]);

  return (
    <UserContext.Provider
      value={{
        user: [userData, setUserData],
        render: [rerender, setRerender],
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
