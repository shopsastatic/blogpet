import ArchiveFilterListBox from '@/components/ArchiveFilterListBox/ArchiveFilterListBox'
import { TPostCard } from '@/components/Card2/Card2'
import { TCategoryCardFull } from '@/components/CardCategory1/CardCategory1'
import GeneralIntroduce from '@/components/GeneralIntroduce'
import GridPostsArchive from '@/components/GridPostsArchive'
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

interface IArchiveLayoutProps {
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

const ArchiveLayout: FC<IArchiveLayoutProps> = ({
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
	let category1 = []
	let category2 = []
	let category3 = []
	let category4 = []
	let category5 = []
	let trending = []
	let isHomepage = false

	if (categorylayout) {
		category1 = categorylayout?.subCategory1?.nodes?.[0]
		category2 = categorylayout?.subCategory2?.nodes?.[0]
		category3 = categorylayout?.subCategory3?.nodes?.[0]
		category4 = categorylayout?.subCategory4?.nodes?.[0]
		category5 = categorylayout?.subCategory5?.nodes?.[0]
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

				<div className='my-20 bg-[#d9dfdb]'>
					<GeneralIntroduce></GeneralIntroduce>
				</div>

				<div className='container'>
					<div className="my-24">
						<div className="grid grid-cols-1 small-xl:grid-cols-9 gap-10">
							<div className="col-span-1 small-xl:col-span-7">
								<Link href={category1?.uri ?? "/"} className="w-fit block"><h3 className="main-title">{category1?.name}</h3></Link>
								<p className="text-lg mt-7 font-semibold" dangerouslySetInnerHTML={{ __html: category1?.description }}></p>
								<hr className="h-1 bg-[#f0f0f0] my-10" />

								<MainLayoutCategory data={category1} countPosts={4}></MainLayoutCategory>

							</div>

							<div className="col-span-1 small-xl:col-span-2 border-y-4 small-xl:border-y-0 border-l-0 small-xl:border-l-4 border-l-[#f0f0f0] px-5">
								<div className=" sticky top-10 h-fit my-14 small-xl:mt-0">
									<img className='m-auto' src="https://crdms.images.consumerreports.org/c_lfill,w_240,q_auto,f_auto,dpr_1/prod/products/cr/models/413452-solar-generators-4patriots-patriot-power-solar-panel-generator-1800-10038607" alt="" />
								</div>
							</div>
						</div>
					</div>

					<div className="my-24">
						<div className="grid grid-cols-1 small-xl:grid-cols-9 gap-10">
							<div className="col-span-1 small-xl:col-span-7">
								<Link href={category2?.uri ?? "/"} className="w-fit block"><h3 className="main-title">{category2?.name}</h3></Link>
								<p className="text-lg mt-7 font-semibold" dangerouslySetInnerHTML={{ __html: category2?.description }}></p>
								<hr className="h-1 bg-[#f0f0f0] my-10" />

								<MainLayoutCategory data={category2} countPosts={4}></MainLayoutCategory>
							</div>

							<div className="col-span-1 small-xl:col-span-2 border-y-4 small-xl:border-y-0 border-l-0 small-xl:border-l-4 border-l-[#f0f0f0] px-5">
								<div className=" sticky top-10 h-fit my-14 small-xl:mt-0">
									<img className='m-auto' src="https://crdms.images.consumerreports.org/c_lfill,w_240,q_auto,f_auto,dpr_1/prod/products/cr/models/413452-solar-generators-4patriots-patriot-power-solar-panel-generator-1800-10038607" alt="" />
								</div>
							</div>
						</div>
					</div>

					<div className="my-24">
						<div className="grid grid-cols-1 small-xl:grid-cols-9 gap-10">
							<div className="col-span-1 small-xl:col-span-7">
								<Link href={category3?.uri ?? "/"} className="w-fit block"><h3 className="main-title">{category3?.name}</h3></Link>
								<p className="text-lg mt-7 font-semibold" dangerouslySetInnerHTML={{ __html: category3?.description }}></p>
								<hr className="h-1 bg-[#f0f0f0] my-10" />

								<MainLayoutCategory data={category3} countPosts={4}></MainLayoutCategory>

							</div>

							<div className="col-span-1 small-xl:col-span-2 border-y-4 small-xl:border-y-0 border-l-0 small-xl:border-l-4 border-l-[#f0f0f0] px-5">
								<div className=" sticky top-10 h-fit my-14 small-xl:mt-0">
									<img className='m-auto' src="https://crdms.images.consumerreports.org/c_lfill,w_240,q_auto,f_auto,dpr_1/prod/products/cr/models/413452-solar-generators-4patriots-patriot-power-solar-panel-generator-1800-10038607" alt="" />
								</div>
							</div>
						</div>
					</div>

					<div className="my-24">
						<div className="grid grid-cols-1 small-xl:grid-cols-9 gap-10">
							<div className="col-span-1 small-xl:col-span-7">
								<Link href={category4?.uri ?? "/"} className="w-fit block"><h3 className="main-title">{category4?.name}</h3></Link>
								<p className="text-lg mt-7 font-semibold" dangerouslySetInnerHTML={{ __html: category4?.description }}></p>
								<hr className="h-1 bg-[#f0f0f0] my-10" />

								<MainLayoutCategory data={category4} countPosts={4}></MainLayoutCategory>

							</div>

							<div className="col-span-1 small-xl:col-span-2 border-y-4 small-xl:border-y-0 border-l-0 small-xl:border-l-4 border-l-[#f0f0f0] px-5">
								<div className=" sticky top-10 h-fit my-14 small-xl:mt-0">
									<img className='m-auto' src="https://crdms.images.consumerreports.org/c_lfill,w_240,q_auto,f_auto,dpr_1/prod/products/cr/models/413452-solar-generators-4patriots-patriot-power-solar-panel-generator-1800-10038607" alt="" />
								</div>
							</div>
						</div>
					</div>

					<div className="my-24">
						<div className="grid grid-cols-1 small-xl:grid-cols-9 gap-10">
							<div className="col-span-1 small-xl:col-span-7">
								<Link href={category5?.uri ?? "/"} className="w-fit block"><h3 className="main-title">{category5?.name}</h3></Link>
								<p className="text-lg mt-7 font-semibold" dangerouslySetInnerHTML={{ __html: category5?.description }}></p>
								<hr className="h-1 bg-[#f0f0f0] my-10" />

								<MainLayoutCategory data={category5} countPosts={4}></MainLayoutCategory>

							</div>

							<div className="col-span-1 small-xl:col-span-2 border-y-4 small-xl:border-y-0 border-l-0 small-xl:border-l-4 border-l-[#f0f0f0] px-5">
								<div className=" sticky top-10 h-fit my-14 small-xl:mt-0">
									<img className='m-auto' src="https://crdms.images.consumerreports.org/c_lfill,w_240,q_auto,f_auto,dpr_1/prod/products/cr/models/413452-solar-generators-4patriots-patriot-power-solar-panel-generator-1800-10038607" alt="" />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className='bg-[#eff5f1] py-10 px-4'>
				<hr className='bg-black w-10' />
				<div className='max-w-[768px] m-auto bg-'>
					<p className='font-merriweather text-[22px] md:text-[24px] text-center leading-9 italic'>An independent, nonprofit member organization that works side by side with consumers for truth, transparency, and fairness in the marketplace.</p>
					<div className='grid grid-cols-1 md:grid-cols-3 gap-10 my-10'>
						<div className='col-span-1 flex justify-center flex-col items-center'>
							<img src="/images/no-profit.svg" alt="" />
							<strong className='block mt-3'>Nonprofit</strong>
							<p>Promoting transparency</p>
						</div>

						<div className='col-span-1 flex justify-center flex-col items-center'>
							<img src="/images/consumer-diven.svg" alt="" />
							<strong className='block mt-3'>Consumer-Driven</strong>
							<p>For 85+ years</p>
						</div>

						<div className='col-span-1 flex justify-center flex-col items-center'>
							<img src="/images/independnet.svg" alt="" />
							<strong className='block mt-3'>Independent</strong>
							<p>No advertising</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ArchiveLayout
