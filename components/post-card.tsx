import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import React from "react";

interface PostCardProps {
  post: {
    id: number;
    user: {
      name: string;
      username: string;
      avatar: string;
    };
    content: string;
    timestamp: string;
    likes: number;
    comments: number;
    shares: number;
    image?: string;
  };
}

export const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <Card className="bg-gray-900 border-gray-800 text-white overflow-hidden">
      <CardContent className="p-4">
        <div className="flex items-start gap-3 mb-2">
          <Image
            src={post.user.avatar}
            alt={post.user.name}
            width={40}
            height={40}
            className="rounded-full object-cover"
          />
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-sm">{post.user.name}</span>
              <span className="text-xs text-gray-400">{post.user.username}</span>
              <span className="text-xs text-gray-500 ml-auto">{post.timestamp}</span>
            </div>
            <div className="text-sm mt-1 mb-2 whitespace-pre-line">{post.content}</div>
            {post.image && (
              <div className="relative w-full h-48 mt-2 rounded-lg overflow-hidden">
                <Image
                  src={post.image}
                  alt="Post image"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 500px"
                />
              </div>
            )}
            <div className="flex gap-6 mt-3 text-xs text-gray-400">
              <span>👍 {post.likes}</span>
              <span>💬 {post.comments}</span>
              <span>↗️ {post.shares}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}; 