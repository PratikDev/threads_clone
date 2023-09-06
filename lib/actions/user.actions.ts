"use server";

import Thread from "@/lib/models/thread.model";
import User from "@/lib/models/user.model";
import { connectToDB } from "@/lib/mongoose";
import { FilterQuery, SortOrder } from "mongoose";
import { revalidatePath } from "next/cache";

interface UserParams {
  userID: string;
  username: string;
  name: string;
  bio: string;
  image: string;
  path: string;
}
export async function updateUser({
  userID,
  username,
  name,
  bio,
  image,
  path,
}: UserParams): Promise<void> {
  connectToDB();

  try {
    await User.findOneAndUpdate(
      { id: userID },
      {
        username: username.toLowerCase(),
        name,
        bio,
        image,
        onboarded: true,
      },
      { upsert: true }
    );

    if (path === "/profile/edit") {
      revalidatePath(path);
    }
  } catch (error: any) {
    throw new Error(`Failed to create/update user: ${error.message}`);
  }
}

export async function fetchUser(userID: string) {
  try {
    connectToDB();

    return await User.findOne({ id: userID });
    // .populate({
    //   path: "communities",
    //   model: Community
    // })
  } catch (error: any) {
    throw new Error(`Failed to fetch user: ${error.message}`);
  }
}

export async function fetchUserPosts(userID: string) {
  try {
    connectToDB();

    // TODO: Populate community

    const threads = await User.findOne({ id: userID }).populate({
      path: "threads",
      model: Thread,
      populate: {
        path: "children",
        model: Thread,
        populate: {
          path: "author",
          model: User,
          select: "name image id",
        },
      },
    });

    return threads;
  } catch (error: any) {
    throw new Error(`Failed to fetch user posts: ${error.message}`);
  }
}

interface FetchUserThreadsParams {
  userId: string;
  pageNumber?: number;
  pageSize?: number;
  searchString?: string;
  sortBy?: SortOrder;
}
export async function fetchUsers({
  pageNumber = 1,
  pageSize = 10,
  searchString = "",
  userId,
  sortBy = "desc",
}: FetchUserThreadsParams) {
  try {
    connectToDB();

    const skip = (pageNumber - 1) * pageSize;

    const regex = new RegExp(searchString, "i");

    const query: FilterQuery<typeof User> = {
      id: { $ne: userId },
    };

    if (searchString?.trim()) {
      query.$or = [
        { name: { $regex: regex } },
        { username: { $regex: regex } },
      ];
    }

    const sortOptions = { createAt: sortBy };

    const usersQuery = User.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(pageSize);

    const totalUsersCount = await User.countDocuments(query);

    const users = await usersQuery.exec();

    const isNext = totalUsersCount > skip + users.length;

    return { users, isNext };
  } catch (error: any) {
    throw new Error(`Failed to fetch users: ${error.message}`);
  }
}

export async function getActivity(userId: string) {
  try {
    connectToDB();

    const userThreads = await Thread.find({ author: userId });

    // collect all child threads
    const childThreadsIDs = userThreads.reduce((acc, thread) => {
      return [...acc, ...thread.children];
    }, []);

    const replies = await Thread.find({
      _id: { $in: childThreadsIDs },
      author: { $ne: userId },
    }).populate({
      path: "author",
      model: User,
      select: "name image id",
    });

    return replies;
  } catch (error: any) {
    throw new Error(`Failed to fetch activity: ${error.message}`);
  }
}
