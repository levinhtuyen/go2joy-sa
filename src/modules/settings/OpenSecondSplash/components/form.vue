<template>
  <el-form
    label-width="250px"
    :model="formData"
    :rules="rules"
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
      ></el-input>
    </el-form-item>
    <el-form-item
      :label="$t('page.settings.location')"
    >
      <el-select
        v-model="formData.provinceSn"
        @change="changeProvinceLoaction"
        style="margin-right: 16px;"
      >
        <ElOption
          v-for="(province, index) in provinces"
          :key="index"
          :label="province.name"
          :value="province.sn"
        />
      </el-select>
      <el-select
        v-model="formData.districtSn"
        :disabled="ui.districtsLoading"
        :class="{ 'select-loading': ui.districtsLoading }"
         @change="changeDistrictLocation"
      >
        <ElOption
          v-for="(district, index) in districts"
          :key="index"
          :label="district.name"
          :value="district.sn"
        />
      </el-select>
    </el-form-item>
    <el-form-item
      prop="targetType"
      :label="$t('page.settings.link_item')"
    >
      <div style="display: flex; align-items: center;">
        <el-select
          v-model="formData.targetType"
          @change="changeTargetType"
          style="margin-right: 16px;"
        >
          <ElOption
            v-for="(item, index) in ui.targetTypeOptions"
            :key="index"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-form-item
          prop="targetSn"
        >
          <el-select
            v-model="formData.targetSn"
            v-if="formData.targetType === 1"
          >
            <ElOption
              v-for="(promotion, index) in promotions"
              :key="index"
              :label="promotion.title"
              :value="promotion.sn"
            />
          </el-select>
          <el-select
            v-if="formData.targetType === 2"
            v-model="formData.targetSn"
            :loading="ui.suggestionsHotelsLoading"
            :placeholder="$t('page.bookingReport.hotel_name')"
            remote
            filterable
            :remote-method="searchSuggestionsHotels"
            prefix-icon="el-icon-search"
            clearable
            :popper-append-to-body="false"
          >
            <el-option
              v-for="(item, index) in suggestionsHotels"
              :key="index"
              :label="item.name"
              :value="item.sn"
              style="font-size: 13px; color: #4a5d6e;"
              class="hotel__option"
            >
              {{ item.name }} <br> {{ item.address }}
            </el-option>
          </el-select>
          <el-select
            v-model="formData.targetSn"
            v-if="formData.targetType === 3"
            :loading="ui.noticesLoading"
            remote
            filterable
            :remote-method="searchNotices"
            prefix-icon="el-icon-search"
            :placeholder="$t('page.settings.notice')"
            clearable
          >
            <ElOption
              v-for="(item, index) in notices"
              :key="index"
              :label="item.title"
              :value="item.sn"
              style="font-size: 13px; color: #4a5d6e;"
            />
          </el-select>
        </el-form-item>
        <el-select
          v-if="formData.targetType === 5"
          v-model="linkItemProvinceSelected"
          style="margin-right: 16px;"
          :class="{ 'select-loading': ui.provincesLinkItemLoading }"
          placeholder=""
          :disabled="ui.provincesLinkItemLoading"
          @change="setDistricts"
        >
          <ElOption
            v-for="(item, index) in linkItemProvinces"
            :key="index"
            :label="item.name"
            :value="item.sn"
          />
        </el-select>
        <el-select
          v-if="formData.targetType === 5"
          v-model="formData.targetSn"
          :loading="ui.districtsLoading"
          :class="{ 'select-loading': ui.districtsLinkItemLoading }"
          placeholder=""
          :disabled="ui.districtsLinkItemLoading"
        >
          <ElOption
            v-for="(item, index) in linkItemDistricts"
            :key="index"
            :label="item.name"
            :value="item.sn"
          />
        </el-select>
        <el-form-item
          v-if="formData.targetType === 10"
          prop="targetSn"
        >
          <el-select
            v-model="formData.targetSn"
            :loading="ui.promotionGroupsLoading"
            :placeholder="$t('page.settings.promotion_group')"
            remote
            filterable
            :remote-method="searchPromotionGroups"
            prefix-icon="el-icon-search"
            clearable
          >
            <ElOption
              v-for="(item, index) in promotionGroups"
              :key="index"
              :label="item.title"
              :value="item.sn"
              style="font-size: 13px; color: #4a5d6e;"
            />
          </el-select>
        </el-form-item>
      </div>
    </el-form-item>
    <el-form-item
      prop="startTime"
      :label="$t('page.settings.start_date')"
    >
      <el-date-picker
        v-model="formData.startTime"
        type="datetime"
        format="yyyy-MM-dd HH:mm"
        value-format="yyyy-MM-dd HH:mm"
        :picker-options="pickerOptionsStartDate"
      >
      </el-date-picker>
    </el-form-item>
    <el-form-item
      prop="endTime"
      :label="$t('page.settings.end_date')"
    >
      <el-date-picker
        v-model="formData.endTime"
        type="datetime"
        format="yyyy-MM-dd HH:mm"
        value-format="yyyy-MM-dd HH:mm"
        :picker-options="pickerOptionsEndDate"
      >
      </el-date-picker>
    </el-form-item>
    <el-form-item
      prop="backgroundColor"
      :label="$t('page.settings.background_color')"
    >
      <el-input v-model="formData.backgroundColor"></el-input>
    </el-form-item>
    <el-form-item
      :label="$t('page.settings.display_second_splash')"
    >
      <el-checkbox v-model="formData.display" border></el-checkbox>
    </el-form-item>
    <el-form-item
      :prop="page === 'create' ? 'backgroundImageFile' : ''"
      :label="$t('page.settings.image_background')"
    >
      <div style="display: flex; align-items: center;">
        <div class="form__image">
          <div>
            <img v-if="ui.backgroundSrc" :src="ui.backgroundSrc" alt="background-image">
            <img v-else-if="formData.backgroundImagePath" :src="formatImage(formData.backgroundImagePath)" :alt="formData.backgroundImagePath">
          </div>
          <p class="form__image--cap">1068x600 ({{ $t('page.settings.height') }} x {{ $t('page.settings.width') }})</p>
        </div>
        <upload-file
          accept="image/png, image/jpeg"
          @change="handleUploadBackground"
        >
          {{ $t('button.chooseFile') }}
        </upload-file>
      </div>
    </el-form-item>
    <el-form-item
      :prop="page === 'create' ? 'imageFile' : ''"
      :label="$t('page.settings.image')"
    >
      <div style="display: flex; align-items: center;">
        <div class="form__image">
          <div>
            <img v-if="ui.imageSrc" :src="ui.imageSrc" alt="image">
            <img v-else-if="formData.imagePath" :src="formatImage(formData.imagePath)" :alt="formData.imagePath">
          </div>
          <p class="form__image--cap">800x600 ({{ $t('page.settings.height') }} x {{ $t('page.settings.width') }})</p>
        </div>
        <upload-file
          accept="image/png, image/jpeg"
          @change="handleUploadImage"
        >
          {{ $t('button.chooseFile') }}
        </upload-file>
      </div>
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
import { fetchPromotions, fetchPromotionGroups } from '@/api/promotion'
import { fetchProvinces, fetchDistricts } from '@/api/province'
import { fetchSuggestionsHotels } from '@/api/hotels'
import { getSecondSplashes, updateSecondSplashes, getStartTime } from '../edit/api'
import { fetchNotices } from '@/api/notices'
import { debounce } from '@/utils/helpers'
import UploadFile from '@/components/globals/UploadFile.vue'
import { addSecondSplash } from '../create/api'
const timeDebounce = 500
export default {
  name: 'SecondSplashForm',
  components: {
    UploadFile
  },
  props: {
    page: String
  },
  data: (vm) => {
    var validateTargetSn = (rule, value, callback) => {
      if (value === '') {
        callback(new Error(vm.setRequireTargetSn))
      } else {
        callback()
      }
    }
    return {
      ui: {
        targetTypeOptions: [
          { label: vm.$t('page.settings.promotion_event'), value: 1 },
          { label: vm.$t('page.settings.hotel'), value: 2 },
          { label: vm.$t('page.settings.notice'), value: 3 },
          { label: vm.$t('page.settings.district'), value: 5 },
          { label: vm.$t('page.settings.direct_discount'), value: 8 },
          { label: vm.$t('page.settings.promotion_group'), value: 10 },
          { label: vm.$t('page.settings.amenity_pack'), value: 12 }
        ],
        loadingDetails: false,
        provincesLinkItemLoading: false,
        districtsLinkItemLoading: false,
        districtsLoading: false,
        promotionsLoading: false,
        promotionGroupsLoading: false,
        imageSrc: '',
        backgroundSrc: ''
      },
      linkItemProvinceSelected: '',
      provinces: [{ name: vm.$t('page.settings.all'), sn: '' }],
      promotions: [],
      promotionGroups: [],
      districts: [{ name: vm.$t('page.settings.all'), sn: '' }],
      suggestionsHotels: [],
      linkItemDistricts: [],
      linkItemProvinces: [],
      notices: [],
      rules: {
        title: [
          { required: true, message: 'Please input Title', trigger: 'blur' }
        ],
        provinceSn: [
          { required: true, message: 'Please select Province', trigger: 'change' }
        ],
        targetSn: [
          { validator: validateTargetSn, trigger: ['blur', 'change'] }
        ],
        targetType: [
          { required: true, message: 'please input link item', trigger: 'change' }
        ],
        startTime: [
          { required: true, message: 'please input startTime', trigger: 'change' }
        ],
        endTime: [
          { required: true, message: 'please input endTime', trigger: 'change' }
        ],
        backgroundColor: [
          { required: true, message: 'please input endTime', trigger: 'blur' }
        ],
        imageFile: [
          { required: true, message: 'please input image', trigger: 'change' }
        ],
        backgroundImageFile: [
          { required: true, message: 'please input background image', trigger: 'change' }
        ]
      },
      formData: {
        title: 'Demo',
        targetType: 1,
        provinceSn: '',
        districtSn: '',
        targetSn: '',
        backgroundColor: '',
        backgroundImageFile: '',
        imageFile: '',
        display: false
      },
      pickerOptionsEndDate: {
        disabledDate: vm.isDisabledEndDate
      },
      pickerOptionsStartDate: {
        disabledDate (time) {
          return time.getTime() < Date.now() - 8.64e7
        }
      }
    }
  },
  computed: {
    setRequireTargetSn () {
      switch (this.formData.targetType) {
        case 1:
          return this.$t('page.settings.requiredPromotions')
        case 2:
          return this.$t('page.settings.requiredHotel')
        case 3:
          return this.$t('page.settings.requiredNotice')
        case 10:
          return this.$t('page.settings.requiredPromotionsGroup')
        case 5:
          return this.$t('page.settings.requiredDistrict')
        default:
          return ''
      }
    }
  },
  async created () {
    if (this.page === 'edit') {
      this.getSecondSplashes()
    } else if (this.page === 'create') {
      this.fetchPromotions()
    }
    this.fetchProvinces()
  },
  methods: {
    async getSecondSplashes () {
      this.ui.loadingDetails = true
      try {
        const { data } = await getSecondSplashes(this.$route.params.sn)
        this.formData = data.data
        if (!data.data.provinceSn) {
          this.formData.provinceSn = ''
        }
        if (!data.data.districtSn) {
          this.formData.districtSn = ''
        }
        if (data.data.status === 1 || data.data.status === 2) {
          this.formData.display = true
        } else {
          this.formData.display = false
        }
        switch (data.data.targetType) {
          case 1:
            this.fetchPromotions()
            break
          case 2:
            this.fetchSuggestionsHotels({
              justHotel: 1,
              hotelStatus: 0,
              keyword: data.data.targetName
            })
            break
          case 3:
            this.fetchNotices({ keyword: data.data.targetName })
            break
          case 5:
            this.linkItemProvinceSelected = JSON.parse(data.data.targetInfo).provinceSn
            this.formData.targetSn = JSON.parse(data.data.targetInfo).sn
            this.fetchDistricts('linkItem')
            break
          case 10:
            this.fetchPromotionGroups({ keyword: data.data.targetName })
            break
          default:
            break
        }
        this.fetchDistricts('location')
      } catch (error) {
        return false
      } finally {
        this.ui.loadingDetails = false
      }
    },
    searchPromotionGroups: debounce(function (keySearch) {
      this.fetchPromotionGroups({
        limit: 20,
        keyword: keySearch
      })
    }, timeDebounce),
    searchSuggestionsHotels: debounce(function (keySearch) {
      this.fetchSuggestionsHotels({
        limit: 10,
        justHotel: 1,
        hotelStatus: 0,
        keyword: keySearch
      })
    }, timeDebounce),
    searchNotices: debounce(function (keySearch) {
      this.fetchNotices({
        keyword: keySearch
      })
    }, timeDebounce),
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
    async fetchPromotionGroups (params) {
      this.ui.promotionGroupsLoading = true
      try {
        const { data } = await fetchPromotionGroups(params)
        this.promotionGroups = data.data.promotionGroups
      } catch (error) {
        return false
      } finally {
        this.ui.promotionGroupsLoading = false
      }
    },
    async fetchPromotions () {
      this.ui.promotionsLoading = true
      try {
        const { data } = await fetchPromotions({ limit: 20, keyword: '' })
        this.promotions = data.data.suggestionPromotion
      } catch (error) {
        return false
      } finally {
        this.ui.promotionsLoading = false
      }
    },
    async fetchNotices (params) {
      this.ui.noticesLoading = true
      try {
        const { data } = await fetchNotices(params)
        this.notices = data.data.appNotices
      } catch (error) {
        return false
      } finally {
        this.ui.noticesLoading = false
      }
    },
    async fetchProvinces (action) {
      try {
        const { data } = await fetchProvinces({ limit: 100, status: 1 })
        if (action === 'location') {
          this.provinces = [{ name: this.$t('page.settings.all'), sn: '' }, ...data.data.provinces]
        } else if (action === 'linkItem') {
          this.linkItemProvinces = data.data.provinces
        } else {
          this.provinces = [{ name: this.$t('page.settings.all'), sn: '' }, ...data.data.provinces]
          this.linkItemProvinces = data.data.provinces
        }
      } catch (error) {
        return false
      }
    },
    async fetchDistricts (action) {
      try {
        if (action === 'location') {
          this.ui.districtsLoading = true
          const { data } = await fetchDistricts({ limit: 100, provinceSn: this.formData.provinceSn })
          this.districts = [{ name: this.$t('page.settings.all'), sn: '' }, ...data.data.districts]
          this.ui.districtsLoading = false
        } else if (action === 'linkItem') {
          this.ui.districtsLinkItemLoading = true
          const { data } = await fetchDistricts({ limit: 100, provinceSn: this.linkItemProvinceSelected })
          this.linkItemDistricts = data.data.districts
          this.ui.districtsLinkItemLoading = false
        }
      } catch (error) {
        return false
      }
    },
    async setDistricts () {
      await this.fetchDistricts('linkItem')
      this.formData.targetSn = this.linkItemDistricts[0].sn
    },
    async getStartTime (action) {
      let params = null
      if (action === 'provinces') {
        params = {
          provinceSn: this.formData.provinceSn
        }
      } else if (action === 'districts') {
        params = {
          districtSn: this.formData.districtSn
        }
      }
      try {
        const { data } = await getStartTime(params)
        return data.data.startTime
      } catch (error) {
        return false
      }
    },
    async changeDistrictLocation () {
      const startTime = await this.getStartTime('districts')
      if (!startTime) {
        return false
      }
      this.formData.startTime = new Date(startTime)
    },
    async changeProvinceLoaction () {
      this.formData.districtSn = ''
      this.fetchDistricts('location')
      const startTime = await this.getStartTime('provinces')
      if (!startTime) {
        return false
      }
      this.formData.startTime = new Date(startTime)
    },
    async changeTargetType (val) {
      this.formData.targetSn = ''
      if (val === 1) {
        this.fetchPromotions()
      } else if (val === 2) {
        this.fetchSuggestionsHotels({
          limit: 10,
          justHotel: 1,
          hotelStatus: 0
        })
      } else if (val === 3) {
        this.fetchNotices()
      } else if (val === 5) {
        this.ui.provincesLinkItemLoading = true
        await this.fetchProvinces('linkItem')
        this.ui.provincesLinkItemLoading = false
        this.linkItemProvinceSelected = this.linkItemProvinces[0].sn
        // await this.fetchDistricts('linkItem')
        await this.setDistricts()
      } else if (val === 10) {
        this.fetchPromotionGroups()
      }
    },
    handleUploadBackground (file) {
      this.formData.backgroundImageFile = file
      this.ui.backgroundSrc = URL.createObjectURL(file)
    },
    handleUploadImage (file) {
      this.formData.imageFile = file
      this.ui.imageSrc = URL.createObjectURL(file)
    },
    isDisabledEndDate (time) {
      if (!this.formData.startTime) {
        return time < Date.now()
      }
      return time <= new Date(this.formData.startTime).getTime()
    },
    submitForm () {
      this.$refs.secondSplashForm.validate(async (valid) => {
        if (!valid) {
          return false
        }
        try {
          this.formData.startTime = this.formatDate(this.formData.startTime)
          this.formData.endTime = this.formatDate(this.formData.endTime)
          this.formData.districtSn = this.formData.districtSn ? this.formData.districtSn : ''
          const formData = Object.keys(this.formData).reduce((formData, key) => {
            if (key === 'display') {
              formData.append(key, Number(this.formData[key]))
            } else {
              formData.append(key, this.formData[key])
            }
            return formData
          }, new FormData())
          this.page === 'create'
            ? await addSecondSplash(formData)
            : await updateSecondSplashes(this.$route.params.sn, formData)
          const message = this.$t('message.updateSuccess')
          this.$router.push({ name: 'openSecondSplash' })
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
  .select-loading {
    position: relative;
    &::after {
      content: "";
      background: #F5F7FA;
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      right: 0;
      z-index: 10;
      border: 1px solid #DCDFE6;
      border-radius: 4px;
    }
    &::before {
      content: "\e6cf";
      position: absolute;
      top: 1px;
      left: 8px;
      z-index: 11;
      font-family: element-icons!important;
      animation: rotating 2s linear infinite;
    }
  }
  &__image {
    div {
      border: 1px solid #ccc;
      width: 200px;
      height: 100px;
      display: flex;
      align-items: center;
      margin-right: 80px;
       img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }
    &--cap {
      font-size: 12px;
      color: #8A98AC;
    }

  }
}
</style>
