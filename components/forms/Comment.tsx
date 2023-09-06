"use client";

import type { CommentSchemaType } from "@/schemas";
import { CommentSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";

interface Props {
  threadId: string;
  currentUserImage: string;
  currentUserId: string;
}
const Comment: FC<Props> = ({ threadId, currentUserImage, currentUserId }) => {
  const pathname = usePathname();

  const form = useForm<CommentSchemaType>({
    resolver: zodResolver(CommentSchema),
    defaultValues: {
      thread: "",
    },
  });

  async function onSubmit(values: CommentSchemaType) {
    const { addCommentToThread } = await import("@/lib/actions/thread.actions");
    await addCommentToThread({
      commentText: values.thread,
      threadId,
      userId: JSON.parse(currentUserId),
      path: pathname,
    });

    form.reset();
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="comment-form">
          <FormField
            control={form.control}
            name="thread"
            render={({ field }) => (
              <FormItem className="flex items-center gap-3 w-full">
                <FormLabel className="relative w-12 h-12">
                  <Image
                    src={currentUserImage}
                    alt="Profile Image"
                    fill
                    className="rounded-full object-cover"
                  />
                </FormLabel>

                <FormControl className="border-none bg-transparent">
                  <Input
                    type="text"
                    placeholder="Type what you think..."
                    className="no-focus text-light-1 outline-none"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <Button type="submit" className="comment-form_btn">
            Reply
          </Button>
        </form>
      </Form>
    </>
  );
};

export default Comment;
