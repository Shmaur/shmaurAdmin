<template>
    <el-dialog title="设置分类" :visible.sync=setTig @close="cloeset" width="50%">
  <el-form :model="type">
    <el-form-item label="父级分类" :label-width="formLabelWidth">
      <el-select v-model="type.type_parent" placeholder="请选择活动区域" @change="changeStairs">
        <el-option v-for="item in stairs" :key="item.id" :label="item.stairType_name" :value="item.id" >
                </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="二级分类" :label-width="formLabelWidth">
      <el-input v-model="type.type_name" clearable @keyup.enter.native="addType"></el-input>
      <i
    class="el-icon-edit el-input__icon"
    slot="suffix"
    @click="addType">
  </i>
    </el-form-item>
  </el-form>
  <el-tag
  :key="index"
  v-for="(tag, index) in settypes"
  closable
  :disable-transitions="false"
  @close="deleteClose(tag)">
  {{tag.type_name}}
</el-tag>
  <div slot="footer" class="dialog-footer">
    <el-button type="primary" @click="setTig = false">确 定</el-button>
  </div>
</el-dialog>

</template>
<script>
import axios from "axios";
export default {
  props: ["setTig"],
  data() {
    return {
      settypes: [],
      type: {
        type_parent: 1,
        type_name: ""
      },
      formLabelWidth: "100px",
      stairs: []
      //settypeTig:false,
    };
  },
  created: function() {
    //this.setTig = false;
    this.findstair();
    this.secondLevel();
  },
  methods: {
    addType() {
      let _this = this;
      axios
        .post("http://localhost:3000/api/createArticeType", this.type)
        .then(res => {
          if (res.data.success == true) {
            let data = { type_name: res.data.data };
            _this.settypes.push(data);
            this.$message({
              message: res.data.msg,
              type: "success"
            });
          } else {
            this.$message.error(res.data.msg);
          }
        });
    },
    changeStairs() {
      console.log("父级分类" + this.type.type_parent);
      this.secondLevel();
    },
    secondLevel() {
      axios
        .get(
          "http://localhost:3000/api/findArticeType?type_parent=" +
            this.type.type_parent
        )
        .then(res => {
          // = res.data.data;
          if (res.data.data.length == 0) {
            this.settypes = [];
          } else {
              this.settypes = [];
              this.type.type_name="";
            for (var i = 0; i < res.data.data.length; i++) {
              let arr = { type_name: res.data.data[i].type_name };
              this.settypes.push(arr);
            }
          }
        });
    },
    findstair() {
      let _this=this
      axios.get("http://localhost:3000/api/findStairType").then(res => {
         _this.stairs = res.data.data;
         //console.log("?????  "+this.stairs);
      });
    },
    deleteClose(tag) {
      let _this = this;
      axios
        .delete(
          "http://localhost:3000/api/deleteArticeType?type_name=" +
            tag.type_name
        )
        .then(res => {
          if (res.data.success == true) {
            _this.settypes.splice(_this.settypes.indexOf(tag), 1);
            this.$message({
              message: res.data.msg,
              type: "success"
            });
          } else {
            this.$message.error(res.data.msg);
          }
        });
    },
    cloeset() {
      this.findstair()
      this.$emit("setChange", this.setTig)
    }
  },
  watch: {}
};
</script>
<style>
.el-tag + .el-tag {
  margin-left: 10px;
}
</style>
