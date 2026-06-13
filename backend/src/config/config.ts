import { type BackendConfig } from "./config.types.ts";

const config: BackendConfig = {
  port: 3002,
  host: "0.0.0.0",
  pgl: {
    // Like DATABASE_URL=postgres://[username]:[password]@[host]:[port]/[database]
    dbUrl: "postgres://postgres:supersecretpassword@db:5432/postgres",
  },
};

export default config;
