<template>
  <el-table
    :data="data"
  >
    <el-table-column
      type="index"
      label="#"
    />
    <el-table-column
      :label="$t('page.saleIncentive.staff_name')"
    >
      <template slot-scope="scope">
        <router-link
          v-if="!scope.row.total"
          :to="{
            name: 'DetailsOfStaff',
            params: { sn: scope.row.staff.sn },
            query: { incentiveDate: incentiveDate, staffName: scope.row.staff.fullName, type: pageName }
          }"
        >
          {{ scope.row.staff.fullName }}
        </router-link>
      </template>
    </el-table-column>
    <el-table-column
      prop="incentive"
      :label="$t('page.saleIncentive.incentive')"
    >
    </el-table-column>
    <el-table-column
      prop="pit"
      :label="$t('page.saleIncentive.pit')"
    >
    </el-table-column>
    †
    <el-table-column
      :label="$t('page.saleIncentive.income')"
    >
      <template slot-scope="scope">
        <router-link
          v-if="scope.row.total"
          :to="{
            name: 'AccountSaleIncentiveDetail',
            query: {
              incentiveDate: incentiveDate,
              category: 'income',
              type: pageName
            }
          }"
        >
          {{ formatMoney(scope.row.income) }}
        </router-link>
        <span v-else>{{ formatMoney(scope.row.income) }}</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="newContract"
      :label="$t('page.saleIncentive.new_contract')"
    >
      <template slot-scope="scope">
        <router-link
          v-if="scope.row.total"
          :to="{
            name: 'AccountSaleIncentiveDetail',
            query: {
              incentiveDate: incentiveDate,
              category: 'newContract',
              type: pageName
            }
          }"
        >
          {{ formatMoney(scope.row.newContract) }}
        </router-link>
        <span v-else>{{ formatMoney(scope.row.income) }}</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="stamp"
      :label="$t('page.saleIncentive.stamp')"
    >
      <template slot-scope="scope">
        <router-link
          v-if="scope.row.total"
          :to="{
            name: 'AccountSaleIncentiveDetail',
            query: {
              incentiveDate: incentiveDate,
              category: 'stamp',
              type: pageName
            }
          }"
        >
          {{ formatMoney(scope.row.stamp) }}
        </router-link>
        <span v-else>{{ formatMoney(scope.row.income) }}</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="hotelOwnPromotion"
      :label="$t('page.saleIncentive.hotel_promotion')"
    >
      <template slot-scope="scope">
        <router-link
          v-if="scope.row.total"
          :to="{
            name: 'AccountSaleIncentiveDetail',
            query: {
              incentiveDate: incentiveDate,
              category: 'hotelOwnPromotion',
              type: pageName
            }
          }"
        >
          {{ formatMoney(scope.row.hotelOwnPromotion) }}
        </router-link>
        <span v-else>{{ formatMoney(scope.row.income) }}</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="coPromotion"
      :label="$t('page.saleIncentive.co_promotion')"
    >
      <template slot-scope="scope">
        <router-link
          v-if="scope.row.total"
          :to="{
            name: 'AccountSaleIncentiveDetail',
            query: {
              incentiveDate: incentiveDate,
              category: 'coPromotion',
              type: pageName
            }
          }"
        >
          {{ formatMoney(scope.row.coPromotion) }}
        </router-link>
        <span v-else>{{ formatMoney(scope.row.income) }}</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="newHotelCheckInAmount"
      :label="$t('page.saleIncentive.new_hotel_checkin_amount')"
    >
      <template slot-scope="scope">
        <router-link
          v-if="scope.row.total"
          :to="{
            name: 'AccountSaleIncentiveDetail',
            query: {
              incentiveDate: incentiveDate,
              category: 'newHotelCheckInAmount',
              type: pageName
            }
          }"
        >
          {{ formatMoney(scope.row.newHotelCheckInAmount) }}
        </router-link>
        <span v-else>{{ formatMoney(scope.row.income) }}</span>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
export default {
  name: 'SalaIncentiveTable',
  props: {
    data: {
      type: Array,
      default: () => []
    },
    pageName: {
      type: String,
      default: ''
    }
  },
  data: () => {
    return {
      incentiveDate: ''
    }
  },
  created () {
    this.incentiveDate = this.$route.query.incentiveDate ? this.formatDate(this.$route.query.incentiveDate, false) : this.formatDate(new Date(), false)
  }
}
</script>
