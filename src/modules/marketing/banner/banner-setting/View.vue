<template>
  <sa-section v-if="$route.fullPath === '/hotel/sadmin/banner-setting'" class="banner">
    <div class="banner__header">
      <div class="banner__header--search">
        <div class="banner__header--filter">
          <b>{{ $t('page.banner.typesofdisplay') }}</b>
          <el-select
          element-loading-spinner="el-icon-loading"
          v-model="displayType">
            <el-option
            v-for="(item, index) in typeOptions"
            :key="index"
            :label="$t(`${item.key}`)"
            :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="banner__header--add">
        <el-button
          type="warning"
          plain
          @click="handleSave"
        >
          {{ $t('button.save') }}
        </el-button>
        <el-button
          type="warning"
          plain
          @click="$router.go(-1)"
        >
          {{ $t('button.back') }}
        </el-button>
      </div>
    </div>

     <table
      v-loading="ui.isLoading"
      class="table-components data-table"
      >
      <thead>
        <th class="table-head" v-for="(item, index) in ui.tableColumns" :key="index">
          <p v-if="item.prop === 'firstColumn'"></p>
          <p v-else :class="{ 'align-center': item.prop === 'operations' || item.prop === 'display' }">{{ $t(`${item.label}`) }}</p>
        </th>
      </thead>
      <draggableComponent
        v-model="listBannerSettingDisplays"
        tag="tbody"
        @change="swapBanner"
        class="draggable"
      >
        <tr v-for="(dataRow, index) in listBannerSettingDisplays"
          :key="index + 1"
        >
          <td
            v-for="(item, index) in ui.tableColumns"
            :key="index"
          >
            <div v-if="item.prop === 'firstColumn'" style="width: 100%; height: 100%; cursor: pointer;">
              <i class="el-icon-menu"></i>
            </div>
            <div v-if="item.prop=== 'title'">
              <router-link :to="{ name: 'bannerDetails', params: { sn: dataRow.sn } }">
                {{ dataRow.title }}
              </router-link>
            </div>
            <div v-else-if="item.prop=== 'imagePath'">
                <el-image
                style="width: 100px; height: 100px"
                :src="formatImage(dataRow.imagePath)"
                fit="scale-down"></el-image>
            </div>
            <div v-else-if="item.prop=== 'targetType'">
              <p v-if="dataRow.targetType === 1">{{ $t('option.targetType.promotion') }}</p>
              <p v-else-if="dataRow.targetType === 2">{{ $t('option.targetType.hotel') }}</p>
              <p v-else-if="dataRow.targetType === 3">{{ $t('option.targetType.notice') }}</p>
              <p v-else-if="dataRow.targetType === 4">{{ $t('option.targetType.link') }}</p>
              <p v-else-if="dataRow.targetType === 5">{{ $t('option.targetType.district') }}</p>
              <p v-else-if="dataRow.targetType === 6">{{ $t('option.targetType.mileagePoint') }}</p>
              <p v-else-if="dataRow.targetType === 7">{{ $t('option.targetType.coupon') }}</p>
              <p v-else-if="dataRow.targetType === 8">{{ $t('option.targetType.directDiscount') }}</p>
              <p v-else-if="dataRow.targetType === 9">{{ $t('option.targetType.inviteFriend') }}</p>
              <p v-else-if="dataRow.targetType === 10">{{ $t('option.targetType.promotionGroup') }}</p>
              <p v-else-if="dataRow.targetType === 12">{{ $t('option.targetType.amenityPack') }}</p>
              <p v-else-if="dataRow.targetType === 13">{{ $t('option.targetType.hotelGo2Choice') }}</p>
              <p v-else></p>
            </div>
            <div v-else-if="item.prop=== 'display'">
              <p v-if="dataRow.display === 1">{{ $t('option.status.active') }}</p>
              <p v-else>{{ $t('option.status.disable') }}</p>
            </div>
            <p v-else>{{ dataRow[item.prop] }}</p>
          </td>
        </tr>
      </draggableComponent>
    </table>

  </sa-section>
  <router-view v-else />
</template>
<script>
import SaSection from '@/components/globals/SaSection.vue'
import { fetchBannerSettingDisplays, updateBannerSettingDisplay, swapBanner } from './api'
import draggableComponent from '@/utils/draggable.js'

export default {
  name: 'BannerSetting',
  components: {
    SaSection,
    draggableComponent
  },
  data () {
    return {
      ui: {
        isLoading: false,
        isSubmiting: false,
        tableColumns: [
          {
            prop: 'firstColumn'
          },
          {
            prop: 'title',
            label: 'page.banner.title'
          },
          {
            prop: 'imagePath',
            label: 'page.banner.image'
          },
          {
            prop: 'targetName',
            label: 'page.banner.linkedName'
          },
          {
            prop: 'totalClicks',
            label: 'page.banner.totalClicks'
          },
          {
            prop: 'targetType',
            label: 'page.banner.linkedType'
          },
          {
            prop: 'display',
            label: 'page.banner.status'
          }
        ]
      },
      listBannerSettingDisplays: [],
      filter: {
        limit: 10,
        page: 1
      },
      displayType: 1,
      pagination: {},
      typeOptions: [
        { value: 1, key: 'page.banner.random' },
        { value: 2, key: 'page.banner.custom' }
      ]
    }
  },
  created () {
    this.fetchBannerSettingDisplays()
  },
  methods: {
    async fetchBannerSettingDisplays () {
      this.ui.isLoading = true
      try {
        const { data } = await fetchBannerSettingDisplays(this.filter)
        this.listBannerSettingDisplays = data.data.banners
        this.pagination = data.data.meta
      } catch (error) {
        return false
      } finally {
        this.ui.isLoading = false
      }
    },
    async handleSave () {
      this.ui.isSubmiting = true
      try {
        await updateBannerSettingDisplay({ displayType: this.displayType })
        const message = this.$t('message.sendSuccess')
        this.$message({
          type: 'success',
          message: message
        })
        this.$router.go(-1)
      } catch (error) {
        return false
      } finally {
        this.ui.isSubmiting = false
      }
    },
    async swapBanner (e) {
      if (!e.moved) {
        return false
      }
      const params = {
        positionBefore: e.moved.oldIndex,
        positionAfter: e.moved.newIndex
      }
      try {
        await swapBanner(params)
        const message = this.$t('message.updateSuccess')
        this.$message({
          type: 'success',
          message: message
        })
      } catch (error) {
        return false
      } finally {}
    }
  }
}
</script>

<style lang="scss" scoped>
  b {
    font-weight: bold;
  }
  .banner {
    &__button {
      text-align: right;
      margin: 10px;
    }
    &__wrap {
      a {
        color: #409eff;
        text-decoration: none;
      }
    }
    &__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 2em;
      &--search {
        display: flex;
      }
      &--filter {
        display: flex;
        align-items: center;
        gap: 10px;
        flex-wrap: wrap;
      }
      &--add {
        display: flex;
        flex-wrap: wrap;
        gap: 1em;
        justify-content: flex-end;
      }
    }
  }
</style>
