<template>
  <div class="header-bar">
    <div class="header-image" :class="isCollapse ? 'is-collapse' : '' ">
      <img
        class="logo-big"
        src="@/assets/images/logo/logo.png">
      <img
        class="logo-small"
        src="@/assets/images/logo/logo-small.png">
    </div>
    <div class="btn-toggle">
      <span class="btn-toggle--container">
        <i
          :class="[isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold']"
          @click="isCollapse = !isCollapse"
        ></i>
      </span>
    </div>
    <div>
      <div class="language-account-info">
        <div class="language">
          <el-dropdown @command="changeLocale" >
            <span class="el-dropdown-link">
              <img v-if="flag == 'en'" class="custom-button" src="@/assets/images/svg/en.svg"/>
              <img v-if="flag == 'vi'" class="custom-button" src="@/assets/images/svg/vn.svg"/>
            </span>
            <el-dropdown-menu slot="dropdown" :append-to-body="false">
              <el-dropdown-item
                v-for="entry in languages"
                class="dropdown-item"
                :key="entry.title"
                :command="entry.language"
              >
                <img v-if="entry.language == 'en'" src="@/assets/images/svg/en.svg"/>
                <img v-if="entry.language == 'vi'" src="@/assets/images/svg/vn.svg"/>
                {{ entry.title }}
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
          <div>
            <el-dropdown
              @command="onDirect"
            >
              <span class="el-dropdown-link">
                <el-avatar class="custom-button" :size="25" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
              </span>
              <el-dropdown-menu slot="dropdown" :append-to-body="false">
                <el-dropdown-item>
                  <el-link type="danger">{{ userName }}</el-link>
                </el-dropdown-item>
                <el-dropdown-item
                  v-for="entry in accountInfo"
                  class="dropdown-item"
                  :key="entry.title"
                  :command="entry.direct"
                >
                  <i :class="entry.icon"></i> {{ $t(entry.title) }}
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Headerbar',
  props: {
    collapse: Boolean
  },
  computed: {
    isCollapse: {
      get () {
        return this.collapse
      },
      set (val) {
        this.$emit('collapsed', val)
      }
    }
  },
  data () {
    return {
      languages: [
        { flag: 'us', language: 'en', title: 'English' },
        { flag: 'vn', language: 'vi', title: 'Vietnamese' }
      ],
      flag: localStorage.getItem('lang') ? localStorage.getItem('lang') : 'vi',
      accountInfo: [
        { direct: '/hotel/sadmin/profile', title: 'breadcrumb.my_profile', icon: 'el-icon-user' },
        { direct: '/sign-in', title: 'breadcrumb.logout', icon: 'el-icon-switch-button' }
      ],
      userName: ''
    }
  },
  created () {
    this.userName = JSON.parse(localStorage.getItem('profile')).value.fullName
  },
  methods: {
    changeLocale (locale) {
      this._i18n.locale = locale
      this.flag = locale
      localStorage.setItem('lang', locale)
    },
    async onDirect (value) {
      if (value === '/sign-in') {
        await localStorage.removeItem('access_token')
        await localStorage.removeItem('profile')
        this.$emit('logout')
      } else {
        this.$router.push(value)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.custom-button {
  font-size: initial;
  border: none;
  cursor: pointer;
}
.el-popper {
  .el-dropdown-menu__item {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    img {
      padding-right: 10px;
    }
  }
}
.header-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  .dropdown-item {
    i {
      margin-right: 10px;
    }
  }
  .header-image {
    width: 200px;
  }
  .header-image.is-collapse {
    width: 46px;
  }
  .logo-big,
  .logo-small {
    height: 36px;
    padding-top: 4px;
    object-fit: scale-down;
  }
  .btn-toggle {
    flex: 1;
    text-align: left;
    &--container {
      border-radius: 4px;
      display: flex;
      width: 32px;
      height: 32px;
      align-items: center;
      justify-content: center;
      transition: all .1s ease-in;
      &:hover {
        background-color: rgba(129, 167, 205, 0.1);
      }
      i {
        cursor: pointer;
        font-size: 20px;
        color: #ff6400;
      }
    }
  }
  .language-account-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .language {
      padding-right: 12px;
      img {
        cursor: pointer;
      }
    }
  }
}
.header-image {
  .logo-small {
    display: none;
  }
  .logo-big {
    display: unset;
  }
  &.is-collapse {
    .logo-small {
      display: unset;
    }
    .logo-big {
      display: none;
    }
  }
}
</style>
