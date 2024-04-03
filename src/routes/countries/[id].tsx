import { createAsync, RouteDefinition, useParams } from '@solidjs/router';
import { queryCountryDetails } from '~/server/countries';
import { For, Suspense } from 'solid-js';

export const route = {
	load(v) {
		void queryCountryDetails(+v.params.id);
	},
} satisfies RouteDefinition;

export default function Page() {
	const params = useParams<{ id: string }>();
	const countryDetailsQuery = createAsync(() => queryCountryDetails(+params.id));

	return (
		<main class="m-12">
			<a href="/" class="before:(c_ i-ph-arrow-left mr-2) py-2 px-6 rounded shadow bg-bg-secondary-light dark:bg-bg-secondary-dark">
				Back
			</a>
			<article class="grid-(~ cols-2) mt-20 gap-4">
				<Suspense fallback={<div class="w-115 h-100 mx-auto bg-bg-secondary-light dark:bg-bg-secondary-dark" />}>
					<img src={countryDetailsQuery()?.flag} alt="flag" class="h-100 mx-auto" />
				</Suspense>
				<div class="my-12 flex-(~ col)">
					<Suspense>
						<h1 class="mb-6 text-2xl font-bold">
							{countryDetailsQuery()?.name}
						</h1>
						<ul class="grid-(~ cols-2) gap-2 font-light mb-4">
							<li>
								<strong>Native Name: </strong>
								{countryDetailsQuery()?.nativeName}
							</li>
							<li>
								<strong>Top Level Domain: </strong>
								{countryDetailsQuery()?.topLevelDomain}
							</li>
							<li>
								<strong>Population: </strong>
								{countryDetailsQuery()?.population.toLocaleString()}
							</li>
							<li>
								<strong>Currencies: </strong>
								{countryDetailsQuery()?.currencies}
							</li>
							<li>
								<strong>Region: </strong>
								{countryDetailsQuery()?.region}
							</li>
							<li>
								<strong>Languages: </strong>
								{countryDetailsQuery()?.languages}
							</li>
							<li>
								<strong>Sub Region: </strong>
								{countryDetailsQuery()?.subRegion}
							</li>
							<li class="col-start-1">
								<strong>Capital: </strong>
								{countryDetailsQuery()?.capital}
							</li>
						</ul>
						<div class="flex-(~ wrap) gap-4 items-center mt-auto">
							<h3>Border Countries:</h3>
							<For
								each={countryDetailsQuery()?.border}
								children={(it) => (
									<a href={`/countries/${it.id}`} class="py-1 px-6 rounded font-thin shadow bg-bg-secondary-light dark:bg-bg-secondary-dark text-sm">
										{it.name}
									</a>
								)}
							/>
						</div>
					</Suspense>
				</div>
			</article>
		</main>
	);
}
