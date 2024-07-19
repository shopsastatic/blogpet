import { NC_SITE_SETTINGS } from '@/contains/site-settings'
import { XMarkIcon } from '@heroicons/react/20/solid'

export default function Banner() {
	const description = NC_SITE_SETTINGS.top_banner?.description
	const enable = NC_SITE_SETTINGS.top_banner?.enable
	const end_link = NC_SITE_SETTINGS.top_banner?.end_link || {
		url: '',
		text: '',
		new_tab: false,
	}

	// const [show, setshow] = useState(false);

	// useEffect(() => {
	//   if (typeof window !== "undefined") {
	//     setshow(!localStorage.dismiss_top_banner);
	//   }
	// }, []);

	if (!enable) {
		return null
	}

	return (
		<div>
			<p className="p-3 py-1 text-xs leading-5 text-center sm:text-sm sm:leading-6 font-semibold">
				Ad-free. Influence-free. Powered by consumers.
			</p>
		</div>
	)
}
