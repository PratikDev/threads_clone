import { formatDateString } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

interface Props {
  id: string;
  currentUserId: string;
  parentId: string | null;
  content: string;
  author: {
    name: string;
    image: string;
    id: string;
  };
  community: {
    id: string;
    name: string;
    image: string;
  } | null;
  createdAt: string;
  comments: {
    author: {
      image: string;
    };
  }[];
  isComment?: boolean;
}
const ThreadCard: FC<Props> = ({
  id,
  currentUserId,
  parentId,
  content,
  author,
  community,
  createdAt,
  comments,
  isComment,
}) => {
  return (
    <>
      <article
        className={`w-full flex flex-col rounded-xl ${
          isComment ? `px-0 xs:px-7` : `bg-dark-2 p-7`
        }`}
      >
        <div className="flex item-start justify-between">
          <div className="flex w-full flex-1 flex-row gap-4">
            <div className="flex flex-col items-center">
              <Link
                href={`/profile/${author.id}`}
                className="relative h-11 w-11"
              >
                <Image
                  src={author.image}
                  alt="profile image"
                  fill
                  className="cursor-pointer rounded-full object-cover"
                />
              </Link>

              <div className="thread-card_bar" />
            </div>

            <div className="flex w-full flex-col">
              <Link href={`/profile/${author.id}`} className="w-fit">
                <h4 className="cursor-pointer text-base-semibold text-light-1">
                  {author.name}
                </h4>
              </Link>

              <p className="mt-2 text-small-regular text-light-2">{content}</p>

              <div
                className={`mt-5 flex-col flex gap-3 ${isComment && `mb-10`}`}
              >
                <div className="flex gap-3.5">
                  <Image
                    src={`/assets/heart-gray.svg`}
                    alt="heart"
                    width={25}
                    height={25}
                    className="cursor-pointer object-contain"
                  />

                  <Link href={`/thread/${id}`}>
                    <Image
                      src={`/assets/reply.svg`}
                      alt="heart"
                      width={25}
                      height={25}
                      className="cursor-pointer object-contain"
                    />
                  </Link>

                  <Image
                    src={`/assets/repost.svg`}
                    alt="heart"
                    width={25}
                    height={25}
                    className="cursor-pointer object-contain"
                  />

                  <Image
                    src={`/assets/share.svg`}
                    alt="heart"
                    width={25}
                    height={25}
                    className="cursor-pointer object-contain"
                  />
                </div>

                {isComment && comments.length > 0 && (
                  <Link href={`/thread/${id}`}>
                    <p className="mt-1 text-subtle-medium text-gray-1">
                      {comments.length} replies
                    </p>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* TODO: Delete Thread */}
        {/* TODO: Show comment logos */}
        {!isComment && community && (
          <>
            <Link
              href={`/communities/${community.id}`}
              className="mt-5 flex items-center"
            >
              <p className="text-subtle-medium text-gray-1">
                {formatDateString(createdAt)} - {community.name} Community
              </p>

              <Image
                src={community.image}
                alt="community image"
                width={15}
                height={15}
                className="ml-1 rounded-full object-cover"
              />
            </Link>
          </>
        )}
      </article>
    </>
  );
};

export default ThreadCard;
