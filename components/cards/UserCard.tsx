import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import { Button } from "../ui/button";

interface UserCardProps {
  id: string;
  username: string;
  name: string;
  image: string;
  personType: string;
}
const UserCard: FC<UserCardProps> = ({
  id,
  username,
  name,
  image,
  personType,
}) => {
  return (
    <>
      <article className="user-card">
        <div className="user-card_avatar">
          <Image
            src={image}
            alt={username}
            width={50}
            height={50}
            className="rounded-full object-cover w-12 h-12"
          />

          <div className="flex-1 text-ellipsis">
            <h4 className="text-base-semibold text-light-1">{name}</h4>
            <p className="text-small-medium text-gray-1">@{username}</p>
          </div>
        </div>

        <Button className="user-card_btn" asChild>
          <Link href={`/profile/${id}`}>View</Link>
        </Button>
      </article>
    </>
  );
};

export default UserCard;
