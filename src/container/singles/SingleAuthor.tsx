import { FragmentType } from "@/__generated__";
import { NcmazFcUserFullFieldsFragment } from "@/__generated__/graphql";
import Avatar from "@/components/Avatar/Avatar";
import { NC_USER_FULL_FIELDS_FRAGMENT } from "@/fragments";
import { getImageDataFromImageFragment } from "@/utils/getImageDataFromImageFragment";
import getTrans from "@/utils/getTrans";
import { getUserDataFromUserCardFragment } from "@/utils/getUserDataFromUserCardFragment";
import Link from "next/link";
import React, { FC } from "react";

export interface SingleAuthorProps {
  author:
  | FragmentType<typeof NC_USER_FULL_FIELDS_FRAGMENT>
  | NcmazFcUserFullFieldsFragment;
}

const SingleAuthor: FC<SingleAuthorProps> = ({ author: authorProp }) => {
  const author = getUserDataFromUserCardFragment(
    authorProp as FragmentType<typeof NC_USER_FULL_FIELDS_FRAGMENT>
  );

  const T = getTrans();
  return (
    <div className="nc-SingleAuthor">
      <div className="flex items-center md:items-start gap-1 md:gap-5">
        <Link href={author?.uri || ""}>
          <Avatar
            imgUrl={
              getImageDataFromImageFragment(
                author?.ncUserMeta?.featuredImage?.node
              ).sourceUrl
            }
            userName={author?.name || "T"}
            sizeClass="h-12 w-12 text-lg sm:text-xl md:h-24 md:w-24"
            radius="rounded-full"
          />
        </Link>
        <div className="flex flex-col ms-3 max-w-lg sm:ms-5">
          <h2 className="text-base sm:text-lg font-semibold capitalize font-inter">
            <Link href={author?.uri || ""}>{author?.name}</Link>
          </h2>
          <span className="hidden md:block mt-1 text-[15px]">
            {author?.description || ""}
          </span>
        </div>
      </div>

      <div className="mt-4">
        <span className="block md:hidden text-[15px]">
          {author?.description || ""}
        </span>
      </div>
    </div>
  );
};

export default SingleAuthor;
