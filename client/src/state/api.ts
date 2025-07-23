import { createNewUserInDatabase } from "@/lib/utils";
import { Manager, Tenant } from "@/types/prismaTypes";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { fetchAuthSession, getCurrentUser } from "aws-amplify/auth";

/**
 * RTK Query API Slice
 * This slice manages all API requests related to user authentication and user data.
 */

export const api = createApi({
  // Configure the base query for all endpoints in this API slice
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
    /**
     * prepareHeaders: Attach authentication headers to every request.
     * This function runs before every API call.
     */
    prepareHeaders: async (headers) => {
      // Get the current authentication session from AWS Cognito
      const session = await fetchAuthSession();
      const { idToken } = session.tokens ?? {};

      // If an ID token is available, add it as a Bearer token in the Authorization header
      if (idToken) {
        headers.set("Authorization", `Bearer ${idToken}`);
      }
      return headers;
    },
  }),
  // The key in Redux store where this API slice's state will be stored
  reducerPath: "api",
  // Tag types for cache invalidation
  tagTypes: [],

  /**
   * Define all endpoints (queries and mutations) for this API slice.
   */
  endpoints: (build) => ({
    /**
     * getAuthUser: Query to fetch the authenticated user's data.
     * This uses a custom queryFn for advanced logic.
     */
    getAuthUser: build.query<User, void>({
      /**
       * queryFn: Custom function to fetch user data from both Cognito and backend (we will also check from backend)
       */
      queryFn: async (_, _queryApi, _extraoption, fetchWithBQ) => {
        try {
          // 1. Get the current Cognito session and user info
          const session = await fetchAuthSession();
          const { idToken } = session.tokens ?? {};
          const user = await getCurrentUser();

          // 2. Extract the user's role from the Cognito ID token payload
          const userRole = idToken?.payload["custom:role"] as string;

          // 3. Choose the backend endpoint based on the user's role
          const endPoint =
            userRole === "manager"
              ? `/managers/${user.userId}` // Manager endpoint with cognitoId(userId)
              : `tenants/${user.userId}`; // Tenant endpoint with cognitoId(userId)

          // 4. Fetch user details from your backend API
          let userDetailsResponse = await fetchWithBQ(endPoint);

          // TODO: If user doesn't exist in the backend, create a new user here

          if (
            userDetailsResponse.error &&
            userDetailsResponse.error.status === 404
          ) {
            userDetailsResponse = await createNewUserInDatabase(
              user,
              idToken,
              userRole,
              fetchWithBQ,
            );
          }

          // 5. Return both Cognito and backend user info, plus the role
          return {
            data: {
              cognitoInfo: { ...user }, // Cognito user info
              userInfo: userDetailsResponse.data as Tenant | Manager, // Backend user info
              userRole, // User's role
            },
          };
        } catch (error: any) {
          return {
            error: error.message || "Could not fetch User Data!!",
          };
        }
      },
    }),
  }),
});

export const {
  useGetAuthUserQuery,
} = api;
