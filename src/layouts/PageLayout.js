import React from "react";
import "./PageLayout.style.scss";

const PageLayout = ({ children }) => {
  return <div className="page">{children}</div>;
};

export default PageLayout;
