import React from 'react';
import Link from 'next/link';

interface LayoutHalfProps {
    data: Array<any>;
    readmore: boolean
}

const LayoutHalf: React.FC<LayoutHalfProps> = ({ data, readmore }) => {
    return (
        <div className="col-span-7 small-xl:col-span-5">
            {data?.length > 0 && data.map((item: any, index: any) => (
                <div className="col-span-5 grid grid-cols-1 md:grid-cols-2 border-0 md:border-b-4 mb-8 md:mb-0" key={index}>
                    <div className="col-span-1 order-2 md:order-1">
                        <Link href={item.uri ?? "/"} className="text-2xl font-merriweather hover:underline block py-7 pr-7">
                            {item?.title}
                        </Link>
                    </div>
                    <div className="col-span-1 flex justify-start md:justify-end order-1 md:order-2">
                        <Link href={item?.uri ?? "/"}>
                            <img className='w-[470px] h-[200px] small-sm:h-[250px] object-cover object-center'
                                src={item?.featuredImage?.node?.sourceUrl}
                                alt={item?.featuredImage?.node?.altText}
                            />
                        </Link>
                    </div>
                </div>
            ))}
            {readmore && (
                <Link href="/">
                    <a className="border border-black rounded-3xl px-4 py-0.5 mt-5 block w-fit hover:bg-[#ffd247] hover:border-[#ffd247]">
                        <button className="font-semibold text-sm">View More</button>
                    </a>
                </Link>
            )}
        </div>
    );
};

export default LayoutHalf;