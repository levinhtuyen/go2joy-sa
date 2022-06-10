<template>
  <sa-section
    class="hotel"
    v-loading="ui.loading"
  >
    <template slot="header">
      <div>
        <el-input
          v-model="filter.keyword"
          :placeholder="$t('page.settings.title')"
          @input="handleSearch"
        >
        </el-input>
        <el-select
          v-model="filter.provinceSn"
          :placeholder="$t('page.settings.province')"
          :loading="ui.provincesLoading"
          @change="changeProvinceFilter"
        >
          <ElOption
            v-for="(item, index) in provinces"
            :key="index"
            :label="item.name"
            :value="item.sn"
            style="font-size: 13px; color: #4a5d6e;"
          />
        </el-select>
        <el-select
          v-model="filter.districtSn"
          :placeholder="$t('page.settings.district')"
          :loading="ui.districtsLoading"
          @change="fetchHotelOnTops"
        >
          <ElOption
            v-for="(item, index) in districts"
            :key="index"
            :label="item.name"
            :value="item.sn"
            style="font-size: 13px; color: #4a5d6e;"
          />
        </el-select>
        <el-select
          v-model="filter.hashtagSn"
          :loading="ui.hashtagLoading"
          :placeholder="$t('page.settings.hashtag')"
          remote
          filterable
          :remote-method="searchHashtag"
          prefix-icon="el-icon-search"
          clearable
          @change="fetchHotelOnTops"
        >
          <ElOption
            v-for="(item, index) in listHashtag"
            :key="index"
            :label="item.name"
            :value="item.sn"
            style="font-size: 13px; color: #4a5d6e;"
          />
        </el-select>
      </div>
      <el-button
        plain
        type="warning"
        icon="el-icon-plus"
        @click="$router.push({ name:'hotelOnTopCreate' })"
      >
        {{ $t('button.add') }}
      </el-button>
    </template>
    <el-table
      :data="hotelOnTops"
    >
      <el-table-column type="expand" label="#">
        <template slot-scope="scope">
          <el-table
            :row-class-name="setClassRow"
            :data="scope.row.hotelOnTopDetails"
            style="margin-left: 48px;"
          >
            <el-table-column
              :label="$t('page.settings.hotelOnTopDetails')"
            >
              <template slot-scope="scopeRow">
                <router-link
                  :to="{ name: 'hotelDisplayDetails', params: { sn: scopeRow.row.sn } }"
                >
                  {{ scopeRow.row.hotelName }}
                </router-link>
              </template>
            </el-table-column>
            <el-table-column
              :label="$t('page.settings.start_date')"
            >
              <template slot-scope="scope">
                {{ formatDate(scope.row.startDate) }}
              </template>
            </el-table-column>
            <el-table-column
              :label="$t('page.settings.end_date')"
            >
              <template slot-scope="scope">
                {{ formatDate(scope.row.endDate) }}
              </template>
            </el-table-column>
            <el-table-column
              :label="$t('page.settings.status')"
            >
              <template slot-scope="scope">
                {{ setStatus(scope.row.status) }}
              </template>
            </el-table-column>
          </el-table>
        </template>
      </el-table-column>
      <el-table-column
        prop="title"
        :label="$t('page.settings.title')"
      >
      </el-table-column>
      <el-table-column
        :label="$t('page.settings.kindOfHotelOnTop')"
      >
        <template slot-scope="scope">
          {{ setKindOfHotelOnTop(scope.row.type) }}
        </template>
      </el-table-column>
      <el-table-column
        prop="hashtagName"
        :label="$t('page.settings.hashtag')"
      >
      </el-table-column>
      <el-table-column
        prop="hotelCollectionName"
        :label="$t('page.settings.collection')"
      >
      </el-table-column>
      <el-table-column
        prop="provinceName"
        :label="$t('page.settings.province')"
      >
      </el-table-column>
      <el-table-column
        prop="districtName"
        :label="$t('page.settings.district')"
      >
      </el-table-column>
      <!-- <el-table-column
        :label="$t('page.settings.hotelOnTopDetails')"
      >
        <template slot-scope="scope">
          <p
            v-for="(hotel, index) in scope.row.hotelOnTopDetails"
            :key="index"
            style="margin-bottom: 8px;"
          >
            <router-link
              :to="{ name: 'hotelDisplayDetails', params: { sn: hotel.sn } }"
            >
              {{ hotel.hotelName }}
            </router-link>
          </p>
        </template>
      </el-table-column> -->
      <!-- <el-table-column
        :label="$t('page.settings.start_date')"
      >
        <template slot-scope="scope">
          <p
            v-for="(hotel, index) in scope.row.hotelOnTopDetails"
            :key="index"
            style="margin-bottom: 8px;"
          >
            {{ formatDate(hotel.startDate) }}
          </p>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('page.settings.end_date')"
      >
        <template slot-scope="scope">
          <p
            v-for="(hotel, index) in scope.row.hotelOnTopDetails"
            :key="index"
            style="margin-bottom: 8px;"
          >
            {{ formatDate(hotel.endDate) }}
          </p>
        </template>
      </el-table-column> -->
      <!-- <el-table-column
        :label="$t('page.settings.status')"
      >
        <template slot-scope="scope">
          <p
            v-for="(hotel, index) in scope.row.hotelOnTopDetails"
            :key="index"
            style="margin-bottom: 8px;"
          >
            {{ setStatus(hotel.status) }}
          </p>
        </template>
      </el-table-column> -->
      <el-table-column
        prop="createTime"
        :label="$t('page.settings.create_time')"
      >
      </el-table-column>
      <el-table-column
        prop="staffName"
        :label="$t('page.settings.staffName')"
      >
      </el-table-column>
      <el-table-column
        :label="$t('page.settings.operations')"
      >
        <template slot-scope="scope">
          <el-button
            plain
            size="small"
            type="success"
            icon="el-icon-edit"
            @click="$router.push({ name: 'hotelOnTopEdit', params: { sn: scope.row.sn } })"
          >
            {{ $t('button.edit') }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <template slot="footer">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[10, 20, 30, 40, 50]"
        :page-size="pagination.perPage"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pagination.total"
      />
    </template>
  </sa-section>
</template>
<script>
import SaSection from '@/components/globals/SaSection.vue'
// import HotelDetailTable from './components/hotelDetailTable.vue'
import { fetchProvinces, fetchDistricts } from '@/api/province'
import { fetchHotelOnTops } from './api'
import { fetchHashtags } from '@/api/hashtag'
import { debounce } from '@/utils/helpers'
const timeDebounce = 500
export default {
  components: { SaSection },
  name: 'hotelOntop',
  data: (vm) => {
    return {
      ui: {
        loading: false,
        districtsLoading: false,
        provincesLoading: false,
        hashtagLoading: false
      },
      filter: {
        page: 1,
        limit: 10,
        keyword: '',
        provinceSn: '',
        districtSn: '',
        hashtagSn: ''
      },
      pagination: {
        total: 0,
        perPage: 1
      },
      hotelOnTops: [],
      listHashtag: [],
      districts: [{ name: vm.$t('page.settings.all'), sn: '' }],
      provinces: [{ name: vm.$t('page.settings.all'), sn: '' }]
    }
  },
  created () {
    this.fetchHotelOnTops()
    this.fetchProvinces()
  },
  methods: {
    handleSearch: debounce(function (keySearch) {
      this.fetchHotelOnTops({
        keyword: keySearch
      })
    }, timeDebounce),
    searchHashtag: debounce(function (keySearch) {
      this.fetchHashtags({
        keyword: keySearch
      })
    }, timeDebounce),
    async fetchHashtags (params) {
      try {
        this.ui.hashtagLoading = true
        const { data } = await fetchHashtags(params)
        this.listHashtag = data.data.hashtag
      } catch (error) {
        return false
      } finally {
        this.ui.hashtagLoading = false
      }
    },
    async fetchDistricts () {
      try {
        this.ui.districtsLoading = true
        const { data } = await fetchDistricts({ limit: 100, provinceSn: this.filter.provinceSn })
        this.districts = [{ name: this.$t('page.settings.all'), sn: '' }, ...data.data.districts]
        this.ui.districtsLoading = false
      } catch (error) {
        return false
      }
    },
    async fetchProvinces () {
      try {
        this.ui.provincesLoading = true
        const { data } = await fetchProvinces({ limit: 100, status: 1 })
        this.provinces = [...this.provinces, ...data.data.provinces]
      } catch (error) {
        return false
      } finally {
        this.ui.provincesLoading = false
      }
    },
    async fetchHotelOnTops () {
      this.ui.loading = true
      try {
        const { data } = await fetchHotelOnTops(this.filter)
        this.hotelOnTops = data.hotelOnTops
        this.pagination = data.meta
      } catch (error) {
        return false
      } finally {
        this.ui.loading = false
      }
    },
    // setData
    setClassRow ({ row }) {
      if (row.status === 0) {
        return 'hotel__disabled'
      }
    },
    setKindOfHotelOnTop (type) {
      switch (type) {
        case 1:
          return this.$t('page.settings.hotelOnTopByDistrict')
        case 2:
          return this.$t('page.settings.hotelOnTopByDashtag')
        case 3:
          return this.$t('page.settings.hotelOnTopByCollection')
        default:
          return ''
      }
    },
    setStatus (status) {
      switch (status) {
        case 1:
          return this.$t('page.settings.active')
        case 2:
          return this.$t('page.settings.will_active')
        default:
          return this.$t('page.settings.expired')
      }
    },
    // events
    async changeProvinceFilter () {
      this.filter.districtSn = ''
      this.fetchDistricts()
      this.fetchHotelOnTops()
    },
    // pagination event
    handleSizeChange (value) {
      this.filter.limit = value
      this.fetchHotelOnTops()
    },
    handleCurrentChange (value) {
      this.filter.page = value
      this.fetchHotelOnTops()
    }
  }
}
</script>
<style lang="scss" scoped>
.hotel {
  .el-input {
    width: 250px;
  }
  .el-select, .el-input {
    margin-right: 16px;
  }
  ::v-deep .hotel__disabled {
    background-color: rgb(233, 233, 235);
  }
}
</style>
