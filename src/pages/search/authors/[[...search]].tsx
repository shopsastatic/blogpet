import { GetStaticPropsContext } from "next";
import { FaustPage, getNextStaticProps } from "@faustwp/core";
import { gql } from "@/__generated__";
import {
  NcgeneralSettingsFieldsFragmentFragment,
  SearchPageQueryGetUsersBySearchQuery,
} from "@/__generated__/graphql";
import { GET_USERS_FIRST_COMMON } from "@/contains/contants";
import React from "react";
import ButtonPrimary from "@/components/Button/ButtonPrimary";
import Empty from "@/components/Empty";
import { useRouter } from "next/router";
import CardAuthorBox from "@/components/CardAuthorBox/CardAuthorBox";
import { getUserDataFromUserCardFragment } from "@/utils/getUserDataFromUserCardFragment";
import { useLazyQuery } from "@apollo/client";
import { FOOTER_LOCATION, PRIMARY_LOCATION } from "@/contains/menu";
import PageLayout from "@/container/PageLayout";
import errorHandling from "@/utils/errorHandling";
import { TCategoryCardFull } from "@/components/CardCategory1/CardCategory1";
import SearchPageLayout from "@/container/SearchPageLayout";
import getTrans from "@/utils/getTrans";

const Page: FaustPage<SearchPageQueryGetUsersBySearchQuery> = (props: any) => {
  const router = useRouter();
  const initUsers = props.data?.users?.nodes;
  const initPageInfo = props.data?.users?.pageInfo;
  const _top10Categories =
    (props.data?.categories?.nodes as TCategoryCardFull[]) || [];
  const search = router.query.search?.[0] || "";
  const T = getTrans();

  const [getUsersBySearch, getUsersBySearchResult] = useLazyQuery(
    gql(` 
      query queryGetUsersBySearchOnSearchPage(
        $first: Int
        $search: String
        $after: String
      ) {
        users(first: $first, after: $after, where: { search: $search }) {
          nodes {
            ...NcmazFcUserFullFields
          }
          pageInfo {
            endCursor
            hasNextPage
          }
        }
      }
    `),
    {
      notifyOnNetworkStatusChange: true,
      context: {
        fetchOptions: {
          method: process.env.NEXT_PUBLIC_SITE_API_METHOD || "GET",
        },
      },
      variables: {
        search,
        first: GET_USERS_FIRST_COMMON,
      },
      onError: (error) => {
        errorHandling(error);
      },
    }
  );

  const handleClickShowMore = () => {
    if (!getUsersBySearchResult.called) {
      return getUsersBySearch({
        variables: {
          search,
          after: initPageInfo?.endCursor,
        },
      });
    }

    getUsersBySearchResult.fetchMore({
      variables: {
        search,
        after: getUsersBySearchResult.data?.users?.pageInfo.endCursor,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult || !fetchMoreResult.users?.nodes) {
          return prev;
        }

        return {
          ...prev,
          users: {
            ...prev.users,
            nodes: [
              ...(prev.users?.nodes || []),
              ...(fetchMoreResult.users?.nodes || []),
            ],
            pageInfo: fetchMoreResult.users?.pageInfo,
          },
        };
      },
    });
  };

  // data for render
  let currentUsers = initUsers || [];
  let hasNextPage = initPageInfo?.hasNextPage;
  let loading = false;

  if (getUsersBySearchResult.called) {
    currentUsers = [
      ...(initUsers || []),
      ...(getUsersBySearchResult.data?.users?.nodes || []),
    ];

    hasNextPage =
      getUsersBySearchResult.loading ||
      getUsersBySearchResult.data?.users?.pageInfo.hasNextPage ||
      false;
    loading = getUsersBySearchResult.loading;
  }

  let footerMenus = {
    footer1: props?.data?.footerMenu1?.nodes,
    footer2: props?.data?.footerMenu2?.nodes,
    footer3: props?.data?.footerMenu3?.nodes,
    footer4: props?.data?.footerMenu4?.nodes,
    footer5: props?.data?.footerMenu5?.nodes,
    footerBottom: props?.data?.footerMenuBottom?.nodes
  }


  return (
    <PageLayout
      headerMenuItems={props.data?.primaryMenuItems?.nodes || []}
      footerMenuItems={props.data?.footerMenuItems?.nodes || []}
      footerMenus={footerMenus}
      pageFeaturedImageUrl={null}
      pageTitle={"Search"}
      generalSettings={
        props.data?.generalSettings as NcgeneralSettingsFieldsFragmentFragment
      }
    >
      <SearchPageLayout top10Categories={_top10Categories}>
        {/* LOOP ITEMS */}
        {!currentUsers.length && !loading ? (
          <Empty />
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-6 md:gap-8 mt-8 lg:mt-12">
            {(currentUsers || []).map((user: any) => (
              <CardAuthorBox
                key={getUserDataFromUserCardFragment(user).databaseId}
                author={user}
              />
            ))}
          </div>
        )}

        {/* PAGINATION */}
        {hasNextPage ? (
          <div className="mt-12 lg:mt-14 flex justify-center">
            <ButtonPrimary
              disabled={loading || !currentUsers?.length}
              loading={loading}
              onClick={handleClickShowMore}
            >
              {T["Show me more"]}
            </ButtonPrimary>
          </div>
        ) : null}
      </SearchPageLayout>
    </PageLayout>
  );
};

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking",
  };
}
export function getStaticProps(ctx: GetStaticPropsContext) {
  return getNextStaticProps(ctx, {
    Page,
    revalidate: 900,
  });
}

Page.variables = ({ params }) => {
  return {
    search: params?.search?.[0] || "",
    first: GET_USERS_FIRST_COMMON,
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

Page.query = gql(`
  query SearchPageQueryGetUsersBySearch ( $first: Int,  $search: String = "", $after: String, $headerLocation: MenuLocationEnum!, $footerLocation: MenuLocationEnum!, $footerLocation1: MenuLocationEnum!, $footerLocation2: MenuLocationEnum!, $footerLocation3: MenuLocationEnum!, $footerLocation4: MenuLocationEnum!, $footerLocation5: MenuLocationEnum!, $footerLocationBottom: MenuLocationEnum!)  {
    users(first: $first, after: $after, where: {search: $search}) {
        nodes {
             ...NcmazFcUserFullFields
        }
        pageInfo {
          endCursor
          hasNextPage
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
    footerMenuItems: menuItems(where: { location:  $footerLocation  }, first: 50) {
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
    # end common query
  }
`);

export default Page;
