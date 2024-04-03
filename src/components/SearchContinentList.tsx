import { createSelector, createSignal, For, Show } from 'solid-js';
import { useSearchParams } from '@solidjs/router';
import clsx from 'clsx';
import useDocumentEventListener from '~/hooks/useDocumentEventListener';

const continents = [
	'Africa',
	'Americas',
	'Asia',
	'Europa',
	'Oceania',
];

export default function SearchContinentList() {
	const [query, setQuery] = useSearchParams<{ continent?: string }>();

	const isSelected = createSelector(() => query.continent);
	const [open, setOpen] = createSignal(false);
	let innerClick = false;

	useDocumentEventListener('click', () => {
		if (open() && !innerClick) setOpen(false);
		else innerClick = false;
	});

	return (
		<div
			class="shadow-lg relative bg-bg-secondary-light dark:bg-bg-secondary-dark rounded"
			onClick={() => {
				innerClick = true;
			}}
		>
			<button
				type="button"
				class="after:(c_ i-ph-caret-down ml-8) size-full px-6"
				onClick={() => setOpen(!open())}
			>
				Filter by Region
			</button>
			<Show when={open()}>
				<ul class="py-2 rounded bg-bg-secondary-light dark:bg-bg-secondary-dark absolute top-11/10 w-full capitalize space-y-2">
					<For
						each={continents}
						children={(it) => {

							return (
								<li class="px-6">
									<button
										type="button"
										class={clsx(
											'capitalize',
											isSelected(it) && 'underline',
										)}
										onClick={() => {
											setQuery({ continent: isSelected(it) ? undefined : it });
											setOpen(false);
										}}
									>
										{it}
									</button>
								</li>
							);
						}}
					/>
				</ul>
			</Show>
		</div>
	);
}
