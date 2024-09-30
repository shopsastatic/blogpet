import { FC } from 'react'
import Navigation from '@/components/Navigation/Navigation'
import MenuBar from '@/components/MenuBar/MenuBar'
import { NC_PRIMARY_MENU_QUERY_FRAGMENT } from '@/fragments/menu'
import { FragmentType } from '@/__generated__'
import AvatarDropdown from './AvatarDropdown'
import Brand from './Brand'
import CreateBtn from './CreateBtn'
import { SearchIconBtn } from './HeaderSearch'
import Button from '../Button/Button'
import Link from 'next/link'

export interface MainNav1Props {
	menuItems: FragmentType<typeof NC_PRIMARY_MENU_QUERY_FRAGMENT>[]
	title?: string | null
	description?: string | null
}

const MainNav1: FC<MainNav1Props> = ({ menuItems, title, description }) => {
	return (
		<>
			<div className="main-header flex items-center">
				<div className="container">
					<div className="flex h-12 items-center justify-between py-3 sm:py-4">
						<div className="flex flex-1 items-center">
							<div className="flex flex-1 items-center gap-2">
								<div className='block small-xl:hidden'>
									<MenuBar menuItems={menuItems} />
								</div>
								<div className='logo-image'>
									<Brand title={title} description={description} className='ml-0' />
								</div>

								<Navigation menuItems={menuItems} className="header-menu text-black hidden small-xl:flex" />
							</div>
						</div>


						<div className="flex flex-1 items-center justify-end space-x-1 text-black rtl:space-x-reverse">
							<div className="items-center flex lg:flex">
								<Button href='/email/newsletter/' className='header-subscribe mr-3 !py-2 !text-xs'>SUBSCRIBE</Button>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className='bg-[#ffe53c] py-2.5 hidden md:block'>
				<div className='container'>
					<p className='text-sm text-center'>Is that Prime Day deal worth it? CR experts help you find the best deals on top-rated products.</p>
				</div>
			</div>
		</>
	)
}

export default MainNav1
