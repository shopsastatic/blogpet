import React, { FC } from "react";
import NcImage from "@/components/NcImage/NcImage";
import { getPostDataFromPostFragment } from "@/utils/getPostDataFromPostFragment";
import SingleHeader from "../SingleHeader";
import { FragmentType } from "@/__generated__";
import { NC_POST_FULL_FRAGMENT } from "@/fragments";

export interface SingleType1Props {
  post: FragmentType<typeof NC_POST_FULL_FRAGMENT>;
  showRightSidebar?: boolean;
}

const SingleType1: FC<SingleType1Props> = ({ post, showRightSidebar }) => {
  //
  const {
    title,
    content,
    date,
    author,
    databaseId,
    excerpt,
    featuredImage,
    ncPostMetaData,
  } = getPostDataFromPostFragment(post || {});

  //
  const hasFeaturedImage = !!featuredImage?.sourceUrl;

  const imgWidth = featuredImage?.mediaDetails?.width || 1000;
  const imgHeight = featuredImage?.mediaDetails?.height || 750;
  return (
    <>
      <div className={`nc-PageSingle pt-8 lg:pt-16`}>
        <header className="rounded-xl">
          <div
            className={
              !hasFeaturedImage && showRightSidebar
                ? ""
                : `mx-auto`
            }
          >
            <SingleHeader post={post} titleMainClass="text-[30px] md:text-[50px]"></SingleHeader>
          </div>
        </header>

      </div>
    </>
  );
};

export default SingleType1;
