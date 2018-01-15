<template>
  <div class="shmaur_home">
    这里是首页
    <div class="listCard">
      <el-row type="flex" class="row-bg" justify="space-between">
        <el-col :span="8">
          <div class="card color_artilce">
            <div class="card_txt">
              <p>文章</p>
            </div>
            <div class="card_nub">
              <p>66999</p>
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="card color_comment">
            <div class="card_txt">
              <p>评论</p>
            </div>
            <div class="card_nub">
              <p>66999</p>
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="card color_browse">
            <div class="card_txt">
              <p>浏览量</p>
            </div>
            <div class="card_nub">
              <p>66999</p>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row type="flex" class="row-bg" justify="space-between">
        <el-col :span="8">
          <div class="card color_user">
            <div class="card_txt">
              <p>总用户</p>
            </div>
            <div class="card_nub">
              <p>66999</p>
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="card color_leaceword">
            <div class="card_txt">
              <p>留言</p>
            </div>
            <div class="card_nub">
              <p>66999</p>
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="card color_word_number">
            <div class="card_txt">
              <p>总字数</p>
            </div>
            <div class="card_nub">
              <p>66999</p>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
export default {

  name: 'login',
  data() {
    return {


    }
  },
  components: {

  }
}

</script>
<style lang='scss' scoped>
.shmaur_home {
  .listCard {
    padding: 15px;
    .row-bg {
      margin-bottom: 26px;
      .card {
        /* width: 298px; */
        height: 104px;
        margin-right: 25px;
        color: #FFF;
        text-align: center;
        .card_txt {
          height: 103px;
          width: 130px;
          float: left;
          line-height: 103px;
        }
        .card_nub {
          width: 152px;
          height: 103px;
          line-height: 103px;
          float: right;
        }
      }
      .color_artilce {
        background: #1FEC88;
      }
      .color_comment {
        background: #FFBF52;
      }
      .color_browse {
        background: #00D2F7;
      }
      .color_user {
        background: #31DEB2;
      }
      .color_leaceword {
        background: #39D8D8;
      }
      .color_word_number {
        background: #4EB4FF;
      }
    }
  }
}

</style>
