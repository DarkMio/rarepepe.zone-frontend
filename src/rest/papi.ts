import { emptySplitApi as api } from "#rest/emptyApi";
export const addTagTypes = ["directory", "randomizer", "hasher", "potd", "info"] as const;
const injectedRtkApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: build => ({
      getDirectory: build.query<GetDirectoryApiResponse, GetDirectoryApiArg>({
        query: () => ({ url: `/directory/` }),
        providesTags: ["directory"],
      }),
      getDirectoryMeta: build.query<GetDirectoryMetaApiResponse, GetDirectoryMetaApiArg>({
        query: () => ({ url: `/directory/meta` }),
        providesTags: ["directory"],
      }),
      getDirectorySimple: build.query<GetDirectorySimpleApiResponse, GetDirectorySimpleApiArg>({
        query: () => ({ url: `/directory/simple` }),
        providesTags: ["directory"],
      }),
      getDirectoryRare: build.query<GetDirectoryRareApiResponse, GetDirectoryRareApiArg>({
        query: () => ({ url: `/directory/rare` }),
        providesTags: ["directory"],
      }),
      getDirectoryUltra: build.query<GetDirectoryUltraApiResponse, GetDirectoryUltraApiArg>({
        query: () => ({ url: `/directory/ultra` }),
        providesTags: ["directory"],
      }),
      getRandom: build.query<GetRandomApiResponse, GetRandomApiArg>({
        query: () => ({ url: `/random/` }),
        providesTags: ["randomizer"],
      }),
      getRandomSimple: build.query<GetRandomSimpleApiResponse, GetRandomSimpleApiArg>({
        query: () => ({ url: `/random/simple` }),
        providesTags: ["randomizer"],
      }),
      getRandomRare: build.query<GetRandomRareApiResponse, GetRandomRareApiArg>({
        query: () => ({ url: `/random/rare` }),
        providesTags: ["randomizer"],
      }),
      getRandomUltra: build.query<GetRandomUltraApiResponse, GetRandomUltraApiArg>({
        query: () => ({ url: `/random/ultra` }),
        providesTags: ["randomizer"],
      }),
      getHash: build.query<GetHashApiResponse, GetHashApiArg>({
        query: queryArg => ({ url: `/hash/`, params: { phrase: queryArg.phrase } }),
        providesTags: ["hasher"],
      }),
      getPotd: build.query<GetPotdApiResponse, GetPotdApiArg>({
        query: () => ({ url: `/potd/` }),
        providesTags: ["potd"],
      }),
      getPotdByYearByMonthByDay: build.query<GetPotdByYearByMonthByDayApiResponse, GetPotdByYearByMonthByDayApiArg>({
        query: queryArg => ({ url: `/potd/${queryArg.year}/${queryArg.month}/${queryArg.day}` }),
        providesTags: ["potd"],
      }),
      getIndex: build.query<GetIndexApiResponse, GetIndexApiArg>({
        query: () => ({ url: `/` }),
        providesTags: ["info"],
      }),
    }),
    overrideExisting: false,
  });
export { injectedRtkApi as PAPI };
export type GetDirectoryApiResponse = /** status 200 undefined */ {
  meta: {
    changed: any;
    simples: {
      count: number;
      changed: any;
    };
    rares: {
      count: number;
      changed: any;
    };
    ultras: {
      count: number;
      changed: any;
    };
  };
  simple: {
    type: string;
    url: string;
  }[];
  rare: {
    type: string;
    url: string;
  }[];
  ultra: {
    type: string;
    url: string;
  }[];
};
export type GetDirectoryApiArg = void;
export type GetDirectoryMetaApiResponse = /** status 200 undefined */ {
  changed: any;
  simples: {
    count: number;
    changed: any;
  };
  rares: {
    count: number;
    changed: any;
  };
  ultras: {
    count: number;
    changed: any;
  };
};
export type GetDirectoryMetaApiArg = void;
export type GetDirectorySimpleApiResponse = /** status 200 undefined */ {
  meta: {
    count: number;
    changed: any;
  };
  entries: {
    type: string;
    url: string;
  }[];
};
export type GetDirectorySimpleApiArg = void;
export type GetDirectoryRareApiResponse = /** status 200 undefined */ {
  meta: {
    count: number;
    changed: any;
  };
  entries: {
    type: string;
    url: string;
  }[];
};
export type GetDirectoryRareApiArg = void;
export type GetDirectoryUltraApiResponse = /** status 200 undefined */ {
  meta: {
    count: number;
    changed: any;
  };
  entries: {
    type: string;
    url: string;
  }[];
};
export type GetDirectoryUltraApiArg = void;
export type GetRandomApiResponse = /** status 200 undefined */ any;
export type GetRandomApiArg = void;
export type GetRandomSimpleApiResponse = /** status 200 undefined */ {
  type: string;
  url: string;
};
export type GetRandomSimpleApiArg = void;
export type GetRandomRareApiResponse = /** status 200 undefined */ {
  type: string;
  url: string;
};
export type GetRandomRareApiArg = void;
export type GetRandomUltraApiResponse = /** status 200 undefined */ {
  type: string;
  url: string;
};
export type GetRandomUltraApiArg = void;
export type GetHashApiResponse = /** status 200 undefined */ {
  type: string;
  url: string;
  phrase: string;
};
export type GetHashApiArg = {
  phrase: any;
};
export type GetPotdApiResponse = /** status 200 undefined */ {
  type: string;
  url: string;
  date: string;
};
export type GetPotdApiArg = void;
export type GetPotdByYearByMonthByDayApiResponse = /** status 200 undefined */ {
  type: string;
  url: string;
  date: string;
};
export type GetPotdByYearByMonthByDayApiArg = {
  year: any;
  month: any;
  day: any;
};
export type GetIndexApiResponse = unknown;
export type GetIndexApiArg = void;
export const {
  useGetDirectoryQuery,
  useGetDirectoryMetaQuery,
  useGetDirectorySimpleQuery,
  useGetDirectoryRareQuery,
  useGetDirectoryUltraQuery,
  useGetRandomQuery,
  useGetRandomSimpleQuery,
  useGetRandomRareQuery,
  useGetRandomUltraQuery,
  useGetHashQuery,
  useGetPotdQuery,
  useGetPotdByYearByMonthByDayQuery,
  useGetIndexQuery,
} = injectedRtkApi;
