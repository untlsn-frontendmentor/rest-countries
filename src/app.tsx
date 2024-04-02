// @refresh reload
import 'untcss-reset';
import 'uno.css';
import { Router } from '@solidjs/router';
import TheHeader from '~/components/TheHeader';
import { FileRoutes } from '@solidjs/start/router';
import { Suspense } from 'solid-js';
import { MetaProvider } from '@solidjs/meta';


export default function App() {
	return (
		<Router root={(props) => (
			<MetaProvider>
				<div class="dark:(text-white bg-bg-primary-dark) bg-bg-primary-light min-h-screen">
					<TheHeader />
					<Suspense>{props.children}</Suspense>
				</div>
			</MetaProvider>
		)}
		>
			<FileRoutes />
		</Router>
	);
}
