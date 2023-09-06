import UserCard from "@/components/cards/UserCard";
import { fetchUser, fetchUsers } from "@/lib/actions/user.actions";
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

  // Fetch users
  const result = await fetchUsers({
    userId: user.id,
    pageNumber: 1,
    pageSize: 10,
  });

  return (
    <>
      <section>
        <h1 className="head-text mb-10">Search Page</h1>

        {/* TODO: Add Search Box */}

        <div className="mt-14 flex flex-col gap-9">
          {!result.users.length ? (
            <p className="no-result">No Users Found</p>
          ) : (
            <>
              {result.users.map((user) => (
                <UserCard
                  key={user.id}
                  id={user.id}
                  username={user.username}
                  name={user.name}
                  image={user.image}
                  personType="user"
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
