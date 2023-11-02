// Or from '@reduxjs/toolkit/query' if not using the auto-generated hooks
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// initialize an empty api service that we'll inject endpoints into later as needed
const statefulLogin = (() => {
  let auth: string | undefined = undefined;

  return {
    setAuthorization: (jwt?: string) => (auth = jwt),
    api: createApi({
      baseQuery: fetchBaseQuery({
        
        baseUrl: "api/",
        prepareHeaders: (headers, _) => {
          if (auth) {
            headers.set("Authorization", `Bearer ${auth}`);
          }
        },
      }),
      endpoints: () => ({}),
    }),
  };
})();

export const emptySplitApi = statefulLogin.api;
export const setAuthorizationGlobally = statefulLogin.setAuthorization;
