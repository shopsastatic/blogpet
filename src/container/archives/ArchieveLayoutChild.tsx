import ArchiveFilterListBox from '@/components/ArchiveFilterListBox/ArchiveFilterListBox'
import { TPostCard } from '@/components/Card2/Card2'
import { TCategoryCardFull } from '@/components/CardCategory1/CardCategory1'
import GeneralIntroduce from '@/components/GeneralIntroduce'
import GridPostsArchive from '@/components/GridPostsArchive'
import LayoutHalf from '@/components/LayoutHalf'
import MainLayoutCategory from '@/components/MainLayoutCategory'
import TrendingCategory from '@/components/TrendingCategory'
import { FILTERS_OPTIONS } from '@/contains/contants'
import { NC_SITE_SETTINGS } from '@/contains/site-settings'
import { PostDataFragmentType } from '@/data/types'
import useGetPostsNcmazMetaByIds from '@/hooks/useGetPostsNcmazMetaByIds'
import useHandleGetPostsArchivePage from '@/hooks/useHandleGetPostsArchivePage'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { FC, useEffect, useRef } from 'react'

const DynamicModalCategories = dynamic(
    () => import('@/components/ModalCategories'),
)
const DynamicModalTags = dynamic(() => import('@/components/ModalTags'))
const DynamicSectionTrendingTopic = dynamic(
    () => import('@/components/SectionTrendingTopic'),
)
const DynamicSectionSubscribe2 = dynamic(
    () => import('@/components/SectionSubscribe2/SectionSubscribe2'),
)

interface IArchiveLayoutChildProps {
    children: React.ReactNode
    name?: string | null
    initPosts?: PostDataFragmentType[] | null
    initPostsPageInfo?: {
        endCursor?: string | null | undefined
        hasNextPage: boolean
    } | null
    tagDatabaseId?: number | null
    categoryDatabaseId?: number | null
    taxonomyType: 'tag' | 'category' | 'postFormat'
    top10Categories: TCategoryCardFull[] | null
    categorylayout: any
}

const ArchiveLayoutChild: FC<IArchiveLayoutChildProps> = ({
    children,
    name,
    initPosts: posts,
    initPostsPageInfo,
    tagDatabaseId,
    categoryDatabaseId,
    taxonomyType,
    top10Categories,
    categorylayout
}) => {
    // START ----------
    //
    const { } = useGetPostsNcmazMetaByIds({
        posts: (posts || []) as TPostCard[],
    })
    //

    let featuredImage = ''
    let trending = []
    let isHomepage = false

    if (categorylayout) {
        trending = categorylayout?.trending?.nodes
    }

    const {
        currentPosts,
        handleChangeFilterPosts,
        handleClickShowMore,
        hasNextPage,
        loading,
    } = useHandleGetPostsArchivePage({
        initPosts: posts,
        initPostsPageInfo,
        tagDatabaseId,
        categoryDatabaseId,
    })

    return (
        <div className="">
            <div>
                {/* HEADER */}
                {children}
                {/* ====================== END HEADER ====================== */}

                <TrendingCategory data={trending}></TrendingCategory>

                <div className='container'>
                    <div className="w-[125px] border-t mx-auto border-t-[#777]"></div>
                    <div className="newsletters flex gap-5 py-5 justify-center flex-col small-xl:flex-row items-center">
                        <strong className="font-merriweather text-[#074f2c]">NEWSLETTERS:</strong>
                        <span>Get expert tips and advice</span>
                        <button className="bg-black text-white py-1 px-5 font-bold rounded-[20px] flex gap-2 items-center">Sign Up <img src="/images/send-icon.svg" alt="" /></button>
                    </div>
                    <div className="w-[125px] border-t mx-auto border-t-[#777]"></div>
                </div>

                <div className='container my-20'>
                    <div className="grid grid-cols-1 small-xl:grid-cols-9 gap-10">
                        <div className="col-span-1 small-xl:col-span-7">
                            <Link href={"/"} className="w-fit block mb-10"><h3 className="main-title">Latest</h3></Link>
                            {/* <p className="text-lg mt-7 font-semibold" dangerouslySetInnerHTML={{ __html: category2?.description }}></p> */}

                            <LayoutHalf data={currentPosts} readmore={false}></LayoutHalf>
                        </div>

                        <div className="col-span-1 small-xl:col-span-2 border-y-4 small-xl:border-y-0 px-5">
                            <div className=" sticky top-10 h-fit my-14 small-xl:mt-0">
                                <img className='m-auto' src="https://crdms.images.consumerreports.org/c_lfill,w_240,q_auto,f_auto,dpr_1/prod/products/cr/models/413452-solar-generators-4patriots-patriot-power-solar-panel-generator-1800-10038607" alt="" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className='mt-20 bg-[#d9dfdb]'>
                    <GeneralIntroduce></GeneralIntroduce>
                </div>
            </div>
        </div>
    )
}

export default ArchiveLayoutChild
