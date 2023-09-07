import UserCard from "@/components/cards/UserCard";
import ProfileHeader from "@/components/shared/ProfileHeader";
import ThreadsTab from "@/components/shared/ThreadsTab";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { communityTabs } from "@/constants";
import { fetchCommunityDetails } from "@/lib/actions/community.actions";
import { currentUser } from "@clerk/nextjs";
import Image from "next/image";
import { FC } from "react";

const page: FC<{ params: { id: string } }> = async ({ params: { id } }) => {
  const user = await currentUser();
  if (!user) {
    return (
      <h1 className="head-text">You must be logged in to create a thread</h1>
    );
  }

  const communityDetails = await fetchCommunityDetails(id);

  return (
    <>
      <section>
        <ProfileHeader
          accountId={communityDetails.id}
          authUserId={user.id}
          name={communityDetails.name}
          username={communityDetails.username}
          image={communityDetails.image}
          bio={communityDetails.bio}
          type="community"
        />

        <div className="mt-9">
          <Tabs defaultValue="threads" className="w-full">
            <TabsList className="tab">
              {communityTabs.map(({ icon, label, value }) => (
                <TabsTrigger key={label} value={value} className="tab">
                  <Image
                    src={icon}
                    alt={label}
                    width={25}
                    height={25}
                    className="object-contain"
                  />
                  <p className="max-sm:hidden">{label}</p>

                  {label.toLowerCase() === "threads" && (
                    <p className="ml-1 rounded-sm bg-light-4 px-2 py-1 text-tiny-medium text-light-2">
                      {communityDetails?.threads?.length}
                    </p>
                  )}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value={`threads`} className="w-full text-light-1">
              <ThreadsTab
                currentUserId={user.id}
                accountId={communityDetails.id}
                accountType="community"
              />
            </TabsContent>

            <TabsContent value={`members`} className="w-full text-light-1">
              <section className="mt-9 flex flex-col gap-10">
                {communityDetails?.members?.map((member: any) => (
                  <UserCard
                    key={member.id}
                    id={member.id}
                    name={member.name}
                    username={member.username}
                    image={member.image}
                    personType="user"
                  />
                ))}
              </section>
            </TabsContent>

            <TabsContent value={`requests`} className="w-full text-light-1">
              <ThreadsTab
                currentUserId={user.id}
                accountId={communityDetails.id}
                accountType="community"
              />
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </>
  );
};

export default page;
