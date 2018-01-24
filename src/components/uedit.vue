<template>
  <div id="shmaur_uedit">
    <el-form class="edit_from" autoComplete="on" :model="infor" :rules="rules" ref="editForm" label-position="left">
      <el-row class="edit_row">
        <el-col :span="16">
          <el-form-item prop="names" class="login_btn">
            <el-input class="edit_input" v-model="infor.title" placeholder="请输入标题">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="names" class="login_btn">
            <el-input class="edit_input author" v-model="infor.author" placeholder="请输入作者">
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <quill-editor v-model="infor.content" class="editer" :options="editorOption" @ready="onEditorReady($event)"> </quill-editor>
    </el-form>
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
import 'quill/dist/quill.core.css'

export default {
  name: 'uedit',
  /* props:{
     defaultMsg:{
       type:String
     },
     config:{
       type:Object
     }
   },*/
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
    onEditorReady(editor) {

    }
  }
}

</script>
<style lang='scss' scoped>
.edit_from {
  border: 1px solid #eee;
  margin-bottom: 100px;
}

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

.el-row::after,
.el-row::before {
  display: initial;
}

.el-form-item {
  margin-bottom: 0px;
  .el-form-item__content {
    .el-input {}
  }
}

</style>
