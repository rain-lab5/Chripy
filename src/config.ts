import { loadEnvFile } from 'node:process';
import type { MigrationConfig } from "drizzle-orm/migrator";


export type handler = (req : Request, res : Response) => Promise<void>;

//--- Environment Variables ---//
loadEnvFile();
const dbURL = process.env.DB_URL;
const platform = process.env.PLATFORM;
const jwtSecret = process.env.JWT_SECRET;
//--- Environment Variables ---//

export type APIConfig = {
    fileserverHits : number;
    platform : string; 
    
};

const migrationConfig: MigrationConfig = {
  migrationsFolder: "./src/db/migrations",
};

type Config = {
  api: APIConfig;
  db: DBConfig;
  secret : string,
};

export type DBConfig = {
  url: string;
  migrationConfig: MigrationConfig;
};


if(!dbURL)
{
    throw new Error("[!] Database url is not set...");
}
if(!platform)
{
    throw new Error("[!] PLATFORM is not set...");
}
if(!jwtSecret)
{
    throw new Error("[!] JWT secret is not set...");
}


//---The memory of this object is shared and accessed everywhere, editing this value in a file, then importing it in another file will not affect its value---//

export const config : Config = {
    api : {fileserverHits : 0,
        platform : platform,
    },
    db : {
        url : dbURL,
        migrationConfig : migrationConfig,
    },
    secret : jwtSecret,
}

