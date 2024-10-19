import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const authToken = process.env.REACT_APP_AUTH_TOKEN;

export const fetchTeacherByEmail = createAsyncThunk(
  "teacher/fetchTeacherByEmail",
  async ({ email, password }) => {
    const url = `https://backend.wisechamps.com/teachers`;
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    };
    const { data } = await axios.post(
      url,
      {
        email: email,
        password: password,
      },
      config
    );
    return data;
  }
);

export const fetchReportByGrade = createAsyncThunk(
  "teacher/fetchReportByGrade",
  async ({ grade, date }) => {
    const url = `https://backend.wisechamps.com/teachers/report`;
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    };
    const { data } = await axios.post(
      url,
      {
        grade: grade,
        date: date,
      },
      config
    );
    return data;
  }
);

export const updateTeacherAttendance = createAsyncThunk(
  "teacher/updateTeacherAttendance",
  async ({
    contactId,
    sessionDate,
    zoom,
    grade,
    explanation,
    criteria,
    winners,
  }) => {
    const url = `https://backend.wisechamps.com/teachers/attendance`;
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    };
    const { data } = await axios.post(
      url,
      {
        contactId,
        sessionDate,
        zoom,
        grade,
        explanation,
        criteria,
        winners,
      },
      config
    );
    return data;
  }
);

export const fetchLastSessionByGrade = createAsyncThunk(
  "teacher/fetchLastSessionByGrade",
  async ({ grade }) => {
    const url = `https://backend.wisechamps.com/teachers/lastSession`;
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    };
    const { data } = await axios.post(
      url,
      {
        grade,
      },
      config
    );
    return data;
  }
);
