<template>
  <sa-section v-if="$route.fullPath === '/hotel/sadmin/popup'" class="popup">
    <div class="popup__header">
      <div class="popup__header--search">
        <div>
          <el-input :placeholder="$t('breadcrumb.keyword')"
          prefix-icon="el-icon-search"
          v-model="filter.keyword"
          clearable
          @input="searchPopups"
          ></el-input>
        </div>
        <div>
          <el-select
          :loading="ui.isLoadingProvinces"
          element-loading-spinner="el-icon-loading"
          @change="fetchPopups"
          v-model="filter.provinceSn">
            <el-option
            v-for="(item, index) in provinces"
            :key="index"
            :label="item.name"
            :value="item.sn">
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="popup__header--add">
        <el-button
          type="warning"
          plain
          @click="handleSetting"
          icon="el-icon-setting"
        >
          {{ $t('button.settingOfDisplay') }}
        </el-button>
        <el-button
          type="warning"
          plain
          @click="handleCreate"
          icon="el-icon-plus"
        >
          {{ $t('button.add') }}
        </el-button>
      </div>
    </div>
    <el-table
      v-loading="ui.isLoading"
      :data="listPopups"
    >
      <el-table-column
        type="index"
        label="#"
         min-width="2"
      />
      <el-table-column
        :label="$t('page.popup.title')"
        min-width="20"
      >
        <template slot-scope="scope">
          <router-link :to="{ name: 'popupDetails', params: { sn: scope.row.sn } }">
              {{ scope.row.title }}
          </router-link>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('page.popup.image')"
        min-width="10"
      >
        <template slot-scope="scope">
          <el-image
          style="width: 100px; height: 100px"
          :src="formatImage(scope.row.imagePath)"
          fit="scale-down"></el-image>
        </template>
      </el-table-column>

      <el-table-column
        :label="$t('page.popup.linkedName')"
         min-width="10"
      >
        <template slot-scope="scope">
          <router-link
            v-if="scope.row.targetType === 1 && scope.row.targetInfo"
            :to="{
                name: 'promotionDetails',
                params: {
                  promotionSn: scope.row.sn,
                  couponSn: scope.row.couponSn
                }
              }"
          >
            {{ scope.row.targetName }}
          </router-link>
          <router-link v-else-if="scope.row.targetType === 2 && scope.row.targetSn" :to="{ name: 'hotelDisplayDetails', params: { sn: scope.row.targetSn } }">
            {{ scope.row.targetName }}
          </router-link>
          <router-link v-else-if="scope.row.targetType === 3 && scope.row.targetSn" :to="{ name: 'noticeDetails', params: { sn: scope.row.targetSn } }">
            {{ scope.row.targetName }}
          </router-link>
          <a v-else-if="scope.row.targetType === 4" :href="scope.row.targetInfo">
            {{ scope.row.targetInfo }}
          </a>
        </template>
      </el-table-column>
            <el-table-column
        :label="$t('page.popup.linkedType')"
         min-width="8"
      >
        <template slot-scope="scope">
          <p v-if="scope.row.targetType === 1">{{ $t('option.targetType.promotionEvent') }}</p>
          <p v-else-if="scope.row.targetType === 2">{{ $t('option.targetType.hotel') }}</p>
          <p v-else-if="scope.row.targetType === 3">{{ $t('option.targetType.notice') }}</p>
          <p v-else-if="scope.row.targetType === 4">{{ $t('option.targetType.link') }}</p>
          <p v-else-if="scope.row.targetType === 5">{{ $t('option.targetType.district') }}</p>
          <p v-else-if="scope.row.targetType === 6">{{ $t('option.targetType.mileagePoint') }}</p>
          <p v-else-if="scope.row.targetType === 7">{{ $t('option.targetType.coupon') }}</p>
          <p v-else-if="scope.row.targetType === 8">{{ $t('option.targetType.directDiscount') }}</p>
          <p v-else-if="scope.row.targetType === 9">{{ $t('option.targetType.inviteFriend') }}</p>
          <p v-else-if="scope.row.targetType === 10">{{ $t('option.targetType.promotionGroup') }}</p>
          <p v-else-if="scope.row.targetType === 12">{{ $t('option.targetType.amenityPack') }}</p>
          <p v-else-if="scope.row.targetType === 13">{{ $t('option.targetType.hotelGo2Choice') }}</p>
          <p v-else></p>
        </template>
      </el-table-column>

      <el-table-column
        :label="$t('page.popup.disableCondition')"
         min-width="10"
      >
        <template slot-scope="scope">
          <p>
            <span class="bold">{{ $t('page.popup.maxView') }}</span>: {{ scope.row.maxView === 0 ? $t('page.popup.noViewLimit') :  scope.row.maxView }}
          </p>
          <p>
            <span class="bold">{{ $t('page.popup.stopAt') }}</span>: {{ scope.row.endDate }}
          </p>
        </template>
      </el-table-column>

      <el-table-column
        :label="$t('page.popup.totalOfViews')"
         min-width="10"
      >
        <template slot-scope="scope">
          {{ scope.row.totalViews }}
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('page.popup.totalClicks')"
         min-width="10"
      >
        <template slot-scope="scope">
          {{ scope.row.totalClicks }}
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('page.popup.status')"
         min-width="10"
      >
        <template slot-scope="scope">
          <p v-if="scope.row.display === 1">{{ $t('option.status.active') }}</p>
          <p v-else>{{ $t('option.status.disable') }}</p>
        </template>
      </el-table-column>

      <el-table-column
        :label="$t('page.userMgt.operations')"
        align="center"
        min-width="10"
      >
        <template slot-scope="scope">
          <el-button
              v-if="hasPermission('sapopup', 'pModify')"
              type="success"
              size="small"
              plain
              @click="handleEdit(scope.row)"
              icon="el-icon-edit"
            >
              {{$t('button.edit')}}
            </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="paginate">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[10, 20, 30, 40, 50]"
        :page-size="pagination.perPage"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pagination.total">
      </el-pagination>
    </div>
  </sa-section>
  <router-view v-else />
</template>
<script>
import { debounce } from '@/utils/helpers'
import SaSection from '@/components/globals/SaSection.vue'
import { fetchProvinces } from '@/api/province'
import { fetchPopups } from './api'
const timeDebounce = 500

export default {
  name: 'Popup',
  components: {
    SaSection
  },
  data () {
    return {
      ui: {
        isLoading: false,
        isLoadingProvinces: false
      },
      listPopups: [],
      filter: {
        limit: 10,
        page: 1,
        keyword: '',
        status: 1,
        provinceSn: null
      },
      pagination: {},
      provinces: []
    }
  },
  created () {
    this.fetchPopups()
    this.fetchProvinces()
  },
  methods: {
    async fetchProvinces () {
      this.ui.isLoadingProvinces = true
      try {
        this.provinces = [{ name: this.$t('option.all'), sn: null }]
        const params = { limit: 100, status: 1 }
        const { data } = await fetchProvinces(params)
        this.provinces = [...this.provinces, ...data.data.provinces]
      } catch (error) {
        return false
      } finally {
        this.ui.isLoadingProvinces = false
      }
    },
    async fetchPopups () {
      this.ui.isLoading = true
      try {
        const { data } = await fetchPopups(this.filter)
        this.listPopups = data.data.popups
        this.pagination = data.data.meta
      } catch (error) {
        return false
      } finally {
        this.ui.isLoading = false
      }
    },
    searchPopups: debounce(function () {
      this.fetchPopups()
    }, timeDebounce),
    // pagination event
    handleSizeChange (value) {
      this.filter.limit = value
      this.fetchPopups()
    },
    handleCurrentChange (value) {
      this.filter.page = value
      this.fetchPopups()
    },
    handleCreate () {
      this.$router.push({ name: 'popupCreate' })
    },
    handleEdit (data) {
      this.$router.push({ name: 'popupEdit', params: { sn: data.sn } })
    },
    handleSetting () {
      this.$router.push({ name: 'popupSetting' })
    }
  }
}
</script>

<style lang="scss" scoped>
  .bold {
    font-weight: bold;
  }
  .popup {
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
      flex-wrap: wrap;
      gap: 1em;
      margin-bottom: 2em;
      &--search {
        display: flex;
        flex-wrap: wrap;
        gap: 1em;
      }
      &--add {
        display: flex;
        flex-wrap: wrap;
        gap: 1em;
      }
    }
    .el-button {
      margin-left: unset;
    }
  }
  .paginate {
    margin-top: 2em;
  }
</style>
