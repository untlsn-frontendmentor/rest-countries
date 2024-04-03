import { cache } from '@solidjs/router';
import data from './data.json';

export const queryCountriesList = cache(async (payload: {
	pattern?:   string,
	continent?: string,
}) => {
	'use server';

	return data.filter((v) => {
		if (payload.continent && payload.continent != v.region) return false;
		return !payload.pattern || v.name.includes(payload.pattern);
	}).map((v, id) => ({
		id,
		flag:       v.flag,
		name:       v.name,
		population: v.population,
		region:     v.region,
		capital:    v.capital,
	}));
}, 'countries-list');
