import { cache } from '@solidjs/router';
import data from './data.json';

export const queryCountryDetails = cache(async (id: number) => {
	'use server';

	const country = data[id];

	return {
		flag:           country.flag,
		name:           country.name,
		nativeName:     country.nativeName,
		population:     country.population,
		region:         country.region,
		subRegion:      country.subregion,
		capital:        country.capital,
		topLevelDomain: country.topLevelDomain,
		currencies:     country.currencies?.map((v) => v.name).join(', '),
		languages:      country.languages.map((v) => v.name).join(', '),
		border:         country.borders?.map((shortName) => {
			const id = data.findIndex((v) => v.alpha3Code == shortName);
			return {
				name: data[id].name,
				id,
			};
		}),
	};
}, 'countryDetails');

type CountriesList = {
	id:         number,
	flag:       string,
	name:       string,
	population: number,
	region:     string,
	capital?:   string,
}
export const queryCountriesList = cache(async (payload: {
	pattern?:   string,
	continent?: string,
}) => {
	'use server';

	const res: CountriesList[] = [];


	data.forEach((v, id) => {
		if (payload.continent && payload.continent != v.region) return;
		if (payload.pattern && !v.name.includes(payload.pattern)) return;

		res.push({
			id,
			flag:       v.flag,
			name:       v.name,
			population: v.population,
			region:     v.region,
			capital:    v.capital,
		});
	});

	return res;
}, 'countries-list');
