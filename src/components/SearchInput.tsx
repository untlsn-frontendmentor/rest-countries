export default function SearchInput() {
	return (
		<label class="shadow-lg inline-block relative bg-bg-secondary-light dark:bg-bg-secondary-dark rounded">
			<i class="i-ph-magnifying-glass absolute size-5 top-4 left-4"></i>
			<input type="text" placeholder="Search for a country" class="py-4 px-12" />
		</label>
	);
}
