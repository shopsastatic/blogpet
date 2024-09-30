import { gql } from "@/__generated__";
import {
  GetReadingListPageQuery,
  NcgeneralSettingsFieldsFragmentFragment,
} from "../../__generated__/graphql";
import { FaustPage, getNextStaticProps } from "@faustwp/core";
import { GetStaticPropsContext } from "next";
import { FOOTER_LOCATION, PRIMARY_LOCATION } from "@/contains/menu";
import PageLayout from "@/container/PageLayout";
import Heading from "@/components/Heading/Heading";
import getTrans from "@/utils/getTrans";
import ReadingListPageChild from "@/container/readinglist/ReadingListPageChild";

//

const Page: FaustPage<GetReadingListPageQuery> = (props: any) => {
  const T = getTrans();

  
  let footerMenus = {
    footer1: props?.data?.footerMenu1?.nodes,
    footer2: props?.data?.footerMenu2?.nodes,
    footer3: props?.data?.footerMenu3?.nodes,
    footer4: props?.data?.footerMenu4?.nodes,
    footer5: props?.data?.footerMenu5?.nodes,
    footerBottom: props?.data?.footerMenuBottom?.nodes
  }

  return (
    <>
      <PageLayout
        headerMenuItems={props.data?.primaryMenuItems?.nodes || []}
        footerMenuItems={props.data?.footerMenuItems?.nodes || []}
        footerMenus={footerMenus}
        pageFeaturedImageUrl={null}
        pageTitle={T["Reading list"]}
        generalSettings={
          props.data?.generalSettings as NcgeneralSettingsFieldsFragmentFragment
        }
      >
        <div className="container py-20">
          <main className="mx-auto max-w-4xl">
            <Heading desc="Let's read and save your favorite articles here ! 📚">
              {T["Reading list"]}
            </Heading>
            <div className="my-10 border-t border-neutral-100 dark:border-neutral-700"></div>

            {/* @ts-ignore */}
            <ReadingListPageChild {...(props || {})} />
          </main>
        </div>
      </PageLayout>
    </>
  );
};

Page.variables = () => {
  return {
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
  query GetReadingListPage($headerLocation: MenuLocationEnum!, $footerLocation: MenuLocationEnum!, $footerLocation1: MenuLocationEnum!, $footerLocation2: MenuLocationEnum!, $footerLocation3: MenuLocationEnum!, $footerLocation4: MenuLocationEnum!, $footerLocation5: MenuLocationEnum!, $footerLocationBottom: MenuLocationEnum!) {
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
  }
`);

export function getStaticProps(ctx: GetStaticPropsContext) {
  return getNextStaticProps(ctx, {
    Page,
    revalidate: 900,
  });
}

export default Page;
