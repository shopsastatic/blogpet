import { gql } from "@/__generated__";
import EntryHeader from "../components/entry-header";
import {
  GetPageQuery,
  NcgeneralSettingsFieldsFragmentFragment,
} from "../__generated__/graphql";
import { FaustTemplate, flatListToHierarchical } from "@faustwp/core";
import { FOOTER_LOCATION, PRIMARY_LOCATION } from "@/contains/menu";
import PageLayout from "@/container/PageLayout";
import MyWordPressBlockViewer from "@/components/MyWordPressBlockViewer";
import Link from "next/link";
import Button from "@/components/Button/Button";
import { formatDate } from "@/components/FormatedDate";
import { useEffect, useRef } from "react";

const Page: FaustTemplate<GetPageQuery> = (props: any) => {
  // LOADING ----------
  if (props.loading) {
    return <>Loading...</>;
  }

  // for this page
  const { title, editorBlocks, featuredImage, ncPageMeta, modified } =
    props.data?.page || {};

  const isGutenbergPage =
    !!props.__SEED_NODE__?.isFrontPage || ncPageMeta?.isFullWithPage;

  const blocks = flatListToHierarchical(editorBlocks as any, {
    idKey: "clientId",
    parentKey: "parentClientId",
  });

  let footerMenus = {
    footer1: props?.data?.footerMenu1?.nodes,
    footer2: props?.data?.footerMenu2?.nodes,
    footer3: props?.data?.footerMenu3?.nodes,
    footer4: props?.data?.footerMenu4?.nodes,
    footer5: props?.data?.footerMenu5?.nodes,
    footerBottom: props?.data?.footerMenuBottom?.nodes
  }

  const expertChoice = props?.data?.page?.pageCategory?.expertChoice?.nodes || []
  const recommend = props?.data?.page?.pageCategory?.recommend?.nodes || []
  const homePost = props?.data?.page?.pageCategory?.homePost?.nodes || []
  const pageCategory = props?.data?.page?.pageCategory?.pageCategory?.nodes?.[0] || []
  console.log(pageCategory)

  const contentRef = useRef(null) as any;

  const dataPost = homePost;

  useEffect(() => {
    if (contentRef.current && dataPost?.[0]?.content) {
      contentRef.current.innerHTML = dataPost?.[0].content;
    }
  }, [dataPost]);


  if (props.__SEED_NODE__?.slug == "user-agreement") {
    return (

      <PageLayout
        headerMenuItems={props.data?.primaryMenuItems?.nodes || []}
        footerMenuItems={props.data?.footerMenuItems?.nodes || []}
        pageFeaturedImageUrl={featuredImage?.node?.sourceUrl}
        pageTitle={title}
        footerMenus={footerMenus}
        generalSettings={
          props.data?.generalSettings as NcgeneralSettingsFieldsFragmentFragment
        }
      >
        <div className="container mt-28 !max-w-[1040px] mx-auto">
          <div className="my-20">
            <h1 className="text-[30px] md:text-[50px] font-bold">{title}</h1>
            <div className="mt-5 mb-7">
              <p>By Consumer Reports</p>
              <p className="text-xs">Last updated: {formatDate(String(modified), false)}</p>
            </div>
            <div className="policy-page max-w-[740px]">
              <MyWordPressBlockViewer blocks={blocks} />
              <p>©2024 Consumer Reports, Inc.<br />Last updated on {formatDate(String(modified), false)}.</p>
            </div>
          </div>
        </div>
      </PageLayout>
    )
  }

  if (props.__SEED_NODE__?.isFrontPage) {
    return (
      <>
        <PageLayout
          headerMenuItems={props.data?.primaryMenuItems?.nodes || []}
          footerMenuItems={props.data?.footerMenuItems?.nodes || []}
          footerMenus={footerMenus}
          pageFeaturedImageUrl={featuredImage?.node?.sourceUrl}
          pageTitle={title}
          generalSettings={
            props.data?.generalSettings as NcgeneralSettingsFieldsFragmentFragment
          }
        >
          <div
            className={`home my-10 container ${isGutenbergPage ? "" : "pb-20 pt-5 sm:pt-10"
              }`}
          >
            <main
              className={`${isGutenbergPage ? "max-w-none" : ""
                }`}
            >

              <div className="banner-home-container grid grid-cols-1 md:grid-cols-8 my-14 gap-7">
                <div className="banner-home-left col-span-1 order-2 mt-6 md:mt-0 md:col-span-3 md:order-1 small-xl:col-span-2">
                  <p className="font-semibold mb-7 text-center md:text-left">EXPERT ADVICE FROM CR</p>
                  <div className="">
                    {expertChoice?.length && expertChoice?.map((item: any, index: any) => (
                      <Link href={item?.uri ?? "/"} key={index} className={`pb-5 mb-5 ${index != expertChoice.length - 1 ? "border-b border-slate-300" : ""} leading-5 block w-fit hover:underline hover:underline-offset-2`}>{item?.title}</Link>
                    ))}
                  </div>
                </div>
                <div className="banner-home-main col-span-1 order-1 md:col-span-5 md:order-2 small-xl:col-span-4">
                  <Link href={homePost?.[0]?.uri ?? "/"} className="m-auto block">
                    <img className="m-auto image-aspect-ratio" src={homePost?.[0]?.featuredImage?.node?.sourceUrl} alt={homePost?.[0]?.featuredImage?.node?.altText} />
                    <h3 className="hover:underline mt-2 md:mt-8 text-[28px] md:text-[36px]">{homePost?.[0]?.title}</h3>
                  </Link>
                  <p className="text-lg mt-2 line-clamp-3" ref={contentRef}></p>
                </div>
                <div className="banner-home-right col-span-1 order-3 md:col-span-8 small-xl:col-span-2">
                  ssss
                </div>
              </div>

              <hr className="h-1 bg-[#f0f0f0] mb-20" />

              <div className="block small-xl:hidden small-small-xl:hidden col-span-2 max-w-[476px] m-auto mb-32">
                <div>
                  <p className="text-center font-semibold">SHOP CR DEALS</p>

                  <div className="col-span-2 mt-5">
                    {pageCategory?.posts?.nodes?.length && pageCategory?.posts?.nodes?.slice(0, 5)?.map((item: any, index: any) => (
                      <div className="col-span-2 grid grid-cols-7 border-b-4">
                        <div className="col-span-5">
                          <Link href={item?.uri ?? "/"} className="font-merriweather hover:underline block py-3 pr-3">
                            {item?.title}
                          </Link>
                        </div>
                        <div className="col-span-2">
                          <Link href={item?.uri ?? "/"}>
                            <img className="square-aspect-ratio" src={item?.featuredImage?.node?.sourceUrl} alt={item?.featuredImage?.node?.altText} />
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Link href={pageCategory?.uri ?? "/"} className="m-auto border border-black rounded-3xl px-4 py-0.5 mt-5 block w-fit hover:bg-[#ffd247] hover:border-[#ffd247]">
                    <button className="font-semibold text-sm m-auto">See All Deals</button>
                  </Link>
                </div>
              </div>

              <div className="recommend">
                <h3 className="main-title text-[30px] md:text-[36px]">Recommended for You</h3>
                <span className="mt-5 block text-sm">Edit to personalize your news feed.</span>

                <div className="mt-10 grid grid-cols-7 gap-10">
                  <div className="col-span-7 small-xl:col-span-5">
                    {recommend?.length && recommend?.map((item: any, index: any) => (
                      <div className="col-span-5 grid grid-cols-1 md:grid-cols-2 border-0 md:border-b-4 mb-8 md:mb-0" key={index}>
                        <div className="col-span-1 order-2 md:order-1">
                          <Link href={item?.uri ?? "/"} className="text-2xl font-merriweather hover:underline block py-7 pr-7">{item?.title}</Link>
                        </div>
                        <div className="col-span-1 block md:flex justify-start md:justify-end order-1 md:order-2">
                          <Link href={item?.uri ?? "/"}>
                            <img className="image-aspect-ratio w-full" src={item?.featuredImage?.node?.sourceUrl} alt={item?.featuredImage?.node?.altText} />
                          </Link>
                        </div>
                      </div>
                    ))}

                    <Link href={"/"} className="border border-black rounded-3xl px-4 py-0.5 mt-5 block w-fit hover:bg-[#ffd247] hover:border-[#ffd247]">
                      <button className="font-semibold text-sm">View More</button>
                    </Link>
                  </div>

                  <div className="col-span-7 small-xl:col-span-2 small-xl:sticky top-[30px] h-fit">
                    <div className="hidden small-xl:block">
                      <p className="text-center font-semibold">SHOP CR DEALS</p>

                      <div className="col-span-2 mt-5">
                        {pageCategory?.posts?.nodes?.length && pageCategory?.posts?.nodes?.slice(0, 5)?.map((item: any, index: any) => (
                          <div className="col-span-2 grid grid-cols-7 border-b-4">
                            <div className="col-span-5">
                              <Link href={item?.uri ?? "/"} className="font-merriweather hover:underline block py-3 pr-3">
                                {item?.title}
                              </Link>
                            </div>
                            <div className="col-span-2">
                              <Link href={item?.uri ?? "/"}>
                                <img className="square-aspect-ratio" src={item?.featuredImage?.node?.sourceUrl} alt={item?.featuredImage?.node?.altText} />
                              </Link>
                            </div>
                          </div>
                        ))}
                      </div>
                      <Link href={pageCategory?.uri ?? "/"} className="m-auto border border-black rounded-3xl px-4 py-0.5 mt-5 block w-fit hover:bg-[#ffd247] hover:border-[#ffd247]">
                        <button className="font-semibold text-sm m-auto">See All Deals</button>
                      </Link>
                    </div>

                    <div className="mt-[50px] mb-0 small-xl:my-[100px] flex items-center flex-col">
                      <p className="text-[#0c673b] font-semibold font-merriweather border-t border-t-slate-500 pt-3">NEWSLETTERS:</p>
                      <p className="mt-2">Get expert tips and advice</p>
                      <Link href={"/"} className="border-b border-b-slate-500 pb-3">
                        <button className="bg-[#0c673b] mt-2 text-white font-semibold py-1 px-6 rounded-3xl">Sign Up</button>
                      </Link>
                    </div>
                  </div>

                </div>
              </div>

              <div className="py-24 small-xl:py-32">
                <h3 className="main-title">More From CR</h3>
                <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  <div className="col-span-1 border border-slate-400 rounded-md overflow-hidden">
                    <img width={"100%"} src="https://article.images.consumerreports.org/image/upload/w_352,f_auto,c_lfill,ar_7:3/prod/content/dam/CRO-Images-2022/Misc/05May/CR-Homepage-Guide-Block-Site-Tools-and-Features-05-22" alt="" />
                    <div className="p-5">
                      <p className="text-2xl font-merriweather">Site Tools & Features</p>

                      <ul className="mt-10">
                        <li>
                          <Link href={"/"} className="hover:underline block mb-3 md:text-lg">Build & Buy Car Buying Service</Link>
                          <Link href={"/"} className="hover:underline block mb-3 md:text-lg">A-Z Product Guide</Link>
                          <Link href={"/"} className="hover:underline block mb-3 md:text-lg">Build & Buy Car Buying Service</Link>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="col-span-1 border border-slate-400 rounded-md overflow-hidden">
                    <img width={"100%"} src="https://article.images.consumerreports.org/image/upload/w_352,f_auto,c_lfill,ar_7:3/prod/content/dam/CRO-Images-2022/Misc/05May/CR-Homepage-Guide-Block-Join-Our-Community-05-22" alt="" />
                    <div className="p-5">
                      <p className="text-2xl font-merriweather">Join Our Community</p>

                      <ul className="mt-10">
                        <li>
                          <Link href={"/"} className="hover:underline block mb-3 md:text-lg">Build & Buy Car Buying Service</Link>
                          <Link href={"/"} className="hover:underline block mb-3 md:text-lg">A-Z Product Guide</Link>
                          <Link href={"/"} className="hover:underline block mb-3 md:text-lg">Build & Buy Car Buying Service</Link>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="col-span-1 border border-slate-400 rounded-md overflow-hidden">
                    <img width={"100%"} src="https://article.images.consumerreports.org/image/upload/w_352,f_auto,c_lfill,ar_7:3/prod/content/dam/CRO-Images-2022/Misc/05May/CR-Homepage-Guide-Block-Connect-With-Us-05-22" alt="" />
                    <div className="p-5">
                      <p className="text-2xl font-merriweather">Connect With Us</p>

                      <ul className="mt-10">
                        <li>
                          <Link href={"/"} className="hover:underline block mb-3 md:text-lg">Build & Buy Car Buying Service</Link>
                          <Link href={"/"} className="hover:underline block mb-3 md:text-lg">A-Z Product Guide</Link>
                          <Link href={"/"} className="hover:underline block mb-3 md:text-lg">Build & Buy Car Buying Service</Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </PageLayout>
      </>
    )
  }

  return (
    <>
      <PageLayout
        headerMenuItems={props.data?.primaryMenuItems?.nodes || []}
        footerMenuItems={props.data?.footerMenuItems?.nodes || []}
        footerMenus={footerMenus}
        pageFeaturedImageUrl={featuredImage?.node?.sourceUrl}
        pageTitle={title}
        generalSettings={
          props.data?.generalSettings as NcgeneralSettingsFieldsFragmentFragment
        }
      >
        <div
          className={`container ${isGutenbergPage ? "" : "pb-20 pt-5 sm:pt-10"
            }`}
        >
          <main
            className={`prose small-xl:prose-lg dark:prose-invert mx-auto ${isGutenbergPage ? "max-w-none" : ""
              }`}
          >

            <MyWordPressBlockViewer blocks={blocks} />
          </main>
        </div>
      </PageLayout>
    </>
  );
};

Page.variables = ({ databaseId }, ctx) => {
  return {
    databaseId,
    asPreview: ctx?.asPreview,
    headerLocation: PRIMARY_LOCATION,
    footerLocation: FOOTER_LOCATION,
    footerLocation1: "FOOTER_1",
    footerLocation2: "FOOTER_2",
    footerLocation3: "FOOTER_3",
    footerLocation4: "FOOTER_4",
    footerLocation5: "FOOTER_5",
    footerLocationBottom: "FOOTER_BOTTOM",
  };
};

// Note***: tat ca cac query trong cac page deu phai co generalSettings, no duoc su dung o compoent Wrap
Page.query = gql(`
  query GetPage($databaseId: ID!, $asPreview: Boolean = false, $headerLocation: MenuLocationEnum!, $footerLocation: MenuLocationEnum!, $footerLocation1: MenuLocationEnum!, $footerLocation2: MenuLocationEnum!, $footerLocation3: MenuLocationEnum!, $footerLocation4: MenuLocationEnum!, $footerLocation5: MenuLocationEnum!, $footerLocationBottom: MenuLocationEnum!) {
    page(id: $databaseId, idType: DATABASE_ID, asPreview: $asPreview) {
      title
      modified
      ncPageMeta {
        isFullWithPage
      }
      pageCategory {
        pageCategory {
        nodes {
          name
          uri
          ... on Category {
            posts {
              nodes {
                id
                title
                uri
                featuredImage {
                  node {
                    altText
                    sourceUrl
                  }
                }
              }
            }
          }
        }
      }
        expertChoice {
          nodes {
            ...on Post {
              id
              title
              uri
            }
          }
        }
        recommend {
          nodes {
            ...on Post {
              id
              title
              uri
              featuredImage {
                node {
                  sourceUrl
                  altText
                }
              }
            }
          }
        }
        homePost {
          nodes {
            ...on Post {
              id
              title
              uri
              content
              featuredImage {
                node {
                  sourceUrl
                  altText
                }
              }
            }
          }
        }
      }
      featuredImage {
        node {
          altText
          sourceUrl
        }
      }
      editorBlocks(flat: true) {
        __typename
        renderedHtml
        clientId
        parentClientId
        ...NcmazFaustBlockMagazineFragment
        ...NcmazFaustBlockTermsFragment
        ...NcmazFaustBlockCtaFragment
        ...NcmazFaustBlockGroupFragment
        ...CoreColumnsFragment
        ...CoreColumnFragment
      }
    }
    # common query for all page 
    generalSettings {
      ...NcgeneralSettingsFieldsFragment
    }
    primaryMenuItems: menuItems(where: { location:  $headerLocation  }, first: 80) {
      nodes {
        ...NcPrimaryMenuFieldsFragment
      }
    }
    footerMenuItems: menuItems(where: { location:  $footerLocation  }, first: 40) {
      nodes {
        ...NcFooterMenuFieldsFragment
      }
    }
    footerMenu1: menuItems(where: {location: $footerLocation1}, first: 40) {
      nodes {
        ...NcFooterMenuFieldsFragment
      }
    }
    footerMenu2: menuItems(where: {location: $footerLocation2}, first: 40) {
      nodes {
        ...NcFooterMenuFieldsFragment
      }
    }
    footerMenu3: menuItems(where: {location: $footerLocation3}, first: 40) {
      nodes {
        ...NcFooterMenuFieldsFragment
      }
    }
    footerMenu4: menuItems(where: {location: $footerLocation4}, first: 40) {
      nodes {
        ...NcFooterMenuFieldsFragment
      }
    }
    footerMenu5: menuItems(where: {location: $footerLocation5}, first: 40) {
      nodes {
        ...NcFooterMenuFieldsFragment
      }
    }
    footerMenuBottom: menuItems(where: {location: $footerLocationBottom}, first: 40) {
      nodes {
        ...NcFooterMenuFieldsFragment
      }
    }
  }
`);

export default Page;
