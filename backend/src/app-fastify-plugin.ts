import { grafserv } from "postgraphile/grafserv/fastify/v5";
import { type FastifyInstance } from "fastify";
import cors from '@fastify/cors'

import { pgl } from "./pgl.ts";

// Create the PostGraphile server
const pglServer = pgl.createServ(grafserv);

const appFastifyPlugin = async (
	instance: FastifyInstance,
	// options: FastifyPluginOptions,
) => {
	instance.get("/health", { logLevel: "error" }, async () => {
		return { status: "ok" };
	});

	await instance.register(cors, {
		origin: ["http://localhost:3001", "http://localhost:3002"],
		methods: ["GET", "POST", "OPTIONS"],
	});

	await pglServer.addTo(instance);
};

export default appFastifyPlugin;
