"use client";

import { PostCard } from "@/components/post-card";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Plus } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import React from "react";

const posts = [
  {
    id: 1,
    user: {
      name: "Sarah Johnson",
      username: "@sarahj",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face"
    },
    content: "Just finished an amazing workout session! 💪 Feeling stronger every day. Who else is crushing their fitness goals?",
    timestamp: "2h",
    likes: 234,
    comments: 45,
    shares: 12,
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=300&fit=crop"
  },
  {
    id: 2,
    user: {
      name: "Mike Chen",
      username: "@mikec",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face"
    },
    content: "Beautiful sunset from my rooftop tonight 🌅 Sometimes you need to pause and appreciate the simple moments.",
    timestamp: "4h",
    likes: 567,
    comments: 89,
    shares: 23,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=300&fit=crop"
  },
  {
    id: 3,
    user: {
      name: "Emma Wilson",
      username: "@emmaw",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face"
    },
    content: "New recipe alert! 🍝 Made homemade pasta with truffle oil and it's absolutely incredible. Recipe in comments!",
    timestamp: "6h",
    likes: 892,
    comments: 156,
    shares: 67,
    image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=500&h=300&fit=crop"
  },
  {
    id: 4,
    user: {
      name: "David Rodriguez",
      username: "@davidr",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
    },
    content: "Coding late into the night again 👨‍💻 Working on something really exciting that I can't wait to share with you all!",
    timestamp: "8h",
    likes: 445,
    comments: 78,
    shares: 34
  }
];

const HomePage = () => {
  const isMobile = useIsMobile();
  return (
    <div className="min-h-screen flex flex-col items-center  py-8 relative">
      {/* Create Post Action (top for desktop, floating for mobile) */}
      <Sheet>
        {isMobile ? (
          <SheetTrigger asChild>
            <Button
              variant="default"
              size="icon"
              className="fixed bottom-6 left-6 z-50 shadow-lg bg-primary text-primary-foreground rounded-full w-14 h-14 flex items-center justify-center md:hidden"
              aria-label="Create Post"
            >
              <Plus className="w-7 h-7" />
            </Button>
          </SheetTrigger>
        ) : (
          <div className="w-full max-w-2xl flex justify-end mb-4">
            <SheetTrigger asChild>
              <Button variant="default" className="gap-2">
                <Plus className="w-5 h-5" /> Create Post
              </Button>
            </SheetTrigger>
          </div>
        )}
        <SheetContent side={isMobile ? "bottom" : "right"} className="p-0 max-w-full w-full sm:w-[400px]">
          <SheetHeader>
            <SheetTitle>Create a new post</SheetTitle>
          </SheetHeader>
          <form className="flex flex-col gap-4 p-4">
            <textarea
              className="w-full rounded-md border border-gray-700 bg-gray-900 text-white p-2 resize-none min-h-[100px] focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="What's on your mind?"
            />
            <Button type="submit" variant="default" className="self-end">Post</Button>
          </form>
        </SheetContent>
      </Sheet>
      <div className="w-full max-w-2xl space-y-4">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
