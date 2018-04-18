<template>
  <div id="shmaur_uedit">
<!--     <el-form class="edit_from" autoComplete="on" :model="infor" :rules="rules" ref="editForm" label-position="left">
       -->    
      <quill-editor ref="qullEditor" @focus="onEditorFocus($event)" v-model="infor.content" class="editer" :options="editorOption"  @change="editorChange"> </quill-editor>
    <!-- </el-form> -->
    <form action="" method="post" enctype="multipart/form-data" id="uploadFormMulti">
    <input style="display: none" :id="uniqueId" type="file" name="avator" multiple accept="image/jpg,image/jpeg,image/png,image/gif" @change="upLoadImg()"><!--style="display: none"-->
    </form>
  </div>
</template>
<script>
import "quill/dist/quill.core.css";
import { quillEditor } from "vue-quill-editor";
import Promise from "promise-polyfill";
import Quill from "quill";
import vueFooter from "@/components/edit_footer";
import axios from "axios";
export default {
  name: "uedit",
  props: ["text", "editorId"],
  data() {
    return {
      infor: {
        content: "",
        title: "",
        author: ""
      },
      uniqueId: "",
      imgPercent: "",
      contents:"",
      editorContent: "",
      urlPath: "",
      editorOption: {
        placeholder: "请输入文章内容",
        history: {
          delay: 100,
          maxStack: 100,
          userOnly: false
        }
      },
      modules: {
        toolbar: [
          [{ size: ["small", "large", "huge"] }],
          ["bold", "italic", "underline"],
          ["blockquote"],
          [{ color: [] }, { background: [] }], // dropdown with defaults from theme
          [{ font: [] }],
          [{ list: "ordered" }, { list: "bullet" }],
          ["link", "image", "video"]
        ],
        imageImport: true,
        imageResize: {
          displaySize: true
        }
      },
      addImgRange: ""
    };
  },
  mounted() {},
  components: {
    vueFooter
  },
  methods: {
    editorChange({ editor, html, text }) {
      var _this = this;
      _this.$emit("editorChange", html);
    },
    onEditorFocus(event) {
      console.log(event);
      console.log("获取到光标");
      event.enable(true);
    },
    upLoadImg: async function() {
      let _this = this;
      let filse = this.$el.children.uploadFormMulti[0].files[0];
      let formData = new FormData();
      formData.append("position", "c"); //c 表示图片是代表的是那个地方
      formData.append("file", filse);

      const url = await _this.upLoadImgAdd(formData);
      console.log(url)
      if (url != null && url.length > 0) {
        let _url = url;
        _url = _url.indexOf("http") != -1 ? _url : "http:" + _url; //如果返回的地址中没有http自动拼接
        let index = _this.addImgRange != null ? _this.addImgRange.index : 0; //获取插入时的位置索引，如果获取失败，则插入到最前面
        _this.$refs.qullEditor.quill.insertEmbed(index, "image", _url);
        let _img = new Image();
        _img.src = _url;
        _this.$refs.qullEditor.quill.formatText(index,index + 1,"width",400 + "px");
      } else {
        console.log("what ???");
      }
    },
    upLoadImgAdd(formData) {
      return new Promise((resolve, reject) => {
        axios.post("http://localhost:3000/api/update", formData).then(res => {
          //this.fielLsits = res.data.data
          if (res.data.success === true) {
            this.urlPath = res.data.data.path;
            resolve(res.data.data.path);
          } else {
            this.$message.error("图片插入失败");
          }
        });
      });
    }
  },
  created: function() {
    console.log(Quill.sources.USER);
    let _this = this;
    _this.imgPercent = 0;
    _this.editorContent = _this.text;
    _this.uniqueId = _this.editorId ? _this.editorId : "inputImg";
  },
  watch: {
    text: function() {
      let _this = this_this;
      _this.editorContent = _this.text;
    }
  },
  mounted() {
    let _this = this;
    //imgHandler();
    let imgHandler = async function(image) {
      _this.addImgRange = _this.$refs.qullEditor.quill.getSelection();
      if (image) {
        let filInput = document.getElementById(_this.uniqueId);
        filInput.click(filInput.files);
      }
    };
    let videoHandler = async function(state) {
      
    }
    this.$refs.qullEditor.quill
      .getModule("toolbar")
      .addHandler("image", imgHandler);
    //_this.$refs.qullEditor.quill.getModule("toolbar");
  }
};
</script>
<style lang='scss' scoped>
.edit_from {
  border: 1px solid #eee;
  margin-bottom: 100px;
}
.edit_row {
  height: 50px;
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
</style>
