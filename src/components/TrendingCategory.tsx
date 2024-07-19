import Link from 'next/link';
import { useEffect, useRef } from 'react';

interface TrendingCategoryProps {
    data: Array<any>;
}

const TrendingCategory: React.FC<TrendingCategoryProps> = ({ data }) => {

    const contentRef = useRef(null);

    const trending = data;
    
	useEffect(() => {
		if (contentRef.current && trending?.[0]?.content) {
			contentRef.current.innerHTML = trending[0].content;
		}
	}, [trending]);


    return (
        <div className="container grid grid-cols-1 small-xl:grid-cols-9 my-24 gap-10">
            <div className="col-span-1 small-xl:col-span-7 grid gap-5 grid-cols-1 small-xl:grid-cols-7">
                <Link href={trending?.[0]?.uri ?? "/"} className="col-span-1 small-xl:col-span-5 group mx-auto">
                    <img className='image-aspect-ratio' src={trending?.[0]?.featuredImage?.node?.sourceUrl} alt={trending?.[0]?.featuredImage?.node?.altText} />
                    <h3 className="mt-5 group-hover:underline">{trending?.[0]?.title}</h3>
                    <p
                        ref={contentRef}
                        className="mt-2 line-clamp-2"
                    ></p>
                </Link>

                <div className="col-span-1 small-xl:col-span-2 grid gap-5 grid-cols-2 small-xl::grid-cols-1">
                    {trending?.slice(1, 3)?.map((item: any, index: any) => (
                        <Link href={item?.uri ?? "/"} className="group col-span-1 small-xl:col-span-2" key={index}>
                            <img className='image-aspect-ratio' src={item?.featuredImage?.node?.sourceUrl} alt={item?.featuredImage?.node?.altText} />
                            <p className="mt-4 leading-6 font-bold group-hover:underline">{item?.title}</p>
                        </Link>
                    ))}
                </div>
            </div>

            <div className="col-span-1 small-xl:col-span-2 border-0 small-xl:border-l-4 border-l-[#f0f0f0] px-5">
                <strong className="text-center block">TRENDING</strong>
                <div>
                    {trending?.slice(3, 7)?.map((item: any, index: any) => (
                        <Link href={item?.uri ?? "/"} className="hover:underline text-center block mx-auto mt-2 mb-4">{item?.title}</Link>
                    ))}
                </div>

                <hr className="bg-black my-10" />

                <strong className="text-center block mt-4">FIND THE BEST TIME TO BUY</strong>

                <Link href={"/"}>
                    <div className="bg-[#f0f0f0] rounded-full w-[120px] h-[120px] mt-3 mx-auto flex justify-center items-center">
                        <img className='image-aspect-ratio' width={100} src="https://crdms.images.consumerreports.org/t_pcard_sm,dpr_auto,w_auto,c_scale/prod/products/cr/product-groups/29554" alt="" />
                    </div>

                    <p className="font-bold mt-2 text-center">Snow Blowers</p>
                </Link>
            </div>
        </div>
    );
};

export default TrendingCategory;