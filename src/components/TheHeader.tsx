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
		<header class="sticky flex justify-between bg-bg-secondary-light dark:bg-bg-secondary-dark py-4 px-12 shadow-lg">
			<h1 class="text-2xl font-bold">Where in the world?</h1>
			<button type="button" class="before:(c_ i-ph-moon mr-2) before:dark:i-ph-moon-fill outline-none" onClick={toggleDarkMode}>
				Dark Mode
			</button>
		</header>
	);
}
