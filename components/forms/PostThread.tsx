"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import type { ThreadSchemaType } from "@/schemas";
import { ThreadSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter } from "next/navigation";
import { FC } from "react";
import { useForm } from "react-hook-form";

const PostThread: FC<{ userID: string }> = ({ userID }) => {
  const pathname = usePathname();
  const router = useRouter();

  const form = useForm<ThreadSchemaType>({
    resolver: zodResolver(ThreadSchema),
    defaultValues: {
      thread: "",
      accountId: userID,
    },
  });

  async function onSubmit(values: ThreadSchemaType) {
    const { createThread } = await import("@/lib/actions/thread.actions");
    await createThread({
      text: values.thread,
      author: userID,
      communityId: null,
      path: pathname,
    });

    router.push(`/`);
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mt-10 flex flex-col justify-start gap-10"
        >
          <FormField
            control={form.control}
            name="thread"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-3 w-full">
                <FormLabel className="text-base-semibold text-light-2">
                  Content
                </FormLabel>

                <FormControl className="no-focus border border-dark-4 bg-dark-3 text-light-1">
                  <Textarea rows={15} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="bg-primary-500">
            Post Thread
          </Button>
        </form>
      </Form>
    </>
  );
};

export default PostThread;
