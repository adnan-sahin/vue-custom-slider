<template>
  <div>
    <div class="custom-slider">
      <div class="start-point">
        <div class="start-point__text">START POINT</div>
      </div>

      <div class="thumb"></div>
      <div class="end-point">
        <div class="end-point__text">END POINT</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.custom-slider {
  width: 100%;
  border-radius: 10px;
  border: 1px solid #b3c4d4;
  height: 20px;
  background: #f9fafc;
  box-shadow: inset 0 4px 8px 0 rgba(0, 0, 0, 0.1);
  z-index: 1;
  position: relative;
}
.start-point {
  height: 10px;
  width: 2px;
  position: absolute;
  left: calc(5% + 15px);
  bottom: 20px;
  background: #4285f4;
  &__text {
    position: relative;
    bottom: 22px;
    left: calc(5% - 15px);
    text-align: center;
    color: #4285f4;
    font-size: 10px;
    font-weight: 700;
  }
}
.end-point {
  height: 10px;
  width: 2px;
  position: absolute;
  right: calc(5% + 15px);
  bottom: 27px;
  background: #4285f4;
  &__text {
    position: relative;
    bottom: 22px;
    right: calc(5% + 15px);
    text-align: center;
    color: #4285f4;
    font-size: 10px;
    font-weight: 700;
  }
}
.thumb {
  z-index: 2;
  position: absolute;
  right: 5%;
  top: -7px;
  width: 30px;
  height: 30px;
  border-radius: 15px;
  box-shadow: -4px 0 8px 0 rgba(0, 0, 0, 0.1);
  border: 1px solid #fff;
  background: #e6ecf1;
}
</style>
