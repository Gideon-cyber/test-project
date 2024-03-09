import React, { useState } from "react";
import AppContext from "./Context";

const AppProvider = ({ children }) => {
  const [activeNav, setActiveNav] = useState("투자유형 관리");

  return (
    <AppContext.Provider value={{ activeNav, setActiveNav }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
