import { setupWorker } from "msw/browser";
import { authHandlers } from "./auth";
import { postHandlers } from "./post";
import { userHandlers } from "./user";

export const worker = setupWorker(
  ...authHandlers,
  ...userHandlers,
  ...postHandlers
);
