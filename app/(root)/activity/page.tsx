import { fetchUser, getActivity } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { FC } from "react";

const page: FC = async () => {
  const user = await currentUser();
  if (!user) {
    return (
      <h1 className="head-text">You must be logged in to create a thread</h1>
    );
  }

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  // get activities
  const activities = await getActivity(userInfo._id);

  return (
    <>
      <section>
        <h1 className="head-text mb-10">Activity Page</h1>

        <section className="mt-10 flex flex-col gap-5">
          {activities.length > 0 ? (
            <>
              {activities.map((activity) => (
                <Link key={activity._id} href={`/thread/${activity.parentId}`}>
                  <article className="activity-card">
                    <Image
                      src={activity.author.image}
                      alt="Profile Image"
                      width={20}
                      height={20}
                      className="rounded-full object-cover w-5 h-5"
                    />
                    <p className="text-small-regular text-light-1">
                      <span className="mr-1 text-primary-500">
                        {activity.author.name}
                      </span>
                      replied to your thread
                    </p>
                  </article>
                </Link>
              ))}
            </>
          ) : (
            <p className="text-base-regular">No Activity yet</p>
          )}
        </section>
      </section>
    </>
  );
};

export default page;
