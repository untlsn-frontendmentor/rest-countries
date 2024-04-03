import { onMount } from 'solid-js';

const IS_DARK_KEY = 'dark';

export default function TheHeader() {
	onMount(() => {
		const isDarkStr = localStorage.getItem(IS_DARK_KEY);
		const isDark = isDarkStr
			? isDarkStr == 'true'
			: window.matchMedia('(prefers-color-scheme: dark)').matches;


		document.body.classList.toggle('dark', isDark);
	});
	const toggleDarkMode = () => {
		const isDark = document.body.classList.toggle('dark');
		localStorage.setItem(IS_DARK_KEY, String(isDark));
	};

	return (
		<>
			<header class="fixed flex items-center justify-between bg-bg-secondary-light dark:bg-bg-secondary-dark h-15 w-full top-0 left-0 px-12 max-sm:px-4 shadow-lg">
				<h1 class="text-2xl font-bold max-sm:text-lg">
					<a href="/">
						Where in the world?
					</a>
				</h1>
				<button type="button" class="before:(c_ i-ph-moon mr-2) before:dark:i-ph-moon-fill outline-none" onClick={toggleDarkMode}>
					Dark Mode
				</button>
			</header>
			<div aria-hidden class="h-15" />
		</>
	);
}
