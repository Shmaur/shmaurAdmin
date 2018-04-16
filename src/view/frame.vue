<template>
  <div class="shmaur_frame">
 <div id="wrapper">
   <sh-LeftNav></sh-LeftNav>
    <div class="main_content">
       <transition name="move" mode="out-in">
         <router-view></router-view>
       </transition>
    </div>
  </div> 
  </div>
</template>
<script>
import shLeftNav from '@/components/sideNav'
 import shRightcent from '@/view/rightcontent'
export default {

  name: 'login',
  data() {
    return {

     
    }
  },
  components:{
   shLeftNav
  }
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.main_content {
 padding:15px 15px 15px 260px ;
}

</style>
