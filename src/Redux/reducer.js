import { createSlice } from "@reduxjs/toolkit";
import {
  fetchLastSessionByGrade,
  fetchReportByGrade,
  fetchTeacherByEmail,
  updateTeacherAttendance,
} from "./action";

const initialState = {
  loading: false,
  error: false,
  user: {
    id: "",
    email: "",
    phone: "",
    name: "",
    grade: 0,
  },
  mode: "",
  reports: {
    status: 0,
    users: [],
    previousWinners: [],
    totalScore: 0,
  },
  attendance: {
    status: 0,
    mode: "",
  },
  lastSession: {
    status: 0,
    users: [],
  },
};

const teacherSlice = createSlice({
  name: "teacher",
  initialState,
  reducers: {
    userAdded(state, { payload }) {
      const { id, email, phone, name, grade, mode } = payload;
      state.mode = mode;
      state.user.id = id;
      state.user.email = email;
      state.user.phone = phone;
      state.user.name = name;
      state.user.grade = grade;
    },
    reportsAdded(state, { payload }) {
      const { reports, previousWinners, totalScore } = payload;
      state.reports.users = reports;
      state.reports.previousWinners = previousWinners;
      state.reports.totalScore = totalScore;
      state.reports.status = payload.status;
    },
    attendanceAdded(state, { payload }) {
      const { status } = payload;
      state.attendance.status = status;
    },
    lastSessionAdded(state, { payload }) {
      const { users } = payload;
      state.lastSession.users = users;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTeacherByEmail.pending, (state, { payload }) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchTeacherByEmail.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = false;
        state.user.id = payload.user.id;
        state.user.name = payload.user.name;
        state.user.grade = payload.user.grade;
        state.user.phone = payload.user.phone;
        state.user.email = payload.email;
        state.mode = payload.mode;
      })
      .addCase(fetchTeacherByEmail.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(fetchReportByGrade.pending, (state, { payload }) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchReportByGrade.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = false;
        state.reports.users = payload.reports;
        state.reports.previousWinners = payload.previousWinners;
        state.reports.totalScore = payload.totalScore;
        state.reports.status = payload.status;
      })
      .addCase(fetchReportByGrade.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(updateTeacherAttendance.pending, (state, { payload }) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(updateTeacherAttendance.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = false;
        state.attendance.status = payload.status;
        state.attendance.mode = payload.mode;
      })
      .addCase(updateTeacherAttendance.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(fetchLastSessionByGrade.pending, (state, { payload }) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchLastSessionByGrade.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = false;
        state.lastSession.status = payload.status;
        state.lastSession.users = payload.reports;
      })
      .addCase(fetchLastSessionByGrade.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export const { userAdded, reportsAdded, lastSessionAdded, attendanceAdded } =
  teacherSlice.actions;

export default teacherSlice.reducer;
