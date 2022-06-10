<template>
  <div class="device-mgt">
    <sa-section>
      <div class="device-mgt__filter">
         <el-form :inline="true" :model="query" class="demo-form-inline">
            <el-form-item>
              <el-input
                v-model="query.keyword"
                :placeholder="$t('placeholder.keyword')"
                clearable
                prefix-icon="el-icon-search"
              />
            </el-form-item>
            <el-form-item>
              <el-date-picker
                v-model="dateRange"
                type="daterange"
                range-separator="-"
                :start-placeholder="$t('placeholder.startDate')"
                :end-placeholder="$t('placeholder.endDate')"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
              />
            </el-form-item>
            <el-form-item>
              <el-button
                plain
                icon="el-icon-search"
                @click="onSearch"
              >
                {{ $t('button.search') }}
              </el-button>
            </el-form-item>
         </el-form>
      </div>
      <div class="device-mgt__table">
        <el-table
          :data="data"
          v-loading="loadingDevices"
        >
          <el-table-column
            label="#"
            type="index"
          />
          <el-table-column
            :label="$t('page.deviceMgt.mobile_user_id')"
            :width="200"
          >
            <template slot-scope="scope">
              {{ scope.row.deviceCode }}
            </template>
          </el-table-column>
          <el-table-column
            :label="$t('page.deviceMgt.app_user_nickName')"
            :width="80"
          >
            <template slot-scope="scope">
              <el-link
                type="primary"
                v-if="scope.row.userLogin && scope.row.userLogin.nickName"
                :href="`/hotel/sadmin/user-details/${scope.row.userLogin.sn}`"
              >
                {{ scope.row.userLogin.nickName }}
              </el-link>
            </template>
          </el-table-column>
          <el-table-column
            :label="$t('page.deviceMgt.first_app_user_nickName')"
            :width="80"
          >
            <template slot-scope="scope">
              <el-link
                type="primary"
                v-if="scope.row.userLogin && scope.row.userLogin.nickName"
                :href="`/hotel/sadmin/user-details/${scope.row.firstSignup.sn}`"
              >
                {{ scope.row.userLogin.nickName }}
              </el-link>
            </template>
          </el-table-column>
          <el-table-column
            :label="$t('page.deviceMgt.mobile_user_id')"
            :width="100"
          >
            <template slot-scope="scope">
              <span>
                {{ scope.row.os }}
              </span>
                <span>
                {{ scope.row.osVersion }}
              </span>
                <span>
                {{ scope.row.phoneModel }}
              </span>
            </template>
          </el-table-column>
          <el-table-column
            :label="$t('page.deviceMgt.push_notification')"
            :width="100"
          >
            <template slot-scope="scope">
              <p>
                {{ scope.row.pushNotification  === 1 ? '✔' : '✘' }}
              </p>
            </template>
          </el-table-column>
          <el-table-column
            :label="$t('page.deviceMgt.last_open_app')"
            :width="160"
          >
            <template slot-scope="scope">
              <p>
                {{ scope.row.address }}
              </p>
            </template>
          </el-table-column>
          <el-table-column
            :label="$t('page.deviceMgt.app_version')"
            :width="80"
          >
            <template slot-scope="scope">
              <p>
                {{ scope.row.appVersion }}
              </p>
            </template>
          </el-table-column>
          <el-table-column
            :label="$t('page.deviceMgt.install')"
            :width="65"
          >
            <template slot-scope="scope">
              <p>
                {{ scope.row.status === 1 ? '✔' : ' ' }}
              </p>
            </template>
          </el-table-column>
          <el-table-column
            :label="$t('page.deviceMgt.register_province')"
            :width="100"
          >
            <template slot-scope="scope">
              <p v-if="scope.row.province.name">
                {{ scope.row.province }}
              </p>
            </template>
          </el-table-column>
          <el-table-column
            :label="$t('page.deviceMgt.source')"
            :width="100"
          >
            <template slot-scope="scope">
              <p>
                {{ scope.row.source }}
              </p>
            </template>
          </el-table-column>
          <el-table-column
            :label="$t('page.deviceMgt.res_time')"
            :width="110"
          >
            <template slot-scope="scope">
              <p>
                {{ formatDate(scope.row.registerTime) }}
              </p>
            </template>
          </el-table-column>
          <el-table-column
            :label="$t('page.deviceMgt.last_update')"
            :width="110"
          >
            <template slot-scope="scope">
              <p>
                {{ formatDate(scope.row.lastUpdate) }}
              </p>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          @size-change="onSizeChange"
          @current-change="onCurrentChange"
          :page-sizes="[10, 20, 30, 40, 50]"
          :page-size="pagination.perPage"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pagination.total">
        </el-pagination>
      </div>
    </sa-section>
  </div>
</template>
<script>
import saSection from '@/components/globals/SaSection.vue'
import { listDevice } from './api'

export default {
  name: 'DeviceMgt',
  components: {
    saSection
  },
  data: () => {
    return {
      pagination: {},
      query: {
        limit: 10,
        keyword: '',
        startDate: '',
        endDate: ''
      },
      data: [],
      loadingDevices: false,
      dateRange: []
    }
  },
  created () {
    this.listDevice({ limit: this.query.limit })
  },
  watch: {

  },
  methods: {
    async listDevice (query) {
      this.loadingDevices = true
      try {
        const { data } = await listDevice(query)
        this.data = data.data.mobileDevices
        this.pagination = data.data.meta
      } catch (error) {
        return false
      } finally {
        this.loadingDevices = false
      }
    },
    onSearch () {
      this.query.page = 1
      this.query.startDate = this.dateRange && this.dateRange[0] ? this.dateRange[0] : ''
      this.query.endDate = this.dateRange && this.dateRange[1] ? this.dateRange[1] : ''
      this.listDevice(this.query)
    },
    onSizeChange (size) {
      this.query.limit = size
      if (Math.ceil(this.pagination.total / size) < this.pagination.currentPage) {
        this.pagination.currentPage = Math.ceil(this.pagination.total / size)
      }// when curent page is larger than total page
      this.listDevice(this.query)
    },
    onCurrentChange (currentPage) {
      this.query.page = currentPage
      this.listDevice(this.query)
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
