"use client";

import { apiClient } from "@/app/lib/apiClient";

type JoinGroupResponse = {
  id: string;
};

export const joinGroup = async (invitationCode: string): Promise<string> => {
  try {
    const payload = { invitationCode };
    const response = await apiClient
      .post("group/join", { json: payload })
      .json<JoinGroupResponse>();

    return response.id;

  } catch (error) {
    console.error("API (joinGroup) エラー:", error);
    throw error;
  }
};