<template lang="html">
  <div class="shopcart">
    <div class="content">
      <div class="content-left">
        <div class="logo-wrapper">
          <div class="logo">
            <i class="icon-shopping_cart"></i>
          </div>
        </div>
        <div class="price">
          ￥10
        </div>
        <div class="desc">
          另需配送费￥{{deliveryPrice}}元
        </div>
      </div>
      <div class="content-right">
        ￥20元起送
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    deliveryPrice: {
      type: Number
    },
    minPrice: {

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
  height: 48px;
  background: #ccc;
  .content {
    display: flex;
    height: 100%;
    color: #fff;
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
          background: #2b343c;
          .icon-shopping_cart {
            line-height: 44px;
            font-size: 24px;
            color: rgba(255,255,255,0.4);
            // color: #80858a;
          }
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
        font-size: 16px;
        font-weight: 700;
      }
      .desc {
        display: inline-block;
        vertical-align: top;
        margin: 12px 0 0 12px;
        line-height: 24px;
        color: rgba(255,255,255,0.4);
        font-size: 10px;
      }
    }
    .content-right {
      flex: 0 0 105px;
      width: 105px;
      background: blue;
    }
  }
}
</style>
