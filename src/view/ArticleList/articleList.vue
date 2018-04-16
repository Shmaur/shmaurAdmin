<template>
  <div class="shmaur_artcleList">
    <el-table ref="artcleList" :data="artcleList" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column label="文章标题" width="120">
        <template slot-scope="scope">{{ scope.row.artcleTitle }}</template>
      </el-table-column>
      <el-table-column prop="article_author" label="作者" width="">
      </el-table-column>
      <el-table-column prop="article_class" label="分类目录" width="">
      </el-table-column>
      <el-table-column prop="article_label" label="标签" width="">
      </el-table-column>
      <el-table-column prop="com" label="评论" width="">
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
export default {

  name: 'login',
  data() {
    return {
      artcleList: [{
        artcleTitle: '标题1',
        article_author: '黄金良',
        article_class: 'js',
        article_label: 'js',
        com: '五条评论',
        article_modified: '2017-08-09'
      }]

    }
  },
  components: {

  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
    }
  }
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>
