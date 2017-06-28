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
      <transition-group name="drop">
        <div class="ball" v-for="ball in balls" v-show="ball.show" :key="ball">
          <div class="inner">

          </div>
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script>
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
      }]
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
