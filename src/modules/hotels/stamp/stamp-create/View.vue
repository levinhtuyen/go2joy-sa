<template>
  <sa-section class="stamp">
    <el-form :model="form" :rules="rules" ref="form">
      <div class="stamp__form">
        <el-form-item :label="$t('page.stamp.hotelName')" prop="hotelSn" required>
          <el-select
            :loading="ui.isLoadingHotels"
            v-model="form.hotelSn"
            element-loading-spinner="el-icon-loading"
            remote
            filterable
            :placeholder="$t('page.stamp.hotelName')"
            :remote-method="reloadHotels"
            >
            <el-option
                v-for="(item, index) in hotels"
                :key="index"
                :label="`${item.name} - ${item.address}`"
                :value="item.sn"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </div>
      <div class="stamp__form">
        <el-form-item :label="$t('page.stamp.stampsToRedeem')" required>
          <div class="stamp__row">
            <div class="stamp__row--margin">
              <el-form-item>
                <el-select
                v-model="form.numToRedeem"
                :placeholder="$t('page.stamp.stampsToRedeem')"
                >
                  <el-option
                      v-for="item in stampToRedeemOptions"
                    :key="item.value"
                    :label="item.key"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
          </div>
        </el-form-item>
      </div>
      <div class="stamp__form">
        <el-form-item :label="$t('page.stamp.redeemValue')" required>
          <div class="stamp__row">
            <div class="stamp__row--margin">
              <el-form-item>
                <el-select
                v-model="form.redeemType"
                :placeholder="$t('page.stamp.redeemValue')"
                >
                  <el-option
                      v-for="item in redeemValueOptions"
                    :key="item.value"
                    :label="$t(`${item.key}`)"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
            <div v-if="form.redeemType == 2" class="stamp__row--margin">
              <el-form-item>
                <el-input-number
                  @change="form.redeemValue = formatEvenPercent(form.redeemValue)"
                  :controls="false"
                  :min="0"
                  :max="100"
                  v-validate="'required'"
                  v-model="form.redeemValue"></el-input-number>
              </el-form-item>
            </div>
            <div v-if="form.redeemType == 2" class="stamp__row--margin">
              <el-form-item>
                <b>%</b>
              </el-form-item>
            </div>
            <div class="stamp__row--margin">
              <el-form-item>
                <el-input-number
                  @change="form.maxRedeem = formatEvenPrice(form.maxRedeem)"
                  :controls="false"
                  :min="0"
                  v-validate="'required'"
                  v-model="form.maxRedeem"></el-input-number>
              </el-form-item>
             </div>
            <div class="stamp__row--margin">
              <el-form-item>
                <b>VNĐ</b>
              </el-form-item>
            </div>
          </div>
        </el-form-item>
      </div>
      <div class="stamp__form">
        <el-form-item :label="$t('page.stamp.startDate')" prop="startDate" required>
          <el-date-picker type="date" :placeholder="$t('page.stamp.startDate')" v-model="form.startDate"></el-date-picker>
        </el-form-item>
      </div>
      <div class="stamp__form">
        <el-form-item :label="$t('page.stamp.canRedeemForBooking')" required>
          <el-checkbox :true-label="1" :false-label="0" v-model="form.redeemHourly">{{ $t('option.roomType.hourly') }}</el-checkbox>
          <el-checkbox :true-label="1" :false-label="0" v-model="form.redeemOvernight">{{ $t('option.roomType.overnight') }}</el-checkbox>
          <el-checkbox :true-label="1" :false-label="0" v-model="form.redeemDaily">{{ $t('option.roomType.daily') }}</el-checkbox>
        </el-form-item>
      </div>
      <div class="stamp__form">
        <el-form-item :label="$t('page.stamp.integrateWithFlashSale')">
          <el-checkbox :true-label="1" :false-label="0" v-model="form.flashSaleEarn">{{ $t('page.stamp.canEarnStamp') }}</el-checkbox>
        </el-form-item>
      </div>
      <div class="stamp__button">
        <el-button type="info" size="large" @click="$router.go(-1)">
            {{ $t('button.back')}}
        </el-button>
        <el-button type="success" :loading="ui.isSubmiting" size="large" @click="preHandleBeforeSubmit">
            {{ $t('button.create')}}
        </el-button>
      </div>
    </el-form>
  </sa-section>
</template>
<script>
import { debounce } from '@/utils/helpers'
import SaSection from '@/components/globals/SaSection.vue'
import { createStamp } from './api'
import { fetchSuggestionsHotels } from '@/api/hotels'
const timeDebounce = 500

export default {
  name: 'CreateStamp',
  components: {
    SaSection
  },
  data () {
    return {
      form: {
        hotelSn: '',
        flashSaleEarn: '',
        maxRedeem: 10000,
        numToRedeem: 1,
        redeemDaily: 1,
        redeemHourly: 1,
        redeemOvernight: 1,
        redeemType: 1,
        redeemValue: 100,
        startDate: new Date()
      },
      rules: {
        hotelSn: [
          { required: true, message: this.$t('page.stamp.requiredHotelName'), trigger: 'blur' }
        ],
        startDate: [
          { required: true, message: this.$t('page.stamp.requiredStartDate'), trigger: 'change' }
        ]
      },
      ui: {
        isSubmiting: false,
        isLoadingHotels: false
      },
      hotels: [],
      stampToRedeemOptions: [
        { value: 1, key: '1' },
        { value: 2, key: '2' },
        { value: 3, key: '3' },
        { value: 4, key: '4' },
        { value: 5, key: '5' },
        { value: 6, key: '6' },
        { value: 7, key: '7' },
        { value: 8, key: '8' },
        { value: 9, key: '9' },
        { value: 10, key: '10' }
      ],
      redeemValueOptions: [
        { value: 1, key: 'page.stamp.money' },
        { value: 2, key: 'page.stamp.percentage' }
      ]
    }
  },
  created () {
    this.fetchSuggestionsHotels()
  },
  methods: {
    async fetchSuggestionsHotels (keyword) {
      this.ui.isLoadingHotels = true
      try {
        const params = { keyword: keyword || '', justHotel: 1 }
        const { data } = await fetchSuggestionsHotels(params)
        this.hotels = data.data.hotels
      } catch (error) {
        return false
      } finally {
        this.ui.isLoadingHotels = false
      }
    },
    reloadHotels: debounce(function (keyword) {
      this.fetchSuggestionsHotels(keyword)
    }, timeDebounce),
    preHandleBeforeSubmit () {
      this.form.startDate = this.formatDate(this.form.startDate, false)
      this.$refs.form.validate((valid) => {
        if (!valid) {
          return false
        }
        this.submit()
      })
    },
    async submit () {
      this.ui.isSubmiting = true
      try {
        const formData = Object.keys(this.form).reduce((formData, key) => {
          formData.append(key, this.form[key])
          return formData
        }, new FormData())

        await createStamp(formData)
        const message = this.$t('message.createSuccess')
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
    }
  }
}
</script>

<style lang="scss" scoped>
  .el-input-number::v-deep {
    .el-input__inner {
      text-align: left;
    }
  }
  .stamp {
    .stamp__form::v-deep {
      margin: 1em 0;
      .el-form-item {
        display: unset;
        margin-bottom: 1em;
        @media (min-width: 640px) {
          display: flex;
          flex-wrap: wrap;
        }
      }
      .el-form-item__label {
        text-align: left;
        @media (min-width: 640px) {
          flex: 1;
        }
      }
      .el-form-item__content {
        @media (min-width: 640px) {
          flex: 3;
        }
      }
      .el-form-item__error {
        margin-top: 0.5em;
        position: unset;
      }
    }
    &__row {
      @media (min-width: 640px) {
        display: flex;
        align-items: center;
        gap: 0 2em;
        flex-wrap: wrap;
      }
      &--margin {
        margin: 1em 0;
      }
    }
    &__content {
      clear: both;
    }
    &__button {
      display: flex;;
      justify-content: flex-end;
      margin-top: 2em;
    }
  }
  .select-check::v-deep {
    button {
      width: 100%;
      @media (min-width: 640px) {
        width: 16em;
      }
    }
  }
  .el-select {
    width: 100%;
  }
</style>
