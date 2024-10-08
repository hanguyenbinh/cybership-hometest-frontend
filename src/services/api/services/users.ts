import { useCallback } from "react";
import useFetch from "../use-fetch";
import { API_URL } from "../config";
import wrapperFetchJsonResponse from "../wrapper-fetch-json-response";
import { User } from "../types/user";
import { InfinityPaginationType } from "../types/infinity-pagination";
import { SortEnum } from "../types/sort-type";
import { RequestConfigType } from "./types/request-config";
import wrapperFetchJsonData from "../wrapper-json-data";

export type UsersRequest = {
  page: number;
  limit: number;
  filters?: {
    email?: string;
  };
  sort?: Array<{
    orderBy: keyof User;
    order: SortEnum;
  }>;
};

export type UsersResponse = InfinityPaginationType<User>;

export function useGetUsersService() {
  const fetch = useFetch();

  return useCallback(
    (data: UsersRequest, requestConfig?: RequestConfigType) => {
      const requestUrl = new URL(`${API_URL}/auth`);
      requestUrl.searchParams.append("page", data.page.toString());
      requestUrl.searchParams.append("limit", data.limit.toString());
      if (data.filters && data.filters.email) {
        requestUrl.searchParams.append("email", data.filters.email);
      }
      if (data.sort) {
        requestUrl.searchParams.append("sort", data.sort[0].order);
        requestUrl.searchParams.append("order", data.sort[0].orderBy);
      }

      return fetch(requestUrl, {
        method: "GET",
        ...requestConfig,
      }).then(async (response) => {
        const wrapperResponse = await wrapperFetchJsonResponse(response);
        const wrapperData =
          wrapperFetchJsonData<UsersResponse>(wrapperResponse);
        return wrapperData;
      });
    },
    [fetch]
  );
}

export type UserRequest = {
  id: User["id"];
};

export type UserResponse = User;

export function useGetUserService() {
  const fetch = useFetch();

  return useCallback(
    (data: UserRequest, requestConfig?: RequestConfigType) => {
      return fetch(`${API_URL}/auth/${data.id}`, {
        method: "GET",
        ...requestConfig,
      }).then(async (response) => {
        const wrapperResponse = await wrapperFetchJsonResponse(response);
        const wrapperData = wrapperFetchJsonData<UserResponse>(wrapperResponse);
        return wrapperData;
      });
    },
    [fetch]
  );
}

export type UserPostRequest = Pick<
  User,
  "email" | "firstName" | "lastName" | "photo" | "role"
> & {
  password: string;
};

export type UserPostResponse = User;

export function usePostUserService() {
  const fetch = useFetch();

  return useCallback(
    (data: UserPostRequest, requestConfig?: RequestConfigType) => {
      return fetch(`${API_URL}/auth`, {
        method: "POST",
        body: JSON.stringify(data),
        ...requestConfig,
      }).then(async (response) => {
        const wrapperResponse = await wrapperFetchJsonResponse(response);
        const wrapperData =
          wrapperFetchJsonData<UserPostResponse>(wrapperResponse);
        return wrapperData;
      });
    },
    [fetch]
  );
}

export type UserPatchRequest = {
  id: User["id"];
  data: Partial<
    Pick<User, "email" | "firstName" | "lastName" | "photo" | "role"> & {
      password: string;
    }
  >;
};

export type UserPatchResponse = User;

export function usePatchUserService() {
  const fetch = useFetch();

  return useCallback(
    (data: UserPatchRequest, requestConfig?: RequestConfigType) => {
      return fetch(`${API_URL}/auth/${data.id}`, {
        method: "PATCH",
        body: JSON.stringify(data.data),
        ...requestConfig,
      }).then(async (response) => {
        const wrapperResponse = await wrapperFetchJsonResponse(response);
        const wrapperData =
          wrapperFetchJsonData<UserPatchResponse>(wrapperResponse);
        return wrapperData;
      });
    },
    [fetch]
  );
}

export type UsersDeleteRequest = {
  id: User["id"];
};

export type UsersDeleteResponse = undefined;

export function useDeleteUsersService() {
  const fetch = useFetch();

  return useCallback(
    (data: UsersDeleteRequest, requestConfig?: RequestConfigType) => {
      return fetch(`${API_URL}/auth/${data.id}`, {
        method: "DELETE",
        ...requestConfig,
      }).then(async (response) => {
        const wrapperResponse = await wrapperFetchJsonResponse(response);
        const wrapperData =
          wrapperFetchJsonData<UsersDeleteResponse>(wrapperResponse);
        return wrapperData;
      });
    },
    [fetch]
  );
}
