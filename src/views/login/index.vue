<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >

      <div class="title-container">
        <h1 class="title1">LoongEasy</h1>
        <h1 class="title1">云原生应用运营平台</h1>
        <h3 class="title">后台管理系统</h3>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <!-- <svg-icon icon-class="user" /> -->
          <i class="el-icon-user-solid" style="font-size:18px" />
        </span>
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="Username"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <!-- <svg-icon icon-class="password" /> -->
          <i class="el-icon-unlock" style="font-size:18px" />
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="Password"
          name="password"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <!-- <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" /> -->
          <i :class="['iconfont',(passwordType === 'password')?'icon-yanjing_bi':'icon-yanjing_kai']" />
        </span>
      </el-form-item>

      <el-checkbox v-model="loginForm.auto" style="margin:15px;font-size:14px">自动登录</el-checkbox>
      <a href="#" style="float: right;margin:15px;font-size:14px">忘记密码</a>

      <!-- <el-form-item prop="code">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input ref="code" v-model="loginForm.code" placeholder="验证码" name="code" type="text" tabindex="3"
          auto-complete="on" />
        <img :src="codeImg" class="login-code-img" />
      </el-form-item> -->

      <el-button
        type="primary"
        style="width:100%;margin-bottom:30px;"
        @click.native.prevent="handleLogin"
      >登 录</el-button>

      <!-- <div class="tips">
        <span style="margin-right:20px;">用户名: admin</span>
        <span> 密码: 123456</span>
      </div> -->

    </el-form>
  </div>
</template>

<script>
// import {
//   validUsername
// } from '@/utils/validate'
import {
  randomLenNum
} from '@/utils/index'
export default {
  name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!value.trim()) {
        callback(new Error('用户名不为可空！'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('请输入6位数字密码'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: '',
        password: '',
        auto: true
      },
      code: '',
      codeImg: '',
      randomStr: '',
      loginRules: {
        username: [{
          required: true,
          trigger: 'blur',
          validator: validateUsername
        }],
        password: [{
          required: true,
          trigger: 'blur',
          validator: validatePassword
        }],
        code: [{
          required: true,
          trigger: 'blur'
        }]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  mounted() {
    this.randomStr = randomLenNum(4, true)
    // this.codeImg = process.env.VUE_APP_BASE_API + '/code?randomStr=' + this.randomStr;
    //         this.codeImg=response.data
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          // this.loading = true
          const params = {
            username: this.loginForm.username,
            password: this.loginForm.password,
            auto: this.loginForm.auto
          }
          this.$store.dispatch('user/handleLogin', params).then((response) => {
            sessionStorage.setItem('t', response.data.access_token)
            this.loading = false
            this.$router.push({
              path: this.redirect || '/home'
            })
            location.reload()
          }).catch(() => {
            this.loading = false
          })
        } else {
          return false
        }
      })
    }
  }
}

</script>

<style lang="scss">
  /* 修复input 背景不协调 和光标变色 */

  $bg:#D6DADA;
  $light_gray:#454545;
  $cursor: #012d2d;

  @supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
    .login-container .el-input input {
      color: $cursor;
    }
  }

  /* reset element-ui css */
  .login-container {
    .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;

      input {
        background: transparent;
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        color: $light_gray;
        height: 47px;
        caret-color: $cursor;

        &:-webkit-autofill {
          box-shadow: 0 0 0px 1000px $bg inset !important;
          -webkit-text-fill-color: $cursor !important;
        }
      }
    }

    .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }
  }

</style>

<style lang="scss" scoped>
  $bg:#267878;
  $dark_gray:#015252;
  $light_gray:#002929;

  .login-container {
    min-height: 100%;
    width: 100%;
    background-color: $bg;
    overflow: hidden;

    .login-form {
      position: relative;
      width: 500px;
      height: 600px;
      background: #eef3f3;
      max-width: 100%;
      padding: 60px 35px 0;
      border-radius: 10px;
      margin: 0 auto;
      top:70px;
      overflow: hidden;
    }

    .tips {
      font-size: 14px;
      color: #fff;
      margin-bottom: 10px;

      span {
        &:first-of-type {
          margin-right: 16px;
        }
      }
    }

    .svg-container {
      padding: 6px 5px 6px 15px;
      color: $dark_gray;
      vertical-align: middle;
      width: 30px;
      display: inline-block;
    }

    .title-container {
      position: relative;

      .title {
        font-size: 20px;
        color: $light_gray;
        margin: 0px auto 40px auto;
        text-align: center;
        font-weight: bold;
      }

      .title1 {
        font-size: 30px;
        color: $light_gray;
        margin: 0px auto 40px auto;
        text-align: center;
        font-weight: bold;
      }
    }

    .show-pwd {
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      color: $dark_gray;
      cursor: pointer;
      user-select: none;
    }
  }

</style>
