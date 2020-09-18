<template>
  <div id="app">
    <VueCustomRangeSlider :sliderWidth="800" />
  </div>
</template>

<script>
import VueCustomRangeSlider from './components/VueCustomRangeSlider.vue';

export default {
  name: 'App',
  components: {
    VueCustomRangeSlider,
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
