"use server";

import Thread from "@/lib/models/thread.model";
import User from "@/lib/models/user.model";
import { revalidatePath } from "next/cache";
import { connectToDB } from "../mongoose";

export async function fetchPosts(pageNumber = 1, pageSize = 20) {
  connectToDB();

  // Calculate skip and limit
  const skip = (pageNumber - 1) * pageSize;

  // Fetch posts with no parents (only comments/replies have parent posts)
  const postsQuery = Thread.find({
    parentId: {
      $in: [null, undefined],
    },
  })
    .sort({
      createdAt: "desc",
    })
    .skip(skip)
    .limit(pageSize)
    .populate({
      path: "author",
      model: User,
    })
    .populate({
      path: "children",
      populate: {
        path: "author",
        model: User,
        select: "_id name parentId image",
      },
    });

  const totalPosts = await Thread.countDocuments({
    parentId: {
      $in: [null, undefined],
    },
  });

  const posts = await postsQuery.exec();

  const isNext = totalPosts > skip + posts.length;

  return {
    posts,
    isNext,
  };
}

interface Params {
  text: string;
  author: string;
  communityId: string | null;
  path: string;
}
export async function createThread({
  text,
  author,
  communityId,
  path,
}: Params) {
  try {
    connectToDB();

    const createdThread = await Thread.create({
      text,
      author,
      community: communityId,
    });

    // Update user model
    await User.findByIdAndUpdate(author, {
      $push: { threads: createdThread._id },
    });

    revalidatePath(path);
  } catch (error: any) {
    throw new Error(`Error creating thread: ${error.message}`);
  }
}

export async function fetchThreadById(threadId: string) {
  connectToDB();

  try {
    // TODO: Populate Community
    const thread = await Thread.findById(threadId)
      .populate({
        path: "author",
        model: User,
        select: "_id id name image",
      })
      .populate({
        path: "children",
        populate: [
          {
            path: "author",
            model: User,
            select: "_id id name parentId image",
          },
          {
            path: "children",
            model: Thread,
            populate: {
              path: "author",
              model: User,
              select: "_id id name parentId image",
            },
          },
        ],
      })
      .exec();

    return thread;
  } catch (error: any) {
    throw new Error(`Error fetching thread: ${error.message}`);
  }
}

export async function addCommentToThread({
  threadId,
  commentText,
  userId,
  path,
}: {
  threadId: string;
  commentText: string;
  userId: string;
  path: string;
}) {
  connectToDB();

  try {
    // find original thread by id
    const originalThread = await Thread.findById(threadId);

    if (!originalThread) {
      throw new Error(`Thread not found`);
    }

    // create new thread with comment text
    const commentThread = new Thread({
      text: commentText,
      author: userId,
      parentId: threadId,
    });

    // save new thread
    const savedCommentThread = await commentThread.save();

    // update original thread to include new comment
    originalThread.children.push(savedCommentThread._id);

    // save original thread
    await originalThread.save();

    revalidatePath(path);
  } catch (error: any) {
    throw new Error(`Error adding comment to thread: ${error.message}`);
  }
}
