<template>
  <div class="login">
    <el-form class="login_from" autoComplete="on" :model="loginForm" :rules="rules" ref="loginForm" label-position="left">
      <div class="title_container">
        <h3 class="title">shmaur</h3>
      </div>
      <el-form-item prop="names" class="login_btn">
        <el-input v-model="loginForm.names" placeholder="输入账户名称">
          <i slot="prefix" class="el-input__icon el-icon-date"></i>
        </el-input>
      </el-form-item>
      <el-form-item prop="psd" class="login_btn">
        <el-input v-model="loginForm.psd" @keyup.enter.native="logins" placeholder="输入账户密码" :type="passwordType">
          <i slot="prefix" class="el-input__icon el-icon-date"></i>
          <i slot="suffix" class="el-input__icon el-icon-date" @click="showPsd"></i>
        </el-input>
      </el-form-item>
      <el-button type="primary" class="login_go" @click="logins">登陆</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'login',
  data() {
    return {

      loginForm: {
        names: '',
        psd: ''
      },
      passwordType: 'password',
      rules: {
        names: [{
          required: true,
          message: '请输入用户名',
          trigger: 'blur'
        }],
        psd: [
          { required: true, message: '请输入密码' }
        ]
      }

    }
  },
  methods: {
    logins() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          if (this.loginForm.names === 'shmaur' && this.loginForm.psd === '123456') {
             this.loading = false
             localStorage.setItem('sh_name',this.loginForm.names)
             this.$router.push({ path: '/homePage' })
          }else{
            this.$message.error('登录失败，请检查账户或者密码是否正确！')
          }
          /*this.$store.dispatch('LoginByUsername', this.loginForm).then(() => {
            this.loading = false
            this.$router.push({ path: '/home' })
          }).catch(() => {
            this.loading = false
          })*/
        } else {
          console.log('error submit!!')
          this.$message.error('账号或密码不能为空！')
          return false
        }
      })
    },
    showPsd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
    }
  }
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss'>
.login {
  position: relative;
  width: 100%;
  height: 100vh;
  background-color: #eff3f6;
  .login_from {
    position: absolute;
    left: 0;
    right: 0;
    width: 300px;
    padding: 35px 35px 15px;
    margin: 120px auto;
    .title_container .title {
      font-size: 26px;
      font-weight: 400;
      color: #757575;
      margin: 0 auto 40px;
      text-align: center;
      font-weight: 700;
    }
    .login_btn {
      margin-bottom: 30px;
    }
    .login_go {
      width: 100%;
    }
  }
}

</style>
