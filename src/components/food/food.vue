<template lang="html">
  <transition name="move">
    <div class="food" v-show="showFlag" ref="food">
      <div class="food-content">
        <div class="image-header">
          <img :src="food.image" alt="">
          <div class="back" @click="hide">
            <i class="icon icon-arrow_lift"></i>
          </div>
        </div>
        <div class="content">
          <h1 class="title">{{food.name}}</h1>
          <div class="detail">
            <span class="sell-count">月售{{food.sellCount}}</span>
            <span class="rating">好评率{{food.rating}}%</span>
          </div>
          <div class="price">
            <span class="now">￥{{food.price}}</span>
            <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
          </div>
          <div class="cartcontrol-wrapper">
            <cartcontrol :food="food"  @cartAdd="addFood"></cartcontrol>
          </div>
          <transition name="fade">
            <div class="buy" v-show="!food.count" @click.stop.prevent="addFirst($event)">
              加入购物车
            </div>
          </transition>
        </div>
        <split v-show="food.info"></split>
        <div class="info" v-show="food.info">
          <h1 class="title">商品信息</h1>
          <p class="text">{{food.info}}</p>
        </div>
        <split></split>
        <div class="rating">
          <h1 class="title">商品评价</h1>
          <ratingselect @select="selectRating" @toggle="toggleContent" :selectType="selectType" :onlyContent="onlyContent" :desc="desc" :ratings="food.ratings"></ratingselect>
          <div class="rating-wrapper">
            <ul v-show="food.ratings && food.ratings.length">
              <li v-for="rating in food.ratings" v-show="needShow(rating.rateType, rating.text)" class="rating-item border-1px">
                <div class="user">
                  <span class="name">{{rating.username}}</span>
                  <img class="avatar" :src="rating.avatar" alt="" width="12" height="12">
                </div>
                <div class="time">
                  {{rating.rateTime | formateDate}}
                </div>
                <p class="text">
                  <span class="icon" :class="{'icon-thumb_up': rating.rateType === 0, 'icon-thumb_down': rating.rateType === 1}"></span>{{rating.text}}
                </p>
              </li>
            </ul>
            <div class="no-rating" v-show="!food.ratings || !food.ratings.length">
              暂无评价
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import BScroll from 'better-scroll'
import cartcontrol from 'components/cartcontrol/cartcontrol.vue'
import split from 'components/split/split.vue'
import ratingselect from 'components/ratingselect/ratingselect.vue'
import {formateDate} from 'common/js/date.js'
  /* 带{}，解构赋值，一般是 export 的模块
  不带{}，一般是 export default 的模块 */

/* 定义评价类型 */
// const POSOTOVE = 0  // 正向评价
// const NEGATIVE = 1  // 负面评价
const ALL = 2 // 所有评价

export default {
  props: {
    food: {  // food由父组件传入
      type: Object
    }
  },
  data() {
    return {
      showFlag: false,   // 默认food组件是隐藏的
      selectType: ALL,   // 选择要看的评论的类型
      onlyContent: true, // 控制评论是只看内容还是看内容和评价
      desc: {
        all: '全部',
        positive: '推荐',
        negative: '吐槽'
      }
    }
  },
  methods: {
    show() {
      this.showFlag = true  // 展示food组件
        /* 初始化要传给ratingselect组件的参数，
        因为data里的数据会被多次复用 */
      this.selectType = ALL
      this.onlyContent = true
        /* better-scroll是根据DOM处理逻辑的，要在$nextTick的回调
        中执行，因为DOM渲染是异步的 */
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.food, {
            click: true
          })
        } else {
          this.scroll.refresh()
            /* refresh() 强制 scroll 重新计算，当 better-scroll 中的元素
            发生变化的时候调用此方法，这样就不需要重新new一个新的better-scroll了
            文档查看"https://github.com/ustbhuangyi/better-scroll" */
        }
      })
    },
    hide() {
      this.showFlag = false // 隐藏food组件
    },
    addFirst(event) {
      if (!event._constructed) {
        return
      }
      this.$emit('cartAdd', event.target)
        // cartcontrol组件发射的事件通过food组件发射add事件给goods
      this.$set(this.food, 'count', 1)
        /* $set是Vue.set的别名，添加原本没有的属性，需要用$set方法
        触发视图的响应，文档见"https://cn.vuejs.org/v2/api/#vm-set",
        $set 方法作用和 Vue.set 一样，但可以不需要 import 引入 Vue */
    },
    addFood() {
      this.$emit('cartAdd', event.target)
    },
    selectRating(type) {
      this.selectType = type
      this.$nextTick(() => {
        this.scroll.refresh()
      })
    },
    toggleContent() {
      this.onlyContent = !this.onlyContent
      this.$nextTick(() => {
        this.scroll.refresh()
      })
    },
    needShow(type, text) {
      if (this.onlyContent && !text) {
        return false  // 如果要显示内容，而又没有内容，则不显示
      }
      if (this.selectType === ALL) {
        return true   // 如果要显示全部，就全显示
      } else {
        return type === this.selectType  // 显示要求的类型
      }
    }
  },
  components: {
    cartcontrol,
    split,
    ratingselect
  },
  filter: {
    formateDate(time) {
      let date = new Date(time)
      return formateDate(date, 'yyyy-MM-dd hh:mm') // 引入common模块的JS方法
    }
  },
  updated() {
    console.log('food', this.food)
  }
}
</script>

<style lang="scss">
@import '../../common/sass/mixin.scss';

.food {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 46px;
  z-index: 10;
  width: 100%;
  background: #fff;
  &.move-enter-active, &.move-leave-active { // 动画过程
    transition: all .5s;
    transform: translate3d(0,0,0);
  }
  &.move-enter, &.move-leave-to { // 动画初始态
    transform: translate3d(100%,0,0);
  }
  .image-header {
    position: relative;
    width: 100px;
    padding-top: 100%; // padding计算是相当于父元素的width计算的
    img {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
    }
    .back {
      position: absolute;
      top: 10px;
      left: 5px;
      text-align: center;
      .icon {
        display: inline-block;
        padding: 10px;
        color: #fff;
        font-size: 16px;
        width: 16px;
        height: 16px;
        line-height: 16px;
        background: rgba(227,217,227,0.3);
        border-radius: 50%;
      }
    }
  }
  .content {
    position: relative;
    padding: 18px;
    .title {
      line-height: 14px;
      margin-bottom: 8px;
      font-size: 14px;
      font-weight: 700;
      color: rgb(7,17,27);
    }
    .detail {
      margin-bottom: 18px;
      line-height: 10px;
      height: 10px;
      font-size: 0;
      .sell-count,
      .rating {
        font-size: 10px;
        color: rgb(147,153,159);
      }
      .sell-count {
        margin-right: 12px;
      }
    }
    .price {
        font-weight: 700;
        line-height: 24px;
        font-size: 0;
        .now {
            margin-right: 8px;
            font-size: 14px;
            color: rgb(255,0,0);
        }
        .old {
            font-size: 10px;
            color: rgb(147,153,159);
            text-decoration: line-through;
        }
    }
    .cartcontrol-wrapper {
      position: absolute;
      right: 12px;
      bottom: 12px;
    }
    .buy {
      position: absolute;
      right: 18px;
      bottom: 18px;
      z-index: 10;
      height: 24px;
      line-height: 24px;
      padding: 0 12px;
      box-sizing: border-box;
      font-size: 10px;
      border-radius: 12px;
      color: #fff;
      background: rgb(0,160,220);
      &.fade-enter-active, &.fade-leave-active { // 动画过程
        transition: all .5s;
      }
      &.fade-enter, &.fade-leave-to { // 动画初始态
        opacity: 0;
      }
    }
  }
  .info {
    padding: 18px;
    .title {
      line-height: 14px;
      font-size: 14px;
      font-weight: 500;
      margin-bottom: 6px;
      color: rgb(7,17,27);
    }
    .text {
      line-height: 24px;
      font-size: 12px;
      font-weight: 400;
      padding: 0 8px;
      text-align: justify;
      color: rgb(77,85,93);
    }
  }
  .rating {
    padding-top: 18px;
    .title {
      line-height: 14px;
      margin-left: 18px;
      font-size: 14px;
      color: rgb(7,17,27);
    }
    .rating-wrapper {
      padding: 0 18px;
      .rating-item {
        position: relative;
        padding: 16px 0;
        @include border-1px(rgba(7,17,27,0.1));
        .user {
          position: absolute;
          right: 0;
          top: 16px;
          line-height: 12px;
          font-size: 0;
          color: rgb(147,153,159);
          .name {
            display: inline-block;
            margin-right: 6px;
            vertical-align: top;
            font-size: 10px;
          }
          .avatar {
            border-radius: 50%;
          }
        }
        .time {
          margin-bottom: 6px;
          line-height: 12px;
          font-size: 10px;
          color: rgb(147,153,159);
        }
        .text {
          line-height: 16px;
          font-size: 12px;
          color: rgb(7,17,27);
          .icon {
            margin-right: 4px;
            line-height: 16px;
            font-size: 12px;
            &.icon-thumb_up {
              color: rgb(0,160,220);
            }
            &.icon-thumb_down {
              color: rgb(147,153,159);
            }
          }
        }
      }
      .no-rating {
        padding: 16px 0;
        font-size: 12px;
        color: rgb(147,153,159);
      }
    }
  }
}
</style>
