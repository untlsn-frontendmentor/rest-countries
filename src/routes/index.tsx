import SearchInput from '~/components/SearchInput';
import SearchContinentList from '~/components/SearchContinentList';
import { Title } from '@solidjs/meta';
import { createAsync, RouteDefinition, useSearchParams } from '@solidjs/router';
import { queryCountriesList } from '~/server/countries';
import { For, Suspense } from 'solid-js';

export const route = {
	load() {
		const [query] = useSearchParams<{ continent?: string }>();
		void queryCountriesList({
			continent: query.continent,
		});
	},
} satisfies RouteDefinition;

export default function Page() {
	const [query] = useSearchParams<{ continent?: string }>();
	const countriesQuery = createAsync(() => queryCountriesList({
		continent: query.continent,
	}));

	const title = () => {
		let titlePrefix = 'Country Search';
		if (query.continent) titlePrefix+=` - ${query.continent}`;
		return titlePrefix;
	};

	return (
		<main>
			<Title>{title()}</Title>
			<nav class="mx-12 my-4 flex justify-between">
				<SearchInput />
				<SearchContinentList />
			</nav>
			<article>
				<ul class="grid-(~ cols-fit-80) gap-20 mx-20">
					<Suspense>
						<For
							each={countriesQuery()}
							children={(it) => {
								const link = () => `/countries/${it.id}`;

								return (
									<li class="bg-bg-secondary-light dark:bg-bg-secondary-dark rounded-lg overflow-hidden">
										<a href={link()}>
											<img src={it.flag} alt="Flag" class="h-1/2 mx-auto" />
										</a>
										<h3 class="m-4 font-bold text-2xl">
											<a href={link()}>{it.name}</a>
										</h3>
										<ul class="m-4 mb-12 font-light space-y-2">
											<li>
												<strong>Population: </strong>
												{it.population.toLocaleString()}
											</li>
											<li>
												<strong>Region: </strong>
												{it.region}
											</li>
											<li>
												<strong>Capital: </strong>
												{it.capital}
											</li>
										</ul>
									</li>
								);
							}}
						/>
					</Suspense>
				</ul>
			</article>
		</main>
	);
}
