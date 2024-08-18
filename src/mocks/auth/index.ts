import { ApiResponse, AuthSignin, User } from "@/apis";
import { ApiRoutes } from "@/constants";
import { Nullable } from "@/types";
import { toUrl } from "@/utils";
import { DefaultBodyType, http, HttpResponse, PathParams } from "msw";
import { readUsers } from "../user";
import { toPath } from "../utils";

const signin = http.post<PathParams, AuthSignin, ApiResponse<Nullable<string>>>(
  toPath(toUrl(ApiRoutes.Signin)),
  async ({ request }) => {
    const { email } = await request.json();

    const users = readUsers();
    const user = users.find((user) => user.email === email);

    if (!user) {
      return HttpResponse.json(
        { data: null, message: "User not found" },
        { status: 404 }
      );
    }

    return HttpResponse.json({
      data: `${user.id}@${user.createdAt}`,
      message: "Successfully signed in",
    });
  }
);

const me = http.get<PathParams, DefaultBodyType, ApiResponse<Nullable<User>>>(
  toPath(ApiRoutes.Me),
  ({ request }) => {
    const token = request.headers.get("Authorization");

    if (!token) {
      return HttpResponse.json(
        { data: null, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const [id, createdAt] = token.split("@");

    const users = readUsers();
    const user = users.find(
      (user) => user.id === Number(id) && user.createdAt === createdAt
    );

    if (!user) {
      return HttpResponse.json(
        { data: null, message: "User not found" },
        { status: 404 }
      );
    }

    return HttpResponse.json({
      data: user,
      message: "Successfully fetched user",
    });
  }
);

export const authHandlers = [signin, me];
