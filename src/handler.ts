import { RouteHandler } from "fastify";

import { PostBody } from "./schemas/post/body";

export const handler: RouteHandler<{
  Body: PostBody;
}> = async (req, res) => {
  const body = req.body;
  console.log(body.id);
  console.log(body.type);
  return await res.status(200).send();
};
