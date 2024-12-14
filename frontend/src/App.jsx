import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { adminRouter, errRouter, mainRouter } from "./configs/router";
import RouterMainTemplate from "./templates/main/index";
import RouterAdminTemplate from "./templates/admin/index";
import RouterErrTemplate from "./templates/Err/index";
import "./App.scss";

function App() {
  const renderMainRouter = () => {
    return mainRouter.map(({ path, exact, Component }) => (
      <Route
        key={path}
        path={path}
        element={<RouterMainTemplate Component={Component} />}
      />
    ));
  };

  const renderAdminRouter = () => {
    return adminRouter.map(({ path, exact, Component }) => (
      <Route
        key={path}
        path={path}
        element={<RouterAdminTemplate Component={Component} />}
      />
    ));
  };

  const renderErrRouter = () => {
    return errRouter.map(({ path, exact, Component }) => (
      <Route
        key={path}
        path={path}
        element={<RouterErrTemplate Component={Component} />}
      />
    ));
  };

  return (
    <BrowserRouter>
      <Routes>
        {renderMainRouter()}
        {renderAdminRouter()}
        {renderErrRouter()}
      </Routes>
    </BrowserRouter>
  );
}

export default App;