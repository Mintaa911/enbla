import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import { getUser } from "@/lib/supabase/queries/user";

import { MainSidebar } from "@/components/sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default async function Layout({ children }: { children: React.ReactNode }) {
    const supabase = await createClient()
    const user = await getUser(supabase)

    if( !user) {
        redirect('/auth/login')
    }

    return (
        <SidebarProvider>
            <div className="flex min-h-screen w-full">
                <MainSidebar />
                <main className="flex-1 flex items-center justify-center overflow-y-auto px-2">
                    {children}
                </main>
            </div>
        </SidebarProvider>
    )
}