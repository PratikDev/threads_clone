import { z } from "zod";

const ThreadStringSchema = z.string().nonempty().min(3, {
  message: "Thread must be at least 3 characters long",
});

const UserSchema = z.object({
  profile_photo: z.string().url().nonempty(),
  name: z
    .string()
    .min(3, {
      message: "Name must be at least 3 characters long",
    })
    .max(30, {
      message: "Name must be at most 30 characters long",
    }),
  username: z
    .string()
    .min(3, {
      message: "Username must be at least 3 characters long",
    })
    .max(30, {
      message: "Username must be at most 30 characters long",
    }),
  bio: z
    .string()
    .min(5, {
      message: "Bio must be at least 5 characters long",
    })
    .max(1000, {
      message: "Bio must be at most 1000 characters long",
    }),
});
type UserSchemaType = z.infer<typeof UserSchema>;

const ThreadSchema = z.object({
  thread: ThreadStringSchema,
  accountId: z.string().nonempty(),
});
type ThreadSchemaType = z.infer<typeof ThreadSchema>;

const CommentSchema = z.object({
  thread: ThreadStringSchema,
});
type CommentSchemaType = z.infer<typeof CommentSchema>;

export { CommentSchema, ThreadSchema, UserSchema };
export type { CommentSchemaType, ThreadSchemaType, UserSchemaType };
