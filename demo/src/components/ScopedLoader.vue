<script setup>
import { ref } from "vue";
import Bottom from "./Bottom.vue";

let { count } = defineProps({ count: { type: Number, default: 20 } })
const comments = ref([]);
let page = 0;

const load = async $state => {
	page++;
	try {
		const response = await fetch(
			"https://jsonplaceholder.typicode.com/comments?_limit=5&_page=" + page
		);
		const json = await response.json();
		if (json.length < 5 || comments.value.length > count) $state.complete();
		else {
			comments.value.push(...json);
			$state.loaded();
		}
	} catch (error) {
		$state.error();
	}
};
</script>

<template>
  <Bottom
    :comments="comments"
    class="scoped-loader"
    @infinite="load"
  />
</template>
