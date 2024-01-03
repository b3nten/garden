import { MiddlewareHandler } from "hono";

export const recoverer: MiddlewareHandler = async (c, next) => {
  try {
    await next();
  } catch (err) {
    console.error(err);
    return new Response("Internal Server Error", {
      status: 500,
    });
  }
};