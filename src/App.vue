<template>
<div>
  <v-header></v-header>
  <div class="tab border-1px">
    <div class="tab-item">
      <!-- <div>商品</div> -->
      <!-- <a v-link="{path: '/goods'}">商品</a> -->
      <router-link to="/goods" class="item">商品</router-link>
    </div>
    <div class="tab-item">
      <!-- <div>商品</div> -->
      <!-- <a v-link="{path: '/ratings'}">评论</a> -->
      <router-link to="/ratings" class="item">评论</router-link>
    </div>
    <div class="tab-item">
      <!-- <div>商品</div> -->
      <!-- <a v-link="{path: '/seller'}">商家</a> -->
      <router-link to="/seller" class="item">商家</router-link>
    </div>
  </div>
  <router-view></router-view>
</div>
</template>

<script>
import header from 'components/header/header.vue'
const ERR_OK = 0

export default {
  data() {
    return {
      seller: {}
    }
  },
  created() {
    this.$http.get('/api/seller').then((res) => {
      // console.log(res)
      if (res.data.errno === ERR_OK) {
        console.log(res)
        this.seller = Object.assign({}, this.seller, res.data)
      }
    })
  },
  components: {
    'v-header': header
  }
}
</script>

<style lang="scss">@import "common/sass/mixin.scss";

.tab {
    display: flex;
    height: 40px;
    width: 100%;
    line-height: 40px;
    // border-bottom: 1px solid rgba(7,17,27,0.1);
    @include border-1px(rgba(7,17,27,0.1));
    .tab-item {
        flex-grow: 1;
        text-align: center;
        & > .item {
            display: block;
            font-size: 14px;
            color: rgb(77,85,93);
            &.active {
                color: rgb(240,20,20);
            }
        }
    }
}
</style>
