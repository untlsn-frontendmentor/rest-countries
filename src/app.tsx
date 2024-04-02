// @refresh reload
import { createSignal } from "solid-js";
import 'untcss-reset';
import 'uno.css';


export default function App() {
  const [count, setCount] = createSignal(0);

  return (
    <main class="grid place-items-center min-h-screen">
      <div class="text-center space-y-4">
        <h1 class="text-4xl">Hello World!</h1>
        <button
          class="rounded border-1 bg-blue-800 text-white px-4 py-2"
          onClick={() => setCount(count() + 1)}>
          Clicks: {count()}
        </button>
      </div>
    </main>
  );
}
