import React, { useState } from 'react';
import { FaustPage } from "@faustwp/core";
import PageLayout from "@/container/PageLayout";
import getTrans from "@/utils/getTrans";
import { NcgeneralSettingsFieldsFragmentFragment } from "@/__generated__/graphql";
import "@/styles/newsletter.scss";
import Link from 'next/link';

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

  return (
    <>
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
    </>
  );
};

export default Page;
