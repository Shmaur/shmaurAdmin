<template>
  <div id="app">
<<<<<<< HEAD

    <router-view/>
=======
    <div class="header">
      <div class="leftLogo">
        <span>shmaur</span> 因为喜欢所有坚持
      </div>
      <ul class="nav">
        <li>
          <router-link class="nav-list" to="/web">不会前端</router-link>
        </li>
        <li>
          <router-link class="nav-list" to="/design">不会设计</router-link>
        </li>
        <li>
          <router-link class="nav-list" to="/photo">不会摄影</router-link>
        </li>
        <li>
          <router-link class="nav-list" to="/leave">留点留言</router-link>
        </li>
        <li>
          <router-link class="nav-list" to="/friends">欢迎交友</router-link>
        </li>
      </ul>
    </div>
    <div class="announcement">
      <p>公告：这是一个很长很长的公告，很有意义的很帅的一个公告</p>
    </div>
    <div class="crumbs">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>活动管理</el-breadcrumb-item>
        <el-breadcrumb-item>活动列表</el-breadcrumb-item>
        <el-breadcrumb-item>活动详情</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <router-view class="centent"/>
>>>>>>> f2e1fb096a70e273274a82cc8a5d40489530021f
  </div>
</template>
<script>
<<<<<<< HEAD
import shmaurFont from '@/assets/style_font/css/shmaur.css'
=======
import "../static/mains.scss"

>>>>>>> f2e1fb096a70e273274a82cc8a5d40489530021f
export default {
  name: 'app'
}

<<<<<<< HEAD
<style>
* {
	margin: 0;
	padding: 0;
}
html,body {
	height: 100%;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
 
=======
</script>
<style lang="scss">
.centent,
.crumbs {
  margin:0 auto;
  width:1080px;
  height:auto;
>>>>>>> f2e1fb096a70e273274a82cc8a5d40489530021f
}

</style>
