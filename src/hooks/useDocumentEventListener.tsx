import { onCleanup, onMount } from 'solid-js';

export default function useDocumentEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any) {
	onMount(() => {
		document.addEventListener(type, listener);

		onCleanup(() => {
			document.removeEventListener(type, listener);
		});
	});
}
