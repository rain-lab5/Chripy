import { loadEnvFile } from 'node:process';
import type { MigrationConfig } from "drizzle-orm/migrator";


export type handler = (req : Request, res : Response) => Promise<void>;
loadEnvFile();

export type APIConfig = {
    fileserverHits : number; 
    
}

const migrationConfig: MigrationConfig = {
  migrationsFolder: "./src/db/migrations",
};

type Config = {
  api: APIConfig;
  db: DBConfig;
};

export type DBConfig = {
  url: string;
  migrationConfig: MigrationConfig;
};

const dbURL = process.env.DB_URL;
if(!dbURL)
{
    throw new Error("[!] Database url is not set...");
}

//---The memory of this object is shared and accessed everywhere, editing this value in a file, then importing it in another file will not affect its value---//

export const config : Config = {
    api : {fileserverHits : 0},
    db : {
        url : dbURL,
        migrationConfig : migrationConfig,
    }
}

