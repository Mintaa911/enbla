import { Event } from "../types";
import { TypedSupabaseClient } from "../types";

export function getEvents(client: TypedSupabaseClient) {
    return client.from("events").select("*");
}

export function getEvent(client: TypedSupabaseClient, eventId: string) {
    return client.from("events").select("*").eq("event_id", eventId);
}

export function createEvent(client: TypedSupabaseClient, event: Event) {
    return client.from("events").insert(event).select().single();
}

export function updateEvent(client: TypedSupabaseClient, eventId: string, event: Event) {
    return client.from("events").update(event).eq("event_id", eventId).select().single();
}