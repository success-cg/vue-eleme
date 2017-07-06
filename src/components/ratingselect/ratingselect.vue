<template lang="html">
  <div class="ratingselect">
    <div class="rating-type border-1px">
      <span class="block positive" :class="{'active':selectType === 2}" @click="select(2,$event)">{{desc.all}}<span class="count">{{ratings.length}}</span></span>
      <span class="block positive" :class="{'active':selectType === 0}" @click="select(0,$event)">{{desc.positive}}<span class="count">{{positives.length}}</span></span>
      <span class="block negative" :class="{'active':selectType === 1}" @click="select(1,$event)">{{desc.negative}}<span class="count">{{negatives.length}}</span></span>
    </div>
    <div class="switch" :class="{'on': onlyContent === true}" @click="toggleContent($event)">
      <span class="icon icon-check_circle"></span>
      <span class="text">只看内容的评价</span>
    </div>
  </div>
</template>

<script>
/* 定义评价类型 */
const POSITIVE = 0  // 正向评价
const NEGATIVE = 1  // 负面评价
const ALL = 2 // 所有评价

export default {
  props: {
    ratings: { // 评论数
      type: Array,
      default () {
        return []
      }
    },
    selectType: { // 选择需要显示的评论类型
      type: Number,
      default: ALL
    },
    onlyContent: {
      type: Boolean,
      default: false
    },
    desc: {
      type: Object,
      default () {
        return {
          all: '全部',
          positive: '满意',
          negative: '不满意'
        }
      }
    }
  },
  data() {
    return {}
  },
  computed: {
    positives() {
      return this.ratings.filter((rating) => {
        return rating.rateType === POSITIVE
      }) // 数组的过滤方法，回调函数要返回一个布尔值
    },
    negatives() {
      return this.ratings.filter((rating) => {
        return rating.rateType === NEGATIVE
      }) // 数组的过滤方法，回调函数要返回一个布尔值
    }
  },
  methods: {
    select(type, event) {
      if (!event._constructed) {
        return
      }
      this.$emit('select', type)
        /* 子组件不能更改父组件传来的props,所以派
        发事件给父组件，在父组件里更改要传入的数据 */
    },
    toggleContent(event) {
      if (!event._constructed) {
        return
      }
      this.$emit('toggle')
        /* 子组件不能更改父组件传来的props,所以派
        发事件给父组件，在父组件里更改要传入的数据 */
    }
  },
  updated() {
    // console.log('ratings', this.ratings)
    // console.log('positives', this.positives)
    // console.log('negatives', this.negatives)
  }
}
</script>

<style lang="scss">
@import "../../common/sass/mixin.scss";

.ratingselect {
  .rating-type {
    padding: 18px 0;
    margin: 0 18px;
    font-size: 0;
    @include border-1px(rgba(7,17,27,0.1));
    .block {
      display: inline-block;
      padding: 8px 12px;
      margin-right: 8px;
      border-radius: 1px;
      line-height: 16px;
      font-size: 12px;
      color: rgb(77,85,93);
      &.active {
        color: #fff;
      }
      .count {
        margin-left: 2px;
        font-size: 8px;
      }
      &.positive {
        background: rgba(0,160,220,0.2);
        &.active {
          background: rgb(0,160,220);
        }
      }
      &.negative {
        background: rgba(77,85,93,0.2);
        &.active {
          background: rgb(77,85,93);
        }
      }
    }
  }
  .switch {
    padding: 12px 18px;
    line-height: 24px;
    border-bottom: 1px solid rgba(7,17,27,0.1);
    color: rgb(147,153,159);
    font-size: 0;
    &.on {
      .icon {
        color: #00c850;
      }
    }
    .icon {
      display: inline-block;
      vertical-align: top;
      margin-right: 4px;
      font-size: 24px;
      line-height: 24px;
    }
    .text {
      display: inline-block;
      vertical-align: top;
      line-height: 24px;
      font-size: 12px;
    }
  }
}
</style>
