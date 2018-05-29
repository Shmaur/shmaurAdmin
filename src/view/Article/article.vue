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
          <vue-Editor :text="contents" :editorId="editorChange" @ChangeContent="saveCentent" class="editer"></vue-Editor>
          <!--<quill-editor v-model="infor.article_content" class="editer" :options="editorOption" @ready="onEditorReady($event)" > </quill-editor>-->
        </div>
        <div class="conment_info">
          <div class="artcle_img">
            <p class="artcle_img_title">
              封面
            </p>
            <div class="artcle_image">
              <img width="100%" :src="infor.article_photo" alt="">
              <form action="" method="post" enctype="multipart/form-data">
              <input type="file" id="article_photo" style="display:none" accept="image/jpg,image/jpeg,image/png,image/gif" @change="uploadImg()">
              </form>
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
              <span @click="setType" class="">设置分类</span>
            </div>
            <div class="select_class">
              <el-select v-model="infor.article_type_id" clearable filterable placeholder="请选择分类">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.type_name">
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="is_artcle">
            <el-switch v-model="infor.comment_status" active-color="#13ce66" inactive-text="评论/留言" inactive-color="#ff4949" active-value=1 inactive-value=0>
            </el-switch>
            <el-switch v-model="infor.article_issue" active-color="#13ce66" inactive-text="是否发布" inactive-color="#ff4949" active-value=1 inactive-value=0>
            </el-switch>
            <el-switch v-model="infor.article_original" active-color="#13ce66" inactive-text="是否原创" inactive-color="#ff4949" active-value=1 inactive-value=0>
            </el-switch>
          </div>
        </div>
      </div>
       <div id="shmaur_edit_footer">
    <div class="edit_footer">
      <div class="footer_conent">
        <div class="edit_txt">
          <p>正文一共：字</p>
          <p>预计阅读时间：</p>
        </div>
        <div class="edit_btn">
          <el-button type="primary" @click="saveActicle">保存</el-button>
        </div>
      </div>
    </div>
  </div>
    </el-form>

  </div>
</template>
<script>
import vueEditor from "@/components/uedit";
import vueFooter from "@/components/edit_footer";
import vuesetType from "@/view/Article/setType";
import axios from "axios";
export default {
  name: "login",
  data() {
    return {
      infor: {
        article_title: "",
        article_author: "",
        article_content: "",
        article_excerpt: "",
        article_type_id: "",
        user_id:"1",
        article_status:true,
        comment_status: true,
        article_label:"",
        article_issue: true,
        article_count:0,
        article_original: false,
        article_photo:""
      },
      editorOption: {},
      fielLsits:[],
      options: "",
      settypeTig: false,
      upimg: false,
      myups: false,
      limitNub:1,
      upFrom: {
        img_name:"",
        img_Path:""
      },
      //fielLsits: [],
      articleImglist: [],
      contents: "",
      formLabelWidth: "120px",
      rules: {}
    };
  },
  components: {
    vueEditor,
    vueFooter,
    vuesetType
  },
  created: function() {
    this.indArtice();
  },
  methods: {
    editorChange: function(html) {
      this.contents = html;
    },
    indArtice() {
      axios.get("http://localhost:3000/api/findArticeTypeall").then(res => {
        this.options = res.data.data;
        console.log(this.options);
      });
    },
    uploadImg(){
      let article_photos = document.getElementById('article_photo')
      article_photos.click()
      let formData = new FormData();
      formData.append("position", "z");
      formData.append("file", article_photos.files[0]);
      //var fr = new FileReader();
      //fr.append(article_photos.files)
  //console.log(fr)
      if(article_photos.files.length > 0){
        axios.post("http://localhost:3000/api/update",formData).then(res=>{
          if (res.data.success == false) {
            this.$message.error(res.data.msg);
          } else {
            this.$message({
              message: res.data.msg,
              type: "success"
            });
            this.upFrom.img_name = res.data.data.name;
            this.upFrom.img_Path = res.data.data.path;
            this.infor.article_photo = "http://localhost:3000/"+res.data.data.path;
            return;
          }
          contents.onSuccess("上传成功");
        })
      }
    
     
    },
    ppp(msg) {
      this.settypeTig = msg;
      this.indArtice();
      console.log(msg);
    },
    onEditorReady(editor) {},
    setType() {
      this.settypeTig = true;
    },
    saveCentent(val){
      this.infor.article_content = val
      console.log(this.infor)
    },
    upload() {
      //this.upimg = true;
      
this.uploadImg()
      axios.get("http://localhost:3000/api/findDataArtices").then(res => {
        this.fielLsits = res.data.data;
        console.log(this .fielLsits);
      });
    },
    handleRemove(file, fileList) {
      axios.delete("http://localhost:3000/api/deleteArticleImg?img_name="+this.upFrom.img_name).then(res => {
        if (res.data.success == false) {
            this.$message.error(res.data.msg);
          } else {
            this.$message({
              message: res.data.msg,
              type: "success"
            });
          }
      });
      
      console.log(file, fileList);
    },
    handlePreview(res, file, filelist) {
      this.myups=true
      console.log(this.upFrom.name);
      console.log(file);
      console.log(res);
      console.log(filelist);
    },
    myupsuccess(file) {
      if(this.upFrom.img_Path == ""){
        this.fielLsits=""
      }
      this.infor.article_photo = this.upFrom.path
      this.upimg=false

    },
saveActicle(){
  axios.post("http://localhost:3000/api/creatArticle",this.infor).then(res =>{
    if (res.data.success == false) {
            this.$message.error(res.data.msg);
          } else {
            this.$message({
              message: res.data.msg,
              type: "success"
            });
          }
  })
  console.log(this.infor)
},
addImg(){
  console.log(this.infor)
this.infor.article_photo = this.upFrom.path
this.upimg=false
},
    myup(contents) {
      let fileObj = contents.file;
      let formData = new FormData();
      formData.append("position", "z");
      formData.append("file", fileObj);

      axios({
        method: "post",
        headers: {
          "Content-Type": "application/json",
          "Content-Type": "application/x-www-form-urlencoded"
        },
        url: contents.action,
        data: formData
      })
        .then(res => {
          if (res.data.success == false) {
            this.$message.error(res.data.msg);
            this.fielLsits = "";
          } else {
            this.$message({
              message: res.data.msg,
              type: "success"
            });
            this.upFrom.img_name = res.data.data.name;
            this.upFrom.img_Path = res.data.data.path;
            this.fielLsits = res.data.data;
            return;
          }

          console.log(res);
          contents.onSuccess("上传成功");
        })
        .catch(err => {
          if (err.response) {
            contents.onError("配置文件上传失败");
          } else if (err.request) {
            contents.onError("上传失败，服务器无响应");
          } else {
            contents.onError("请求封装失败");
          }
        });
    }
  }
};
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
    .el-input {
    }
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
  border: 1px solid #eee;
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
      background: #13cff4;
      line-height: 150px;
      text-align: center;
      color: #fff;
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

.el-button + .el-button {
  margin: 0;
}

.edit_footer {
  height: 102px;
  background: #fdfdfd;
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
      color: #8d8d8d;
      margin-right: 20px;
    }
  }
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
</style>
