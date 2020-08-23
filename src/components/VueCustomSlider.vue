<template>
  <div>
    <div
      class="custom-slider"
      :style="{ width: sliderWidth + 'px', ...sliderBackgroundCssVars }"
    >
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
      sliderBackgroundData: [
        {
          date: moment().add(-32, 'hours'),
          eventType: 'startPoint',
          color: '#f9fafc',
        },
        {
          date: moment().add(-29, 'hours'),
          eventType: 'update',
          color: 'lightblue',
        },

        {
          date: moment().add(-22, 'hours'),
          eventType: 'allocation',
          color: 'rgba(234, 67, 53, 0.4)',
        },

        {
          date: moment().add(-18, 'hours'),
          eventType: 'update',
          color: 'lightblue',
        },

        {
          date: moment().add(-7, 'hours'),
          eventType: 'update',
          color: 'lightgrey',
        },
        {
          date: moment().add(-1, 'hours'),
          eventType: 'update',
          color: 'lightgreen',
        },
        {
          date: moment().add(-1, 'hours'),
          eventType: 'system',
          color: 'rgba(234, 67, 53, 0.17)',
        },
        {
          date: moment(),
          eventType: 'allocation',
          color: 'rgba(234, 67, 53, 0.4)',
        },
      ],
    };
  },
  methods: {
    leftEventWidth(date) {
      let duration = moment().diff(date);
      let width =
        (duration / this.maxDiffDurationEvent) *
        (this.sliderWidth - 3 * this.startPointLeft);
      return this.sliderWidth - 2 * this.startPointLeft - width;
    },
  },
  computed: {
    maxDiffDurationEvent() {
      return moment().diff(this.sliderData[0].date);
    },
    maxDiffDurationBackground() {
      return moment().diff(this.sliderBackgroundData[0].date);
    },
    sliderDataLength() {
      return this.sliderData.length;
    },
    sliderBackgroundCssVars() {
      let arrLinearGradient = [];
      let startPoint = 0;
      this.sliderBackgroundData.forEach((item) => {
        let duration = moment().diff(item.date);
        let width = parseInt(
          this.sliderWidth -
            (duration / this.maxDiffDurationBackground) * this.sliderWidth
        );
        arrLinearGradient.push(`${item.color} ${startPoint}px ${width}px`);
        startPoint = width;
      });
      let linerGradient = arrLinearGradient.join(' , ');
      return {
        background: `repeating-linear-gradient(
    135deg,
    rgba(50, 50, 50, 0),
    rgba(50, 50, 50, 0.12) 1px,
    rgba(50, 50, 50, 0) 2px,
    rgba(50, 50, 50, 0) 4px
  ), linear-gradient(to right, ${linerGradient})`,
      };
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
