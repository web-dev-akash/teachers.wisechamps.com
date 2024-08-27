import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import "./App.css";
import { Main } from "./Components/Main";
import "animate.css";
import { Dashboard } from "./Components/Dashboard";
import { Reports } from "./Components/Reports";
import { Attendance } from "./Components/Attendance";
import { LastSession } from "./Components/LastSession";
import { NoAttempt } from "./Components/NoAttempt";
import { DuplicateAttendance } from "./Components/DuplicateAttendance";
import { PrivateRouter } from "./Routes/PrivateRouter";
export const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Main />}></Route>
          <Route
            path="/"
            element={
              <PrivateRouter>
                <Dashboard />
              </PrivateRouter>
            }
          ></Route>
          <Route
            path="/reports"
            element={
              <PrivateRouter>
                <Reports />
              </PrivateRouter>
            }
          ></Route>
          <Route
            path="/attendance"
            element={
              <PrivateRouter>
                <Attendance />
              </PrivateRouter>
            }
          ></Route>
          <Route
            path="/last-session"
            element={
              <PrivateRouter>
                <LastSession />
              </PrivateRouter>
            }
          ></Route>
          \
          <Route
            path="/no-attempt"
            element={
              <PrivateRouter>
                <NoAttempt />
              </PrivateRouter>
            }
          ></Route>
          <Route
            path="/already-filled"
            element={
              <PrivateRouter>
                <DuplicateAttendance />
              </PrivateRouter>
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};
