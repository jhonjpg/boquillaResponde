import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'


// https://vite.dev/config/
export default defineConfig({
    base: '/boquillaResponde/', // <-- SLASH al inicio y al final
    plugins: [tailwindcss()]

})