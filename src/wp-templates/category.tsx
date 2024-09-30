import { gql } from "@/__generated__";
import {
  NcgeneralSettingsFieldsFragmentFragment,
  PageCategoryGetCategoryQuery,
} from "@/__generated__/graphql";
import { TCategoryCardFull } from "@/components/CardCategory1/CardCategory1";
import MyImage from "@/components/MyImage";
import SocialsShareDropdown from "@/components/SocialsShareDropdown/SocialsShareDropdown";
import PageLayout from "@/container/PageLayout";
import ArchiveLayoutChild from "@/container/archives/ArchieveLayoutChild";
import ArchiveLayout from "@/container/archives/ArchiveLayout";
import { GET_POSTS_FIRST_COMMON } from "@/contains/contants";
import { FOOTER_LOCATION, PRIMARY_LOCATION } from "@/contains/menu";
import { PostDataFragmentType } from "@/data/types";
import { getCatgoryDataFromCategoryFragment } from "@/utils/getCatgoryDataFromCategoryFragment";
import { getImageDataFromImageFragment } from "@/utils/getImageDataFromImageFragment";
import { FaustTemplate } from "@faustwp/core";
import { FireIcon, FolderIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

const Category: FaustTemplate<PageCategoryGetCategoryQuery> = (props: any) => {
  // LOADING ----------
  if (props.loading) {
    return <>Loading...</>;
  }

  if (!props?.data || !props.data.category) {
    return null;
  }

  // START ----------
  const {
    databaseId,
    count,
    description,
    name,
    ncTaxonomyMeta,
    featuredImageMeta,
    parent,
    categorylayout
  } = getCatgoryDataFromCategoryFragment(props.data.category);
  const initPostsPageInfo = props.data?.category?.posts?.pageInfo;
  const posts = props.data?.category?.posts;
  const _top10Categories =
    (props.data?.categories?.nodes as TCategoryCardFull[]) || [];

  const categoryChild = props?.data?.category?.children?.nodes

  let footerMenus = {
    footer1: props?.data?.footerMenu1?.nodes,
    footer2: props?.data?.footerMenu2?.nodes,
    footer3: props?.data?.footerMenu3?.nodes,
    footer4: props?.data?.footerMenu4?.nodes,
    footer5: props?.data?.footerMenu5?.nodes,
    footerBottom: props?.data?.footerMenuBottom?.nodes
  }


  if (parent) {
    return (
      <PageLayout
        headerMenuItems={props.data?.primaryMenuItems?.nodes || []}
        footerMenuItems={props.data?.footerMenuItems?.nodes || []}
        footerMenus={footerMenus}
        pageFeaturedImageUrl={featuredImageMeta?.sourceUrl}
        pageTitle={"Category " + name}
        pageDescription={description || ""}
        generalSettings={
          props.data?.generalSettings as NcgeneralSettingsFieldsFragmentFragment
        }
      >
        <ArchiveLayoutChild
          name={name}
          initPosts={posts?.nodes as PostDataFragmentType[] | null}
          initPostsPageInfo={initPostsPageInfo}
          categoryDatabaseId={databaseId}
          taxonomyType="category"
          top10Categories={_top10Categories}
          categorylayout={categorylayout}
        >
          <div className="container my-20 border-b-4 border-[#f0f0f0] !pb-10">
            <Link href={parent?.node?.uri ?? "/"} className="block text-xs w-fit py-0.5 px-5 m-auto mb-5 border border-slate-400 rounded-3xl text-center">{parent?.node?.name}</Link>
            <h2 className="text-center text-[70px] mb-5">{name}</h2>

            <p className="max-w-[650px] text-[18px] mx-auto text-center" dangerouslySetInnerHTML={{__html: description}}></p>
          </div>
        </ArchiveLayoutChild>
      </PageLayout>
    )
  }

  return (
    <PageLayout
      headerMenuItems={props.data?.primaryMenuItems?.nodes || []}
      footerMenuItems={props.data?.footerMenuItems?.nodes || []}
      footerMenus={footerMenus}
      pageFeaturedImageUrl={featuredImageMeta?.sourceUrl}
      pageTitle={"Category " + name}
      pageDescription={description || ""}
      generalSettings={
        props.data?.generalSettings as NcgeneralSettingsFieldsFragmentFragment
      }
    >
      <ArchiveLayout
        name={name}
        initPosts={posts?.nodes as PostDataFragmentType[] | null}
        initPostsPageInfo={initPostsPageInfo}
        categoryDatabaseId={databaseId}
        taxonomyType="category"
        top10Categories={_top10Categories}
        categorylayout={categorylayout}
      >
        <div className="container my-20">
          <h2 className="text-center text-[70px] mb-5">{name}</h2>

          <p className="max-w-[650px] text-[18px] mx-auto text-center" dangerouslySetInnerHTML={{__html: description}}></p>

          <div className="sub-category-list flex justify-center gap-x-10 mt-10 flex-wrap font-merriweather border-b-4 border-[#f0f0f0]">
            {categoryChild?.length && categoryChild.slice(0, 5).map((item: any, index: any) => (
              <Link key={index} href={item?.uri ?? "/"} className="relative text-lg py-3 hover:text-[#02a44a]">
                <span className="relative z-10">{item?.name}</span>
                <span className="absolute bottom-0 left-0 right-0 h-1 bg-[#02a44a] transform scale-x-0 transition-transform duration-300 ease-in-out hover:scale-x-100"></span>
              </Link>
            ))}
          </div>
        </div>
      </ArchiveLayout>
    </PageLayout>
  );
};

Category.variables = ({ id }) => ({
  id,
  first: GET_POSTS_FIRST_COMMON,
  headerLocation: PRIMARY_LOCATION,
  footerLocation: FOOTER_LOCATION,
  footerLocation1: "FOOTER_1",
  footerLocation2: "FOOTER_2",
  footerLocation3: "FOOTER_3",
  footerLocation4: "FOOTER_4",
  footerLocation5: "FOOTER_5",
  footerLocationBottom: "FOOTER_BOTTOM",
});

Category.query = gql(`
query PageCategoryGetCategory($id: ID!, $first: Int, $headerLocation: MenuLocationEnum!, $footerLocation: MenuLocationEnum!, $footerLocation1: MenuLocationEnum!, $footerLocation2: MenuLocationEnum!, $footerLocation3: MenuLocationEnum!, $footerLocation4: MenuLocationEnum!, $footerLocation5: MenuLocationEnum!, $footerLocationBottom: MenuLocationEnum!)  {
    category(id: $id) {
       ...NcmazFcCategoryFullFieldsFragment
      posts(first: $first, where: {orderby: {field: DATE, order: DESC}}) {
        nodes {
          ...NcmazFcPostCardFields
        }
        pageInfo {
          endCursor
          hasNextPage
        }
      }

      children {
        nodes {
          id
          name
          slug
          description
          ...NcmazFcCategoryFullFieldsFragment
        }
      }
    }
    categories(first:10, where: { orderby: COUNT, order: DESC }) {
      nodes {
        ...NcmazFcCategoryFullFieldsFragment
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
 }`);

export default Category;
