import { grafserv } from "postgraphile/grafserv/fastify/v5";
import { type FastifyInstance } from "fastify";

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


	await pglServer.addTo(instance);
};

export default appFastifyPlugin;
