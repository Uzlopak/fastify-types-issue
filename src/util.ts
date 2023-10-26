import { FastifyRequest } from "fastify";
import { Unauthorized } from "http-errors";
import { PostBody } from "./schemas/post/body";

export const preHandler = async (req: FastifyRequest<{
  Body: PostBody;
}>) => {
  const rawBody = req.rawBody;
  if (rawBody === undefined) throw Unauthorized("No raw body on the request");
  console.log("Pre handler executed")
};
