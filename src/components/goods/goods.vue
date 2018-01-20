<template>
  <div class="goods">
    <div class="menu-wrapper">
      <ul>
        <li v-for="item in goods" class="menu-item">
          <span class="text">
            <v-icon v-show="item.type>0" :size="3" :index="item.type"></v-icon>{{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper">
      <ul>
        <li v-for="item in goods" class="food-list">
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li v-for="food in item.foods" class="food-item">
              <div class="icon">
                <img width="57" height="57" :src="food.icon">
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span>月售{{food.sellCount}}份</span>
                  <span>好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="new-price">¥{{food.price}}</span>
                  <span v-show="food.oldPrice" class="old-price">¥{{food.oldPrice}}</span>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import icon from 'components/icon/icon';

  const ERR_OK = 0;
  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data () {
      return {
        goods: {}
      };
    },
    created () {
      this.$http.get('/api/goods').then(response => {
        response = response.body;
        if (response.errno === ERR_OK) {
          this.goods = response.data;
        }
      });
    },
    components: {
      'v-icon': icon
    }
  };
</script>

<style lang="stylus" ref="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .goods
    display: flex
    position: absolute
    width: 100%
    top: 174px
    bottom: 47px
    overflow: hidden
    .menu-wrapper
      flex: 0 0 80px
      width: 80px // buxie anzhuo youwenti
      background: #F3F5F7
      .menu-item
        display: table
        height: 54px
        width: 56px
        line-height: 14px
        margin: 0 12px
        border-1px(rgba(7, 17, 27, 0.1))
        .text
          display: table-cell
          width: 56px
          vertical-align: middle
          font-size: 12px
    .foods-wrapper
      flex: 1
      .food-list
        .title
          height: 26px
          font-size: 12px
          color: rgb(147, 153, 159)
          background: #F3F5F7
          line-height: 26px
          padding-left: 18px
          border-left: 2px solid #d9dde1
        .food-item
          display: flex
          margin: 18px
          padding-bottom :18px
          border-1px(rgba(7, 17, 27, 0.1))
          &:last-child
            border-none()
            margin-bottom :0
          .icon
            flex: 0 0 57px
            padding-right: 10px
          .content
            flex: 1
            .name
              font-size: 14px
              line-height: 14px
              color: rgb(7, 17, 27)
              padding-top: 2px
            .desc
              display :block
              font-size: 10px
              line-height: 10px
              color: rgb(147, 153, 159)
              padding :8px auto

</style>
