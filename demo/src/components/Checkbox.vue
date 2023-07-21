<script setup>
defineProps({
  label: { type: String, required: true },
  disabled: { type: Boolean, required: false },
  checked: { required: false },
});
const emit = defineEmits(["click"]);
</script>
<template>
  <label
    class="wrapper flex items-center"
    :class="{ disabled: disabled }"
  >
    <slot />
    <input
      class="checkbox"
      type="checkbox"
      :checked="checked"
      @click="emit('click')"
    >
    <span class="checkmark" />
  </label>
</template>

<style scoped>
.disabled {
  pointer-events: none;
  opacity: 0.4;
}
.wrapper {
  position: relative;
  padding-left: 26px;
  cursor: pointer;
}
.wrapper input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}
.checkmark {
  position: absolute;
  top: -1px;
  left: 0;
  height: 20px;
  width: 20px;
  border-radius: 4px;
  background: inherit;
  border: 2px solid #1eb476;
}
.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}
.wrapper input:checked ~ .checkmark:after {
  display: block;
}
.wrapper .checkmark:after {
  left: 5px;
  top: 1px;
  width: 4px;
  height: 9px;
  border: solid #1fc47f;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}
</style>
