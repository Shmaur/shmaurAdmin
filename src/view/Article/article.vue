<template>
  <div class="shmaur_artcleList">
    <el-form class="edit_from" autoComplete="on" :model="infor" :rules="rules" ref="editForm" label-position="left">
      <div class="conment">
        <div class="editor">
          <el-row class="edit_row">
            <el-col :span="16">
              <el-form-item prop="names" class="login_btn">
                <el-input class="edit_input" v-model="infor.article_title" placeholder="请输入标题">
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item prop="names" class="login_btn">
                <el-input class="edit_input author" v-model="infor.article_author" placeholder="请输入作者">
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <vue-Editor :text="content" :editorChange="editorChange" class="editer"></vue-Editor>
          <!--<quill-editor v-model="infor.article_content" class="editer" :options="editorOption" @ready="onEditorReady($event)" > </quill-editor>-->
        </div>
        <div class="conment_info">
          <div class="artcle_img">
            <p class="artcle_img_title">封面</p>
            <div class="artcle_image">
              添加封面
            </div>
            <el-button type="text" class="img_btn" @click="upload">本地上传</el-button>
            <el-button type="text" class="img_btn">选择相册</el-button>
          </div>
          <div class="artcle_txt">
            <p>摘要</p>
            <el-input type="textarea" :rows="4" placeholder="请输入摘要" v-model="infor.article_excerpt">
            </el-input>
          </div>
          <div class="artcle_class">
            <div class="title">
              <p>分类</p>
              <span>设置分类</span>
            </div>
            <div class="select_class">
              <el-select v-model="infor.article_type_id" clearable placeholder="请选择分类">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="is_artcle">
            <el-switch v-model="infor.comment_status" active-color="#13ce66" active-text="评论/留言" inactive-color="#ff4949">
            </el-switch>
            <el-switch v-model="infor.article_issue" active-color="#13ce66" active-text="是否发布" inactive-color="#ff4949">
            </el-switch>
            <el-switch v-model="infor.article_original" active-color="#13ce66" active-text="是否发布" inactive-color="#ff4949">
            </el-switch>
          </div>
        </div>
      </div>
      <vueFooter></vueFooter>
    </el-form>
    <el-dialog title="上传图片" :visible.sync="upimg">
      <el-form :model="upFrom">
        <el-form-item label="图片名称" :label-width="formLabelWidth">
          <el-input v-model="upFrom.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-upload class="upload-demo" action="http://localhost:3000/api/update" :on-preview="myupsuccess" :on-success="handlePreview" :on-remove="handleRemove" :file-list="fielLsits" list-type="picture-card" :http-request="myup">
          <i class="el-icon-plus"></i>
          <!-- <el-button size="small" type="primary">添加图片</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过2MB</div> -->
        </el-upload>
        <el-dialog :visible.sync="myups">
          <img width="100%" :src="fielLsits.imgPath" alt="">
        </el-dialog>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="upimg = false">取 消</el-button>
        <el-button type="primary" @click="upimg = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import vueEditor from '@/components/uedit'
import vueFooter from '@/components/edit_footer'
import axios from 'axios'
export default {

  name: 'login',
  data() {
    return {
      infor: {
        article_title: '',
        article_author: '',
        article_content: '',
        article_excerpt: '',
        article_type_id: '',
        comment_status: true,
        article_issue: true,
        article_original: true,
      },
      editorOption: {},
      upimg: false,
      myups: false,
      upFrom: {
        name: '',
        imgPath: ''
      },
      fielLsits: [],
      articleImglist: [],
      formLabelWidth: '120px',
      rules: {

      }
    }
  },
  components: {
    vueEditor,
    vueFooter
  },
  methods: {
    editorChange: function(html) {
      this.content = html
    },
    onEditorReady(editor) {

    },
    upload() {
      this.upimg = true
      axios.post('http://localhost:3000/api/findDataArtices').then(res => {
        this.fielLsits = res.data.data
        console.log(this.fielLsits)
      })
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(res, file, filelist) {
      console.log(this.upFrom.name);
      console.log(file);
      console.log(res)
      console.log(filelist)
    },
    myupsuccess(file) {
      this.myups = true
    },

    myup(content) {
     let fileObj = content.file;
     let formData = new FormData();
     formData.append("","z");
     formData.append("file",fileObj);

       axios({
          method: 'post',
          headers: { 'Content-Type': 'application/json', 'Content-Type': 'application/x-www-form-urlencoded' },
          url: content.action,
          data: formData
        }).then(res => {
          if (res.data.success == false) {
            this.$message.error(res.data.msg);
            this.fielLsits=''
          } else {
            this.$message({
            message: res.data.msg,
            type: 'success'
          });
            this.upFrom.name = res.data.data.name
            this.upFrom.imgPath = res.data.data.path
            this.fielLsits=res.data.data
            return
          }

          console.log(res)
          content.onSuccess('上传成功')
        }).catch(err => {
          
          if (err.response) {
            content.onError('配置文件上传失败')
          } else if (err.request) {
            content.onError('上传失败，服务器无响应')
          } else {
            content.onError('请求封装失败')
          }

        })
    }
  }
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
/* .el-row {
  border: 1px solid #EEE;
  height: 41px;
} */

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

.editor {
  float: left;
  width: 71%;
  border: 1px solid #eee;
}

.conment_info {
  float: right;
  width: 228px;
  border: 1px solid #EEE;
  display: inline-block;
  padding: 20px;
  font-size: 16px;
  p {
    color: #555;
    margin-bottom: 10px;
  }
  .artcle_img {
    margin-bottom: 10px;
    .artcle_image {
      height: 150px;
      background: #13CFF4;
      line-height: 150px;
      text-align: center;
      color: #FFF;
    }
    .img_btn {
      width: 110px;
      text-align: center;
    }
  }
  .artcle_txt {
    margin-bottom: 10px;
  }
  .artcle_class {
    margin-bottom: 10px;
    .title {
      p {
        display: inline-block;
      }
      span {
        font-size: 12px;
        margin-left: 10px;
        color: #bbb;
      }
    }
  }
}

.el-button+.el-button {
  margin: 0;
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
    padding-top: 2.5%;
    .edit_txt {
      font-size: 14px;
      color: #8D8D8D;
      margin-right: 20px;
    }
  }
}

</style>
