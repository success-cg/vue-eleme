<template lang="html">
  <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
        <li v-for="item in goods" class="menu-item">
          <span class="text border-1px">
            <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>{{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foodsWrapper">
      <ul>
        <li v-for="item in goods" class="food-list">
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
  </div>
</template>

<script>
import BScroll from 'better-scroll'
const ERROR_OK = 0

export default {
  props: {
    seller: {
      type: Object
    }
  },
  data() {
    return {
      goods: []
    }
  },
  created() {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'] // 通过seller.supports[index].type映射对应的className
    this.$http.get('/api/goods').then((res) => {
      if (res.data.errno === ERROR_OK) {
        // this.goods = res.data.data
        this.goods = Object.assign({}, this.goods, res.data.data)
        console.log(this.goods)
        this.$nextTick(() => {
          this._initScroll()
        })
      }
    })
  },
  methods: {
    _initScroll() {
      this.menuScroll = new BScroll(this.$refs.menuWrapper, {})
      this.foodScore = new BScroll(this.$refs.foodsWrapper, {})
    }
  }
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
