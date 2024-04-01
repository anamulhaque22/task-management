// HeaderTitleContext.js
import { createContext, useContext, useState } from "react";

const HeaderTitleContext = createContext();

export const HeaderTitleProvider = ({ children }) => {
  const [headerTitle, setHeaderTitle] = useState("Default Title");

  const updateHeaderTitle = (newTitle) => {
    setHeaderTitle(newTitle);
  };

  return (
    <HeaderTitleContext.Provider value={{ headerTitle, updateHeaderTitle }}>
      {children}
    </HeaderTitleContext.Provider>
  );
};

export const useHeaderTitle = () => {
  return useContext(HeaderTitleContext);
};
