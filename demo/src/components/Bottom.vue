<script setup>
import { toRefs } from "vue";
const props = defineProps({
  comments: { type: Array, required: true },
});

const { comments } = toRefs(props);
</script>

<template>
  <div v-bind="$attrs">
    <div class="results" :class="{ 'bottom-results': $attrs.target }">
      <div v-for="comment in comments" :key="comment.id" class="result">
        <div>{{ comment.email }}</div>
        <div>{{ comment.id }}</div>
      </div>
      <infinite-loading class="loader" v-bind="$attrs" />
    </div>
  </div>
</template>

<style>
.bottom-results {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 76vh;
  max-height: 600px;
  width: 500px;
  max-width: 90vw;
  overflow-y: scroll;
  margin: 0 auto;
  background: #333536;
  border-radius: 10px;
  padding: 10px;
}
</style>
