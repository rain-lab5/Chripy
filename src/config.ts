
export type handler = (req : Request, res : Response) => Promise<void>;

export type APIConfig = {
    fileserverHits : number; 
}

//---The memory of this object is shared and accessed everywhere, editing this value in a file, then importing it in another file will not affect its value---//
export const config : APIConfig = {
    fileserverHits : 0,
}