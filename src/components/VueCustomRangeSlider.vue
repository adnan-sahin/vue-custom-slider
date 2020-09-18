<template>
  <div>
    <div
      ref="slider"
      @mousemove="mouseMoveSlider"
      class="custom-slider"
      :style="{ width: sliderWidth + 'px', ...sliderBackgroundCssVars }"
    >
      <div class="start-point"></div>
      <div class="start-point__text">
        {{ formatDatetime(sliderStartDateTime) }}
      </div>
      <div
        v-for="(item, index) in locatedSliderData"
        :key="index"
        :style="{
          left: item.left + 'px',
          background: item.color,
        }"
        @click="handleClickBreakPoint(item.left)"
        class="break-point"
      >
        <span :style="{ color: item.color }" class="tooltip-text">
          <p class="has-break-point-tooltip">
            {{ item.eventType }}
          </p>
        </span>
      </div>
      <div
        ref="sliderThumb"
        @mousedown="handleMouseDownSliderThumb"
        @dragstart="handleDragStartSliderThumb"
        class="thumb"
        :style="{ left: sliderThumbLeft + 'px' }"
      ></div>
      <div class="end-point" :style="{ left: sliderWidth + 'px' }"></div>
      <div class="end-point__text" :style="{ left: sliderWidth - 50 + 'px' }">
        LAST EVENT
        {{ formatDatetime(sliderEndDateTime) }}
      </div>
      <span
        class="resource-tooltip-text"
        :style="{ left: resourceLeft + 'px', color: currentResourceColor }"
      >
        <p>
          {{ currentResourceText }}
        </p>
      </span>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import { throttle } from './helpers';
export default {
  props: {
    sliderWidth: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      resourceLeft: 0,
      startPointLeft: 0,
      currentResourceText: '',
      currentResourceColor: 'grey',
      arrLinearGradientTooltip: [],
      sliderThumbLeft: 0,
      sliderStartDateTime: moment().add(-36, 'hours'),
      sliderEndDateTime: moment(),
      locatedSliderData: [],
      sliderData: [
        {
          date: moment().add(-34, 'hours'),
          eventType: 'create',
          color: 'green',
        },
        {
          date: moment().add(-30, 'hours'),
          eventType: 'update',
          color: 'blue',
        },
        {
          date: moment().add(-29, 'hours'),
          eventType: 'allocation',
          color: 'red',
        },
        {
          date: moment().add(-27, 'hours'),
          eventType: 'allocation',
          color: 'red',
        },
        {
          date: moment().add(-22, 'hours'),
          eventType: 'allocation',
          color: 'red',
        },
        {
          date: moment().add(-18, 'hours'),
          eventType: 'update',
          color: 'blue',
        },
        {
          date: moment().add(-14, 'hours'),
          eventType: 'allocation',
          color: 'red',
        },
        {
          date: moment().add(-12, 'hours'),
          eventType: 'system',
          color: 'purple',
        },
        {
          date: moment().add(-8, 'hours'),
          eventType: 'update',
          color: 'blue',
        },
        {
          date: moment().add(-7, 'hours'),
          eventType: 'allocation',
          color: 'red',
        },
        {
          date: moment().add(-5, 'hours'),
          eventType: 'update',
          color: 'blue',
        },
        {
          date: moment().add(-1.5, 'hours'),
          eventType: 'allocation',
          color: 'red',
        },
      ],
      sliderBackgroundData: [
        {
          startDate: moment().add(-34, 'hours'),
          endDate: moment().add(-30, 'hours'),
          eventType: 'event 1',
          color: 'rgb(128,0,128,0.4)',
        },
        {
          startDate: moment().add(-29, 'hours'),
          endDate: moment().add(-27, 'hours'),
          eventType: 'event 2',
          color: 'lightblue',
        },

        {
          startDate: moment().add(-27, 'hours'),
          endDate: moment().add(-22, 'hours'),
          eventType: 'event 3',
          color: 'rgba(234, 67, 53, 0.4)',
        },

        {
          startDate: moment().add(-18, 'hours'),
          endDate: moment().add(-14, 'hours'),
          eventType: 'event 4',
          color: 'lightblue',
        },

        {
          startDate: moment().add(-12, 'hours'),
          endDate: moment().add(-8, 'hours'),
          eventType: 'event 5',
          color: 'pink',
        },
        {
          startDate: moment().add(-7, 'hours'),
          endDate: moment().add(-5, 'hours'),
          eventType: 'event 6',
          color: 'lightgreen',
        },
        {
          startDate: moment().add(-5, 'hours'),
          endDate: moment().add(-1.5, 'hours'),
          eventType: 'event 7',
          color: 'rgba(234, 67, 53, 0.17)',
        },
      ],
    };
  },
  computed: {
    sliderTotalDuration() {
      return this.sliderEndDateTime.diff(this.sliderStartDateTime);
    },
    sliderBackgroundCssVars() {
      let arrLinearGradient = [];
      let previousEndPoint = 0,
        endPoint = 0;
      this.sliderBackgroundData.forEach((item, index) => {
        let duration = item.endDate.diff(item.startDate);
        let durationFromStart = item.startDate.diff(this.sliderStartDateTime);
        let startPoint =
          (durationFromStart / this.sliderTotalDuration) * this.sliderWidth;
        previousEndPoint = endPoint;
        endPoint =
          ((duration + durationFromStart) / this.sliderTotalDuration) *
          this.sliderWidth;

        if (startPoint > previousEndPoint) {
          arrLinearGradient.push(
            `#f9fafc ${previousEndPoint}px ${startPoint}px`
          );
          this.arrLinearGradientTooltip.push({
            start: previousEndPoint,
            end: startPoint,
            color: 'lightgrey',
            resourceName: 'No Event',
          });
        }
        if (endPoint > 0) {
          arrLinearGradient.push(`${item.color} ${startPoint}px ${endPoint}px`);
          this.arrLinearGradientTooltip.push({
            start: startPoint,
            end: endPoint,
            color: item.color,
            resourceName: item.eventType,
          });
        }
        if (this.sliderBackgroundData.length - 1 == index) {
          const diffDuration = this.sliderEndDateTime.diff(item.endDate);
          if (diffDuration > 0) {
            let width =
              (diffDuration / this.sliderTotalDuration) * this.sliderWidth;
            arrLinearGradient.push(`#f9fafc ${endPoint}px ${width}px`);
            this.arrLinearGradientTooltip.push({
              start: endPoint,
              end: width + endPoint,
              color: 'lightgrey',
              resourceName: 'No Event',
            });
          }
        }
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
  methods: {
    leftEventWidth(date) {
      let duration = moment(this.sliderEndDateTime).diff(date);
      let width = Math.round(
        (duration / this.sliderTotalDuration) * this.sliderWidth
      );
      return this.sliderWidth - width;
    },
    updateCoordinates(event) {
      this.resourceLeft = event.layerX;
      let currentResource =
        this.arrLinearGradientTooltip.find(
          (p) => p.start <= this.resourceLeft && p.end >= this.resourceLeft
        ) || {};
      this.currentResourceText = currentResource.resourceName;
      this.currentResourceColor = currentResource.color;
    },
    handleClickBreakPoint(left) {
      this.sliderThumbLeft = left - 12;
    },
    handleMouseDownSliderThumb(event) {
      event.preventDefault();
      let $refSliderThumb = this.$refs.sliderThumb;
      let $refSlider = this.$refs.slider;
      let shiftX = event.clientX - $refSliderThumb.getBoundingClientRect().left;
      $refSlider.addEventListener('mousemove', onMouseMove);
      $refSlider.addEventListener('mouseup', onMouseUp);
      const $this = this;
      function onMouseMove(event) {
        let newLeft =
          event.clientX - $refSlider.getBoundingClientRect().left - 12;
        if (newLeft < 0) {
          newLeft = 0;
        }
        let rightEdge = $refSlider.offsetWidth - $refSliderThumb.offsetWidth;
        if (newLeft > rightEdge) {
          newLeft = rightEdge;
        }
        const closestBreakPointLeft = $this.locatedSliderData
          .map((p) => p.left)
          .reduce((prev, curr) =>
            Math.abs(curr - newLeft) < Math.abs(prev - newLeft) ? curr : prev
          );
        $this.sliderThumbLeft = closestBreakPointLeft - 12;
      }
      function onMouseUp(event) {
        $refSlider.removeEventListener('mouseup', onMouseUp);
        $refSlider.removeEventListener('mousemove', onMouseMove);
      }
    },
    handleDragStartSliderThumb() {
      return false;
    },
    formatDatetime(date) {
      return date.format('DD.MM.YYYY HH:mm');
    },
  },
  created() {
    this.sliderThumbLeft = this.sliderWidth - 24;
    this.mouseMoveSlider = throttle(this.updateCoordinates, 300);
    this.locatedSliderData = this.sliderData.map((item) => {
      item.left = this.leftEventWidth(item.date);
      return item;
    });
  },
};
</script>

<style lang="scss" scoped>
.custom-slider {
  border: 1px solid #b3c4d4;
  height: 20px;
  background: #f9fafc;
  box-shadow: inset 0 4px 8px 0 rgba(0, 0, 0, 0.1);
  z-index: 1;
  position: relative;
  .resource-tooltip-text {
    visibility: hidden;
    text-align: center;
    border-radius: 5px;
    padding: 4px 6px;
    font-size: 12px;
    background: currentColor;
    // opacity: 0.8;
    // border-color: currentColor;

    /* Position the tooltip */
    position: absolute;
    transform: translate(-50%, -125%);
    p {
      color: #fff;
      padding: 0;
      margin: 0;
      font-size: 12 px;
    }
    z-index: 3;
    &::after {
      content: '';
      position: absolute;
      top: 100%;
      left: 50%;
      margin-left: -5px;
      border-width: 5px;
      border-style: solid;
      border-color: currentColor transparent transparent transparent;
    }
  }
  &:hover .resource-tooltip-text {
    visibility: visible;
  }

  &:before {
    &:hover .resource-tooltip-text {
      visibility: hidden;
    }
  }
  &:after {
    &:hover .resource-tooltip-text {
      visibility: hidden;
    }
  }
  &::before {
    content: '';
    left: -7px;
    bottom: -1px;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    position: absolute;
    border: 1px solid #b3c4d4;
    border-right: none;
    height: 20px;
    background: repeating-linear-gradient(
        135deg,
        rgba(50, 50, 50, 0),
        rgba(50, 50, 50, 0.12) 1px,
        rgba(50, 50, 50, 0) 2px,
        rgba(50, 50, 50, 0) 4px
      ),
      linear-gradient(to right, #f9fafc 0 100%);
    box-shadow: inset 0 4px 8px 0 rgba(0, 0, 0, 0.1);
    width: 7px;
    z-index: 0;
  }
  &::after {
    content: '';
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    left: 100%;
    bottom: -1px;
    height: 20px;
    position: absolute;
    border: 1px solid #b3c4d4;
    border-left: none;
    background: repeating-linear-gradient(
        135deg,
        rgba(50, 50, 50, 0),
        rgba(50, 50, 50, 0.12) 1px,
        rgba(50, 50, 50, 0) 2px,
        rgba(50, 50, 50, 0) 4px
      ),
      linear-gradient(to right, #f9fafc 0 100%);
    box-shadow: inset 0 4px 8px 0 rgba(0, 0, 0, 0.1);
    width: 7px;
    z-index: 0;
  }

  .break-point {
    height: 20px;
    width: 2px;
    position: absolute;
    cursor: pointer;
    right: 0;
    .tooltip-text {
      visibility: hidden;
      text-align: center;
      border-radius: 5px;
      padding: 4px 6px;
      font-size: 12px;
      background: currentColor;
      opacity: 1;
      border-color: currentColor;

      /* Position the tooltip */
      position: absolute;
      transform: translate(-50%, -125%);
      p {
        color: #fff;
        padding: 0;
        margin: 0;
        font-size: 12 px;
      }
      z-index: 4;
      &::after {
        content: '';
        position: absolute;
        top: 100%;
        left: 50%;
        margin-left: -5px;
        border-width: 5px;
        border-style: solid;
        border-color: currentColor transparent transparent transparent;
      }
    }
    &:hover .tooltip-text {
      visibility: visible;
    }
  }
}
.start-point {
  height: 12px;
  width: 2px;
  position: absolute;
  left: 0;
  bottom: 20px;
  background: #4285f4;
  &__text {
    position: absolute;
    left: -50px;
    width: 100px;
    bottom: 35px;
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
    position: absolute;
    bottom: 32px;
    text-align: center;
    color: #4285f4;
    font-size: 10px;
    font-weight: 700;
    width: 100px;
  }
}
.thumb {
  z-index: 2;
  position: absolute;
  top: -4px;
  width: 24px;
  height: 24px;
  border-radius: 12px;
  box-shadow: -4px 0 8px 0 rgba(0, 0, 0, 0.1);
  border: 1px solid #fff;
  background: #4285f4;
  cursor: pointer;
}
</style>
