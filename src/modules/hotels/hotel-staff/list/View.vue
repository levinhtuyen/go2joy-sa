<template>
<div class="dashboard-block">
    <div class="hotel-staff-segment" v-loading="ui.loadingHotelStaff">

        <!-- Start Contentbar-->

        <div class="hotel-staff-segment__filter"  >
            <div class="hotel-staff-segment__filter--input">
              <el-input
              :placeholder="$t(`page.product.placeholder`)"
              v-model="query.keyword"
              clearable
              prefix-icon="el-icon-search"
              @input="handleSearch"
            />
            </div>
            <div class="hotel-staff-segment__filter--add">
              <el-button
                type="warning"
                plain
                @click="onCreateHotelStaff"
                icon="el-icon-plus"
              >
                {{ $t('button.add') }}
              </el-button>
            </div>
        </div>
        <div v-for="(item,index) in tableData" :key="index">
          <div class="hotel-staff-segment__hotel-name">
            <p>{{ item.hotelName }}</p>
          </div>
          <el-table
          :data="item.hotelStaffs"
          class="hotel-staff-segment__table"
        >
          <el-table-column
            type="index"
            label="#"
            min-width="2"
          />
          <el-table-column
            :label="$t('page.hotelStaffList.full_name')"
            min-width="10"
          >
            <template slot-scope="scope">
              <router-link
                :to="{ name: 'hotel_staff_detail', params: { id: scope.row.sn }}"
              >
              {{ scope.row.fullName }}
              </router-link>
            </template>
          </el-table-column>
          <el-table-column
            :label="$t('page.hotelStaffList.user_id')"
            min-width="4"
          >
            <template slot-scope="scope">
              <span> {{ scope.row.userId }}</span>
            </template>
          </el-table-column>
          <el-table-column
            :label="$t('page.hotelStaffList.role')"
            min-width="4"
          >
            <template slot-scope="scope">
              <span> {{ scope.row.roleName }} </span>
            </template>
          </el-table-column>
          <el-table-column
            :label="$t('page.hotelStaffList.email')"
            min-width="7"
          >
            <template slot-scope="scope">
              <span> {{ scope.row.email }} </span>
            </template>
          </el-table-column>
          <el-table-column
            :label="$t('page.hotelStaffList.mobile')"
            min-width="4"
          >
            <template slot-scope="scope">
              <p>{{ scope.row.mobile }}</p>
            </template>
          </el-table-column>
          <el-table-column
            :label="$t('page.hotelStaffList.receive_sms')"
            min-width="4"
          >
            <template slot-scope="scope">
              <p v-if="scope.row.receiveSms == 1">✔</p>
              <p else> </p>
            </template>
          </el-table-column>
          <el-table-column
            :label="$t('page.hotelStaffList.status')"
            min-width="4"
          >
            <template slot-scope="scope">
              <el-checkbox v-model="scope.row.status" @change="onCheckboxChangeStatus(scope.row.sn)" :true-label="statusCheck" :false-label="statusNoCheck" ></el-checkbox>
            </template>
          </el-table-column>
          <el-table-column
            :label="$t('page.productType.operations')"
            align="center"
            min-width="5"

          >
            <template slot-scope="scope" v-if="scope.row.status">
              <el-popover
                placement="left"
                trigger="click"
              >
                <i slot="reference" class="operations el-icon-more" />
                <div style="padding: 8px 12px;">
                  <el-button
                    type="success"
                    plain
                    size="small"
                    icon="el-icon-edit"
                    @click="onEditHotelStaff(scope.row.sn)"
                  >
                    {{ $t('button.edit')}}
                  </el-button>
                </div>
              </el-popover>
            </template>
          </el-table-column>
        </el-table>
        </div>
        <div class="hotel-staff-segment__footer">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :page-sizes="[10, 20, 30, 40, 50]"
            :page-size="pagination.perPage"
            layout="total, sizes, prev, pager, next, jumper"
            :total="pagination.total">
          </el-pagination>
        </div>
      </div>
</div>
</template>

<script>
// @ is an alias to /src
import { debounce } from '@/utils/helpers'
import {
  getHoteBySn,
  getHoteStaffList,
  updateStatusStaffList
} from './api'
const timeDebounce = 500
export default {
  name: 'HotelStaffMgt',
  components: {

  },
  data () {
    return {
      ui: {
        loadingHotelStaff: true
      },
      pagination: {},
      query: {
        limit: 10,
        page: 1,
        keyword: ''
      },
      queryHotel: {
        limit: 10,
        page: 1,
        keyword: '',
        hotelSn: ''
      },
      hotelStaffList: [],
      optionProductType: {},
      tableData: [],
      statusCheck: 1,
      statusNoCheck: 0,
      dataSuccess: [],
      hotelSn: this.$route.params.hotelSn,
      selectHotel: {}

    }
  },
  async created () {
    if (this.hotelSn) {
      this.queryHotel.hotelSn = this.$route.params.hotelSn
      this.fetchSuggestionsHotels()
    } else {
      this.getHotelStaffList(this.query)
    }
  },
  methods: {
    async getHotelStaffList (params) {
      this.ui.loadingHotelStaff = true
      try {
        const { data } = await getHoteStaffList(params)
        this.tableData = data.data.hotelStaffs
        this.pagination = data.data.meta
      } catch (error) {
        return false
      } finally {
        this.ui.loadingHotelStaff = false
      }
    }, // getProductTypeList

    async fetchSuggestionsHotels () {
      this.ui.isLoadingHotelStaffCreate = true
      this.queryHotel.hotelSn = this.hotelSn
      try {
        const { data } = await getHoteBySn(this.queryHotel)
        this.selectHotel = data.data.hotels[0]
        this.query.keyword = this.selectHotel.name
        this.getHotelStaffList(this.query)
      } catch (error) {
        return false
      } finally {
        this.ui.isLoadingHotelStaffCreate = false
      }
    },

    handleSearch: debounce(function () {
      this.getHotelStaffList(this.query)
    }, timeDebounce), // handleSearch

    onCheckboxChangeStatus (staffSn) {
      this.ui.loadingHotelStaff = true
      try {
        const { data } = updateStatusStaffList(staffSn)
        this.dataSuccess = data
        this.$message({
          type: 'success',
          message: this.$t('message.updateSuccess')
        })
      } catch (error) {
        return false
      } finally {
        this.ui.loadingHotelStaff = false
      }
    },

    onEditHotelStaff (staffSn) {
      this.$router.push({ name: 'hotel_staff_edit', params: { id: staffSn } })
    },

    onCreateHotelStaff () {
      this.$router.push({ name: 'hotel_staff_create' })
    },

    handleSizeChange (value) {
      // this.pagination.perPage = value
      this.query.limit = value
      this.getHotelStaffList(this.query)
    }, // handleSizeChange

    handleCurrentChange (value) {
      // this.pagination.currentPage = value
      this.query.page = value
      this.getHotelStaffList(this.query)
    } // handleCurrentChange

  }
}
</script>

<style lang="scss" scoped>
.operations {
  cursor: pointer;
  transform: rotate(90deg);
  &:hover {
    color: #ff6400;
  }
}
.el-table th, .el-table .custom-style-background{
  background-color: #fce5e5 !important;
}
.hotel-staff-segment{
    min-height: calc(100vh - 150px );
    background-color: #ffffff;
    padding: 30px;
  &__hotel-name{
    background-color: rgb(93, 178, 255);
    width:100%;
    padding:10px;
    font-weight: bold;
    color: black;
    float: left;
  }
  .el-table {
    td {
      font-size: 12px;
    }

  }
  &__header {
    margin-bottom: 20px;
    &--red {
      color: #F56C6C;
    }
  }
  &__footer {
    margin-top: 30px  ;
  }
  &__filter {
    display: grid;
    align-items: center;
    margin-bottom: 24px;
    grid-template-columns: 1fr 1fr;
    .el-input {
      width: 300px;
    }
    .el-input--suffix {
      margin: 0 12px;
    }
    &--add{
      place-self: flex-end;
    }
  }
}

@media (max-width: 1200px) {
  .operations {
    color: green;
  }
}
</style>
