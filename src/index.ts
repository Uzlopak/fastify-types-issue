// Import the framework and instantiate it
import Fastify from 'fastify'
import { fastifyRawBody } from "fastify-raw-body";

import { handler } from './handler';
import * as Schemas from "./schemas";
import { preHandler } from './util';

const fastify = Fastify({
  logger: true
})

// Declare a route
fastify.get(
  "/",
  {
    config: { rawBody: true },
    preHandler: preHandler,
    schema: Schemas.post,
  },
  handler,
);

async function main() {
  // Run the server!
try {
  await fastify.register(fastifyRawBody, {
    global: false,
    runFirst: true,
  });

  await fastify.listen({ port: 3000 })
} catch (err) {
  fastify.log.error(err)
  process.exit(1)
}
}

main();