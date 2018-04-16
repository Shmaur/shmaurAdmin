<template>
  <div id="app">
    

<router-view/>
  </div>
</template>
<script>

import shmaurFont from '@/assets/style_font/css/shmaur.css'
//import shLeftNav from '@/components/sideNav'

export default {
  name: 'app',
  data() {
    return{

    }
  },
  components:{
    //shLeftNav
  }
}

</script>
<style>
.main_content {
 padding:15px 15px 15px 260px ;
}
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
