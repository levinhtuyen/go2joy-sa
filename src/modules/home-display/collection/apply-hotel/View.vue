<template>
  <sa-section class="apply-hotel">
    <div class="apply-hotel__header">
      <div class="apply-hotel__header--left">
        <el-select
          v-model="filter.province"
          v-loading="ui.loadingProvince"
          element-loading-spinner="el-icon-loading"
          :placeholder="$t('page.collection.province')"
        >
          <el-option
            v-for="(item, index) in listProvinces"
            :key="index"
            :label="item.name"
            :value="item.sn"
          />
        </el-select>
        <el-select
          v-model="filter.suggestionsHotel"
          v-loading="ui.loadingSuggestionsHotel"
          element-loading-spinner="el-icon-loading"
          :placeholder="$t('page.collection.hotelSuggestion')"
          remote
          filterable
          :remote-method="searchSuggestionsHotels"
          style="min-width: 350px;"
          prefix-icon="el-icon-search"
          clearable
        >
          <ElOption
            v-for="(item, index) in listSuggestionsHotels"
            :key="index"
            :label="`${item.name} - ${item.address}`"
            :value="item.sn"
            style="font-size: 13px; color: #4a5d6e;"
          />
        </el-select>
        <el-button
          type="primary"
          plain
          @click="addApplyHotel"
          icon="el-icon-plus"
          :disabled="!filter.suggestionsHotel"
        >
          {{ $t('page.collection.add') }}
        </el-button>
      </div>
      <div class="apply-hotel__header--right">
        <el-button
          @click="$router.go(-1)"
          type="warning"
          plain
        >
          {{ $t('page.collection.back') }}
        </el-button>
        <el-button
          type="warning"
          plain
          icon="el-icon-plus"
          @click="onSaveApplyHotel"
        >
          {{ $t('page.collection.save') }}
        </el-button>
      </div>
    </div>
    <!-- table -->
    <table
      v-loading="ui.loadingSuggestionsHotel"
      class="table-components data-table apply-hotel__table"
      >
      <thead>
        <th class="table-head" v-for="(item, index) in ui.tableColumns" :key="index">
          <p v-if="item.prop === 'firstColumn'">#</p>
          <p v-else>{{ $t(`${item.label}`) }}</p>
        </th>
      </thead>
      <draggableComponent
        v-model="listApplyHotels"
        tag="tbody"
        @change="changePosition"
        class="draggable"
      >
        <tr v-for="(dataRow, index) in listApplyHotels"
          :key="index + 1"
        >
          <td
            v-for="(item, index) in ui.tableColumns"
            :key="index"
            :class="item.prop"
          >
            <div v-if="item.prop === 'firstColumn'" style="width: 100%; height: 100%; cursor: pointer;">
              <i class="el-icon-menu"></i>
            </div>
             <router-link
              v-else-if="item.prop === 'name'"
              :to="{ name: 'detail_hotel_display', params: { id: dataRow.sn } }"
            >
              {{ dataRow[item.prop] }}
            </router-link>
            <div
              v-else-if="item.prop === 'hotelStatus'"
            >
              {{ setStatus(dataRow['hotelStatus']) }}
            </div>
            <div
              v-else-if="item.prop === 'phone'"
            >
              {{ dataRow[item.prop] || 'N/A' }}
            </div>
            <div
              v-else-if="item.prop === 'provinceName'"
            >
              {{ dataRow[item.prop] || 'N/A' }}
            </div>
            <div
              v-else-if="item.prop === 'address'"
            >
              {{ dataRow[item.prop]}}
            </div>
            <div
              v-else-if="item.prop === 'createTime'"
            >
              {{ dataRow[item.prop]}}
            </div>
            <div
              v-else-if="item.prop === 'lastUpdate'"
            >
              {{ dataRow[item.prop]}}
            </div>
            <div
              v-else-if="item.prop === 'operations'"
            >
              <el-button
                type="danger"
                plain
                size="small"
                @click="deleteApplyHotel(dataRow['sn'])"
              >
                Delete
              </el-button>
            </div>
          </td>
        </tr>
      </draggableComponent>
    </table>
  </sa-section>
</template>
<script>
import draggableComponent from '@/utils/draggable.js'
import { fetchProvinces } from '@/api/province'
import { fetchSuggestionsHotels } from '@/api/hotels'
import { addApplyHotel, fetchApplyHotels, resetApplyHotels, deleteApplyHotel, saveApplyHotels, sortApplyHotels } from './api'
import { debounce } from '@/utils/helpers'
import SaSection from '@/components/globals/SaSection.vue'
const timeDebounce = 500
export default {
  name: 'SelectApplyHotel',
  components: {
    draggableComponent,
    SaSection
  },
  data: () => {
    return {
      ui: {
        loadingProvince: false,
        loadingSuggestionsHotel: false,
        tableColumns: [
          {
            prop: 'firstColumn'
          },
          {
            prop: 'name',
            label: 'page.collection.hotelName'
          },
          {
            prop: 'hotelStatus',
            label: 'page.collection.status'
          },
          {
            prop: 'phone',
            label: 'page.collection.phone'
          },
          {
            prop: 'provinceName',
            label: 'page.collection.province'
          },
          {
            prop: 'address',
            label: 'page.collection.address'
          },
          {
            prop: 'createTime',
            label: 'page.collection.createTime'
          },
          {
            prop: 'lastUpdate',
            label: 'page.collection.lastUpdate'
          },
          {
            prop: 'operations',
            label: 'page.collection.operations'
          }
        ]
      },
      filter: {
        province: '',
        suggestionsHotel: ''
      },
      listProvinces: [],
      listSuggestionsHotels: [],
      listApplyHotels: []
    }
  },
  created () {
    this.filter.province = Number(this.$route.query.provinceSn) || -1
    this.fetchProvinces()
    this.fetchSuggestionsHotels({ limit: 10, justHotel: 1 })
    this.fetchApplyHotels()
  },
  methods: {
    searchSuggestionsHotels: debounce(function (keySearch) {
      this.fetchSuggestionsHotels({
        limit: 10,
        justHotel: 1,
        keyword: keySearch
      })
    }, timeDebounce),
    async fetchApplyHotels () {
      this.ui.loadingApplyHotels = true
      try {
        this.resetApplyHotels()
        const { data } = await fetchApplyHotels(this.$route.params.sn, { provinceSn: this.filter.province })
        this.listApplyHotels = data.data.hotels
      } catch (error) {
        return false
      } finally {
        this.ui.loadingApplyHotels = false
      }
    },
    async fetchSuggestionsHotels (params) {
      this.ui.loadingSuggestionsHotel = true
      try {
        const { data } = await fetchSuggestionsHotels(params)
        this.listSuggestionsHotels = data.data.hotels
      } catch (error) {
        return false
      } finally {
        this.ui.loadingSuggestionsHotel = false
      }
    },
    async fetchProvinces () {
      this.ui.loadingProvince = true
      try {
        this.listProvinces = [{ name: this.$t('page.collection.all'), sn: -1 }]
        const { data } = await fetchProvinces({ limit: 100, status: 1 })
        this.listProvinces = [...this.listProvinces, ...data.data.provinceSn]
      } catch (error) {
        return false
      } finally {
        this.ui.loadingProvince = false
      }
    },
    async resetApplyHotels () {
      try {
        await resetApplyHotels(this.$route.params.sn)
      } catch (error) {
        return false
      } finally {
        this.ui.loadingProvince = false
      }
    },
    // events
    async deleteApplyHotel (sn) {
      try {
        const { data } = await deleteApplyHotel(this.$route.params.sn, { hotelSn: sn })
        this.listApplyHotels = data.data.hotels
        const message = this.$t('page.collection.removeSuccess')
        this.$message({
          type: 'success',
          message: message
        })
      } catch (error) {
        return false
      }
    },
    async onSaveApplyHotel () {
      try {
        await saveApplyHotels(this.$route.params.sn)
      } catch (error) {
        return false
      } finally {
        this.$router.push({ name: 'collection' })
      }
    },
    async changePosition (e) {
      if (!e.moved) {
        return false
      }
      const query = `positionBefore=${e.moved.oldIndex}&positionAfter=${e.moved.newIndex}`
      try {
        await sortApplyHotels(this.$route.params.sn, query)
      } catch (error) {
        return false
      } finally {
        this.ui.loading = false
      }
    },
    setStatus (value) {
      if (!value) {
        return ''
      }
      switch (value) {
        case 1:
          return this.$t('page.collection.waiting')
        case 2:
          return this.$t('page.collection.displayed')
        case 3:
          return this.$t('page.collection.contracted')
        case 4:
          return this.$t('page.collection.trial')
        case 5:
          return this.$t('page.collection.terminated')
        case 6:
          return this.$t('page.collection.suspended')
        default:
          return ''
      }
    },
    async addApplyHotel () {
      this.ui.loadingProvince = true
      try {
        const { data } = await addApplyHotel(this.$route.params.sn, { hotelSn: this.filter.suggestionsHotel })
        this.listApplyHotels = data.data.hotels
        const message = this.$t('page.collection.addSuccess')
        this.$message({
          type: 'success',
          message: message
        })
      } catch (error) {
        return false
      } finally {
        this.ui.loadingProvince = false
      }
    }

  }
}
</script>
<style lang="scss" scoped>
.apply-hotel {
  padding: 30px;
  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 32px;
    &--left {
      display: flex;
      align-items: center;
      .el-select, .el-input {
        margin-right: 16px;
      }
    }
  }
  &__table {
    tr:hover {
      td {
        cursor: pointer;
        background-color: #F5F7FA;
      }
    }
    .name, .address {
      width: 20%;
    }
    .firstColumn {
      width: 2%;
    }
    .operations{
      width: 8%;
    }
    .hotelStatus, .province, .createTime, .lastUpdate{
      width: 10%;
    }
    td, th {
      padding: 12px 0;
      transition: background-color .25s ease;
      min-width: 0;
      box-sizing: border-box;
      text-overflow: ellipsis;
      vertical-align: middle;
      position: relative;
      text-align: left;
      color: #606266;
    }
  }
}
</style>
