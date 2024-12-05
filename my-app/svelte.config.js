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
import adapter from '@sveltejs/adapter-node';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter(),
    paths: {
      base: '', // Si estás desplegando en la raíz
    },
    prerender: {
      default: false, // Cambia a `true` si deseas habilitar prerenderización
    },
  },
};

export default config;
