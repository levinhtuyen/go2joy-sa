<template>
  <sa-section
    v-loading="ui.loadingGetDetails"
    class="general-setttings"
  >
    <div class="general-settings__row">
      <p class="general-settings__label">
        {{ $t('page.settings.updateSetting') }}
      </p>
      <el-button
        type="success"
        @click="updateSetting"
      >
        {{ $t('page.settings.refresh') }}
      </el-button>
    </div>
    <div class="general-settings__row">
      <p class="general-settings__label">
        {{ $t('page.settings.changeNewAfter') }}
      </p>
      <div class="general-settings__content">
        <el-input
          v-model="settingDetails.changeNewAfter"
        >
        </el-input>
        <p>
          {{ $t('page.settings.days') }}
        </p>
      </div>
    </div>
    <div class="general-settings__row">
      <p class="general-settings__label">
        {{ $t('page.settings.blockBookingFrom') }}
      </p>
      <div class="general-settings__content">
        <el-input
          v-model="settingDetails.blockBookingFrom"
        >
        </el-input>
        <p>
          {{ $t('page.settings.days') }}
        </p>
      </div>
    </div>
    <div class="general-settings__row">
      <p class="general-settings__label">
        {{ $t('page.settings.lastVersion') }}
      </p>
      <div class="general-settings__content">
        <el-input
          v-model="settingDetails.lastIosVersion"
        >
        </el-input>
        <p>IOS App</p>
      </div>
      <div class="general-settings__content">
        <el-input
          v-model="settingDetails.lastAndroidVersion"
        >
        </el-input>
        <p>Android App</p>
      </div>
    </div>
    <div class="general-settings__row">
      <p class="general-settings__label">
        {{ $t('page.settings.partnerLastVersion') }}
      </p>
      <div class="general-settings__content">
        <el-input
          v-model="settingDetails.lastIosPartnerVer"
        >
        </el-input>
        <p>IOS App</p>
      </div>
      <div class="general-settings__content">
        <el-input
          v-model="settingDetails.lastAndroidPartnerVer"
        >
        </el-input>
        <p>Android App</p>
      </div>
    </div>
    <div class="general-settings__row">
      <p class="general-settings__label">
        {{ $t('page.settings.cineJoyLastVersion') }}
      </p>
      <div class="general-settings__content">
        <el-input
          v-model="settingDetails.lastIosCineVer"
        >
        </el-input>
        <p>IOS App</p>
      </div>
      <div class="general-settings__content">
        <el-input
          v-model="settingDetails.lastAndroidCineVer"
        >
        </el-input>
        <p>Android App</p>
      </div>
    </div>
    <div class="general-settings__row">
      <p class="general-settings__label">
        {{ $t('page.settings.refreshCacheData') }}</p>
      <el-button
        type="success"
        @click="getSettings"
      >
        {{ $t('page.settings.refresh') }}
      </el-button>
    </div>
  </sa-section>
</template>
<script>
import SaSection from '@/components/globals/SaSection.vue'
import { getSettings, updateSetting } from './api'
export default {
  name: 'GeneralSettings',
  components: {
    SaSection
  },
  data: () => {
    return {
      ui: {
        loadingGetDetails: false,
        loadingUpdateSetting: false
      },
      filter: {
        status: 1
      },
      settingDetails: {}
    }
  },
  created () {
    this.getSettings()
  },
  methods: {
    async getSettings () {
      this.ui.loadingGetDetails = true
      try {
        const { data } = await getSettings(this.filter)
        this.settingDetails = data.data
      } catch (error) {
        return false
      } finally {
        this.ui.loadingGetDetails = false
      }
    },
    async updateSetting () {
      this.ui.loadingUpdateSetting = true
      try {
        await updateSetting(this.settingDetails)
        const message = this.$t('message.updateSuccess')
        this.$message({
          type: 'success',
          message: message
        })
      } catch (error) {
        return false
      } finally {
        this.ui.loadingUpdateSetting = false
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.general-settings {
  &__content,
  &__row {
    display: flex;
    align-items: center;
  }
  &__content {
    width: 28%;
    .el-input {
      width: 80%;
      margin-right: 12px;
    }
  }
  &__row {
    margin-bottom: 16px;
  }
  &__label {
    min-width: 350px;
  }
}
</style>
