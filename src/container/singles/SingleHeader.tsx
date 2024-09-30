import React, { FC, useEffect, useRef, useState } from "react";
import CategoryBadgeList from "@/components/CategoryBadgeList/CategoryBadgeList";
import SingleTitle from "./SingleTitle";
import PostMeta2 from "@/components/PostMeta2/PostMeta2";
import SingleMetaAction2 from "./SingleMetaAction2";
import { getPostDataFromPostFragment } from "@/utils/getPostDataFromPostFragment";
import { NC_POST_FULL_FRAGMENT } from "@/fragments";
import { FragmentType } from "@/__generated__";
import Link from "next/link";
import SingleContent from "./SingleContent";
import SingleType1 from "./single/single";
import SingleAuthor from "./SingleAuthor";
import LayoutHalf from "@/components/LayoutHalf";
import { formatDate } from "@/components/FormatedDate";

export interface SingleHeaderProps {
  hiddenDesc?: boolean;
  titleMainClass?: string;
  className?: string;
  post: FragmentType<typeof NC_POST_FULL_FRAGMENT>;
}

const SingleHeader: FC<SingleHeaderProps> = ({
  titleMainClass,
  hiddenDesc = false,
  className = "",
  post,
}) => {
  const {
    title,
    excerpt,
    content,
    ncPostMetaData,
    categories,
    featuredImage,
    commentCount,
    databaseId,
    author,
    date,
    uri,
    postData
  } = getPostDataFromPostFragment(post || {});

  const addIdsToH2Tags = (htmlContent: any) => {
    return htmlContent.replace(/<h2(.*?)>(.*?)<\/h2>/g, (match: any, p1: any, p2: any) => {
      const id = p2.trim().toLowerCase().replace(/[\s]+/g, '-').replace(/[^\w\-]+/g, '');
      return `<h2${p1} id="${id}">${p2}</h2>`;
    });
  };


  const addAnchorTagsToLi = (htmlContent: any) => {
    return htmlContent.replace(/<li>(.*?)<\/li>/gs, (match: any, p1: any) => {
      const cleanedContent = p1.replace(/<a\b[^>]*>(.*?)<\/a>/gi, '$1').trim();
      const slug = cleanedContent.toLowerCase().replace(/[\s]+/g, '-').replace(/[^\w\-]+/g, '');
      return `<li><a href="#${slug}">${cleanedContent}</a></li>`;
    });
  };

  const processHtmlContent = (htmlContent: any) => {
    let updatedContent = addIdsToH2Tags(htmlContent);
    updatedContent = addAnchorTagsToLi(updatedContent);
    return updatedContent;
  };

  const updatedContent = processHtmlContent(content);

  const featuredImageTyped: any = featuredImage;

  const paragraphs = updatedContent.split('</p>');
  const numParagraphs = paragraphs.length;
  const firstPart = paragraphs.slice(0, numParagraphs - 2).join('</p>') + '</p>';
  const lastPart = paragraphs[numParagraphs - 2];

  const dataProducts = postData?.products
  const headlineDesc = postData?.headlineDesc
  const layoutStyle = postData?.layoutStyle && postData?.layoutStyle[0]

  const mainAuthor = postData?.author?.nodes[0]

  const getCurrentDomain = () => {
    if (typeof window !== 'undefined') {
      return window.location.origin;
    }
    return '';
  };

  const domain = getCurrentDomain();
  const currentUrl = domain + "/" + uri

  const linkToF = () => {
    const urlToShare = encodeURIComponent(currentUrl);
    const shareLink = `https://www.facebook.com/sharer.php?u=${urlToShare}&quote=${title}`;
    window.open(shareLink, '_blank', 'width=600,height=600');
  };

  const linkToX = () => {
    const urlToShare = encodeURIComponent(currentUrl);
    const shareLink = `https://twitter.com/intent/tweet?url=${urlToShare}&text=${title}`;
    window.open(shareLink, '_blank', 'width=600,height=600');
  };

  const linkToW = () => {
    const urlToShare = encodeURIComponent(currentUrl);
    const shareLink = `https://api.whatsapp.com/send?text=${title}%20${urlToShare}`;
    window.open(shareLink, '_blank', 'width=600,height=600');
  };

  const linkToM = () => {
    const urlToShare = encodeURIComponent(currentUrl);
    const shareLink = `mailto:?subject=${title}&body=${urlToShare}`;
    window.open(shareLink, '_blank', 'width=600,height=600');
  };

  const handlePrint = () => {
    window.print();
  };

  const products = postData?.products;

  const convertProsToArray = (prosString: any) => prosString?.trim()?.split('\n')?.map((line: any) => line.trim());

  const categoriesTyped: any = categories;
  const footer_category = categoriesTyped?.nodes?.[0]?.posts?.nodes?.filter((p: any) => p.uri !== uri) ?? [];

  return (
    <>
      <div className={`single-header font-merriweather max-w-[740px] small-xl:max-w-full m-auto ${className}`}>
        <div className="container single-post">
          <div className="mb-10 flex gap-1 items-center">
            {categories?.nodes && categories.nodes.map((product: any, index: any) => (
              <React.Fragment key={index}>
                <Link href={product.uri ?? "/"}>
                  <span className="text-xs font-normal hover:underline">{product.name}</span>
                </Link>
                {categories?.nodes && index < categories.nodes.length && (
                  <span className="text-xs font-normal mt-1">{"/"}</span>
                )}
              </React.Fragment>
            ))} <span className="text-xs font-normal mt-1 text-[#999]">Best Whole-House Generators</span>
          </div>

          <div className="!max-w-[940px] m-auto mb-7">
            <SingleTitle mainClass={titleMainClass} title={title || ""} />
            <div className="mt-3 mb-5">
              <p className="headline_desc text-[20px] md:text-[24px] font-light leading-snug">{headlineDesc}</p>
            </div>
            <div className="header-author font-inter">
              {author && (
                <>
                  <p>By <span className="capitalize">{author?.name}</span> - Published and Updated</p>
                  <span className="text-xs">Updated {formatDate(date, true)}</span>
                </>
              )}
            </div>

            <div className="share-icon w-fit flex items-center gap-3 text-sm font-semibold my-4 mt-6 small-xl:hidden">
              <div className="share-icon-item cursor-pointer relative bg-black rounded-full p-2 transition-all hover:bg-[#2d4b8c]" onClick={linkToF}>
                <img className="cursor-pointer max-w-5 block" src="/images/posts/facebook-icon.png" alt="Facebook Icon" />
              </div>
              <div className="share-icon-item cursor-pointer bg-black rounded-full p-2 hover:bg-[#628ff2]" onClick={linkToX}>
                <img className="cursor-pointer max-w-5 block" src="/images/posts/x-icon.png" alt="X Icon" />
              </div>
              <div className="share-icon-item cursor-pointer bg-black rounded-full p-2 hover:bg-[#4cb179]" onClick={linkToW}>
                <img className="cursor-pointer max-w-5 block" src="/images/posts/whatsapp-icon.png" alt="Whatsapp Icon" />
              </div>
              <div className="share-icon-item cursor-pointer bg-black rounded-full p-2 hover:bg-[#ac0719]" onClick={linkToM}>
                <img className="cursor-pointer max-w-5 block" src="/images/posts/mail-icon.png" alt="Mail Icon" />
              </div>
              <div className="share-icon-item cursor-pointer bg-black rounded-full p-2 hover:bg-[#2dab66]" onClick={handlePrint}>
                <img className="cursor-pointer max-w-5 block" src="/images/posts/print-icon.png" alt="Print Icon" />
              </div>
            </div>

            {products?.length && (
              <p className="leading-5 text-xs max-w-[640px] mt-8 italic">When you shop through retailer links on our site, we may earn affiliate commissions. 100% of the fees we collect are used to support our nonprofit mission. </p>
            )}
          </div>

          <div className="grid grid-col-1 small-xl:grid-cols-11 gap-10">
            <div className="col-span-1 hidden small-xl:block mb-10">
              <div className="share-icon w-fit flex flex-col items-center gap-3 text-sm font-semibold my-4 mt-6 sticky h-fit top-20 mb-[90px]">
                <div className="share-icon-item cursor-pointer relative bg-black rounded-full p-2 transition-all hover:bg-[#2d4b8c]" onClick={linkToF}>
                  <img className="cursor-pointer max-w-5 block" src="/images/posts/facebook-icon.png" alt="Facebook Icon" />
                </div>
                <div className="share-icon-item cursor-pointer bg-black rounded-full p-2 hover:bg-[#628ff2]" onClick={linkToX}>
                  <img className="cursor-pointer max-w-5 block" src="/images/posts/x-icon.png" alt="X Icon" />
                </div>
                <div className="share-icon-item cursor-pointer bg-black rounded-full p-2 hover:bg-[#4cb179]" onClick={linkToW}>
                  <img className="cursor-pointer max-w-5 block" src="/images/posts/whatsapp-icon.png" alt="Whatsapp Icon" />
                </div>
                <div className="share-icon-item cursor-pointer bg-black rounded-full p-2 hover:bg-[#ac0719]" onClick={linkToM}>
                  <img className="cursor-pointer max-w-5 block" src="/images/posts/mail-icon.png" alt="Mail Icon" />
                </div>
                <div className="share-icon-item cursor-pointer bg-black rounded-full p-2 hover:bg-[#2dab66]" onClick={handlePrint}>
                  <img className="cursor-pointer max-w-5 block" src="/images/posts/print-icon.png" alt="Print Icon" />
                </div>
              </div>
            </div>

            <div className="col-span-8 md:col-span-10 grid grid-cols-1 md:grid-cols-7">
              <div className="col-span-1 md:col-span-5">
                <img className="single-featured-image mx-0 max-w-[740px]" width="100%" src={featuredImageTyped?.sourceUrl} alt={featuredImageTyped?.altText} />

                <div className="flex flex-col my-10">
                  <SingleContent post={{ ...post, content: updatedContent }} />
                </div>
              </div>
              <div className="col-span-1 md:col-span-2 fixed-right sticky top-20 h-fit hidden small-xl:block mb-[120px]">
                <img className="single-featured-image w-[240px] mx-auto" src="https://crdms.images.consumerreports.org/c_lfill,w_240,q_auto,f_auto,dpr_1/prod/products/cr/models/401907-small-home-generators-briggs-stratton-040375-10015108" alt={featuredImageTyped?.altText} />
              </div>
            </div>
          </div>

          {products && products.length > 0 && products.map((item: any, index: any) => (
            <div className="border border-[#999] mb-14" key={index}>
              <div className="p-4 grid grid-cols-1 md:grid-cols-6 gap-8">
                <div className="col-span-3 md:col-span-2">
                  <Link href={item?.actionButtons[0]?.actionLink ?? "/"} className="w-fit relative">
                    <div
                      className={`w-[70px] h-[70px] rounded-full flex md:hidden justify-center items-center mx-auto mt-3 absolute right-[65%] ${item?.score >= 85 ? "bg-[#11bc5d]" : "bg-[#c8e035]"}`}
                    >
                      <p className="font-merriweather text-white text-[28px] font-black mb-2">{item?.score}</p>
                    </div>
                    <img width={"400px"} className="m-auto mb-10 mt-4" src={item?.image?.node?.sourceUrl} alt={item?.image?.node?.altText} />
                  </Link>
                </div>

                <div className="col-span-3 mb-3">
                  <span className="text-xs font-semibold flex items-center gap-1.5 mb-3"><img width={14} src="/images/posts/check-circle-icon.png" alt="" /> RECOMMENDED</span>
                  <Link href={item?.actionButtons[0]?.actionLink ?? "/"} className="w-fit"><p className="font-merriweather text-[32px] font-bold my-3 leading-snug inline">{item?.name}</p></Link>
                  <p className="mt-2">{item?.price}</p>

                  {item?.prosCons?.pros > 0 && (
                    <div className="pros mt-3 font-inter">
                      <p className="font-semibold mb-2">Pros</p>
                      <ul className="flex flex-col gap-2">
                        {item?.prosCons?.pros && item?.prosCons?.pros.length > 0 && convertProsToArray(item?.prosCons?.pros).map((pros: any, index: any) => (
                          <li className="text-sm flex gap-2 uppercase items-start" key={index}>
                            <img width={15} className="mt-0.5" src="/images/posts/pros-icon.png" alt="" />
                            {pros}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {item?.prosCons?.cons?.length > 0 && (
                    <div className="cons mt-5 font-inter">
                      <p className="font-semibold mb-2">Cons</p>
                      <ul className="flex flex-col gap-2">
                        {item?.prosCons?.cons && item?.prosCons?.cons.length > 0 && convertProsToArray(item?.prosCons?.cons).map((cons: any, index: any) =>
                          cons && (
                            <li key={index} className="text-sm flex gap-2 uppercase items-start">
                              <img width={15} className="mt-0.5" src="/images/posts/cons-icon.png" alt="" />
                              {cons}
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  )}

                  <div className="mt-7">
                    {item?.actionButtons && item.actionButtons?.map((btn: any, index: any) => (
                      <Link href={btn?.actionLink ?? "/"} className="block mt-3 w-fit mx-auto md:mx-0" key={index}>
                        <button className="block m-auto bg-black text-white px-5 py-2 text-sm">{btn?.actionText}</button>
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="col-span-1 hidden md:block">
                  <span className="text-xs font-semibold text-center block">OVERALL SCORE</span>
                  <div
                    className={`small-xl:w-[100px] small-xl:h-[100px] w-[80px] h-[80px] rounded-full flex justify-center items-center mx-auto mt-3 ${item?.score >= 85 ? "bg-[#11bc5d]" : "bg-[#c8e035]"}`}
                  >
                    <p className="font-merriweather text-white text-[28px] small-xl:text-[40px] font-black mb-2">{item?.score}</p>
                  </div>
                </div>
              </div>

              <div className="bg-[#f0f0f0] bg-opacity-[0.6] p-4 py-7 md:p-7">
                <div className="flex flex-col gap-5 font-merriweather" dangerouslySetInnerHTML={{ __html: item.description }}></div>
              </div>
            </div>
          ))}

          <div
            className="conclusion max-w-[940px] mx-auto flex flex-col gap-5"
            dangerouslySetInnerHTML={{ __html: postData?.conclusion || '' }}
          ></div>

          <hr className="max-w-[940px] mx-auto h-1 bg-[#f0f0f0] mt-10" />

          <div className="max-w-[940px] mx-auto my-20 border-b border-[#cdcdcd] pb-10">
            <SingleAuthor author={author} />
          </div>

          <div className="post-related max-w-[940px] mx-auto">
            <h3 className="main-title text-[30px] md:text-[36px]">Trending in {categoriesTyped?.nodes?.[0]?.name ?? ""}</h3>

            <div className="mt-20 mb-28">
              <LayoutHalf data={footer_category.slice(0, 4)} readmore={false} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleHeader;
