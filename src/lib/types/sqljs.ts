// src/types/sqljs.d.ts
declare module 'sql.js' {
  export interface QueryResults {
    columns: string[];
    values: (string | number | null)[][];
  }

  export interface Database {
    run(sql: string): void;
    exec(sql: string): QueryResults[];
  }

  export interface SqlJsStatic {
    Database: new () => Database;
  }

  const initSqlJs: (config: { locateFile: () => string }) => Promise<SqlJsStatic>;
  export default initSqlJs;
}
