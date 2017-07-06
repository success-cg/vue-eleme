<template lang="html">
  <div class="seller">
    <div class="seller-content">
      <div class="overview">
        <h1 class="title">{{seller.name}}</h1>
        <div class="desc border-1px">
          <star :size="36" :score="seller.score"></star>
          <span class="text">({{seller.ratingCount}})</span>
          <span class="text">月售{{seller.sellCount}}单</span>
        </div>
        <ul class="remark">
          <li class="block">
            <h2>起送价</h2>
            <div class="content">
              <span class="stress">{{seller.minPrice}}</span>元
            </div>
          </li>
          <li class="block">
            <h2>商家配送</h2>
            <div class="content">
              <span class="stress">{{seller.deliveryPrice}}</span>元
            </div>
          </li>
          <li class="block">
            <h2>平均配送时间</h2>
            <div class="content">
              <span class="stress">{{seller.deliveryTime}}</span>分钟
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import star from 'components/star/star.vue'

export default {
  props: {
    seller: {
      type: Object
    }
  },
  components: {
    star
  }
}
</script>

<style lang="scss">
@import '../../common/sass/mixin.scss';

.seller {
  position: absolute;
  top: 174px;
  bottom: 0;
  left: 0;
  width: 100%;
  overflow: hidden;
  .overview {
    padding: 18px;
    .title {
      margin-bottom: 8px;
      line-height: 14px;
      color: rgb(7,17,27);
      font-size: 14px;
    }
    .desc {
      line-height: 18px;
      font-size: 0;
      @include border-1px(rgba(7,17,27,0.1));
      .star {
        display: inline-block;
        vertical-align: top;
        margin-right: 8px;
      }
      .text {
        display: inline-block;
        vertical-align: top;
        margin-right: 12px;
        font-size: 10px;
        color: rgb(77,85,93);
      }
    }
    .remark {
      display: flex;
      padding-top: 18px;
      .block {
        flex: 1;
        text-align: center;
        border-right: 1px solid rgba(7,17,27,0.1);
        &:last-child {
          border-right: none;
        }
      }
    }
  }
}
</style>
