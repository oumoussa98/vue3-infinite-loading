<template>
  <Layout>
    <div class="pt-8 md:pt-16 container">
      <div class="flex flex-col items-center">
        <div class="flex flex-col items-center mb-2 text-ui-primary">
          <h2 class="text-4xl font-black tracking-tighter text-center border-none">
            Vue.js 3 infinite loading
          </h2>
        </div>
        <p class="text-xl font-medium text-center md:block">
          An infinite scroll component compatible with vue.js 3 and vite
          <br />
          to help you implement an infinite scroll list more easily.
        </p>

        <div class="flex justify-center mt-8">
          <g-link
            to="/docs/"
            class="
              flex
              items-center
              px-6
              pt-3
              pb-4
              ml-auto
              text-2xl
              font-bold
              leading-none
              text-white
              border
              rounded-lg
              shadow-lg
              bg-ui-primary
              border-ui-primary
            "
          >
            Get started
            <ArrowRightCircleIcon class="ml-4" size="1x" />
          </g-link>
        </div>
      </div>

      <div
        class="
          pt-8
          mx-auto
          mt-8
          border-t
          md:mt-16 md:pt-16
          border-top border-ui-border
          max-w-screen-sm
        "
      ></div>

      <div class="flex flex-wrap justify-center -mx-4">
        <div class="flex flex-col items-center w-full px-4 mb-8 text-center md:w-1/3">
          <h3 class="font-bold tracking-wide uppercase text-ui-primary">Light and simple</h3>
          <p class="text-lg">Lignt weight, Simple and easy to use api and a built in spinner</p>
        </div>

        <div class="flex flex-col items-center w-full px-4 mb-8 text-center md:w-1/3">
          <h3 class="font-bold tracking-wide uppercase text-ui-primary">2-directions support</h3>
          <p class="text-lg">Support top and bottom directions</p>
        </div>

        <div class="flex flex-col items-center w-full px-4 mb-4 text-center md:w-1/3">
          <h3 class="font-bold tracking-wide uppercase text-ui-primary">Result display</h3>
          <p class="text-lg">Fully configurable load result display</p>
        </div>
      </div>
    </div>
  </Layout>
</template>

<script>
import { ArrowRightCircleIcon, ZapIcon, CodeIcon, MoonIcon, SearchIcon } from "vue-feather-icons";

export default {
  components: {
    ArrowRightCircleIcon,
    ZapIcon,
    CodeIcon,
    MoonIcon,
    SearchIcon,
  },

  metaInfo() {
    const title = "Vuejs 3 infinite loading";
    const description =
      "An infinite scroll component compatible with vue.js 3 and vite, to help you implement an infinite scroll list more easily";

    return {
      title: title,
      meta: [
        {
          name: "description",
          content: description,
        },
        {
          key: "og:title",
          name: "og:title",
          content: title,
        },
        {
          key: "twitter:title",
          name: "twitter:title",
          content: title,
        },
        {
          key: "og:description",
          name: "og:description",
          content: description,
        },
        {
          key: "twitter:description",
          name: "twitter:description",
          content: description,
        },
      ],
    };
  },
};
</script>

<style>
.home-links a {
  margin-right: 1rem;
}
</style>
