<template>
  <div id="app">
    <VueCustomSlider />
  </div>
</template>

<script>
import VueCustomSlider from './components/VueCustomSlider.vue';

export default {
  name: 'App',
  components: {
    VueCustomSlider,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 80%;
  margin: 60px auto;
}
</style>
