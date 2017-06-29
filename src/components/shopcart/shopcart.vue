<template lang="html">
  <div class="shopcart">
    <div class="content">
      <div class="content-left">
        <div class="logo-wrapper">
          <div class="logo" :class="{'highlight': totalCount > 0}">
            <i class="icon-shopping_cart"></i>
          </div>
          <div class="num" v-show="totalCount>0">
            {{totalCount}}
          </div>
        </div>
        <div class="price" :class="{'highlight': totalPrice>0}">
          ￥{{totalPrice}}
        </div>
        <div class="desc">
          另需配送费￥{{deliveryPrice}}元
        </div>
      </div>
      <div class="content-right">
        <div class="pay" :class="payClass">
          {{payDesc}}
        </div>
      </div>
    </div>
    <div class="ball-container">
      <div v-for="ball in balls">
        <transition name="drop" @before-enter="beforeDrop" @enter="dropping" @after-enter="afterDrop">
          <div class="ball" v-show="ball.show">
            <div class="inner inner-hook"></div>
          </div>
        </transition>
      </div>
      <!-- <transition-group name="drop" @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
        <div class="ball" v-for="ball in balls" v-show="ball.show" :key="ball">
          <div class="inner inner-hook"></div>
        </div>
      </transition-group> -->
    </div>
  </div>
</template>

<script>
// import Vue from 'vue'
export default {
  data() {
    return {
      balls: [{ // 存储可以被开始动画的小球，false的才能开始将其转变为true开始动画！而transition动画只对v-if，v-show和v-for有效
        show: false
      }, {
        show: false
      }, {
        show: false
      }, {
        show: false
      }, {
        show: false
      }],
      dropBalls: [] // 存储已经进入运动的小球，待小球运动完，将其style.display设置为none
    }
  },
  props: {
    selectFoods: { // 购物车的所有状态都依赖selectFoods这个属性，该属性由父元素传递进来
      type: Array,
      default () { // Vue中props为引用类型，default要用函数
        return [{
          price: 10,
          count: 2
        }]
      }
    },
    deliveryPrice: {
      type: Number, // Vue编程风格，接收数据要指定类型
      default: 0 // 默认值设置为0
    },
    minPrice: {
      type: Number, // Vue编程风格，接收数据要指定类型
      default: 0 // 默认值设置为0
    }
  },
  computed: {
    payClass() {
      if (this.totalPrice < this.minPrice) {
        return `not-enough`
      } else {
        return `enough`
      }
    },
    totalPrice() {
      let total = 0
      this.selectFoods.forEach((food) => {
        total += food.price * food.count
      })
      return total
    },
    totalCount() {
      let count = 0
      this.selectFoods.forEach((food) => {
        count += food.count
      })
      return count
    },
    payDesc() {
      if (this.totalPrice === 0) {
        return `￥${this.minPrice}元起送`
      } else if (this.totalPrice < this.minPrice) {
        let diff = this.minPrice - this.totalPrice
        return `还差${diff}元起送`
      } else if (this.totalPrice >= this.minPrice) {
        return `去结算`
      }
    }
  },
  methods: {
    drop(el) { // el为父组件传进来的，按钮的element
      this.balls.forEach((ball) => {
        if (!ball.show) {
          ball.show = true // 当show设为true的时候，动画就开始了，步骤beforeDrop ==> dropping ==> afterDrop(通过JS动画钩子)
          ball.el = el // 将按钮的element添加到ball的属性中保存起来
          this.dropBalls.push(ball)
        }
      })
    },
    beforeDrop(el) {
      let count = this.balls.length
      while (count--) {
        let ball = this.balls[count]
        if (ball.show) {
          let rect = ball.el.getBoundingClientRect() // 获取相对于视口的位置
          let x = rect.left - 32 // 计算小球发出点和落点的x轴长度
          let y = -(window.innerHeight - rect.top - 22) // 计算小球发出点和落点的y轴高度
          console.log(x, y)
          el.style.display = '' // 原来的小球display为none,现在设置成空,让其可见
          el.style.webkitTransform = `translate3d(0,${y}px,0)` // 兼容webkit渲染引擎，因为直接写transfrom，webkit引擎没有出现效果
          el.style.transform = `translate3d(0,${y}px,0)`
          let inner = el.getElementsByClassName('inner-hook')[0]
          inner.style.webkitTransform = `translate3d(${x}px,0,0)` // 兼容webkit渲染引擎
          inner.style.transform = `translate3d(${x}px,0,0)`
        }
      }
    },
    dropping(el, done) { // 回调函数done看文档"https://cn.vuejs.org/v2/guide/transitions.html#JavaScript-钩子"
      /* eslint-disable no-unused-vars */
      let rf = el.offestHeight // 触发浏览器重绘，由于rf变量声明但未使用，添加上面那行注释
      this.$nextTick(() => {
        el.style.webkitTransform = `translate3d(0,0,0)` // 兼容webkit渲染引擎，因为直接写transfrom，webkit引擎没有出现效果
        el.style.transform = `translate3d(0,0,0)`
        let inner = el.getElementsByClassName('inner-hook')[0]
        inner.style.webkitTransform = `translate3d(0,0,0)` // 兼容webkit渲染引擎
        inner.style.transform = `translate3d(0,0,0)`
        el.addEventListener('transitionend', done)
        // transitionend事件表示transition变化完成了，回调函数done告诉Vue动画结束
      })
    },
    afterDrop(el) {
      let ball = this.dropBalls.pop()
      if (ball) {
        ball.show = false
        el.style.display = 'none'
      }
    }
  }
}
</script>

<style lang="scss">
.shopcart {
    position: fixed;
    z-index: 50;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 46px;
    background: #ccc;
    .content {
        display: flex;
        height: 100%;
        color: rgba(255,255,255,0.4);
        background: #141d27;
        .content-left {
            flex-grow: 1;
            font-size: 0;
            .logo-wrapper {
                display: inline-block;
                position: relative;
                top: -10px;
                margin: 0 12px;
                padding: 6px;
                width: 56px;
                height: 56px;
                border-radius: 50%;
                background: #141d27;
                box-sizing: border-box;
                vertical-align: top;
                text-align: center;
                .logo {
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                    background: #2b333b;
                    &.highlight {
                        background: rgb(0,160,220);
                        .icon-shopping_cart {
                            color: #fff;
                        }
                    }
                    .icon-shopping_cart {
                        line-height: 44px;
                        font-size: 24px;
                        color: rgba(255,255,255,0.4);
                    }
                }
                .num {
                    position: absolute;
                    top: 0;
                    right: 0;
                    width: 24px;
                    height: 16px;
                    line-height: 16px;
                    text-align: center;
                    border-radius: 16px;
                    font-size: 9px;
                    font-weight: 700;
                    color: #fff;
                    background: rgb(240,20,20);
                    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.4);
                }
            }
            .price {
                display: inline-block;
                vertical-align: top;
                line-height: 24px;
                margin-top: 12px;
                padding-right: 12px;
                border-right: 1px solid rgba(255,255,255,0.1);
                color: rgba(255,255,255,0.4);
                font-size: 18px;
                font-weight: 700;
                &.highlight {
                    color: #fff;
                }
            }
            .desc {
                display: inline-block;
                vertical-align: top;
                margin: 12px 0 0 12px;
                line-height: 24px;
                font-size: 12px;
            }
        }
        .content-right {
            flex: 0 0 105px;
            width: 105px;
            background: #2b333b;
            .pay {
                line-height: 48px;
                text-align: center;
                font-size: 14px;
                font-weight: 700;
                &.not-enough {
                    background: #2b333b;
                }
                &.enough {
                    background: #00b43c;
                    color: #fff;
                }
            }
        }
    }
    .ball-container {
        .ball {
            position: fixed;
            left: 32px;
            bottom: 22px;
            z-index: 200;
            transition: all 0.4s linear;
            .inner {
                width: 16px;
                height: 16px;
                border-radius: 50%;
                background: rgb(0,160,220);
                transition: all 0.4s linear;
            }
        }
    }
}
</style>
