<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img width="64" height="64" :src="seller.avatar"/>
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span>{{seller.name}}</span>
        </div>
        <div class="descriptiom">
          {{seller.description}}/{{seller.deliveryTime}}分钟送达
        </div>
        <div v-if="seller.supports" class="support">
          <span class="icon"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
    </div>

  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      seller: {
        type: Object
      }
    }
  };
</script>

<style lang="stylus" ref="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .header
    background: #000
    color: #fff
    .content-wrapper
      padding: 24px 12px 18px 24px
      font-size: 0px
      .avatar
        display: inline-block
      .content
        display: inline-block
        margin-left: 16px
        font-size: 14px
        .title
          margin: 2px 0 8px 0
          .brand
            display: inline-block
            width: 30px
            height: 18px
            bg-image('brand')
            backfround-size: 30px 18px
            background-repeat: no-repeat


</style>
