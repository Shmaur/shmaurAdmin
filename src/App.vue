<template>
  <div id="app">

    <router-view/>
  </div>
</template>
<script>

import shmaurFont from '@/assets/style_font/css/shmaur.css'

export default {
  name: 'app'
}


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
 }
</style>
