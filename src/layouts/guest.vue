<template>
  <div class="login">
    <img src="https://staging-ha.go2joy.vn/assets/images/authentication/authentication-bg.svg" width="100%"/>
    <el-dialog
      :close-on-click-modal="false"
      :visible.sync="showSignIn">
      <div class="login__logo">
        <img src="@/assets/images/logo/logo.png" width="70%">
      </div>
      <div class="login__title">
          <p>Sign In</p>
      </div>
      <div class="login__form">
          <el-input v-model="formData.userId"></el-input>
          <el-input show-password v-model="formData.password"></el-input>
      </div>
      <div class="login__forget">
        <el-checkbox class="login__forget--color" v-model="formData.remember">Remember Me</el-checkbox>
        <!-- <el-link :underline="false">{{ $t('sign_in.forgot_password') }}</el-link> -->
      </div>
      <div class="login__button">
        <el-button
          type="danger"
          @click="submitForm"
          :loading="isLoading"
        >
          Sign In
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import md5 from 'md5'
import { setLocalStorageWithExpiry } from '@/utils/localStorage'
import { signIn } from '@/api/auth'
export default {
  name: 'GuestLayout',
  data () {
    return {
      formData: {
        userId: '',
        password: '',
        remember: false
      },
      showSignIn: true,
      isLoading: false
    }
  },
  methods: {
    async submitForm () {
      this.isLoading = true
      try {
        const { data } = await signIn({
          userId: this.formData.userId,
          password: md5(this.formData.password),
          remember: Number(this.formData.remember)
        })
        const ttl = this.formData.remember ? 60 * 60 * 24 * 90 * 1000 : 60 * 60 * 24 * 1000
        await setLocalStorageWithExpiry('access_token', data.data.accessToken, ttl)
        setLocalStorageWithExpiry('profile', data.data.profile, ttl)
        if (this.$router.currentRoute.fullPath !== '/hotel/sadmin/dashboard') {
          await this.$router.push('/hotel/sadmin/dashboard')
        }
        this.$emit('changeLayout')
      } catch (error) {
        return false
      } finally {
        this.isLoading = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.login::v-deep  {
  .el-dialog__header {
    display: none;
  }
  .el-dialog__body {
    padding: 20px;
  }
  .el-icon-close {
      display: none;
  }
  .el-dialog {
    position: relative;
    margin: 0 auto 50px;
    border-radius: 2px;
    box-sizing: border-box;
    width: 90%;
    @media (min-width: 640px) {
      width: 30%;
    }
  }
  .el-link {
    color: #ff6400;
  }
  .el-link:hover {
    color: #ff6400;
  }
  .login__logo {
    width: 60%;
    object-fit: scale-down;
    margin: 0 auto;
  }
  .login__title {
    color: #ff6400;
    font-size: 22px;
  }
  .login__form {
    .el-input {
      padding: 6px 0;
    }
    input:focus {
      border-color: red;
    }
  }
  .el-button.is-loading {
    padding: 12px 20px;
  }
  .login__forget {
    padding: 10px 0;
    display: flex;
    justify-content: space-between;
    &--color:hover {
        color: #ff6400;
    }
    .el-checkbox__input.is-checked .el-checkbox__inner {
        background-color: #ff6400;
        border-color: #ff6400;
    }
    .el-checkbox__input.is-checked+.el-checkbox__label {
        color: #ff6400
    }
  }

  .login__button {
    padding: 10px 0;
    button {
        width: 100%;
        background: #ff6400;
    }
    button:hover {
        background: #ff6400;
    }
    button:focus {
        background: #ff6400;
    }

    p {
        padding: 12px;
    }
  }
}
</style>
