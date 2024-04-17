import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import MainAuth from "./layouts/auth/MainAuth";
import Login from "./pages/auth/Login";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import Home from "./pages/Home";
import Main from "./layouts/Main";
import PenghuniRoutes from "./routes/PenghuniRoutes";
import RumahRoutes from "./routes/RumahRoutes";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <MainAuth>
                <Login />
              </MainAuth>
            }
          />

          <Route element={<ProtectedRoutes />}>
            <Route
              path="/dashboard"
              element={
                <Main>
                  <Home />
                </Main>
              }
            />

            <Route
              path="penghuni/*"
              element={
                <Main>
                  <PenghuniRoutes />
                </Main>
              }
            />

            <Route
              path="rumah/*"
              element={
                <Main>
                  <RumahRoutes />
                </Main>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
