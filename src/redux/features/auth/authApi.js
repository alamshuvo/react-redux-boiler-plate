
import { baseApi } from "../../api/baseApi";
import { loginSuccess, logout } from "./authSlice";


export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Login endpoint
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        data: credentials,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            loginSuccess({
              user: data.data.user,
              token: data.data.accessToken,
            })
          );
        } catch (error) {
          console.error("Login failed:", error);
        }
      },
    }),

    // Logout endpoint
    logoutUser: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(logout());
        } catch (error) {
          console.error("Logout failed:", error);
        }
      },
    }),

    // Current user fetch (optional)
    getMe: builder.query({
      query: () => ({
        url: "/auth/me",
        method: "GET",
      }),
    }),
  }),
});

export const { useLoginMutation, useLogoutUserMutation, useGetMeQuery } = authApi;
