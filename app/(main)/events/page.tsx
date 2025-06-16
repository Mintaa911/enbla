"use client";

import { EventCard } from '@/components/event-card'
import { CreateEventModal } from '@/components/create-event-modal'
import React from "react";
import { useQuery } from '@supabase-cache-helpers/postgrest-react-query';
import { getEvents } from '@/lib/supabase/queries/events';
import { createClient } from '@/lib/supabase/client';


export default function EventsPage() {
  const supabase = createClient()
  const { data: events } = useQuery(getEvents(supabase))

  return (
    <div className="min-h-screen flex flex-col items-center py-8 relative">
      <div className="w-full max-w-2xl flex justify-end mb-4">
        <CreateEventModal />
      </div>

      <div className="w-full max-w-2xl space-y-4">
        {events?.map((event) => (
          <EventCard key={event.event_id} {...event} />
        ))}
      </div>
    </div>
  )
}
