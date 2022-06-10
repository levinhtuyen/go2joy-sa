<template>
  <el-form
    label-width="250px"
    :model="formData"
    :rules="setRules"
    ref="secondSplashForm"
    hide-required-asterisk
    class="form"
    v-loading="ui.loadingDetails"
  >
    <el-form-item
      prop="title"
      :label="$t('page.settings.title')"
    >
      <el-input
        v-model="formData.title"
      />
    </el-form-item>
    <el-form-item
      :label="$t('page.settings.typeTop')"
    >
      <el-select
        v-model="formData.type"
        style="width: 350px"
      >
        <ElOption
          v-for="(item, index) in ui.typeTopOptions"
          :key="index"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-form-item>
    <el-form-item
      :label="$t('page.settings.province')"
    >
      <el-select
        v-model="formData.provinceSn"
        style="width: 350px"
        @change="fetchDistricts"
        :loading="ui.provincesLoading"
      >
        <ElOption
          v-for="(item, index) in provinces"
          :key="index"
          :label="item.name"
          :value="item.sn"
        />
      </el-select>
    </el-form-item>
    <el-form-item
      v-if="formData.type === 1"
      :label="$t('page.settings.district')"
    >
      <el-select
        v-model="formData.districtSn"
        style="width: 350px"
        :loading="ui.districtsLoading"
      >
        <ElOption
          v-for="(item, index) in districts"
          :key="index"
          :label="item.name"
          :value="item.sn"
        />
      </el-select>
    </el-form-item>
    <el-form-item
      prop="hashtagSn"
      v-if="formData.type === 2"
      :label="$t('page.settings.hashtag')"
    >
      <el-select
        v-model="formData.hashtagSn"
        :loading="ui.hashtagLoading"
        :placeholder="$t('page.settings.hashtag')"
        remote
        filterable
        :remote-method="searchSuggestionHashtag"
        prefix-icon="el-icon-search"
        clearable
        style="width: 350px"
        :popper-append-to-body="false"
      >
        <el-option
          v-for="(item, index) in suggestionHashtags"
          :key="index"
          :label="item.name"
          :value="item.sn"
          style="font-size: 13px; color: #4a5d6e;"
        >
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item
      v-if="formData.type === 2"
      prop="startDate"
      :label="$t('placeholder.startDate')"
    >
      <el-date-picker
        v-model="formData.startDate"
        type="date"
        :placeholder="$t('placeholder.startDate')"
        :picker-options="pickerOptionsHashtagStartDate"
        format="yyyy-MM-dd HH:mm"
        value-format="yyyy-MM-dd HH:mm"
      >
      </el-date-picker>
    </el-form-item>
    <el-form-item
      v-if="formData.type === 2"
      prop="endDate"
      :label="$t('placeholder.endDate')"
    >
      <el-date-picker
        v-model="formData.endDate"
        type="date"
        :placeholder="$t('placeholder.endDate')"
        :picker-options="pickerOptionsHashtagEndDate"
        format="yyyy-MM-dd HH:mm"
        value-format="yyyy-MM-dd HH:mm"
      >
      </el-date-picker>
    </el-form-item>
    <el-form-item
      v-if="formData.type === 3"
      :label="$t('page.settings.collectionList')"
    >
      <el-select
        v-model="formData.hotelCollectionSn"
        :loading="ui.collectionsLoading"
        remote
        filterable
        :remote-method="searchCollection"
        prefix-icon="el-icon-search"
        style="width: 350px"
        :popper-append-to-body="false"
      >
        <el-option
          v-for="(item, index) in hotelCollections"
          :key="index"
          :label="item.title"
          :value="item.sn"
          style="font-size: 13px; color: #4a5d6e;"
          class="hotel__option"
        />
      </el-select>
    </el-form-item>
    <el-form-item
      :label="$t('page.settings.hotel')"
    >
      <el-select
        v-model="formData.targetSn"
        :loading="ui.suggestionsHotelsLoading"
        :placeholder="$t('page.bookingReport.hotel_name')"
        remote
        filterable
        :remote-method="searchSuggestionsHotels"
        prefix-icon="el-icon-search"
        style="width: 350px"
        :popper-append-to-body="false"
        @change="changeSuggestionHotel"
      >
        <el-option
          v-for="(item, index) in suggestionsHotels"
          :key="index"
          :label="item.name"
          :value="JSON.stringify(item)"
          style="font-size: 13px; color: #4a5d6e;"
          class="hotel__option"
        >
          {{ item.name }} <br> {{ item.address }}
        </el-option>
      </el-select>
    </el-form-item>
    <div v-if="formData.type !== 2">
      <el-form-item
        v-for="(hotelOnTopDetails, index) in formData.hotelOnTopDetails"
        :key="index"
        :label="`${$t('page.settings.topHotel')} ${index + 1}`"
        class="form__item"
      >
        <div class="form__item--flex">
          <el-form-item
            :prop="`hotelOnTopDetails[${index}].startDate`"
          >
            <el-date-picker
              v-model="hotelOnTopDetails.startDate"
              type="date"
              :placeholder="$t('placeholder.startDate')"
              :picker-options="pickerOptionsStartDate"
              format="yyyy-MM-dd HH:mm"
              value-format="yyyy-MM-dd HH:mm"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item
            :prop="`hotelOnTopDetails[${index}].endDate`"
          >
            <el-date-picker
              v-model="hotelOnTopDetails.endDate"
              type="date"
              :placeholder="$t('placeholder.endDate')"
              :picker-options="pickerOptionsEndDate"
              format="yyyy-MM-dd HH:mm"
              value-format="yyyy-MM-dd HH:mm"
            >
            </el-date-picker>
          </el-form-item>
          <el-input
            disabled
            v-model="hotelOnTopDetails.hotelName"
            style="width: auto; margin-right: 12px;"
          ></el-input>
          <el-button
            @click="removeTopHotel(index)"
            type="danger"
          >
            {{ $t('button.delete') }}
          </el-button>
        </div>
      </el-form-item>
    </div>
    <el-form-item
      v-if="formData.type === 2"
    >
      <el-table
        :data="formData.hotelOnTopDetails"
      >
        <el-table-column
          prop="hotelName"
          :label="$t('page.settings.hotelName')"
        >
        </el-table-column>
        <el-table-column
          prop="address"
          :label="$t('page.settings.address')"
        >
        </el-table-column>
        <el-table-column
          :label="$t('page.settings.operations')"
        >
          <el-button
            @click="formData.hotelOnTopDetails.splice(index, 1)"
            type="danger"
          >
            {{ $t('button.delete') }}
          </el-button>
        </el-table-column>
      </el-table>
    </el-form-item>
    <el-form-item
      style="text-align: right;"
    >
      <el-button
        type="info"
        @click="$router.go(-1)"
      >
        {{ $t('button.back') }}
      </el-button>
      <el-button
        type="success"
        @click="submitForm"
      >
        {{ page === 'edit' ? $t('button.update') : $t('button.create') }}
      </el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import { debounce } from '@/utils/helpers'
import { fetchSuggestionsHotels } from '@/api/hotels'
import { fetchProvinces, fetchDistricts } from '@/api/province'
import { fetchHashtags } from '@/api/hashtag'
import { addHotelOnTop } from '../create/api'
import { fetchHotelOnTopDetails, fetchHotelCollections, updateHotelOntop } from '../edit/api'
const timeDebounce = 500
export default {
  name: 'HotelOnTopForm',
  props: {
    page: {
      type: String,
      default: 'create'
    }
  },
  data: (vm) => {
    return {
      pickerOptionsEndDate: {
        disabledDate (time) {
          return time.getTime() < Date.now() - 8.64e7
        }
      },
      pickerOptionsHashtagStartDate: {
        disabledDate (time) {
          return time.getTime() < Date.now() - 8.64e7
        }
      },
      pickerOptionsHashtagEndDate: {
        disabledDate: vm.isDisableHashtagEndDate
      },
      pickerOptionsStartDate: {
        disabledDate (time) {
          return time.getTime() < Date.now() - 8.64e7
        }
      },
      rules: vm.setRules,
      ui: {
        suggestionsHotelsLoading: false,
        districtsLoading: false,
        provincesLoading: false,
        loadingDetails: false,
        collectionsLoading: false,
        typeTopOptions: [
          {
            label: vm.$t('page.settings.hotelOnTopByDistrict'),
            value: 1
          },
          {
            label: vm.$t('page.settings.hotelOnTopByDashtag'),
            value: 2
          },
          {
            label: vm.$t('page.settings.hotelOnTopByCollection'),
            value: 3
          }
        ]
      },
      suggestionHashtags: [],
      suggestionsHotels: [],
      hotelCollections: [],
      formData: {
        provinceSn: '',
        districtSn: '',
        type: 1,
        hotelOnTopDetails: [],
        endDate: '',
        startDate: '',
        hashtagSn: ''
      },
      districts: [{ name: vm.$t('page.settings.all'), sn: '' }],
      provinces: [{ name: vm.$t('page.settings.all'), sn: '' }]
    }
  },
  computed: {
    setRules () {
      // const lengthTopHotel = this.formData.hotelOnTopDetails.length
      const rules = {
        title: [
          { required: true, message: this.$t('page.settings.requireTitle'), trigger: 'blur' }
        ],
        hashtagSn: [
          { required: true, message: this.$t('page.settings.requireHashtag'), trigger: 'blur' }
        ],
        startDate: [
          { required: true, message: this.$t('page.settings.requireStartDate'), trigger: 'blur' }
        ],
        endDate: [
          { required: true, message: this.$t('page.settings.requireEndDate'), trigger: 'blur' }
        ]
      }
      if (this.formData.hotelOnTopDetails.length > 0) {
        for (let i = 0; i < this.formData.hotelOnTopDetails.length; i++) {
          rules[`hotelOnTopDetails[${i}].startDate`] = [
            { required: true, message: this.$t('page.settings.requireStartDate'), trigger: 'blur' }
          ]
          rules[`hotelOnTopDetails[${i}].endDate`] = [
            { required: true, message: this.$t('page.settings.requireEndDate'), trigger: 'blur' }
          ]
        }
      }
      return rules
    }
  },
  created () {
    this.fetchProvinces()
    if (this.page === 'edit') {
      this.fetchHotelOnTopDetails()
    }
  },
  methods: {
    // fetch data
    searchCollection: debounce(function (keySearch) {
      this.fetchHotelCollections({
        limit: 10,
        keyword: keySearch
      })
    }, timeDebounce),
    searchSuggestionsHotels: debounce(function (keySearch) {
      this.fetchSuggestionsHotels({
        limit: 10,
        justHotel: 1,
        provinceSn: this.formData.provinceSn,
        districtSn: this.formData.districtSn,
        keyword: keySearch
      })
    }, timeDebounce),
    searchSuggestionHashtag: debounce(function (keySearch) {
      this.fetchHashtags({
        limit: 10,
        keyword: keySearch
      })
    }, timeDebounce),
    async fetchHotelCollections (params) {
      this.ui.collectionsLoading = true
      try {
        const { data } = await fetchHotelCollections(params)
        this.hotelCollections = data.data
      } catch (error) {
        return false
      } finally {
        this.ui.collectionsLoading = false
      }
    },
    async fetchHashtags (params) {
      try {
        this.ui.hashtagLoading = true
        const { data } = await fetchHashtags(params)
        this.suggestionHashtags = data.data.hashtag
      } catch (error) {
        return false
      } finally {
        this.ui.hashtagLoading = false
      }
    },
    async fetchSuggestionsHotels (params) {
      this.ui.suggestionsHotelsLoading = true
      try {
        const { data } = await fetchSuggestionsHotels(params)
        this.suggestionsHotels = data.data.hotels
      } catch (error) {
        return false
      } finally {
        this.ui.suggestionsHotelsLoading = false
      }
    },
    async fetchDistricts () {
      try {
        this.ui.districtsLoading = true
        const { data } = await fetchDistricts({ limit: 100, provinceSn: this.formData.provinceSn })
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
    async fetchHotelOnTopDetails () {
      this.ui.loadingDetails = true
      try {
        const { data } = await fetchHotelOnTopDetails(this.$route.params.sn)
        this.formData = data.data
        if (data.data.type === 3) {
          this.fetchHotelCollections({ hotelCollectionSn: data.data.hotelCollectionSn })
        } else if (data.data.type === 1) {
          this.fetchDistricts()
        } else if (data.data.type === 2) {
          this.fetchHashtags({ keyword: this.formData.hashtagName })
          this.formData.hashtagSn = data.data.hashtag
        }
      } catch (error) {
        return false
      } finally {
        this.ui.loadingDetails = false
      }
    },
    removeTopHotel (index) {
      this.formData.hotelOnTopDetails.splice(index, 1)
    },
    changeSuggestionHotel (value) {
      const data = JSON.parse(value)
      if (this.formData.type === 2) {
        if (this.formData.hotelOnTopDetails.length < 5 && data) {
          this.formData.hotelOnTopDetails.push({
            hotelName: data.name,
            address: data.address,
            hotelSn: data.sn,
            startDate: '',
            endDate: ''
          })
        }
      } else if (this.formData.type === 3) {
        if (this.formData.hotelOnTopDetails.length < 10) {
          this.formData.hotelOnTopDetails.push({
            startDate: '',
            endDate: '',
            hotelSn: data.sn,
            hotelName: data.name
          })
        }
      } else {
        if (this.formData.hotelOnTopDetails.length < 5) {
          this.formData.hotelOnTopDetails.push({
            startDate: '',
            endDate: '',
            hotelSn: data.sn,
            hotelName: data.name
          })
        }
      }
    },
    isDisableHashtagEndDate (time) {
      if (!this.formData.startDate) {
        return time < (Date.now() - 8.64e7)
      }
      return time <= new Date(this.formData.startDate).getTime()
    },
    submitForm () {
      this.$refs.secondSplashForm.validate(async (valid) => {
        if (!valid) {
          return false
        }
        try {
          if (this.formData.type === 2) {
            this.formData.startDate = this.formatDate(this.formData.startDate)
            this.formData.endDate = this.formatDate(this.formData.endDate)
          }
          this.formData.hotelOnTopDetails.map(item => {
            item.startDate = this.formatDate(item.startDate, true)
            item.endDate = this.formatDate(item.endDate, true)
          })
          this.page === 'edit'
            ? await updateHotelOntop(this.$route.params.sn, this.formData)
            : await addHotelOnTop(this.formData)
          const message = this.$t('message.updateSuccess')
          this.$router.push({ name: 'hotelOnTop' })
          this.$message({
            type: 'success',
            message: message
          })
        } catch (error) {
          return false
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.form {
  ::v-deep
  .el-form-item__label {
    text-align: left;
  }
  .hotel__option {
    height: auto;
  }
  &__item {
    &--flex {
      display: flex;
      align-items: center;
      .el-date-editor, .el-input {
        margin-right: 12px;
      }
    }
  }
}
</style>
