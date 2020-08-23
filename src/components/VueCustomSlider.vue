<template>
  <div>
    <div class="custom-slider" :style="{ width: sliderWidth + 'px' }">
      <div class="start-point" :style="{ left: startPointLeft + 'px' }">
        <div class="start-point__text">START POINT</div>
      </div>
      <div
        v-for="(item, index) in sliderData"
        :key="index"
        :style="{
          left: leftEventWidth(item.date) + 'px',
          background: item.color,
        }"
        class="break-point"
      ></div>
      <div
        class="thumb"
        :style="{ left: sliderWidth - 3 * startPointLeft + 'px' }"
      ></div>
      <div
        class="end-point"
        :style="{ left: sliderWidth - 2 * startPointLeft + 'px' }"
      >
        <div class="end-point__text">END POINT</div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
export default {
  props: {
    sliderWidth: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      startPointLeft: 15,
      sliderData: [
        {
          date: moment().add(-32, 'hours'),
          eventType: 'startPoint',
          color: 'green',
        },
        {
          date: moment().add(-29, 'hours'),
          eventType: 'update',
          color: 'blue',
        },
        {
          date: moment().add(-25, 'hours'),
          eventType: 'allocation',
          color: 'red',
        },
        {
          date: moment().add(-22, 'hours'),
          eventType: 'allocation',
          color: 'red',
        },
        {
          date: moment().add(-19, 'hours'),
          eventType: 'allocation',
          color: 'red',
        },
        {
          date: moment().add(-18, 'hours'),
          eventType: 'update',
          color: 'blue',
        },
        {
          date: moment().add(-10, 'hours'),
          eventType: 'allocation',
          color: 'red',
        },
        {
          date: moment().add(-8, 'hours'),
          eventType: 'system',
          color: 'purple',
        },
        {
          date: moment().add(-7, 'hours'),
          eventType: 'update',
          color: 'blue',
        },
        {
          date: moment().add(-5, 'hours'),
          eventType: 'allocation',
          color: 'red',
        },
        {
          date: moment().add(-4, 'hours'),
          eventType: 'update',
          color: 'blue',
        },
        {
          date: moment().add(-2, 'hours'),
          eventType: 'allocation',
          color: 'red',
        },
        {
          date: moment().add(-1, 'hours'),
          eventType: 'update',
          color: 'blue',
        },
        {
          date: moment(),
          eventType: 'allocation',
          color: 'red',
        },
      ],
    };
  },
  methods: {
    leftEventWidth(date) {
      let duration = moment().diff(date);
      let width =
        (duration / this.maxDiffDuration) *
        (this.sliderWidth - 3 * this.startPointLeft);
      return this.sliderWidth - 2 * this.startPointLeft - width;
    },
  },
  computed: {
    maxDiffDuration() {
      return moment().diff(this.sliderData[0].date);
    },
    sliderDataLength() {
      return this.sliderData.length;
    },
  },
};
</script>

<style lang="scss" scoped>
.custom-slider {
  border-radius: 10px;
  border: 1px solid #b3c4d4;
  height: 20px;
  background: #f9fafc;
  box-shadow: inset 0 4px 8px 0 rgba(0, 0, 0, 0.1);
  z-index: 1;
  position: relative;
  .break-point {
    height: 20px;
    width: 2px;
    position: absolute;
    cursor: pointer;
  }
}
.start-point {
  height: 12px;
  width: 2px;
  position: absolute;
  bottom: 20px;
  background: #4285f4;
  &__text {
    position: relative;
    left: -10px;
    bottom: 22px;
    text-align: center;
    color: #4285f4;
    font-size: 10px;
    font-weight: 700;
  }
}
.end-point {
  height: 12px;
  width: 2px;
  position: absolute;
  bottom: 20px;
  background: #4285f4;
  &__text {
    position: relative;
    left: -10px;
    bottom: 22px;
    text-align: center;
    color: #4285f4;
    font-size: 10px;
    font-weight: 700;
  }
}
.thumb {
  z-index: 2;
  position: absolute;
  top: -7px;
  width: 30px;
  height: 30px;
  border-radius: 15px;
  box-shadow: -4px 0 8px 0 rgba(0, 0, 0, 0.1);
  border: 1px solid #fff;
  background: #e6ecf1;
}
</style>
