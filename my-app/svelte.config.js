/*import adapter from '@sveltejs/adapter-auto';

/** @type {import('@sveltejs/kit').Config} */
/**const config = {
	kit: {
		// adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.
		// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
		// See https://svelte.dev/docs/kit/adapters for more information about adapters.
		adapter: adapter()
	}
};

export default config;
*/
import adapter from '@sveltejs/adapter-node'; // Asegúrate de importar correctamente el adaptador

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter(), // Usando el adaptador de Node.js
    paths: {
      base: '', // Si estás desplegando en la raíz, asegúrate de no tener una base URL configurada
    },
  }
};

export default config;
