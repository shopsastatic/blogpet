import { FragmentType } from '@/__generated__'
import { NC_FOOTER_MENU_QUERY_FRAGMENT } from '@/fragments/menu'
import WidgetAddSubscriberForm from '../WidgetAddSubscriberForm/WidgetAddSubscriberForm'
import { NC_SITE_SETTINGS } from '@/contains/site-settings'
import MyImage from '../MyImage'
import { flatListToHierarchical } from '@faustwp/core'
import { NcFooterMenuFieldsFragmentFragment } from '@/__generated__/graphql'
import Link from 'next/link'
import Logo from '../Logo/Logo'

interface Props {
	menuItems: FragmentType<typeof NC_FOOTER_MENU_QUERY_FRAGMENT>[] | null
}

export type FooterNavItemType = NcFooterMenuFieldsFragmentFragment & {
	children?: FooterNavItemType[]
}


export default function Footer({ menuItems }: any) {
	let countMenus = 0;
	if(menuItems?.footer1?.length) {
		countMenus ++;
	}
	if(menuItems?.footer2?.length) {
		countMenus ++;
	}
	if(menuItems?.footer3?.length) {
        countMenus ++;
    }
	if(menuItems?.footer4?.length) {
        countMenus ++;
    }
	if(menuItems?.footer5?.length) {
        countMenus ++;
    }

	return (
		<footer className='bg-[#1f1c1c] text-white py-14'>
			<div className='footer-top container !max-w-[740px] small-xl:!max-w-[1200px]'>
				<div className='footer-logo mb-10 max-w-[150px]'>
					<Logo></Logo>
				</div>

				<div className={`footer-menu grid grid-col-1 md:grid-cols-${Math.ceil((countMenus + 1) / 2)} small-xl:grid-cols-${countMenus + 1} gap-y-10 md:gap-y-20 small-xl:gap-0`}>
					{menuItems?.footer1?.length && (
						<div className='col-span-1'>
							<p className='font-bold mb-3'>Support</p>
							<ul className='footer-1 flex flex-col gap-2'>
								{menuItems?.footer1?.map((item: any, index: any) => (
									<Link href={item.uri ?? "/"} className='block w-fit' key={index}>
										<li>{item.label}</li>
									</Link>
								))}
							</ul>
						</div>
					)}

					{menuItems?.footer2?.length && (
						<div className='col-span-1'>
							<p className='font-bold mb-3'>Company</p>
							<ul className='footer-2 flex flex-col gap-2'>
								{menuItems?.footer2?.map((item: any, index: any) => (
									<Link href={item.uri ?? "/"} className='block w-fit' key={index}>
										<li>{item.label}</li>
									</Link>
								))}
							</ul>
						</div>
					)}

					{menuItems?.footer3?.length && (
						<div className='col-span-1'>
							<p className='font-bold mb-3'>Product Reviews</p>
							<ul className='footer-3 flex flex-col gap-2'>
								{menuItems?.footer3?.map((item: any, index: any) => (
									<Link href={item.uri ?? "/"} className='block w-fit' key={index}>
										<li>{item.label}</li>
									</Link>
								))}
							</ul>
						</div>
					)}

					{menuItems?.footer4?.length && (
						<div className='col-span-1'>
							<p className='font-bold mb-3'>For Businesses</p>
							<ul className='footer-4 flex flex-col gap-2'>
								{menuItems?.footer4?.map((item: any, index: any) => (
									<Link href={item.uri ?? "/"} className='block w-fit' key={index}>
										<li>{item.label}</li>
									</Link>
								))}
							</ul>
						</div>
					)}

					{menuItems?.footer5?.length && (
						<div className='col-span-1'>
							<p className='font-bold mb-3'>Resources</p>
							<ul className='footer-5 flex flex-col gap-2'>
								{menuItems?.footer5?.map((item: any, index: any) => (
									<Link href={item.uri ?? "/"} className='block w-fit' key={index}>
										<li>{item.label}</li>
									</Link>
								))}
							</ul>
						</div>
					)}

					<div className='col-span-1 flex flex-col md:flex-row md:block items-center justify-center'>
						<Link href={"/"} className='block md:!w-full'>
							<button className='bg-[#0d9f40] w-[200px] md:w-full font-semibold text-black py-2 rounded-3xl hover:bg-white transition-all'>Donate</button>
						</Link>

						<div className='flex gap-3 justify-between mt-7'>
							<Link href={"/"} className='w-1/4 block'>
								<img width={25} src="/images/posts/facebook-icon.png" alt="" />
							</Link>
							<Link href={"/"} className='w-1/4 block'>
								<img width={25} src="/images/posts/x-icon.png" alt="" />
							</Link>
							<Link href={"/"} className='w-1/4 block'>
								<img width={25} src="/images/posts/whatsapp-icon.png" alt="" />
							</Link>
							<Link href={"/"} className='w-1/4 block'>
								<img width={25} src="/images/posts/mail-icon.png" alt="" />
							</Link>
						</div>
					</div>
				</div>
			</div>

			<div className='footer-bottom container mt-16'>
				<hr />
				<div className='grid grid-cols-1 small-xl:grid-cols-3 pt-10'>
					{menuItems?.footerBottom && (
						<div className='col-span-1 small-xl:col-span-2 flex justify-center small-xl:block'>
							<ul className='footer-5 flex gap-7 flex-wrap justify-center md:justify-start'>
								{menuItems?.footerBottom?.map((item: any, index: any) => (
									<Link href={item.uri ?? "/"} className='block w-fit text-sm' key={index}>
										<li>{item.label}</li>
									</Link>
								))}
							</ul>
						</div>
					)}
					<div className='col-span-1 flex justify-center small-xl:justify-end mt-10 small-xl:mt-0'>
						<span className='text-sm'>© 2024 Consumer Reports, Inc.</span>
					</div>
				</div>
			</div>
		</footer>
	)
}
