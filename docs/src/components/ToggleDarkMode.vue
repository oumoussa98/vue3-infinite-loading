<template>
  <button @click="handleClick" aria-label="Toggle Darkmode" title="Toggle Darkmode">
    <slot :dark="isDarkMode" />
  </button>
</template>

<script>
export const LIGHTS_OUT = "lights-out";

export default {
  data() {
    return {
      isDarkMode: true,
    };
  },

  methods: {
    handleClick() {
      const hasDarkMode = document.documentElement.hasAttribute(LIGHTS_OUT);

      // Toggle dark mode on click.
      return this.toggleDarkMode(!hasDarkMode);
    },

    toggleDarkMode(shouldBeDark) {
      console.log(shouldBeDark);

      document.documentElement.toggleAttribute(LIGHTS_OUT, shouldBeDark);

      this.isDarkMode = shouldBeDark;

      this.writeToStorage(shouldBeDark);

      return shouldBeDark;
    },

    hasInStorage() {
      const check = localStorage.getItem(LIGHTS_OUT);

      return check !== null;
    },

    writeToStorage(prefersDark) {
      localStorage.setItem(LIGHTS_OUT, prefersDark ? "true" : "false");
    },

    getFromStorage() {
      return localStorage.getItem(LIGHTS_OUT) === "true" ? true : false;
    },
  },

  mounted() {
    if (this.hasInStorage()) {
      this.toggleDarkMode(this.getFromStorage());
    }
  },
};
</script>

<style></style>
