
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";


export default async function Home() {
  const supabase = await createClient()
  const { data, error } = await supabase.auth.getUser()

  if (error || !data?.user) {
    redirect('/auth/login')
  } else {
    redirect('/home')
  }

  return <></>
}
