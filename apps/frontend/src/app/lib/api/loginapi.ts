"use client";

import { apiClient } from "../apiClient";
import type { AuthDto } from "@common/dto/auth.dto";
import { HTTPError } from "ky";

type LoginResponse = {
  accessToken: string;
};

export const login = async (credentials: AuthDto) => {
  try {

    const response: LoginResponse = await apiClient
      .post("auth/login", { json: credentials })
      .json();

    if (response.accessToken) {
      localStorage.setItem("auth_token", response.accessToken);
    }

    return response;
  } catch (error) {
    console.error("APIエラー:", error);

    localStorage.removeItem("auth_token");

    if (error instanceof HTTPError) {
      const errorBody = await error.response.json();
      throw new Error(errorBody.message || "ログインに失敗しました。");
    }
    throw new Error("不明なエラーが発生しました。");
  }
};

export const logout = () => {
  localStorage.removeItem("auth_token");
  window.location.href = "/auth/login";
};