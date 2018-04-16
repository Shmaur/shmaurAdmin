<template>
  <div class="shmaur_comment">
    这里是评论千里
    <el-upload class="upload-demo" drag action="https://jsonplaceholder.typicode.com/posts/" multiple>
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>
   <!--  <vueshowpdf @closepdf="closepdf" v-model="isshowpdf" :pdfurl="pdfurls" @pdferr="pdferr" :maxscale='4' :m -->inscale='0.6' :scale='1.1'></vueshowpdf>
    <el-button type="primary" @click="openUrl()">主要按钮</el-button>
  </div>
</template>
<script>
//import vueshowpdf from 'vueshowpdf'
export default {

  name: 'login',
  data() {
    return {
      pdfurls: '../../static/舟山调研_20180117.pdf',
      isshowpdf: false

    }
  },
  components: {
    //vueshowpdf
  },
  methods: {
    closepdf() {
      this.isshowpdf = false
    },
    pdferr(errurl) {
      console.log(errurl);
    },
    openUrl(){
this.isshowpdf=true
    }
  }
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>
