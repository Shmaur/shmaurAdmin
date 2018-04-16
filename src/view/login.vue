<template>
  <div class="login">
    <el-form class="login_from" autoComplete="on" v-show="showLogin" :model="loginForm" :rules="rules" ref="loginForm" label-position="left">
      <div class="title_container">
        <h3 class="title">shmaur 登录</h3>
      </div>
      <el-form-item prop="user_login" class="login_btn">
        <el-input v-model="loginForm.user_login" placeholder="输入账户名称">
          <i slot="prefix" class="el-input__icon el-icon-date"></i>
        </el-input>
      </el-form-item>
      <el-form-item prop="user_pass" class="login_btn">
        <el-input v-model="loginForm.user_pass" @keyup.enter.native="logins" placeholder="输入账户密码" :type="passwordType">
          <i slot="prefix" class="el-input__icon el-icon-date"></i>
          <i slot="suffix" class="el-input__icon el-icon-date" @click="showPsd"></i>
        </el-input>
      </el-form-item>
      <el-button type="text" @click="loginRegister" >没有账号？点击注册</el-button>
      <el-button type="primary" class="login_go" @click="logins" >登陆</el-button>
    </el-form>
    <el-form class="login_from" autoComplete="on" v-show="showRegister" :model="loginForm" :rules="rules" ref="loginForm" label-position="left">
      <div class="title_container">
        <h3 class="title">注册</h3>
      </div>
      <el-form-item prop="user_login" class="login_btn">
        <el-input v-model="loginForm.user_login" placeholder="输入账户名称">
          <i slot="prefix" class="el-input__icon el-icon-date"></i>
        </el-input>
      </el-form-item>
      <el-form-item prop="user_pass" class="login_btn">
        <el-input v-model="loginForm.user_pass" @keyup.enter.native="logins" placeholder="输入账户密码" :type="passwordType">
          <i slot="prefix" class="el-input__icon el-icon-date"></i>
          <i slot="suffix" class="el-input__icon el-icon-date" @click="showPsd"></i>
        </el-input>
      </el-form-item>
      <el-button type="text" @click="loginRegister" >已有账号？点击登录</el-button>
      <el-button type="primary" class="login_go" @click="logins">注册</el-button>
    </el-form>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'login',
  data() {
    return {
      showLogin: true,
      showRegister: false,
      loginForm: {
        user_login: '',
        ip:'',
        user_pass: ''
      },
      loading: false,
      
      passwordType: 'password',
      rules: {
        user_login: [{
          required: true,
          message: '请输入用户名',
          trigger: 'blur'
        }],
        user_pass: [
          { required: true, message: '请输入密码' }
        ]
      }

    }
  },
  created(){
    axios.get('http://httpbin.org/ip').then(data=>{
          this.loginForm.ip=data.data.origin
        })
  },
  methods: {
    logins() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          //this.loading = true
          let _this = this
          
          axios.post('http://localhost:3000/api/login', this.loginForm).then(data=> {
           let token = data.data.data.token
            if (data.status == 200) {
              sessionStorage.setItem('token', token)
              _this.$router.push({ path: '/homePage' })
            } else {
              this.$message.error('登录失败，请检查账户或者密码是否正确！')
            }
          })
        } else {
          console.log('error submit!!')
          this.$message.error('账号或密码不能为空！')
          return false
        }
      })
    },
    loginRegister() {
      if (this.showLogin) {
        this.showLogin = false
        this.showRegister = true
      } else {
        this.showLogin = true
        this.showRegister = false
      }
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
