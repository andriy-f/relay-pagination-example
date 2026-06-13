import { PostGraphileAmberPreset } from "postgraphile/presets/amber";
// Use the 'pg' module to connect to the database
import { makePgService } from "postgraphile/adaptors/pg";
import config from "./config/config.ts";

const preset: GraphileConfig.Preset = {
	extends: [
		PostGraphileAmberPreset,
		// Uncomment this to opt into a smaller Relay-focussed schema
		//PostGraphileRelayPreset,
	],
	pgServices: [
		makePgService({
			connectionString: config.pgl.dbUrl,
			schemas: ["public"],
		}),
	],
	schema: {
		exportSchemaSDLPath: 'schema.graphql',
	}
};

export default preset;
