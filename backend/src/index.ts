import Fastify from "fastify";
import config2 from "./config/config.ts";
import appFastifyPlugin from "./app-fastify-plugin.ts";

const fastifyLogger = {
	transport: {
		target: "pino-pretty",
		options: {
			translateTime: "HH:MM:ss Z",
			ignore: "pid,hostname",
		},
	},
};

// Fastify instance based on config
const app = Fastify({
	logger: fastifyLogger,
	// trustProxy: true, // if your app is behind a reverse proxy (e.g. caddy or nginx)
});

try {
	await app.register(appFastifyPlugin, { prefix: "/api/" });
	// Run the server!
	await app.listen({
		port: config2.port,
		host: config2.host,
	});
} catch (err) {
	app.log.error(err);
	process.exit(1);
}
