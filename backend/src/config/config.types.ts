export type BackendConfig = {
  port: number
  host: string
  pgl: {
    /**
     * DB url which postgraphile uses.
     * Example: postgres://[username]:[password]@[host]:[port]/[database]
     */
    dbUrl: string;
  };
};
