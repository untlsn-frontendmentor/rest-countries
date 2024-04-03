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
		<main class="p-12">
			<a href="/" class="before:(c_ i-ph-arrow-left mr-2) py-2 px-6 rounded shadow bg-bg-secondary-light dark:bg-bg-secondary-dark">
				Back
			</a>
			<article class="grid-(~ cols-fit-115) mt-20 gap-12">
				<div>
					<Suspense fallback={<div class="h-100 mx-auto bg-bg-secondary-light dark:bg-bg-secondary-dark" />}>
						<img src={countryDetailsQuery()?.flag} alt="flag" class="max-h-100 max-xl:(max-w-full mx-auto) shadow-xl" />
					</Suspense>
				</div>
				<div class="py-12 flex-(~ col)">
					<Suspense>
						<h1 class="mb-6 text-2xl font-bold">
							{countryDetailsQuery()?.name}
						</h1>
						<div class="flex max-sm:flex-col gap-12 mb-8">
							<ul class="space-y-2 gap-2 font-light">
								<li>
									<strong>Native Name: </strong>
									{countryDetailsQuery()?.nativeName}
								</li>
								<li>
									<strong>Population: </strong>
									{countryDetailsQuery()?.population.toLocaleString()}
								</li>
								<li>
									<strong>Region: </strong>
									{countryDetailsQuery()?.region}
								</li>
								<li>
									<strong>Sub Region: </strong>
									{countryDetailsQuery()?.subRegion}
								</li>
								<li>
									<strong>Capital: </strong>
									{countryDetailsQuery()?.capital}
								</li>
							</ul>
							<ul class="space-y-2 gap-2 font-light">
								<li>
									<strong>Top Level Domain: </strong>
									{countryDetailsQuery()?.topLevelDomain}
								</li>
								<li>
									<strong>Currencies: </strong>
									{countryDetailsQuery()?.currencies}
								</li>
								<li>
									<strong>Languages: </strong>
									{countryDetailsQuery()?.languages}
								</li>
							</ul>
						</div>
						<div class="flex-(~ wrap) gap-4 items-center mt-auto max-w-80vw">
							<h3 class="max-sm:basis-100%">Border Countries:</h3>
							<For
								each={countryDetailsQuery()?.border}
								children={(it) => (
									<a
										href={`/countries/${it.id}`}
										class="py-1 px-6 rounded font-thin shadow bg-bg-secondary-light dark:bg-bg-secondary-dark text-sm"
									>
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
