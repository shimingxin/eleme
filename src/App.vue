<template>
  <div>
    <v-header :seller="seller"></v-header>
    <div class="tab border-1px">
      <!--全局定一个特殊的class border-1px 实现1px在不同设备上的缩放 在base.styl-->
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
  import header from 'components/header/header.vue';

  const ERR_OK = 0;
  export default {
    data () {
      return {
        seller: {}
      };
    },
    created () {
      this.$http.get('/api/seller').then(response => {
        response = response.body;
        if (response.errno === ERR_OK) {
          this.seller = response.data;
        }
      }, response => {
        console.log('无数据');
      });
    },
    components: {
      'v-header': header
    }
  };
</script>

<style lang="stylus" ref="stylesheet/stylus">
  //vue-loader 依赖一个postcss的插件 自动实现浏览器兼容
  @import './common/stylus/mixin.styl' //是stylus的一个特殊语法
  .tab
    display: flex
    width: 100%
    height: 40px
    line-height: 40px
  //border-bottom :1px solid rgba(7,17,27,0.1)
    border-1px(rgba(7, 17, 27, 0.1))
    .tab-item
      flex: 1
      text-align: center
      & > a
        display: block
        font-size: 14px
        color: rgb(77, 85, 93)
        &.active
          color: rgb(240, 20, 20)

  /*text-decoration none*/

</style>
