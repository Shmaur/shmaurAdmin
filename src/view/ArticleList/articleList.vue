<template>
  <div class="shmaur_artcleList">
    <el-table ref="articleList" :data="articleList" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column label="文章标题">
        <template slot-scope="scope">{{ scope.row.article_title }}</template>
      </el-table-column>
      <el-table-column prop="user_id" label="作者" width="">
      </el-table-column>
      <el-table-column prop="article_class" label="分类目录" width="">
      </el-table-column>
      <el-table-column prop="article_label" label="标签" width="">
      </el-table-column>
      <el-table-column prop="article_count" label="评论" width="">
      </el-table-column>
      <el-table-column prop="article_modified" label="日期" width="">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
          <el-button type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import axios from "axios";
export default {

  name: 'login',
  data() {
    return {
      articleList: []

    }
  },
  created: function() {
    this.articleLists();
  },
  components: {

  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    articleLists(){
      axios.get("http://localhost:3000/api/findArticle").then(res => {
        this.articleList = res.data.data;
        console.log(this.options);
      });
    }
  }
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>
