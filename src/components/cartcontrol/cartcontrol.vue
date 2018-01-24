<template>
  <div class="cartcontrol">
    <div v-show="food.count>0" class="cart-decrease" @click="decreaseCart">
      <i class="icon-remove_circle_outline"></i>
    </div>
    <div v-show="food.count>0" class="cart-count">{{food.count}}</div>
    <div class="cart-increase" @click="addCart">
      <i class="icon-add_circle"></i>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Vue from 'vue';

  export default {
    props: {
      food: {
        type: Object
      }
    },
    methods: {
      addCart () {
        if (!this.food.count) {
          Vue.set(this.food, 'count', 1); // 为元素新增一个属性值，vue检测不到他的变化
        } else {
          this.food.count++;
        }
      },
      decreaseCart () {
        this.food.count--;
      }
    }
  };
</script>

<style lang="stylus" ref="stylesheet/stylus">
  .cartcontrol
    font-size: 0px
    .cart-decrease, .cart-increase
      display: inline-block
      height: 24px
      padding: 6px
      font-size: 24px
      color: rgb(0, 160, 220)
    .cart-count
      display: inline-block
      vertical-align: top
      width: 12px
      padding-top: 6px
      text-align: center
      font-size: 10px
      height: 24px
      line-height: 24px
      color: rgb(147, 153, 159)
</style>
