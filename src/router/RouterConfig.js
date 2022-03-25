import React from "react";
import { Routes, Route } from "react-router-dom";
import AddPage from "../pages/AddPage";
import ListPage from "../pages/ListPage";
import { ROOT, ADD } from "./Constants";

const RouterConfig = () => {
  return (
    <Routes>
      <Route path={ROOT} element={<ListPage />} />
      <Route path={ADD} element={<AddPage />} />
    </Routes>
  );
};

export default RouterConfig;
