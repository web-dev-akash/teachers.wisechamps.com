import { RaceBy } from "@uiball/loaders";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Dashboard } from "./Dashboard";
import { Header } from "./Header";
import { Reports } from "./Reports";
import { Attendance } from "./Attendance";

export const Main = () => {
  const query = new URLSearchParams(window.location.search);
  const [email, setEmail] = useState(query.get("email"));
  const [mode, setMode] = useState("user");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [user, setUser] = useState({});

  const emailRegex = new RegExp(
    /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/,
    "gm"
  );

  const handleChange = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
  };

  const handleClick = async (emailParam) => {
    if (!emailRegex.test(emailParam)) {
      alert("Please Enter a Valid Email");
      return;
    }
    try {
      setMode("");
      setLoading(true);
      const url = `https://backend.wisechamps.com/teachers`;
      const res = await axios.post(url, { email: emailParam });
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
    if (email) {
      handleClick(email);
    }
  }, []);

  if (loading) {
    return (
      <div
        id="loadingDiv"
        style={{
          width: "fit-content",
        }}
      >
        <p
          style={{
            marginBottom: "10px",
          }}
        >
          Loading Please Wait...
        </p>
        <RaceBy
          size={300}
          lineWeight={20}
          speed={1.4}
          color="rgba(129, 140, 248)"
        />
      </div>
    );
  }

  if (error || mode.includes("internalservererror") || mode === "error") {
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
          This Email is not registered with us. <br />
          Please use a registered Email Address
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
      <div className="main animate__animated animate__fadeInRight">
        <h3>Email</h3>
        <div className="form">
          <input
            className="input"
            type="email"
            placeholder="Enter Email"
            inputMode="email"
            onChange={handleChange}
          />
          <p>* Please use the registered Email.</p>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "15px",
            }}
          >
            <button id="submit-btn" onClick={() => handleClick(email)}>
              Sumbit
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
