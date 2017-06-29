<template lang="html">
  <div class="cartcontrol">
    <transition name="move">
      <div class="cart-decrease" v-show="food.count>0" @click="decreaseCart($event)">
        <i class="inner icon-remove_circle_outline"></i>
      </div>
    </transition>
    <div class="cart-count" v-show="food.count>0">
      {{food.count}}
    </div>
    <div class="cart-add icon-add_circle" @click="addCart($event)">
    </div>
  </div>
</template>

<script>
import Vue from 'vue'

export default {
  props: {
    food: { // 购物车按钮的信息由父组件传入
      type: Object
    }
  },
  created() {
    // console.log(this.food)
  },
  methods: {
    addCart(event) {
      if (!event._constructed) {
        return   // 因为better-scroll在PC端不阻止默认事件，所以需要过滤
      }
      if (!this.food.count) {
        Vue.set(this.food, `count`, 1) // Vue.set添加一个原来不存在的属性
      } else {
        this.food.count++
      }
      this.$emit('cartAdd', event.target)  // 做小球动画,$emit自定义事件，将事件和DOM传入
    },
    decreaseCart(event) {
      if (!event._constructed) {
        return   // 因为better-scroll在PC端不阻止默认事件，所以需要过滤
      }
      if (this.food.count) {
        this.food.count--
      }
    }
  }
}
</script>

<style lang="scss">
.cartcontrol {
  font-size: 0;
  .cart-decrease {
    display: inline-block;
    padding: 6px;
    transition: translate3d(0,0,0);
    .inner {
      display: inline-block; // 动画的元素要有宽高，inline元素不能动画
      line-height: 24px;
      font-size: 24px;
      color: rgb(0,160,220);
      transition: all 0.4s linear; // 渐变效果在原生DOM中也要加transition
    }
    &.move-enter-active, &.move-leave-active { // 进入、离开的过程
      transition: all 0.4s linear;
    }
    &.move-enter, &.move-leave-to {  // 进入的初始，离开的最终态
      opacity: 0;
      transform: translate3d(24px,0,0);
      .inner {
        transform: rotate(180deg);
      }
    }
  }
  .cart-count {
    display: inline-block;
    vertical-align: top;
    width: 12px;
    padding-top: 6px;
    line-height: 24px;
    text-align: center;
    font-size: 12px;
    color: rgb(147,153,159);
  }
  .cart-add {
    display: inline-block;
    padding: 6px;
    line-height: 24px;
    font-size: 24px;
    color: rgb(0,160,220);
  }
}
</style>
