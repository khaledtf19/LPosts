import React, { useState, createContext, useEffect } from "react";
import { ErrorPopup } from "../../components";

export const ErrorContext = createContext();

export const ErrorProvider = (props) => {
  const [errorTriggers, setErrorTriggers] = useState(false);
  const [errorMassage, setErrorMessage] = useState("");
  return (
    <ErrorContext.Provider
      value={{
        errorTrigger: [errorTriggers, setErrorTriggers],
        message: [errorMassage, setErrorMessage],
      }}
    >
      {props.children}
      {errorTriggers ? (
        <ErrorPopup
          errorMassage={errorMassage}
          setErrorTriggers={setErrorTriggers}
          errorTriggers={errorTriggers}
        />
      ) : (
        ""
      )}
    </ErrorContext.Provider>
  );
};
