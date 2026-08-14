import argon2 from "argon2";


export async function hashPassword(password : string) : Promise<string>
{
    const hashedPassowrd = await argon2.hash(password);
    return hashedPassowrd;

}

export async function checkPassowrdHash(password : string, hash : string) : Promise<boolean>
{
    //--- replacing the password parameter with the hash, since the .verify from argon2 accepts the first parameter as the hash.....
    return await argon2.verify(hash,password); 
}