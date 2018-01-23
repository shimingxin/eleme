<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
        <li v-for="(item,index) in goods" class="menu-item" :class="{'current':currentIndex===index}"
            @click="selectMenu(index)">
          <span class="text">
            <v-icon v-show="item.type>0" :size="3" :index="item.type"></v-icon>{{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foodsWrapper">
      <ul>
        <li v-for="item in goods" class="food-list food-list-hook">
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
                  <span class="count">月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="new-price">¥{{food.price}}</span><span v-show="food.oldPrice"
                                                                      class="old-price">¥{{food.oldPrice}}</span>
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
  import BScroll from 'better-scroll';

  const ERR_OK = 0;
  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data () {
      return {
        goods: {},
        listHeight: [],
        scrollY: 0
      };
    },
    computed: {
      currentIndex () {
        for (let i = 0; i < this.listHeight.length; i++) {
          let l1 = this.listHeight[i];
          let l2 = this.listHeight[i + 1];
          if (!l2) return i;
          if (this.scrollY >= l1 && this.scrollY < l2) {
//            console.log(this.scrollY, i, l1, l2);
            return i;
          }
        }
        return 0;
      }
    },
    created () {
      this.$http.get('/api/goods').then(response => {
        response = response.body;
        if (response.errno === ERR_OK) {
          this.goods = response.data;
          /*
          你在Vue生命周期的created()钩子函数进行的DOM操作一定要放在Vue.nextTick()的回调函数中。
          原因是什么呢，原因是在created()钩子函数执行的时候DOM 其实并未进行任何渲染，
          而此时进行DOM操作无异于徒劳，所以此处一定要将DOM操作的js代码放进Vue.nextTick()的回调函数中。
          与之对应的就是mounted钩子函数，因为该钩子函数执行时所有的DOM挂载和渲染都已完成，此时在该钩子函数中进行任何DOM操作都不会有问题 。
          在数据变化后要执行的某个操作，而这个操作需要使用随数据改变而改变的DOM结构的时候，
          这个操作都应该放进Vue.nextTick()的回调函数中。
           */
          this.$nextTick(() => {
            this._initScroll();
            this._calculateHeight();
          });
        }
      });
    },
    components: {
      'v-icon': icon
    },
    methods: {
      _initScroll () {
        this.menuScroll = new BScroll(this.$refs.menuWrapper, {
          click: true // 手机端点击返回一次

        });
        this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
          probeType: 3 // 监控滚动的位置
        });
        this.foodsScroll.on('scroll', (pos) => {
          this.scrollY = Math.abs(Math.round(pos.y));
//          console.log(this.scrollY);
        });
      },
      _calculateHeight () {
        let foodlist = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
        let height = 0;
        this.listHeight.push(height);
        for (let i = 0; i < foodlist.length - 1; i++) {
          let item = foodlist[i];
          height += item.clientHeight;
          this.listHeight.push(height);
        }
      },
      selectMenu (index) {
        let foodlist = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
        let el = foodlist[index];
        this.foodsScroll.scrollToElement(el, 300);
      }
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
        padding: 0 12px
        border-1px(rgba(7, 17, 27, 0.1))
        .text
          display: table-cell
          width: 56px
          vertical-align: middle
          font-size: 12px
        &.current
          position: relative
          z-index: 10
          margin-top: -1px
          background-color: white
          font-weight: 700
          border-none()
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
          padding-bottom: 18px
          border-1px(rgba(7, 17, 27, 0.1))
          &:last-child
            border-none()
            margin-bottom: 0
          .icon
            flex: 0 0 57px
            padding-right: 10px
          .content
            flex: 1
            .name
              font-size: 14px
              height: 14px
              line-height: 14px
              color: rgb(7, 17, 27)
              padding-top: 2px
            .desc
              font-size: 10px
              line-height: 12px
              color: rgb(147, 153, 159)
              margin: 8px auto
            .extra
              font-size: 10px
              height: 10px
              line-height: 10px
              color: rgb(147, 153, 159)
              .count
                margin-right: 12px
            .price
              font-weight: 700
              .new-price
                font-size: 14px
                color: rgb(240, 20, 20)
                line-height: 24px
                margin-right: 8px
              .old-price
                font-size: 10px
                color: rgb(147, 153, 159)
                line-height: 24px
                text-decoration: line-through

</style>
