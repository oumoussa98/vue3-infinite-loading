<template>
  <div class="container">
    <div class="spinner" />
  </div>
</template>

<style scoped>
.container {
  box-sizing: initial;
  display: inline-block;
  text-align: center;
  border-radius: 50%;
  overflow: hidden;
}
.spinner {
  box-sizing: initial;
  border: 2px solid #a1a1a1;
  border-right-color: transparent;
  width: 23px;
  height: 23px;
  border-radius: 50%;
  animation: spin 0.9s linear infinite;
}
@keyframes spin {
  100% {
    transform: rotate(360deg);
  }
}
</style>
