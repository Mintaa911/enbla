"use client"

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import React from "react";
import { Event } from "@/lib/supabase/types";
import { MapPin } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { getUserById } from "@/lib/supabase/queries/user";
import { useQuery, useUpsertMutation } from "@supabase-cache-helpers/postgrest-react-query";
import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/hooks/use-auth";

export const EventCard: React.FC<Event> = (event) => {
  const supabase = createClient()
  const queryClient = useQueryClient()
  const formattedTime = new Date(event.event_time || "").toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  const { data: creator } = useQuery(getUserById(supabase, event.event_creator))
  const { user: currentUser } = useAuth()

  const { mutateAsync: updateEvent } = useUpsertMutation(
    supabase.from("events"),
    ["event_id"],
    "event_id",
    {
      onSuccess: () => {
        toast.success("You have joined the event");
        queryClient.invalidateQueries({ queryKey: ['events'] });
      },
      onError: () => {
        toast.error("Failed to join the event");
      }
    }
  )

  const handleJoinEvent = async () => {
    if (calcSeatsLeft() <= 0) {
      toast.error("No seats left");
      return;
    }

    await updateEvent([{
      event_id: event.event_id,
      guests: [...(event.guests || []), currentUser?.id]
    }])
  }

  const handleLeaveEvent = async () => {
    await updateEvent([{
      event_id: event.event_id,
      guests: event.guests?.filter(guest => guest !== currentUser?.id)
    }])
  }

  const calcSeatsLeft = () => {
    if (!event.guest_limit) return 0
    return event.guest_limit - (event.guests?.length || 0)
  }

  return (
    <Card className="bg-gray-900 border-gray-800 text-white">
      <CardContent className="flex flex-col p-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-bold truncate" title={event.title || ""}>{event.title || ""}</h3>
          <span className="text-xs text-pink-400 font-semibold">{formattedTime}</span>
        </div>
        <div className="flex items-center gap-2 mb-3">
          <span className="text-sm text-gray-400">Created by {creator?.full_name || 'Unknown'}</span>
        </div>
        <div className="text-sm mb-3 line-clamp-2">{event.description}</div>
        <div className="flex items-center text-sm text-gray-400 mb-3">
          <MapPin className="w-4 h-4 mr-2" />
          <span>{event.event_place}</span>
        </div>
        <div className="flex justify-between items-center">
          <div className="text-xs text-gray-400">
            {calcSeatsLeft()} seats left
          </div>
          {currentUser?.id !== event.event_creator && (
            currentUser && event.guests?.includes(currentUser?.id) ? (
              <Button
                variant="secondary"
                className="bg-pink-500 hover:bg-pink-600 text-white"
                onClick={handleLeaveEvent}
              >
                Leave Event
              </Button>
            ) : (
              <Button
                variant="secondary"
                className="bg-pink-500 hover:bg-pink-600 text-white"
                onClick={handleJoinEvent}
              >
                Join Event
              </Button>
            )
          )}

        </div>
      </CardContent>
    </Card >
  );
}; 