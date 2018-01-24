<template>
  <div class="shopcart">
    <div class="content">
      <div class="content-left">
        <div class="logo-wrapper">
          <div class="logo" :class="{'high-light':totalPrice>0}">
            <i class="icon-shopping_cart"></i>
          </div>
          <div v-show="totalCount>0" class="num">{{totalCount}}</div>
        </div>
        <div class="price" :class="{'high-light':totalPrice>0}">¥{{totalPrice}}</div>
        <div class="desc">另需配送费¥{{deliveryPrice}}元</div>
      </div>
      <div class="content-right">
        <div class="min-price" :class="payClass">{{payDesc}}</div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      selectedFoods: {
        type: Array,
        default () {
          return [];
        }
      },
      deliveryPrice: {
        type: Number,
        default: 0
      },
      minPrice: {
        type: Number,
        default: 0
      }
    },
    computed: {
      totalPrice () {
        let total = 0;
        this.selectedFoods.forEach((food) => {
          total += food.price * food.count;
        });
        return total;
      },
      totalCount () {
        let total = 0;
        this.selectedFoods.forEach((food) => {
          total += food.count;
        });
        return total;
      },
      payDesc () {
        if (this.totalPrice === 0) {
          return `¥${this.minPrice}起送`;
        }
        if (this.totalPrice < this.minPrice && this.totalPrice > 0) {
          return `还差¥${this.minPrice - this.totalPrice}起送`;
        }
        if (this.totalPrice >= this.minPrice) {
          return '去结算';
        }
      },
      payClass () {
        if (this.totalPrice >= this.minPrice) {
          return 'enough';
        }
      }
    }
  };
</script>

<style lang="stylus" ref="stylesheet/stylus">
  .shopcart
    position: fixed
    left: 0px
    bottom: 0px
    z-index: 50
    height: 48px
    width: 100%
    .content
      display: flex
      background: #141d27
      font-size: 0
      .content-left
        flex: 1
        .logo-wrapper
          display: inline-block
          position: relative
          top: -10px
          margin: 0 12px
          padding: 6px
          width: 56px
          height: 56px
          box-sizing: border-box // 宽高包括bordder padding
          vertical-align: top
          border-radius: 50%
          background-color: #141d27
          .logo
            width: 100%
            height: 100%
            border-radius: 50%
            background: #2b343c
            text-align: center
            .icon-shopping_cart
              font-size: 24px
              line-height: 44px
              color: #80858a
            &.high-light
              background: rgb(0, 160, 220)
              .icon-shopping_cart
                color: #fff
          .num
            position: absolute
            top: 0
            right: 0px
            width: 24px
            height: 16px
            line-height: 16px
            border-radius: 12px
            text-align: center
            font-size: 9px
            font-weight: bold
            color: white
            background-color: rgb(240, 20, 20)
            box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.4)
        .price
          display: inline-block
          vertical-align: top
          margin-top: 12px
          padding-right: 12px
          border-right: 1px solid rgba(255, 255, 255, 0.4)
          font-weight: bold
          line-height: 24px
          font-size: 16px
          color: rgba(255, 255, 255, 0.4)
          &.high-light
            color: #fff
        .desc
          display: inline-block
          margin-top: 12px
          padding-left: 12px
          font-size: 12px
          color: rgba(255, 255, 255, 0.4)
          line-height: 24px
      .content-right
        flex: 0, 0, 105px
        width: 105px
        .min-price
          display: inline-block
          vertical-align: top
          line-height: 48px
          height: 48px
          width: 100%
          text-align center
          font-size: 12px
          font-weight: 700
          color: rgba(255, 255, 255, 0.4)
          background: #2b333b
          &.enough
            background: #00b34c
            color: #fff
</style>
