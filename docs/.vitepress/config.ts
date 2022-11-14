import { defineConfig } from "vitepress";

const nav = [
  { text: "Guide", activeMatch: `^/(guide)/`, link: "/guide/introduction" },
  { text: "API", activeMatch: `^/(api)/`, link: "/api/props" },
  { text: "Demo", link: "https://vue3-infinite-loading-demo.netlify.com/" },
];

const sidebar = {
  "/guide/": [
    {
      text: "Getting Started",
      items: [
        { text: "Introduction", link: "/guide/introduction" },
        { text: "Installation", link: "/guide/installation" },
        { text: "Quick Demo", link: "/guide/quick-demo" },
      ],
    },
  ],
  "/api/": [
    {
      text: "API",
      items: [
        { text: "Props", link: "/api/props" },
        { text: "Events", link: "/api/events" },
        { text: "Slots", link: "/api/slots" },
      ],
    },
  ],
};

export default defineConfig({
  lang: "en-US",
  title: "infinite scroll",
  description: "An infinite scroll component compatible with vue.js 3 and vite",
  head: [["link", { rel: "icon", href: "/logo.svg", type: "image/svg+xml" }]],
  themeConfig: {
    nav,
    sidebar,
    logo: "/logo.svg",
    siteTitle: "Infinite",
    footer: {
      message: "Released under the MIT License.",
    },
    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/oumoussa98/vue3-infinite-loading",
      },
    ],
  },
});
