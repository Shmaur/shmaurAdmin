<template>
  <div class="shmaur_artcleList">
    <el-form ref="table_from" :model="table_from">
      <p class="table_from_title">水质检验日报</p>
      <table border="1">
        <tbody>
          <tr>
            <td>气温</td>
            <td colspan="6">
              <el-input v-model="table_from.wqr_qw" class="table_input" placeholder="输入气温值"></el-input>
            </td>
          </tr>
          <tr>
            <td colspan="2"></td>
            <td colspan="2">源水</td>
            <td colspan="2">出厂水</td>
            <td>备注</td>
          </tr>
          <tr>
            <td rowspan="6" class="table_Input_one">物理检验</td>
            <td class="table_Input_two">水温℃</td>
            <td colspan="2" class="table_Input_three">
              <el-input v-model="table_from.wqr_sw_ys" placeholder="输入水温"></el-input>
            </td>
            <td colspan="2" class="table_Input_three">
              <el-input v-model="table_from.wqr_sw_ccs" placeholder="输入水温"></el-input>
            </td>
            <td class="table_Input_three">
              <el-input v-model="table_from.wqr_sw_bz" placeholder="输入备注"></el-input>
            </td>
          </tr>
          <tr>
            <td class="table_Input_two">浊度（NTU）</td>
            <td colspan="2" class="table_Input_three">
              <el-input v-model="table_from.wqr_zd_ys" placeholder="输入浊度"></el-input>
            </td>
            <td colspan="2" class="table_Input_three">
              <el-input v-model="table_from.wqr_zd_ccs" placeholder="输入浊度"></el-input>
            </td>
            <td class="table_Input_three">
              <el-input v-model="table_from.wqr_zd_bz" placeholder="输入备注"></el-input>
            </td>
          </tr>
          <tr>
            <td class="table_Input_two">色度（度）</td>
            <td colspan="2" class="table_Input_three">
              <el-input v-model="table_from.wqr_sd_ys" placeholder="输入色度"></el-input>
            </td>
            <td colspan="2" class="table_Input_three">
              <el-input v-model="table_from.wqr_sd_ccs" placeholder="输入色度"></el-input>
            </td>
            <td class="table_Input_three">
              <el-input v-model="table_from.wqr_sd_bz" placeholder="输入备注"></el-input>
            </td>
          </tr>
          <tr>
            <td class="table_Input_two">嗅味</td>
            <td colspan="2" class="table_Input_three">
              <el-input v-model="table_from.wqr_xw_ys" placeholder="输入嗅味"></el-input>
            </td>
            <td colspan="2" class="table_Input_three">
              <el-input v-model="table_from.wqr_xw_ccs" placeholder="输入嗅味"></el-input>
            </td>
            <td class="table_Input_three">
              <el-input v-model="table_from.wqr_xw_bz" placeholder="输入备注"></el-input>
            </td>
          </tr>
          <tr>
            <td class="table_Input_two">肉眼可见物</td>
            <td colspan="2" class="table_Input_three">
              <el-input v-model="table_from.wqr_rykj_ys" placeholder="输入肉眼可见物"></el-input>
            </td>
            <td colspan="2" class="table_Input_three">
              <el-input v-model="table_from.wqr_rykj_ccs" placeholder="输入肉眼可见物"></el-input>
            </td>
            <td class="table_Input_three">
              <el-input v-model="table_from.wqr_rykj_bz" placeholder="输入备注"></el-input>
            </td>
          </tr>
          <tr>
            <td class="table_Input_two">ph值</td>
            <td colspan="2" class="table_Input_three">
              <el-input v-model="table_from.wqr_ph_ys" placeholder="输入ph值"></el-input>
            </td>
            <td colspan="2" class="table_Input_three">
              <el-input v-model="table_from.wqr_ph_ccs" placeholder="输入ph值"></el-input>
            </td>
            <td class="table_Input_three">
              <el-input v-model="table_from.wqr_ph_bz" placeholder="输入备注"></el-input>
            </td>
          </tr>

          <tr>
            <td rowspan="9" class="table_Input_one">
              化学检验(mg/L)计量
            </td>
            <td class="table_Input_two">氨性氮</td>
            <td colspan="2" class="table_Input_three">
              <el-input v-model="table_from.wqr_axd_ys" placeholder="输入氨性氮"></el-input>
            </td>
            <td colspan="2" class="table_Input_three">
              <el-input v-model="table_from.wqr_axd_ccs" placeholder="输入氨性氮"></el-input>
            </td>
            <td class="table_Input_three">
              <el-input v-model="table_from.wqr_axd_bz" placeholder="输入备注"></el-input>
            </td>
          </tr>
          <tr>
            <td class="table_Input_two">亚硝酸</td>
            <td colspan="2" class="table_Input_three">
              <el-input v-model="table_from.wqr_yxs_ys" placeholder="输入亚硝酸"></el-input>
            </td>
            <td colspan="2" class="table_Input_three">
              <el-input v-model="table_from.wqr_yxs_ccs" placeholder="输入亚硝酸"></el-input>
            </td>
            <td class="table_Input_three">
              <el-input v-model="table_from.wqr_yxs_bz" placeholder="输入备注"></el-input>
            </td>
          </tr>
          <tr>
            <td class="table_Input_two">耗氧量</td>
            <td colspan="2" class="table_Input_three">
              <el-input v-model="table_from.wqr_hyhyl_ys" placeholder="输入耗氧量"></el-input>
            </td>
            <td colspan="2" class="table_Input_three">
              <el-input v-model="table_from.wqr_hyhyl_ccs" placeholder="输入耗氧量"></el-input>
            </td>
            <td class="table_Input_three">
              <el-input v-model="table_from.wqr_hyhyl_bz" placeholder="输入备注"></el-input>
            </td>
          </tr>
          <tr>
            <td class="table_Input_two">碱度</td>
            <td colspan="2" class="table_Input_three">
              <el-input v-model="table_from.wqr_jd_ys" placeholder="输入碱度"></el-input>
            </td>
            <td colspan="2" class="table_Input_three">
              <el-input v-model="table_from.wqr_jd_ccs" placeholder="输入碱度"></el-input>
            </td>
            <td class="table_Input_three">
              <el-input v-model="table_from.wqr_jd_bz" placeholder="输入备注"></el-input>
            </td>
          </tr>
          <tr>
            <td class="table_Input_two">总硬度</td>
            <td colspan="2" class="table_Input_three">
              <el-input v-model="table_from.wqr_zyd_ys" placeholder="输入总硬度"></el-input>
            </td>
            <td colspan="2" class="table_Input_three">
              <el-input v-model="table_from.wqr_zyd_ccs" placeholder="输入总硬度"></el-input>
            </td>
            <td class="table_Input_three">
              <el-input v-model="table_from.wqr_zyd_bz" placeholder="输入备注"></el-input>
            </td>
          </tr>
          <tr>
            <td class="table_Input_two">氧化物</td>
            <td colspan="2" class="table_Input_three">
              <el-input v-model="table_from.wqr_lhw_ys" placeholder="输入氧化物"></el-input>
            </td>
            <td colspan="2" class="table_Input_three">
              <el-input v-model="table_from.wqr_lhw_ccs" placeholder="输入氧化物"></el-input>
            </td>
            <td class="table_Input_three">
              <el-input v-model="table_from.wqr_lhw_bz" placeholder="输入备注"></el-input>
            </td>
          </tr>
          <tr>
            <td class="table_Input_two">含铁量</td>
            <td colspan="2" class="table_Input_three">
              <el-input v-model="table_from.wqr_htl_ys" placeholder="输入含铁量"></el-input>
            </td>
            <td colspan="2" class="table_Input_three">
              <el-input v-model="table_from.wqr_htl_ccs" placeholder="输入含铁量"></el-input>
            </td>
            <td class="table_Input_three">
              <el-input v-model="table_from.wqr_htl_bz" placeholder="输入备注"></el-input>
            </td>
          </tr>
          <tr>
            <td class="table_Input_two">锰</td>
            <td colspan="2" class="table_Input_three">
              <el-input v-model="table_from.wqr_mn_ys" placeholder="输入锰"></el-input>
            </td>
            <td colspan="2" class="table_Input_three">
              <el-input v-model="table_from.wqr_mn_ccs" placeholder="输入锰"></el-input>
            </td>
            <td class="table_Input_three">
              <el-input v-model="table_from.wqr_mn_bz" placeholder="输入备注"></el-input>
            </td>
          </tr>
          <tr>
            <td class="table_Input_two">铝</td>
            <td colspan="2" class="table_Input_three">
              <el-input v-model="table_from.wqr_al_ys" placeholder="输入铝"></el-input>
            </td>
            <td colspan="2" class="table_Input_three">
              <el-input v-model="table_from.wqr_al_ccs" placeholder="输入铝"></el-input>
            </td>
            <td class="table_Input_three">
              <el-input v-model="table_from.wqr_al_bz" placeholder="输入备注"></el-input>
            </td>
          </tr>
          <tr>
            <td rowspan="5" class="table_Input_one">
              投药量
            </td>
            <td class="table_Input_two">耗氯量</td>
            <td colspan="2" class="table_Input_three">
              <el-input v-model="table_from.wqr_hyl_ys" placeholder="输入耗氯量"></el-input>
            </td>
            <td colspan="2" class="table_Input_three">
              <el-input v-model="table_from.wqr_hyl_ccs" placeholder="输入耗氯量"></el-input>
            </td>
            <td class="table_Input_three">
              <el-input v-model="table_from.wqr_hyl_bz" placeholder="输入备注"></el-input>
            </td>
          </tr>
          <tr>
            <td class="table_Input_two">需矾量</td>
            <td colspan="2" class="table_Input_three">
              <el-input v-model="table_from.wqr_xfl_ys" placeholder="输入需矾量"></el-input>
            </td>
            <td colspan="2" class="table_Input_three">
              <el-input v-model="table_from.wqr_xfl_ccs" placeholder="输入需矾量"></el-input>
            </td>
            <td class="table_Input_three">
              <el-input v-model="table_from.wqr_xfl_bz" placeholder="输入备注"></el-input>
            </td>
          </tr>
          <tr>
            <td class="table_Input_two">剩余氯</td>
            <td>
              <el-input v-model="table_from.wqr_syl_ys" placeholder="数值"></el-input>
            </td>
            <td >
              <el-input v-model="table_from.wqr_syl_ys2" placeholder="数值"></el-input>
            </td>
            <td>
              <el-input v-model="table_from.wqr_syl_ccs" placeholder="数值"></el-input>
            </td >
            <td >
              <el-input v-model="table_from.wqr_syl_ccs2" placeholder="数值"></el-input>
            </td>
            <td class="table_Input_three">
              <el-input v-model="table_from.wqr_syl_bz" placeholder="输入备注"></el-input>
            </td>
          </tr>
          <tr>
            <td class="table_Input_two">过滤前、后浊度</td>
            <td>
              <el-input v-model="table_from.wqr_glqhzd_ys" placeholder="数值"></el-input>
            </td>
            <td >
              <el-input v-model="table_from.wqr_glqhzd_ys2" placeholder="数值"></el-input>
            </td>
            <td>
              <el-input v-model="table_from.wqr_glqhzd_ccs" placeholder="数值"></el-input>
            </td>
            <td >
              <el-input v-model="table_from.wqr_glqhzd_ccs2" placeholder="数值"></el-input>
            </td>
            <td class="table_Input_three">
              <el-input v-model="table_from.wqr_glqhzd_bz" placeholder="输入备注"></el-input>
            </td>
          </tr>
          <tr>
            <td class="table_Input_two">时间</td>
            <td>
              <el-input v-model="table_from.wqr_time_ys" placeholder="时间"></el-input>
            </td>
            <td >
              <el-input v-model="table_from.wqr_time_ys2" placeholder="时间"></el-input>
            </td>
            <td>
              <el-input v-model="table_from.wqr_time_ccs" placeholder="时间"></el-input>
            </td>
            <td >
              <el-input v-model="table_from.wqr_time_ccs2" placeholder="时间"></el-input>
            </td>
            <td class="table_Input_three">
              <el-input v-model="table_from.wqr_time_bz" placeholder="输入备注"></el-input>
            </td>
          </tr>
          <tr>
            <td colspan="10" class="tabl">
              <el-button type="primary" size="small">保存</el-button>
            </td>
          </tr>
        </tbody>
      </table>
    </el-form>
  </div>
</template>
<script>
export default {
  name: "login",
  data() {
    return {
      table_from: {
        wqr_qw: "",
        wqr_sw_ys: "",
        wqr_sw_ccs: ""
      }
    };
  },
  components: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-form {
  width: 60%;
  padding: 15px;
  box-shadow: 0 0 15px #dbdbdb;
}
table,table tr td {
  border:1px solid #dfdfdf;
  padding: 5px;
  text-align: center; 
}
table{
  border-collapse: collapse;
  line-height: 25px;
  font-size: 12px;
}
.table_from_title{
  color:#575a5e;
  font-size: 14px;
  padding: 0 0 10px 0;
}
.table_input{
  width: 98%;
}
.table_Input_one {
  /* width: 18%; */
}
.table_Input_two {
  width: 14%;
}
.table_Input_three {
  /* width: 15%; */
}
</style>
<style>
.el-input__inner {
  height: 25px !important;
  border-radius: 2px !important;
  padding:0 5px !important;
  border:0 !important;
}
</style>
