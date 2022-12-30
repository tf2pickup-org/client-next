import { apiUrl } from "$environment";
import { error } from "@sveltejs/kit";
import type { Queue } from "../models/queue";

export const fetchQueue = async (): Promise<Queue> => {
  const res = await fetch(`${apiUrl}/queue`);
  if (res.ok) {
    return await res.json();
  } else {
    throw error(res.status);
  }
}
