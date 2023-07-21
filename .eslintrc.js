module.exports = {
  env: {
    node: true,
  },
  extends: ["eslint:recommended", "plugin:vue/vue3-recommended"],
  rules: {
    "vue/require-default-prop": "off",
    "vue/no-setup-props-destructure": "off",
    "vue/require": "off",
    "no-undef": "off",
    "vue/require-prop-types": "off",
  },
};
