import { useSearchParams } from '@solidjs/router';

export type SearchSearchParamsType = { continent?: string, pattern?: string };

export default function TheSearchInput() {
	const [query, setQuery] = useSearchParams<SearchSearchParamsType>();
	let timeout: NodeJS.Timeout | undefined;

	return (
		<label class="shadow-lg inline-block relative bg-bg-secondary-light dark:bg-bg-secondary-dark rounded">
			<i class="i-ph-magnifying-glass absolute size-5 top-4 left-4"></i>
			<input
				type="text"
				placeholder="Search for a country"
				class="py-4 px-12"
				value={query.pattern || ''}
				onInput={(ev) => {
					const pattern = ev.currentTarget.value;
					clearTimeout(timeout);
					timeout = setTimeout(() => {
						setQuery({ pattern }, { replace: true });
					}, 1000);
				}}
			/>
		</label>
	);
}
