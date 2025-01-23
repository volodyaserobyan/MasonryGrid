import { Route, Routes } from "react-router-dom";
import React, { Suspense, lazy } from "react";
import "./App.scss";

const MasonryGridPage = lazy(() => import("./pages/MasonryGridPage"));
const PhotoDetailsPage = lazy(() => import("./pages/PhotoDetailsPage"));

const App = () => {
  return (
    <div className="App">
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<MasonryGridPage />} />
          <Route path=":id" element={<PhotoDetailsPage />} />
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;
