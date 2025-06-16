import { Metadata } from 'next'
import { prefetchQuery } from '@supabase-cache-helpers/postgrest-react-query'
import { QueryClient, HydrationBoundary, dehydrate } from '@tanstack/react-query'

import { createClient } from '@/lib/supabase/server';
import { getEvents } from '@/lib/supabase/queries/events';


export const metadata: Metadata = {
    title: 'Events | Enbla',
    description: 'Discover and join exciting events',
}

export default async function EventLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const supabase = await createClient()
    const queryClient = new QueryClient();
    await prefetchQuery(queryClient, getEvents(supabase))

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <div className="w-full">
                {children}
            </div>
        </HydrationBoundary>
    )
}
