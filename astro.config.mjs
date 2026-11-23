// @ts-check
import { defineConfig, fontProviders } from "astro/config";

// https://astro.build/config
export default defineConfig({
  site: "https://shtirlizc.github.io",
  base: "/i-am-from-vk",
  redirects: {
    "/404": "/i-am-from-vk",
  },
  vite: {
    build: {
      cssMinify: "esbuild",
    },
  },
  fonts: [
    {
      provider: fontProviders.local(),
      name: "VK Sans Display",
      cssVariable: "--font-primary",
      display: "swap",
      options: {
        variants: [
          {
            src: [
              "./src/assets/fonts/VKSansDisplay/VKSansDisplay-Regular.woff2",
              "./src/assets/fonts/VKSansDisplay/VKSansDisplay-Regular.woff",
            ],
            weight: "400",
            style: "normal",
          },
          {
            src: [
              "./src/assets/fonts/VKSansDisplay/VKSansDisplay-Medium.woff2",
              "./src/assets/fonts/VKSansDisplay/VKSansDisplay-Medium.woff",
            ],
            weight: "500",
            style: "normal",
          },
          {
            src: [
              "./src/assets/fonts/VKSansDisplay/VKSansDisplay-DemiBold.woff2",
              "./src/assets/fonts/VKSansDisplay/VKSansDisplay-DemiBold.woff",
            ],
            weight: "600",
            style: "normal",
          },
        ],
      },
    },
    {
      provider: fontProviders.local(),
      name: "VK Sans Display Expanded",
      cssVariable: "--font-secondary",
      display: "swap",
      options: {
        variants: [
          {
            src: [
              "./src/assets/fonts/VKSansDisplayExpanded/VKSansDisplayExp-Blk.woff2",
              "./src/assets/fonts/VKSansDisplayExpanded/VKSansDisplayExp-Blk.woff",
            ],
            weight: "900",
            style: "normal",
          },
        ],
      },
    },
  ],
});
