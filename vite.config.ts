import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import { VitePWA } from 'vite-plugin-pwa';
import type { VitePWAOptions, ManifestOptions } from 'vite-plugin-pwa';

const manifest: Partial<ManifestOptions> = {
  name: "DDR BPM Web",
  short_name: "DDR BPM",
  icons: [
    {
      src: "/favicon/manifest-icon-192.maskable.png",
      sizes: "192x192",
      type: "image/png",
      purpose: "any"
    },
    {
      src: "/favicon/manifest-icon-192.maskable.png",
      sizes: "192x192",
      type: "image/png",
      purpose: "maskable"
    },
    {
      src: "/favicon/manifest-icon-512.maskable.png",
      sizes: "512x512",
      type: "image/png",
      purpose: "any"
    },
    {
      src: "/favicon/manifest-icon-512.maskable.png",
      sizes: "512x512",
      type: "image/png",
      purpose: "maskable"
    }
  ],
  start_url: "/",
  display: "standalone",
  id: "com.xiexingwu.DDR-BPM",
  theme_color: "#000000",
  background_color: "#000000",
  lang: "en",
  orientation: "portrait"
}

const pwaOptions: Partial<VitePWAOptions> = { 
  // registerType: 'autoUpdate' ,
  
  devOptions: {
    enabled: process.env.SW_DEV === 'true',
    navigateFallback: 'index.html',
  },
  manifest: manifest,
  workbox:{
    globPatterns: ['**/*.{js,css,html,ico,json,png,txt}']
  }
}

export default defineConfig({
  build: {
    // sourcemap: process.env.SOURCE_MAP === 'true',
    target: 'esnext',
  },
  plugins: [
    solidPlugin(),
    VitePWA(pwaOptions)
  ],
  server: {
    host: true,
    port: 3333,
  },
});
