<template>
  <div id="shmaur_edit_footer">
    <div class="edit_footer">
      <div class="footer_conent">
        <div class="edit_txt">
          <p>正文一共：字</p>
          <p>预计阅读时间：</p>
        </div>
        <div class="edit_btn">
          <el-button type="primary">保存</el-button>
          <el-button type="primary">保存草稿</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  name: 'edit_footer',
  data() {
    return {
      infor: {
        content: '',
        title: '',
        author: ''
      },
      editorOption: {}
    }
  },
  mounted() {
  },
  methods: {
  }
}

</script>
<style lang='scss' scoped>
.edit_footer {
  height: 102px;
  background: #FDFDFD;
  box-shadow: 0 -2px 4px 2px rgba(0, 0, 0, 0.08);
  margin-left: -20px;
  position: fixed;
  display: flex;
  width: 100%;
  bottom: 0;
  z-index: 99;
  .footer_conent {
    display: flex;
    margin: 0 auto;
    padding-top:2.5%;
    .edit_txt {
      font-size: 14px;
      color: #8D8D8D;
      margin-right:20px;
    }
  }
}

</style>
