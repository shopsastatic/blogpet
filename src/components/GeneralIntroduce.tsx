import React from 'react';
import Link from 'next/link';

interface GeneralIntroduceProps {
   
}

const GeneralIntroduce: React.FC<GeneralIntroduceProps> = () => {
    return (
        <div className='container grid grid-cols-1 md:grid-cols-2 gap-10 small-xl:grid-cols-3 small-xl:gap-5 general-introduce relative !py-10'>
            <div className='col-span-2 small-xl:col-span-1'>
                <Link href={"/"} className="w-fit block mb-5 small-xl:mb-10"><h3>Inside Our Test Labs</h3></Link>
                <p>CR’s engineers test and rate thousands of products so that you can make great choices, based on data.</p>
                <Link href={"/"} className='border-b border-black py-2 mt-2 block'>Products A-Z</Link>
            </div>

            <div className='col-span-2 md:col-span-1'>
                <div className='bg-white'>
                    <Link href={"/"}>
                        <img className='w-full' src="https://article.images.consumerreports.org/image/upload/w_626,f_auto,q_auto/v1566326635/prod/content/dam/CRO%20Images%202019/Home/08August/CR-Home-InlineHero-Best-Mattresses-2019-08-19" alt="" />
                        <p className='font-semibold text-center py-4'>Best Mattresses</p>
                    </Link>
                </div>
            </div>

            <div className='col-span-2 md:col-span-1'>
                <div className='bg-white'>
                    <Link href={"/"}>
                        <img className='w-full' src="https://article.images.consumerreports.org/image/upload/w_626,f_auto,q_auto/v1586878459/prod/content/dam/CRO-Images-2020/Home-Garden/04Apr/CR-Home-Inlinehero-best-interior-paints-0420" alt="" />
                        <p className='font-semibold text-center py-4'>Best Interior Paints</p>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default GeneralIntroduce;