import TheSearchInput, { SearchSearchParamsType } from '~/components/TheSearchInput';
import TheSearchContinentList from '~/components/TheSearchContinentList';
import { Title } from '@solidjs/meta';
import { createAsync, RouteDefinition, useSearchParams } from '@solidjs/router';
import { queryCountriesList } from '~/server/countries';
import { For, Suspense } from 'solid-js';

export const route = {
	load() {
		const [query] = useSearchParams<SearchSearchParamsType>();
		void queryCountriesList({
			continent: query.continent,
			pattern:   query.pattern,
		});
	},
} satisfies RouteDefinition;

export default function Page() {
	const [query] = useSearchParams<SearchSearchParamsType>();
	const countriesQuery = createAsync(() => queryCountriesList({
		continent: query.continent,
		pattern:   query.pattern,
	}));

	const title = () => {
		let titlePrefix = 'Country Search';
		if (query.continent) titlePrefix+=` - ${query.continent}`;
		return titlePrefix;
	};

	return (
		<main class="mx-12">
			<Title>{title()}</Title>
			<nav class="my-4 flex justify-between">
				<TheSearchInput />
				<TheSearchContinentList />
			</nav>
			<article>
				<ul class="grid-(~ cols-fit-80) gap-5 place-items-center">
					<Suspense>
						<For
							each={countriesQuery()}
							children={(it) => {
								const link = () => `/countries/${it.id}`;

								return (
									<li class="bg-bg-secondary-light dark:bg-bg-secondary-dark rounded-lg overflow-hidden max-w-80">
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
