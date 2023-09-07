import CommunityCard from "@/components/cards/CommunityCard";
import { fetchCommunities } from "@/lib/actions/community.actions";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
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

  // Fetch communities
  const result = await fetchCommunities({
    pageNumber: 1,
    pageSize: 10,
  });

  return (
    <>
      <section>
        <h1 className="head-text mb-10">Search Page</h1>

        {/* TODO: Add Search Box */}

        <div className="mt-14 flex flex-col gap-9">
          {!result.communities.length ? (
            <p className="no-result">No communities Found</p>
          ) : (
            <>
              {result.communities.map((community) => (
                <CommunityCard
                  key={community.id}
                  id={community.id}
                  username={community.username}
                  name={community.name}
                  image={community.image}
                  bio={community.bio}
                  members={community.members}
                />
              ))}
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default page;
