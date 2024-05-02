import { RaceBy } from "@uiball/loaders";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Dashboard } from "./Dashboard";
import { Header } from "./Header";
import { Reports } from "./Reports";
import { Attendance } from "./Attendance";
import { Loading } from "./Loading";

export const Main = () => {
  const emailQuery = new URLSearchParams(window.location.search).get("email");
  const localEmail = localStorage.getItem("wise_email");
  const localPass = localStorage.getItem("wise_pass");
  const [login, setLogin] = useState({
    email: localEmail || "",
    password: localPass || "",
  });
  const [remember, setRemember] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [mode, setMode] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [user, setUser] = useState({});

  const emailRegex = new RegExp(
    /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
    "gm"
  );

  const handleChange = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    setLogin({ ...login, [name]: value });
  };

  const saveUserInfo = (e) => {
    const isChecked = e.target.checked;
    setRemember(isChecked);
  };

  const handleClick = async (e, { email, password }) => {
    e?.preventDefault();
    if (e && !emailRegex.test(email)) {
      alert("Please enter a valid Email");
      return;
    }
    if (!password) {
      alert("Please enter a valid Password");
      return;
    }
    if (remember) {
      localStorage.setItem("wise_email", email);
      localStorage.setItem("wise_pass", password);
    }
    try {
      setMode("");
      setLoading(true);
      const url = `https://backend.wisechamps.com/teachers`;
      const res = await axios.post(url, { email: email, password: password });
      const mode = res.data.mode;
      if (mode === "user") {
        setUser(res.data.user);
      }
      setMode(mode);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(true);
      console.log("error is ------------", error);
    }
  };

  useEffect(() => {
    if (localEmail && localPass) {
      handleClick(null, { email: localEmail, password: localPass });
    }
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (error || mode?.includes("internalservererror") || mode === "error") {
    return (
      <div>
        <h1>Something Went Wrong. Please Refresh</h1>
      </div>
    );
  }

  if (mode === "noattempt") {
    return (
      <div className="email-not-found">
        <p>
          Entered Winner's Student ID is not correct <br />
          Please try again with correct id.
        </p>
        <div
          style={{
            marginTop: "10px",
          }}
        >
          <button id="submit-btn" onClick={() => setMode("attendance")}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (mode === "nouser") {
    return (
      <div className="email-not-found">
        <p>
          Incorrect Email or Password. <br />
          Please use a Valid Email Address and Password
        </p>
        <div
          style={{
            marginTop: "10px",
          }}
        >
          <button id="submit-btn" onClick={() => setMode("")}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (mode === "nosession") {
    return (
      <div className="email-not-found">
        <p>
          There is no session found for the specified date <br />
          Please use correct session date and try again
        </p>
        <div
          style={{
            marginTop: "10px",
          }}
        >
          <button id="submit-btn" onClick={() => setMode("attendance")}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (mode === "success") {
    return (
      <div className="email-not-found">
        <h1>Thank You</h1>
        <p>Your attendance has been marked successfully!</p>
      </div>
    );
  }

  if (mode === "user") {
    return <Dashboard setMode={setMode} />;
  }

  if (mode === "reports") {
    return <Reports parentMode={setMode} />;
  }

  if (mode === "attendance") {
    return (
      <Attendance
        setError={setError}
        setMode={setMode}
        setLoading={setLoading}
        userid={user.id}
      />
    );
  }

  if (mode === "noreport") {
    return (
      <div className="email-not-found">
        <p>
          There are no Reports available right now <br />
          Please try after 1-2 minutes.
        </p>
      </div>
    );
  }

  return (
    <>
      <Header />
      <form className="form animate__animated animate__fadeInRight">
        <div className="flex-column">
          <label>Email</label>
        </div>
        <div className="inputForm">
          <svg
            height="20"
            viewBox="0 0 32 32"
            width="20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="Layer_3" data-name="Layer 3">
              <path d="m30.853 13.87a15 15 0 0 0 -29.729 4.082 15.1 15.1 0 0 0 12.876 12.918 15.6 15.6 0 0 0 2.016.13 14.85 14.85 0 0 0 7.715-2.145 1 1 0 1 0 -1.031-1.711 13.007 13.007 0 1 1 5.458-6.529 2.149 2.149 0 0 1 -4.158-.759v-10.856a1 1 0 0 0 -2 0v1.726a8 8 0 1 0 .2 10.325 4.135 4.135 0 0 0 7.83.274 15.2 15.2 0 0 0 .823-7.455zm-14.853 8.13a6 6 0 1 1 6-6 6.006 6.006 0 0 1 -6 6z"></path>
            </g>
          </svg>
          <input
            type="email"
            inputMode="email"
            name="email"
            className="input"
            placeholder="Enter your Email"
            onChange={handleChange}
          />
        </div>
        <div className="flex-column">
          <label>Password</label>
        </div>
        <div className="inputForm">
          <svg
            height="20"
            viewBox="-64 0 512 512"
            width="20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="m336 512h-288c-26.453125 0-48-21.523438-48-48v-224c0-26.476562 21.546875-48 48-48h288c26.453125 0 48 21.523438 48 48v224c0 26.476562-21.546875 48-48 48zm-288-288c-8.8125 0-16 7.167969-16 16v224c0 8.832031 7.1875 16 16 16h288c8.8125 0 16-7.167969 16-16v-224c0-8.832031-7.1875-16-16-16zm0 0"></path>
            <path d="m304 224c-8.832031 0-16-7.167969-16-16v-80c0-52.929688-43.070312-96-96-96s-96 43.070312-96 96v80c0 8.832031-7.167969 16-16 16s-16-7.167969-16-16v-80c0-70.59375 57.40625-128 128-128s128 57.40625 128 128v80c0 8.832031-7.167969 16-16 16zm0 0"></path>
          </svg>
          <input
            type={showPass ? "text" : "password"}
            name="password"
            className="input"
            placeholder="Enter your Password"
            onChange={handleChange}
          />
          {showPass ? (
            <svg
              style={{ position: "absolute", right: "0", cursor: "pointer" }}
              onClick={() => setShowPass(false)}
              width="64px"
              height="64px"
              viewBox="-40 -24 72.00 72.00"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_iconCarrier">
                {" "}
                <path
                  d="M2 2L22 22"
                  stroke="#000000"
                  stroke-width="2.4"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>{" "}
                <path
                  d="M6.71277 6.7226C3.66479 8.79527 2 12 2 12C2 12 5.63636 19 12 19C14.0503 19 15.8174 18.2734 17.2711 17.2884M11 5.05822C11.3254 5.02013 11.6588 5 12 5C18.3636 5 22 12 22 12C22 12 21.3082 13.3317 20 14.8335"
                  stroke="#000000"
                  stroke-width="2.4"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>{" "}
                <path
                  d="M14 14.2362C13.4692 14.7112 12.7684 15.0001 12 15.0001C10.3431 15.0001 9 13.657 9 12.0001C9 11.1764 9.33193 10.4303 9.86932 9.88818"
                  stroke="#000000"
                  stroke-width="2.4"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>{" "}
              </g>
            </svg>
          ) : (
            <svg
              style={{ cursor: "pointer" }}
              onClick={() => setShowPass(true)}
              viewBox="0 0 576 512"
              height="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"></path>
            </svg>
          )}
        </div>
        <div className="flex-row">
          <div>
            <input id="checkbox" type="checkbox" onChange={saveUserInfo} />
            <label htmlFor="checkbox">Remember me</label>
          </div>
        </div>
        <button
          type="submit"
          className="button-submit"
          onClick={(e) => handleClick(e, login)}
        >
          Sign In
        </button>
      </form>
    </>
  );
};
