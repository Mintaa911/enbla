import { TypedSupabaseClient } from "../types";


export async function getUser(client: TypedSupabaseClient) {
    try {
        const { data, error } = await client.auth.getUser();
        if (error) {
            throw error;
        }
        return data.user;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export function getUserById(client: TypedSupabaseClient, id: string) {
    return client.from("users").select("*").eq("user_id", id).single();
}