<template>
  <div class="member-layout">
    <el-container>
      <el-aside class="member-layout__aside" :class="isCollapse ? '' : 'active'">
        <SaSidebar :isCollapse="isCollapse" />
      </el-aside>
      <el-container>
        <el-header class="member-layout__header" :class="isCollapse ? '' : 'active'">
          <SaHeader
            :collapse="isCollapse"
            @collapsed="getCollapsed"
            @logout="$emit('changeLayout')"
          />
        </el-header>
        <el-main class="member-layout__main" :class="isCollapse ? '' : 'active'">
          <div class="member-layout__topbar">
            <SaTopBar />
          </div>
          <div class="member-layout__content">
            <slot />
          </div>
        </el-main>
        <div class="member-layout__footer">
          © 2021 Go2Joy - All Rights Reserved.
        </div>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import SaHeader from '@/components/SaHeader.vue'
import SaSidebar from '@/components/SaSidebar.vue'
import SaTopBar from '@/components/SaTopBar.vue'
export default {
  name: 'MemberLayout',
  components: {
    SaHeader,
    SaSidebar,
    SaTopBar
  },
  data () {
    return {
      isCollapse: false
    }
  },
  created () {
    if (window.screen.width < 766) {
      this.isCollapse = true
    }
  },
  methods: {
    getCollapsed () {
      this.isCollapse = !this.isCollapse
    }
  }
}
</script>
<style lang="scss" scoped>
.member-layout{
  min-height: 100vh;
  .el-container {
    min-height: 100vh;
  }
  &__header {
    width: calc(100% - 193px);
    right: 0;
    top: 0;
    position: fixed;
    background: #FFFFFF;
    width: 100%;
    z-index: 100;
    padding: 0 30px 0 20px;
  }
  &__aside {
    z-index: 99;
    position: fixed;
    text-align: left;
    min-height: 100vh;
    width: 0 !important;
    transition: width 0.5s;
    padding-top: 57px;
    top: 0;
    bottom: 0;
    overflow-y: scroll;
    overflow-x: hidden;
    &::-webkit-scrollbar
    {
      width: 1px;
    }
  }
  &__aside.active  {
    width: 228px !important;
  }
  &__main {
    margin-top: 60px;
    flex: 1;
    background-color: #f2f5fa;
    display: flex;
    flex-direction: column;
  }
  &__topbar {
    background-color: #FFFFFF;
    margin-bottom: 30px;
  }
  &__content {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  &__footer {
    background-color: #FFFFFF;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 48px;
  }
  @media (min-width: 766px) {
    &__aside  {
      width: 6% !important;
    }
    &__main {
      margin-left: 64px;
      transition: all 0.5s ease;
      height: 100%;
    }
    &__main.active {
      margin-left: 220px;
    }
    &__main.active~ .footer-section {
      margin-left: 200px;
      transition: all 0.5s ease;
    }
  }
}
</style>
