import ProfileHeader from "@/components/shared/ProfileHeader";
import ThreadsTab from "@/components/shared/ThreadsTab";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { profileTabs } from "@/constants";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import Image from "next/image";
import { redirect } from "next/navigation";
import { FC } from "react";

const page: FC<{ params: { id: string } }> = async ({ params: { id } }) => {
  const user = await currentUser();
  if (!user) {
    return (
      <h1 className="head-text">You must be logged in to create a thread</h1>
    );
  }

  const userInfo = await fetchUser(id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  return (
    <>
      <section>
        <ProfileHeader
          accountId={userInfo.id}
          authUserId={user.id}
          name={userInfo.name}
          username={userInfo.username}
          image={userInfo.image}
          bio={userInfo.bio}
        />

        <div className="mt-9">
          <Tabs defaultValue="threads" className="w-full">
            <TabsList className="tab">
              {profileTabs.map(({ icon, label, value }) => (
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
                      {userInfo?.threads?.length}
                    </p>
                  )}
                </TabsTrigger>
              ))}
            </TabsList>

            {profileTabs.map(({ label, value }) => (
              <TabsContent
                key={`content-${label}`}
                value={value}
                className="w-full text-light-1"
              >
                <ThreadsTab
                  currentUserId={user.id}
                  accountId={userInfo.id}
                  accountType="user"
                />
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>
    </>
  );
};

export default page;
