import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import truncate from 'html-truncate';
import { isArray } from 'lodash';

interface MainLayoutCategoryProps {
    data: any
    countPosts: number;
}

type Post = any

function truncateHTMLContent(html: any, maxLength: any) {
    if (typeof document !== 'undefined') {
        let div = document.createElement('div');
        div.innerHTML = html;

        let textContent = div.textContent || div.innerText || '';
        let truncatedText = textContent.slice(0, maxLength);

        if (textContent.length > maxLength) {
            let lastSpaceIndex = truncatedText.lastIndexOf(' ');
            if (lastSpaceIndex !== -1) {
                truncatedText = truncatedText.slice(0, lastSpaceIndex);
            }
            truncatedText += '...';
        }

        return truncate(html, truncatedText.length);
    }
    return html;
}

const MainLayoutCategory: React.FC<MainLayoutCategoryProps> = ({ data, countPosts }) => {
    let dataPost: Post[] = [];

    if(isArray(data)) {
        dataPost = data
    }else {
        dataPost = data?.posts?.nodes
    }

    const [truncatedContent, setTruncatedContent] = useState('');

    useEffect(() => {
        if (dataPost && dataPost[0]?.content) {
            const truncated = truncateHTMLContent(dataPost[0]?.content, 100);
            setTruncatedContent(truncated);
        }
    }, [dataPost]);

    return (
        <div className="col-span-7 small-xl:col-span-5">
            <div className='grid grid-cols-1 md:grid-cols-3 small-xl:grid-cols-1 gap-8 small-xl:gap-0'>
                <Link href={dataPost[0]?.uri ?? "/"} className="grid grid-rows-none md:grid-rows-3 small-xl:grid-rows-none small-xl:grid-cols-6 gap-4 group col-span-2 small-xl:col-span-1">
                    <div className="col-span-1 row-span-1 md:row-span-2 small-xl:col-span-2 order-2 small-xl:order-1">
                        <h3 className="group-hover:underline text-[28px] md:text-[36px]">{dataPost?.[0]?.title}</h3>
                        <p className="text-lg mt-2" dangerouslySetInnerHTML={{ __html: truncatedContent }} />
                    </div>
                    <div className="col-span-1 row-span-1 small-xl:col-span-4 order-1 small-xl:order-2">
                        <img className='image-aspect-ratio'
                            src={dataPost?.[0]?.featuredImage?.node?.sourceUrl}
                            alt={dataPost?.[0]?.featuredImage?.node?.altText}
                        />
                    </div>
                </Link>

                <div className="grid grid-cols-1 small-xl:grid-cols-3 gap-7 md:gap-5 small-xl:gap-5 mt-0 small-xl:mt-7 col-span-1">
                    {dataPost && dataPost.slice(1, countPosts).map((node: any, index: any) => (
                        <div className="col-span-1" key={index}>
                            <Link href={node?.uri ?? "/"} className="group flex md:block gap-5">
                                <img className='max-w-[150px] md:max-w-full image-aspect-ratio' src={node?.featuredImage?.node?.sourceUrl} alt={node?.featuredImage?.node?.altText} />
                                <p className="leading-5 font-bold mt-4 group-hover:underline">{node?.title}</p>
                            </Link>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default MainLayoutCategory;