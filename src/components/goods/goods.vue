<template lang="html">
  <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
        <li v-for="(item,index) in goods" class="menu-item" :class="{'current': parseInt(index) === currentIndex }" @click="selectMenu(index, $event)">
          <!-- index的类型是string, 好坑啊 -->
          <span class="text border-1px">
            <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>{{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foodsWrapper">
      <ul>
        <li v-for="item in goods" class="food-list food-list-hook">
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li v-for="food in item.foods" class="food-item border-1px">
              <div class="icon">
                <img :src="food.icon" alt="" width="57" height="57">
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span class="count">月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="now">￥{{food.price}}</span>
                  <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <shopcart :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"></shopcart>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import shopcart from 'components/shopcart/shopcart.vue'

const ERROR_OK = 0

export default {
  props: {
    seller: {
      type: Object
    }
  },
  data() {
    return {
      goods: [],
      listHeight: [], // 每一个不同title商品之间的高度
      scrollY: 0 // food-warpper已经滚动的高度，通过Better-scroll的scroll事件计算得出
    }
  },
  computed: {
    currentIndex() {  // 计算出要高亮的index，即是要高亮的meun-warpper的index,也就是在那个高度区间
      for (let i = 0; i < this.listHeight.length; i++) {
        let height1 = this.listHeight[i]
        let height2 = this.listHeight[i + 1]
        if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) { // 因为最后一个i+1不存在，因此需要加上!height2进行判定
          return i
        }
      }
      return 0
    }
  },
  created() {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'] // 通过seller.supports[index].type映射对应的className
    this.$http.get('/api/goods').then((res) => {
      if (res.data.errno === ERROR_OK) {
        // this.goods = res.data.data
        this.goods = Object.assign({}, this.goods, res.data.data)
        console.log(this.goods)
        this.$nextTick(() => { // DOM渲染是异步的，操作DOM要在$nextTick的回调里，此时DOM已经渲染完毕
          this._initScroll()
          this._calculateHeight()
        })
      }
    })
  },
  methods: {
    selectMenu(index, event) { // 移动端better-scroll会阻止默认事件，所以需要在初始化的时候设置click=true
      if (!event._constructed) { // event._constructed是Better-Scroll派发才会携带
        return // 因为better-scroll在PC端不阻止默认事件，所以需要过滤
      }
      let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook')
      let el = foodList[index]
      this.foodScore.scrollToElement(el, 300) // better-scroll的一个API，接受2个参数，第一个为滚动到达的元素，第二个为滚动时间
      // console.log(typeof index) // index类型为string
    },
    _initScroll() { // 初始化better-scroll
      this.menuScroll = new BScroll(this.$refs.menuWrapper, {
        click: true // better-scroll会派发一个click事件
      })

      this.foodScore = new BScroll(this.$refs.foodsWrapper, {
        probeType: 3
      })

      this.foodScore.on('scroll', (pos) => {
        this.scrollY = Math.abs(Math.round(pos.y))
        // console.log(this.currentIndex)
      }) // Better-Sroll所携带事件，pos是Better-Scroll封装的对象
    },
    _calculateHeight() {
      let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook')
      let height = 0
      this.listHeight.push(height)
      for (let i = 0; i < foodList.length; i++) {
        let item = foodList[i]
        height += item.clientHeight // 原生JS获取DOM元素的高度
        this.listHeight.push(height)
      }
    } // 计算每个不同产品类型的高度，并且存进listHeight用来做映射
  },
  components: {shopcart}
}
</script>

<style lang="scss">@import '../../common/sass/mixin.scss';

.goods {
    display: flex;
    position: absolute;
    top: 174px;
    bottom: 46px;
    width: 100%;
    overflow: hidden;
    .menu-wrapper {
        flex: 0 0 80px; // flex的三个属性，依次是 flex-grow, flex-shrink, flex-basis
        width: 80px;
        // 为了兼容安卓，加这句
        background: #f3f5f7;
        .menu-item {
            display: table;
            height: 54px;
            width: 56px;
            padding: 0 12px;
            line-height: 14px;
            &.current {
                position: relative;
                z-index: 10;
                margin-top: -1px;
                background: #fff;
                .text {
                    @include border-none();
                    font-weight: 700;
                }
            }
            .icon {
                display: inline-block;
                vertical-align: top;
                width: 12px;
                height: 12px;
                margin-right: 2px;
                background-size: 12px;
                background-repeat: no-repeat;
                &.decrease {
                    @include bg-image("decrease_3");
                }
                &.discount {
                    @include bg-image("discount_3");
                }
                &.guarantee {
                    @include bg-image("guarantee_3");
                }
                &.invoice {
                    @include bg-image("invoice_3");
                }
                &.special {
                    @include bg-image("special_3");
                }
            }
            .text {
                display: table-cell;
                width: 56px;
                vertical-align: middle;
                @include border-1px(rgba(7,17,27,0.1));
                font-size: 12px;
            }
        }
    }
    .foods-wrapper {
        flex-grow: 1;
        .title {
            padding-left: 14px;
            height: 26px;
            line-height: 26px;
            font-size: 12px;
            color: rgb(147,153,159);
            border-left: 2px solid #d9dde1;
            background-color: #f3f5f7;
        }
        .food-item {
            display: flex;
            margin: 18px;
            padding-bottom: 18px;
            @include border-1px(rgba(7,17,27,0.1));
            &:last-child {
                @include border-none();
                margin-bottom: 0;
            }
            .icon {
                flex: 0 0 57px;
                margin-right: 10px;
            }
            .content {
                flex: 1;
                .name {
                    margin: 2px 0 8px;
                    line-height: 14px;
                    font-size: 14px;
                    color: rgb(7,17,27);
                    font-weight: 700;
                }
                .desc,
                .extra {
                    line-height: 10px;
                    font-size: 10px;
                    color: rgb(147,153,159);
                }
                .desc {
                    line-height: 12px;
                    margin-bottom: 8px;
                }
                .extra {
                    .count {
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
            }
        }
    }
}
</style>
