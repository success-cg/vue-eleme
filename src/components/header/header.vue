<template lang="html">
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img width="64" height="64" v-bind:src="seller.avatar" alt="">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">
          {{seller.description}}/{{seller.deliveryTime}}分钟送达
        </div>
        <div v-if="seller.supports" class="support">
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div class="support-count" v-if="seller.supports" @click="showDetail">
        <span class="count">{{seller.supports.length}}个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div class="bulletin-wrapper" @click="showDetail">
      <span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="background">
      <img :src="seller.avatar" alt="" width="100%" height="100%">
    </div>
    <div class="detail" v-show="detailShow">
      <div class="detail-wrapper clearfix">
        <div class="detail-main">
          <h1 class="name">{{seller.name}}</h1>
        </div>
      </div>
      <div class="detail-close">
        <i class="icon-close"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    seller: {
      type: Object
    }
  },
  data() {
    return {
      detailShow: false
    }
  },
  methods: {
    showDetail() {
      this.detailShow = true
    }
  },
  created() {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
  }
}
</script>

<style lang="scss">@import '../../common/sass/mixin.scss';

.header {
    position: relative;
    color: #fff;
    overflow: hidden;
    background-color: rgba(7,17,27,0.5);
    .content-wrapper {
        position: relative;
        padding: 24px 12px 18px 24px;
        font-size: 0;
        .avatar {
            display: inline-block;
            vertical-align: top;
            border-radius: 2px;
            overflow: hidden;
        }
        .content {
            display: inline-block;
            margin-left: 16px;
            .title {
                margin: 2px 0 8px;
                .brand {
                    // background: yellow;
                    display: inline-block;
                    vertical-align: top;
                    width: 30px;
                    height: 18px;
                    @include bg-image("brand");
                    background-size: 30px 18px;
                    background-repeat: no-repeat;
                }
                .name {
                    margin-left: 6px;
                    font-size: 16px;
                    font-weight: bold;
                    line-height: 18px;
                }
            }
            .description {
                margin-bottom: 10px;
                font-size: 12px;
                line-height: 12px;
            }
            .support {
                .icon {
                    display: inline-block;
                    vertical-align: top;
                    width: 12px;
                    height: 12px;
                    margin-right: 4px;
                    background-size: 12px;
                    background-repeat: no-repeat;
                    &.decrease {
                        @include bg-image("decrease_1");
                    }
                    &.discount {
                        @include bg-image("discount_1");
                    }
                    &.guarantee {
                        @include bg-image("guarantee_1");
                    }
                    &.invoice {
                        @include bg-image("invoice_1");
                    }
                    &.special {
                        @include bg-image("special_1");
                    }
                }
                .text {
                    line-height: 12px;
                    font-size: 10px;
                }
            }
        }
        .support-count {
            position: absolute;
            right: 12px;
            bottom: 18px;
            padding: 0 8px;
            height: 24px;
            line-height: 24px;
            border-radius: 14px;
            background: rgba(0,0,0,0.2);
            text-align: center;
            .count {
                vertical-align: top;
                font-size: 10px;
            }
            .icon-keyboard_arrow_right {
                margin-left: 2px;
                line-height: 24px;
                font-size: 10px;
            }
        }
    }
    .bulletin-wrapper {
        position: relative;
        height: 28px;
        line-height: 28px;
        padding: 0 22px 0 12px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        background-color: rgba(7,17,27,0.2);
        .bulletin-title {
            display: inline-block;
            vertical-align: top;
            width: 22px;
            height: 12px;
            margin-top: 8px;
            @include bg-image("bulletin") background-size: 22px 12px;
            background-repeat: no-repeat;
        }
        .bulletin-text {
            margin: 0 4px;
            font-size: 12px;
        }
        .icon-keyboard_arrow_right {
            position: absolute;
            font-size: 10px;
            right: 12px;
            top: 9px;
            right: 12px;
        }
    }
    .background {
      position: absolute;
      z-index: -1;
      top: -50%;
      left: 0;
      width: 100%;
      filter: blur(10px);
    }
    .detail {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 100;
      width: 100%;
      height: 100%;
      overflow: auto;
      background: rgba(7,17,27,0.8);
      .detail-wrapper {
        // background: blue;
        min-height: 100%;
        .detail-main {
          // background: red;
          padding-top: 64px;
          padding-bottom: 64px;
          .name {
            line-height: 16px;
            font-size: 16px;
            font-weight: 700;
            width: 100%;
            text-align: center;
          }
        }
      }
      .detail-close {
        // background: green;
        position: relative;
        width: 32px;
        height: 32px;
        margin: -64px auto 0 auto;
        // margin-top: -64px auto 0 auto;
        font-size: 32px;
        line-height: 32px;
        clear: both;
      }
    }
}
</style>
