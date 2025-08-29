/* eslint-disable no-unused-vars */
import { createApi } from "@reduxjs/toolkit/query/react";
import { loginSuccess, logout } from "../features/auth/authSlice";
import axiosInstance from "./axios";


// Custom axios baseQuery with refresh token handling
const axiosBaseQuery =
  () =>
  async ({ url, method, data, params }, api) => {
    try {
      const state = api.getState();
      const token = state.auth.token;

      // Attach token if available
      const result = await axiosInstance({
        url,
        method,
        data,
        params,
        headers: token ? { Authorization: token } : {},
      });

      return { data: result.data };
    } catch (error) {
      const err = error;

      // If unauthorized, try refresh token
      if (err.response?.status === 401) {
        try {
          const refreshResult = await axiosInstance.post(
            "/auth/refresh-token",
            {}
          );

          const accessToken = refreshResult.data?.data?.accessToken;
          if (accessToken) {
            const user = api.getState().auth.user;

            // Save new token in Redux
            api.dispatch(
              loginSuccess({
                user,
                token: accessToken,
              })
            );

            // Retry original request with new token
            const retryResult = await axiosInstance({
              url,
              method,
              data,
              params,
              headers: { Authorization: accessToken },
            });

            return { data: retryResult.data };
          } else {
            api.dispatch(logout());
          }
        } catch (refreshError) {
          api.dispatch(logout());
        }
      }

      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: axiosBaseQuery(),
  tagTypes: [],
  endpoints: () => ({}),
});
