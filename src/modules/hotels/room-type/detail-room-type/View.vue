<template>
  <div class="detail-room-type">
    <sa-section v-loading="isLoading">
      <div class="left">
        <el-button
            type="info"
            size="large"
            @click="$router.push({name: 'roomType', query: {sn: hotelSn}})"
          >
            {{ $t("button.back") }}
          </el-button>
      </div>
      <div class="detail-room-type__info detail-room-item">
        <div class="room_info">
          <el-row>
              <el-col :span="4">
                  <p>{{ $t("page.detailRoomType.hotel_name") }}</p>
              </el-col>
              <el-col :span="20">
                  <p v-html="content.hotelName"> </p>
              </el-col>
          </el-row>  <!-- hotel name -->
          <el-row>
              <el-col :span="4">
                  <p>{{ $t("page.detailRoomType.name_short_name") }}</p>
              </el-col>
              <el-col :span="20">
                  <p type="text" v-html="content.name+'/'+content.shortName"></p>
              </el-col>
          </el-row>  <!-- short name -->
          <el-row>
              <el-col :span="4">
                  <p>{{ $t("page.detailRoomType.num_of_room") }}</p>
              </el-col>
              <el-col :span="20">
                  <p type="text" v-html="content.numOfRoomHotel"></p>
              </el-col>
          </el-row>  <!-- num of room -->
          <el-row>
              <el-col :span="4">
                  <p>{{ $t('page.detailRoomType.first_hours_price')}}/{{ $t('page.detailRoomType.max_num_hour')}}</p>
              </el-col>
              <el-col :span="20">
                  <p type="text"  v-html="`${content.firstHours}h - ${formatMoney(this.content.firstHoursOrigin)}/${content.maxNumHour}`"></p>
              </el-col>
          </el-row>   <!-- first hour -->
          <el-row>
              <el-col :span="4">
                  <p>{{ $t('page.detailRoomType.plus_hour_price')}}</p>
              </el-col>
              <el-col :span="20">
                  <p type="text"  v-html="`${content.additionalHours}h - ${formatMoney(this.content.additionalOrigin)}`"></p>
              </el-col>
          </el-row>  <!-- plus hour -->
          <el-row>
              <el-col :span="4">
                  <p>{{ $t('page.detailRoomType.overnight_price')}}</p>
              </el-col>
              <el-col :span="20">
                  <p type="text"  v-html="`${formatMoney(this.content.overnightOrigin)}`"></p>
              </el-col>
          </el-row>  <!-- overnight -->
          <el-row>
              <el-col :span="4">
                  <p>{{ $t('page.detailRoomType.one_day_price')}}</p>
              </el-col>
              <el-col :span="20">
                  <p type="text"  v-html="`${formatMoney(this.content.oneDayOrigin)}`"></p>
              </el-col>
          </el-row>  <!-- one day -->
          <el-row>
              <el-col :span="4">
                  <p>{{ $t('page.detailRoomType.square')}}/{{ $t('page.detailRoomType.bed_type')}}/{{ $t('page.detailRoomType.view')}}</p>
              </el-col>
              <el-col :span="20">
                  <p disabled type="text" v-html="content.square+'<span>m<sup>2</sup></span>/'+bedType+'/'+content.views"></p>
              </el-col>
          </el-row>  <!-- Utility -->
          <el-row>
            <el-col :span="4">
              <p>{{ $t('page.detailRoomType.memo') }}</p>
            </el-col>
            <el-col :span="20">
              <p disabled type="text" v-html="content.memo"></p>
            </el-col> <!-- memo -->
          </el-row>
          <el-row>
              <el-col :span="4">
                  <p>{{ $t('page.detailRoomType.facilities') }}</p>
              </el-col>
              <el-col :span="20">
                  <el-row>
                      <el-col :span="4" v-for="(faci,index) in content.facilities" :key="index">
                          <img class="img-responsive-icon-faci" :src="`https://go2joy.s3-ap-southeast-1.amazonaws.com/`+faci.imagePath" />
                          <p class="style-text-alight-center-faci" v-if="$t('lang') == 'vi'">{{ faci.name }}</p>
                          <p class="style-text-alight-center-faci" v-if="$t('lang') == 'en'">{{ faci.nameEn }}</p>
                      </el-col>
                  </el-row>
              </el-col>
          </el-row> <!-- facilities -->
        </div>
      </div> <!-- info -->
      <div class="detail-room-type__special-offer detail-room-item">
          <p class="header-content-bar">{{ $t('page.detailRoomType.special_offer.name')}}</p>
          <div class="special-offer" v-if="content.giftDescription">
              <el-row>
                  <el-col :span="4">
                      <p>{{ $t('page.detailRoomType.special_offer.description')}}/{{ $t('page.detailRoomType.special_offer.end_date')}}</p>
                  </el-col>
                  <el-col :span="20">
                      <p v-html="content.giftDescription+'/'+content.endProDate"> </p>
                  </el-col>
              </el-row>
              <el-row>
                  <el-col :span="4">
                      <p>{{ $t('page.detailRoomType.special_offer.gift_image')}}</p>
                  </el-col>
                  <el-col :span="20">
                      <div
                          id="preview"
                          v-if="content.giftImages"
                      >
                          <img

                              :src="formatImage(content.giftImages.imagePath)"
                          />
                      </div>
                  </el-col>
              </el-row>
          </div><!-- description/end date -->
          <div v-else class="" style="text-align: center;padding: 20px;">
              <p>{{$t('no_data')}}</p>
          </div>
      </div> <!-- special offer -->
      <div class="detail-room-type__flash-sale detail-room-item">
          <p class="header-content-bar">{{ $t('page.detailRoomType.flash_sale.name')}}</p>
          <div class="flash-sale" v-if="content.flashSale != 0">
              <el-row>
                  <el-col :span="4">
                      <p>{{ $t('page.detailRoomType.flash_sale.name_flash_sale')}}</p>
                  </el-col>
                  <el-col :span="20">
                      <p v-html="flashSaleInfo.name"> </p>
                  </el-col>
              </el-row>
              <el-row>
                  <el-col :span="4">
                      <p>{{ $t('page.detailRoomType.flash_sale.sale_start')}}</p>
                  </el-col>
                  <el-col :span="20">
                      <p v-html="flashSaleInfo.startDate"> </p>
                  </el-col>
              </el-row>
              <el-row>
                  <el-col :span="4">
                      <p>{{ $t('page.detailRoomType.flash_sale.quantity')}}</p>
                  </el-col>
                  <el-col :span="20">
                      <p v-html="flashSaleInfo.numOfRoom"> </p>
                  </el-col>
              </el-row>
              <el-row>
                  <el-col :span="4">
                      <p>{{ $t('page.detailRoomType.flash_sale.flash_sale_price')}}</p>
                  </el-col>
                  <el-col :span="20">
                      <p v-html="formatMoney(this.flashSaleInfo.priceFlashSale)"> </p>
                  </el-col>
              </el-row>
          </div>
          <div v-else class="" style="text-align: center;padding: 20px;">
              <p>{{$t('no_data')}}</p>
          </div>
      </div> <!-- flash-sale -->
      <div class="detail-room-type__promotion detail-room-item">
          <el-row>
              <el-col :span="4">
                  <p class="header-content-bar">{{ $t('page.detailRoomType.extra_fee.name')}}</p>
              </el-col>
              <el-col :span="20">
                <el-table
                  :data="tableDataExtraFee"
                  v-loading="isLoadingExtraFee"
                >
                  <el-table-column
                    label="#"
                    type="index"
                  />
                  <el-table-column
                    :label="$t('page.detailRoomType.extra_fee.booking_type')"
                    :min-width="160"
                  >
                    <template slot-scope="scope">
                        <span
                          v-for="type in getBookingType(scope.row,'extraFee')"
                          :key="type"

                        >
                          {{ $t(`${type}`) }}<br>
                        </span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    :label="$t('page.detailRoomType.extra_fee.origin')"
                    :min-width="160"
                  >
                    <template slot-scope="scope">
                      <span
                        v-show="scope.row.firstHoursOrigin < scope.row.priceFirstHours"
                      >
                          {{ scope.row.firstHoursOrigin }}<br>
                      </span>
                      <span
                        v-show="scope.row.overnightOrigin < scope.row.priceOvernight"
                      >
                          {{ scope.row.overnightOrigin }}<br>
                      </span>
                      <span
                        v-show="scope.row.oneDayOrigin < scope.row.priceOneDay"
                      >
                          {{ scope.row.oneDayOrigin }}<br>
                      </span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    :label="$t('page.detailRoomType.extra_fee.name')"
                    :min-width="160"
                  >
                    <template slot-scope="scope">
                      <span
                        v-show="scope.row.firstHoursOrigin < scope.row.priceFirstHours"
                      >
                          {{ scope.row.priceFirstHours }}<br>
                      </span>
                      <span
                        v-show="scope.row.overnightOrigin < scope.row.priceOvernight"
                      >
                          {{ scope.row.priceOvernight }}<br>
                      </span>
                      <span
                        v-show="scope.row.oneDayOrigin < scope.row.priceOneDay"
                      >
                          {{ scope.row.priceOneDay }}<br>
                      </span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    :label="$t('page.detailRoomType.extra_fee.start_end')"
                    :min-width="180"
                  >
                    <template slot-scope="scope">
                      {{ `${formatDate(scope.row.startDate,false)} ~ ${formatDate(scope.row.endDate,false)}` }}

                    </template>
                  </el-table-column>
                  <el-table-column
                    :label="$t('page.detailRoomType.extra_fee.days_apply')"
                    :min-width="160"
                  >
                    <template slot-scope="scope">
                      <span
                        v-for="date in getDaysOfWeek(scope.row)"
                        :key="date">
                        {{ date }}
                      </span>

                    </template>
                  </el-table-column>
                  <el-table-column
                    :label="$t('page.detailRoomType.extra_fee.special_date')"
                    :min-width="160"
                  >
                    <template slot-scope="scope">
                      <span
                        v-for="(p,index) in scope.row.specialDate"
                        :key="'1'+index"
                        :class="'custom-p-'+index"
                        style="margin-right: 10px;"
                      >{{p}}</span>
                    </template>
                  </el-table-column>
                </el-table>
              </el-col>
          </el-row>
          <el-row>
              <el-col :span="4">
                  <p class="header-content-bar">{{ $t('page.detailRoomType.direct_discount.name')}}</p>
              </el-col>
              <el-col :span="20">
                <el-table
                    :data="tableDataDirectDiscount"
                    v-loading="isLoadingDirectDiscount"
                  >
                    <el-table-column
                      label="#"
                      type="index"
                    />
                    <el-table-column
                      :label="$t('page.detailRoomType.direct_discount.booking_type')"
                      :min-width="160"
                    >
                      <template slot-scope="scope">
                          <span
                            v-for="type in getBookingType(scope.row,'directDiscount')"
                            :key="type"

                          >
                            {{ $t(`${type}`) }}<br>
                          </span>
                      </template>
                    </el-table-column>
                    <el-table-column
                      :label="$t('page.detailRoomType.direct_discount.origin')"
                      :min-width="160"
                    >
                      <template slot-scope="scope">
                        <span
                          v-show="scope.row.firstHoursOrigin > scope.row.priceFirstHours"
                        >
                          {{ scope.row.firstHoursOrigin }}<br>
                        </span>
                        <span
                          v-show="scope.row.overnightOrigin > scope.row.priceOvernight"
                        >
                          {{ scope.row.overnightOrigin }}<br>
                        </span>
                        <span
                          v-show="scope.row.oneDayOrigin > scope.row.priceOneDay"
                        >
                          {{ scope.row.oneDayOrigin }}<br>
                        </span>
                      </template>
                    </el-table-column>
                    <el-table-column
                      :label="$t('page.detailRoomType.direct_discount.name')"
                      :min-width="160"
                    >
                      <template slot-scope="scope">
                        <span
                          v-show="scope.row.firstHoursOrigin > scope.row.priceFirstHours"
                        >
                          {{ scope.row.priceFirstHours }}<br>
                        </span>
                        <span
                          v-show="scope.row.overnightOrigin > scope.row.priceOvernight"
                        >
                          {{ scope.row.priceOvernight }}<br>
                        </span>
                        <span
                          v-show="scope.row.oneDayOrigin > scope.row.priceOneDay"
                        >
                          {{ scope.row.priceOneDay }}<br>
                        </span>
                      </template>
                    </el-table-column>
                    <el-table-column
                      :label="$t('page.detailRoomType.direct_discount.start_end')"
                      :min-width="180"
                    >
                      <template slot-scope="scope">
                        {{ `${formatDate(scope.row.startDate,false)} ~ ${formatDate(scope.row.endDate,false)}` }}

                      </template>
                    </el-table-column>
                    <el-table-column
                      :label="$t('page.detailRoomType.direct_discount.days_apply')"
                      :min-width="160"
                    >
                      <template slot-scope="scope">
                        <span
                          v-for="date in getDaysOfWeek(scope.row)"
                          :key="date">
                              {{ date }}
                        </span>
                      </template>
                    </el-table-column>
                    <el-table-column
                      :label="$t('page.detailRoomType.direct_discount.special_date')"
                      :min-width="160"
                    >
                      <template slot-scope="scope">
                        <span
                          v-for="(p,index) in scope.row.specialDate"
                          :key="'1'+index"
                          :class="'custom-p-'+index"
                          style="margin-right: 10px;"
                        >{{p}}</span>
                      </template>
                    </el-table-column>
                </el-table>
              </el-col>
          </el-row>
      </div> <!-- extra fee and direct discount -->
    </sa-section>
  </div>
</template>
<script>
import { getRoomType, listExtraFee, listDirectDiscount } from '@/api/roomType'
import saSection from '@/components/globals/SaSection.vue'

export default {
  name: 'DetailRoomTypeMgt',
  components: {
    saSection
  },
  data () {
    return {
      sn: this.$route.params.sn,
      hotelSn: this.$route.query.hotelSn,
      content: [],
      flashSaleInfo: [],
      roomTypeImages: [],
      views: [],
      tableDataExtraFee: [],
      tableDataDirectDiscount: [],
      tableData: {},
      isLoading: false,
      isLoadingExtraFee: false,
      isLoadingDirectDiscount: false,
      settings: {
        arrows: true,
        dots: true
      }
    }
  },
  computed: {
    bedType: {
      get: function () {
        switch (this.content.bedType) {
          case 0:
            return this.$t('page.detailRoomType.bed_types.not_select')
          case 1:
            return this.$t('page.detailRoomType.bed_types.single')
          case 2:
            return this.$t('page.detailRoomType.bed_types.double')
          case 3:
            return this.$t('page.detailRoomType.bed_types.twin')
          case 4:
            return this.$t('page.detailRoomType.bed_types.triple')
          case 5:
            return this.$t('page.detailRoomType.bed_types.2_double')
          default:
            return ''
        }
      },
      set: function (data) {
        this.content.bedType = data
      }
    }
  },
  updated () {},
  created () {
    this.getRoomType()
  },
  methods: {
    async getRoomType () {
      this.isLoading = true
      try {
        const { data } = await getRoomType(this.sn)
        this.content = data.data
        this.bedType = this.content.bedType
        data.views = this.getViews(data.views)
        this.roomTypeImages = data.roomTypeImages
        this.isLoadingExtraFee = true
        this.isLoadingDirectDiscount = true
        this.getExtraFee()
        this.getDirectDiscount()
      } catch (error) {
        return false
      } finally {
        this.isLoading = false
      }
    },

    async getExtraFee () {
      try {
        const { data } = await listExtraFee(this.sn)
        this.isLoadingExtraFee = false
        const extraFeeTable = data.data
        if (extraFeeTable && extraFeeTable.length > 0) {
          this.tableDataExtraFee = extraFeeTable
        } else {
          this.tableDataExtraFee = []
        }
      } catch (error) {
        return false
      }
    },

    async getDirectDiscount () {
      try {
        const { data } = await listDirectDiscount(this.sn)
        this.isLoadingDirectDiscount = false
        const directDiscountTable = data.data
        if (directDiscountTable && directDiscountTable.length > 0) {
          this.tableDataDirectDiscount = directDiscountTable
        } else {
          this.tableDataDirectDiscount = []
        }
      } catch (error) {
        return false
      }
    },

    getDaysOfWeek (data) {
      const arrayDay = []
      if (data.monday === 1) {
        arrayDay.push('monday')
      }
      if (data.tuesday === 1) {
        arrayDay.push('tuesday')
      }
      if (data.wednesday === 1) {
        arrayDay.push('wednesday')
      }
      if (data.thursday === 1) {
        arrayDay.push('thursday')
      }
      if (data.friday === 1) {
        arrayDay.push('friday')
      }
      if (data.saturday === 1) {
        arrayDay.push('saturday')
      }
      if (data.sunday === 1) {
        arrayDay.push('sunday')
      }
      return arrayDay
    },

    getViews (view) {
      return view && view.length > 0 ? view.map((item) => item.name) : ' '
    },

    getBookingType (data, type) {
      const bookingType = []
      switch (type) {
        case 'extraFee':
          if (data.firstHoursOrigin < data.priceFirstHours) {
            bookingType.push('option.roomType.hourly')
          }
          if (data.overnightOrigin < data.priceOvernight) {
            bookingType.push('option.roomType.overnight')
          }
          if (data.oneDayOrigin < data.priceOneDay) {
            bookingType.push('option.roomType.daily')
          }
          return bookingType
        case 'directDiscount':
          if (data.firstHoursOrigin > data.priceFirstHours) {
            bookingType.push('option.roomType.hourly')
          }
          if (data.overnightOrigin > data.priceOvernight) {
            bookingType.push('option.roomType.overnight')
          }
          if (data.oneDayOrigin > data.priceOneDay) {
            bookingType.push('option.roomType.daily')
          }
          return bookingType
      }
    }
  }
}
</script>
<style lang="scss" scoped>
  .left {
    text-align: end;
  }
  .img-responsive-icon-faci{
      height: 40px;
      width: 40px
  }
  .style-text-alight-center-faci{
      font-size: small;
  }
  .header-content-bar{
      font-weight: 500;
      color: #000;
      font-size: 22px;
      padding: 10px;
      text-transform: uppercase;
      text-align: left
  }
  .detail-room-item{
      padding: 12px 33px 0;
  }
  .detail-room-type__custom-slider{
      width: 100%;
      .large-image{
          width: 100%;
          display: inline;
          height: 300px;
          object-fit: scale-down;
      }
      .small-image{
          width: 100%;
          height: 150px;
          object-fit: scale-down;
          margin: auto !important;
      }
  }
  .detail-room-item{
      border-bottom: 14px solid #f2f5fa;
  }
</style>
