import SearchInput from '~/components/SearchInput';
import SearchContinentList from '~/components/SearchContinentList';
import { Title } from '@solidjs/meta';
import { useSearchParams } from '@solidjs/router';

export default function Page() {
	const [query] = useSearchParams<{ continent?: string }>();

	const title = () => {
		let titlePrefix = 'Country Search';
		if (query.continent) {
			const first = query.continent[0];
			const rest = query.continent.slice(1);
			titlePrefix+=` - ${first.toUpperCase()}${rest}`;
		};
		return titlePrefix;
	};

	return (
		<main>
			<Title>{title()}</Title>
			<nav class="mx-12 my-4 flex justify-between">
				<SearchInput />
				<SearchContinentList />
			</nav>
		</main>
	);
}
