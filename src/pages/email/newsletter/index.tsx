import React, { useState } from 'react';
import { FaustPage, getNextStaticProps } from "@faustwp/core";
import PageLayout from "@/container/PageLayout";
import getTrans from "@/utils/getTrans";
import { NcgeneralSettingsFieldsFragmentFragment } from "@/__generated__/graphql";
import "@/styles/newsletter.scss";
import Link from 'next/link';
import { GetStaticPropsContext } from 'next';
import { FOOTER_LOCATION, PRIMARY_LOCATION } from '@/contains/menu';
import { gql } from '@/__generated__';

const Page: FaustPage<any> = (props) => {
  const T = getTrans();
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = () => {
    if (validateEmail(email)) {
      setIsSubmitted(true);
      setError('');
    } else {
      setError('Please enter a valid email address.');
    }
  };
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
        <div className="newsletter-container">
          <div className="">
            <main className="max-w-4xl m-auto">
              <div className="form-newsletter">
                {isSubmitted ? (
                  <>
                    <h4 className="text-center text-4xl">
                      Thank you for signing up!
                    </h4>
                    <p className='text-center mt-3 font-merriweather'>Click below to head back to LULUNE</p>
                    <Link href={"/"} className='w-fit block m-auto'><button className='bg-black text-white m-auto block'>BACK TO HOME</button></Link>
                  </>
                ) : (
                  <>
                    <h4 className="text-center">Sign up for LULUNE's newsletter</h4>
                    <p className="font-merriweather text-center my-3">Want that hot new show, beauty trend or celebrity meme explained? We've got you.</p>
                    <input
                      className="w-full"
                      name='email'
                      type="text"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    {error && (
                      <p className="mt-2 text-red-500 font-semibold text-xs flex items-center">
                        {error}
                      </p>
                    )}
                    <button
                      className="block m-auto my-3 w-fit bg-black text-white text-sm font-semibold"
                      onClick={handleSubmit}
                    >
                      SUBSCRIBE
                    </button>
                    <span className="block text-xs leading-5">
                      By signing up, I agree to the <Link href="/term-of-use" className="underline">Terms of Use</Link> (including the <Link href="/" className="underline">dispute resolution procedures</Link>) and have reviewed the <Link href="/privacy-policy" className="underline">Privacy Notice</Link>.
                    </span>
                  </>
                )}
              </div>
            </main>
          </div>
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
