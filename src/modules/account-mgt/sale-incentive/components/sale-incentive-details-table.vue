<template>
  <el-table
    :data="saleIncentives"
  >
    <el-table-column
      type="index"
      label="#"
      min-width="2"
    />
    <el-table-column
      :label="$t('page.saleIncentive.category')"
      min-width="6"
    >
      <template slot-scope="scope">
        <span v-if="!scope.row.total">
          {{ setCategory(scope.row.category) }}
        </span>
      </template>
    </el-table-column>
    <el-table-column
      :label="$t('page.saleIncentive.province')"
      min-width="6"
    >
      <template slot-scope="scope">
        <span v-if="!scope.row.total">
          {{ scope.row.province.name }}
        </span>
      </template>
    </el-table-column>
    <el-table-column
      :label="$t('page.saleIncentive.district')"
      min-width="6"
    >
      <template slot-scope="scope">
        <span v-if="!scope.row.total">
          {{ scope.row.district.name }}
        </span>
      </template>
    </el-table-column>
    <el-table-column
      prop="name"
      :label="$t('page.saleIncentive.hotel_name')"
      min-width="10"
    >
    </el-table-column>
    <el-table-column
      prop="verifiedDate"
      :label="$t('page.saleIncentive.verified_date')"
      min-width="6"
    >
    </el-table-column>
    <el-table-column
      prop="contractDate"
      :label="$t('page.saleIncentive.contract_date')"
      min-width="6"
    >
    </el-table-column>
    <el-table-column
      prop="commission"
      :label="$t('page.saleIncentive.contract_per')"
      min-width="5"
    >
    </el-table-column>
    <el-table-column
      prop="program"
      :label="$t('page.saleIncentive.program')"
      min-width="6"
    >
    </el-table-column>
    <el-table-column
      prop="startDatePromotion"
      :label="$t('page.saleIncentive.start_date_promotion')"
      min-width="6"
    >
    </el-table-column>
    <el-table-column
      prop="endDatePromotion"
      :label="$t('page.saleIncentive.end_date_promotion')"
      min-width="6"
    >
    </el-table-column>
    <el-table-column
      prop="startDateStamp"
      :label="$t('page.saleIncentive.start_date_stamp')"
      min-width="6"
    >
    </el-table-column>
    <el-table-column
      prop="newContractedType"
      :label="$t('page.saleIncentive.new_contract_type')"
      min-width="5"
    >
    </el-table-column>
    <el-table-column
      prop="numOfCheckInBookings"
      :label="$t('page.saleIncentive.number_of_checkin_bookings')"
      min-width="6"
    >
    </el-table-column>
    <el-table-column
      prop="commissionOfCheckInAmount"
      :label="$t('page.saleIncentive.commission_of_checkin_amount')"
      min-width="6"
    >
    </el-table-column>
    <el-table-column
      :label="$t('page.saleIncentive.new_contract_type')"
      min-width="6"
    >
      <template slot-scope="scope">
        {{ formatMoney(scope.row.incentive) }}
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
export default {
  name: 'SaleIncentiveDetailTable',
  props: {
    saleIncentives: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    setCategory (value) {
      switch (value) {
        case 0:
          return 'income'
        case 1:
          return 'New contract'
        case 2:
          return 'Stamp'
        case 3:
          return 'Hotel own promotion'
        case 4:
          return 'Co-promotion'
        case 5:
          return 'New hotel check in amount'
        default:
          return ''
      };
    }
  }
}
</script>
