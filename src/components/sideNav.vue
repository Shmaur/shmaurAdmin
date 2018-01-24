<template>
  <div id="shmaur_left_nav">
    <el-menu class="menu_left" :default-active="onRoutes" router>
      <div class="sh_header">
        <div class="sh_header_img">
          <img src="../assets/headerPortraits.jpg" alt="">
        </div>
        <h3>shmaur</h3>
      </div>
      <template v-for="item in itemList">
        <template>
          <el-menu-item :index="item.index">
            <i :class="item.icon"></i>{{ item.title }}
          </el-menu-item>
        </template>
      </template>
      <div class="footer">
        <p class="footer_txt">
          <el-button type="text" class="footer_left" @click="setting">设置</el-button>
          <el-button type="text" class="footer_right" @click="loginout">退出</el-button>
        </p>
      </div>
    </el-menu>
  </div>
</template>
<script>
export default {
  name: 'login',
  prop:{
    date:{
      type:String
    }
  },
  data() {
    return {
      itemList: [{
        icon: 'hj-home',
        index: 'homePage',
        title: '首页'
      }, {
        icon: 'hj-list-1',
        index: 'articleList',
        title: '文章列表'
      }, {
        icon: 'hj-list-1',
        index: 'article',
        title: '文章艺里'
      }, {
        icon: 'hj-photo',
        index: 'photo',
        title: '相册万里'
      }, {
        icon: 'hj-comment2',
        index: 'comment',
        title: '千里评论'
      }, {
        icon: 'hj-msg',
        index: 'leaveword',
        title: '十里留言'
      }]
    }
  },
  mounted() {
    function maxHeight() {
      var _maxheight = document.getElementById('shmaur_left_nav');
      var _height = document.documentElement.clientHeight;
      _maxheight.style.height = _height + 'px';
    }
    maxHeight();
  },
  methods: {
    onRoutes() {
      return this.$route.path.replace('/', '')
    },
    loginout() {
      localStorage.removeItem('sh_name')
      this.$router.push('/')
    },
    setting(){
        this.$router.push({ path: '/home' })
    }
  }
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
#shmaur_left_nav {
  width: 240px;
  float: left;
  .menu_left {
    height: 100%;
    .sh_header {
      height: 180px;
      width: 100%;
      margin-top: 50px;
      .sh_header_img {
        height: 126px;
        width: 126px;
        margin: 10px auto;

        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }
      h3 {
        padding-top: 10px;
        text-align: center;
        color: #05A6F8;
      }
    }
    .hj-home,
    .hj-list-1,
    .hj-msg,
    .hj-photo,
    .hj-comment2 {
      color: #555;
    }
    .el-menu-item {
      color: #555;
    }
    .footer {
      position: absolute;
      bottom: 20px;
      left: 0;
      width: 100%;
      .footer_txt {
        display: flex;
        padding: 10px 20px;
        font-size: 14px;
        color: #8d8d8d;
        justify-content: space-between;
        .footer_left {}
        .footer_right {}
      }
    }
  }
}

</style>
