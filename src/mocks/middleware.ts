import {
  DefaultBodyType,
  HttpResponse,
  HttpResponseResolver,
  PathParams,
} from "msw";

type HigherOrderResolver = <
  Params extends PathParams,
  RequestBodyType extends DefaultBodyType,
  ResponseBodyType extends DefaultBodyType,
>(
  resolver: HttpResponseResolver<Params, RequestBodyType, ResponseBodyType>
) => HttpResponseResolver<Params, RequestBodyType, ResponseBodyType>;

export const withAuth: HigherOrderResolver = (resolver) => {
  return (input) => {
    const { request } = input;

    if (!request.headers.get("Authorization")) {
      return HttpResponse.json(
        { data: null, message: "Unauthorized" },
        { status: 401 }
      );
    }

    return resolver(input);
  };
};
