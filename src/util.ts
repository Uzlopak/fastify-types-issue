import { FastifyRequest, preHandlerAsyncHookHandler } from "fastify";
import { Unauthorized } from "http-errors";

export const preHandler: preHandlerAsyncHookHandler = async (req: FastifyRequest) => {
  const rawBody = req.rawBody;
  if (rawBody === undefined) throw Unauthorized("No raw body on the request");
  console.log("Pre handler executed")
};
