"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { createClient } from "@/lib/supabase/client";
import { useInsertMutation } from "@supabase-cache-helpers/postgrest-react-query";
import { toast } from "sonner";
import React from "react";
import { useAuth } from "@/hooks/use-auth";

const eventFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  date: z.string().min(1, "Date is required"),
  time: z.string().min(1, "Time is required"),
  location: z.string().min(1, "Location is required"),
  guestLimit: z.string().min(1, "Guest limit is required"),
  image: z.string().url("Must be a valid URL").optional().or(z.literal("")),
});

type EventFormValues = z.infer<typeof eventFormSchema>;

interface CreateEventModalProps {
  children?: React.ReactNode;
}

export function CreateEventModal({ children }: CreateEventModalProps) {
  const isMobile = useIsMobile();
  const [open, setOpen] = React.useState(false);
  const form = useForm<EventFormValues>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: {
      title: "",
      description: "",
      date: "",
      time: "",
      location: "",
      guestLimit: "",
      image: "",
    },
  });

  const supabase = createClient()
  const { user } = useAuth()
  const { mutateAsync: createEvent } = useInsertMutation(
    supabase.from("events"),
    ['event_id'],
    'event_id',
    {
      onSuccess: () => {
        toast.success("Event created successfully")
        setOpen(false)
        form.reset()
      },
      onError: () => {
        toast.error("Failed to create event")
      }
    }
  )

  async function onSubmit(data: EventFormValues) {
    if (!user) {
      toast.error("Please login to create an event");
      return;
    }

    const eventTimestamp = new Date(`${data.date}T${data.time}`).toISOString();

    createEvent([
      {
        title: data.title,
        description: data.description,
        event_time: eventTimestamp,
        event_place: data.location,
        guest_limit: parseInt(data.guestLimit),
        event_creator: user.id,
      }
    ])
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {children || (
        <DialogTrigger asChild>
          {isMobile ? (
            <Button
              variant="default"
              size="icon"
              className="fixed bottom-20 right-6 z-50 shadow-lg bg-primary text-primary-foreground rounded-full w-14 h-14 flex items-center justify-center md:hidden"
              aria-label="Create Event"
            >
              <Plus className="w-7 h-7" />
            </Button>
          ) : (
            <Button variant="default" className="gap-2">
              <Plus className="w-5 h-5" /> Create Event
            </Button>
          )}
        </DialogTrigger>
      )}
      <DialogContent className="max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create a new event</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 py-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Event Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter event title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="What's your event about?"
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Time</FormLabel>
                    <FormControl>
                      <Input type="time" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter event location" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="guestLimit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Guest Limit</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter maximum number of guests"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Event Image URL</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter image URL" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="mt-2">Create Event</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
} 