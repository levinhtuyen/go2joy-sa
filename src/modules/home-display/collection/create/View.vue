<template>
  <sa-section class="collection-edit">
    <el-form
      ref="formConllectionDetails"
      v-loading="ui.loading"
      :model="formData"
      :rules="rules"
      label-position="left"
      label-width="12%"
      class="collection-edit__form"
      hide-required-asterisk
    >
      <el-form-item
        :label="$t('page.collection.title')"
        prop="title"
      >
        <ElInput :placeholder="$t('page.collection.title1')" v-model="formData.title" />
      </el-form-item>
      <el-form-item
        :label="$t('page.collection.description')"
      >
        <ElInput :placeholder="$t('page.collection.description')" v-model="formData.description" />
      </el-form-item>
      <el-form-item
        :label="$t('page.collection.display')"
        class="is-required is-no-asterisk"
      >
        <div class="collection-edit--flex">
          <ElCheckbox
            v-model="formData.display"
            border
            style="margin-right: 100px;"
          />
          <el-form-item
            prop="displayType"
          >
            <el-select
              v-model="formData.displayType"
              style="margin-right: 100px;"
            >
              <ElOption
                v-for="(item, index) in displayTypeOptions"
                :key="index"
                :value="item.value"
                :label="item.label"
              />
            </el-select>
          </el-form-item>
          <el-form-item
            v-if="formData.displayType === 9"
            :prop="formData.displayType === 9 ? 'displayCategory' : ''"
          >
            <el-select
              v-if="formData.displayType === 9"
              v-model="formData.displayCategory"
              class="browser-default custom-select"
              :placeholder="$t('page.collection.go2jSpecial')"
            >
              <ElOption
                v-for="(item, index) in iconOptions"
                :key="index"
                :value="item.value"
                :label="item.label"
              />
            </el-select>
          </el-form-item>
        </div>
      </el-form-item>
      <el-form-item
        v-if="formData.displayType === 2 || formData.displayType === 4 || formData.displayType === 9"
        :label="$t(`page.collection.${formData.displayType == 9 ? 'icon' : 'image'}`)"
      >
        <div
          class="collection-edit__image"
        >
          <img
            v-if="formData.srcImage"
            :src="formData.srcImage"
          />
        </div>
        <upload-file
          accept="image/png, image/jpeg"
          @change="handleFileUpload"
        >
          {{ $t('button.chooseFile') }}
        </upload-file>
      </el-form-item>
      <el-form-item
        :label="$t('page.collection.hotelList')"
        prop="displayRadio"
      >
        <el-radio-group
          v-model="formData.displayRadio"
        >
          <ElRadio
            v-for="(item, index) in ui.checkBoxDisplays"
            :key="index"
            :label="item"
            class="radio-item"
          >
            {{$t(`page.collection.${item}`)}}
          </ElRadio>
          <el-radio
            v-if="formData.displayType == 1 || formData.displayType == 2"
            label="promotionSuggestion"
            style="width:170px">
            {{$t('page.collection.promotionSuggestion')}}
          </el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item
        v-if="formData.displayRadio === 'promotionSuggestion'"
        :label="$t('page.collection.promotionGroup')"
      >
        <el-select
          v-model="formData.targetSn"
          v-loading="ui.loadingPromotion"
          element-loading-spinner="el-icon-loading"
          remote
          filterable
          :remote-method="searchRemotePromotions"
          style="min-width: 350px;"
        >
          <ElOption
            v-for="(item, index) in listPromotionGroups"
            :key="index"
            :label="item.title"
            :value="item.sn"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        v-if="formData.displayRadio === 'promotionSuggestion'"
        :label="$t('page.collection.chooseProvince')"
      >
        <el-select
          v-model="formData.displayProvince"
          v-loading="ui.loadingProvinces"
          element-loading-spinner="el-icon-loading"
          style="min-width: 350px;"
        >
          <ElOption
            v-for="(item, index) in listProvinces"
            :key="index"
            :label="item.name"
            :value="item.sn"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        label="Slug"
      >
        <el-input
          v-model="formData.slug"
          placeholder="Slug"
        >
        </el-input>
      </el-form-item>
      <el-form-item style="text-align: right;">
        <el-button type="info" size="large" @click="$router.go(-1)">
          {{$t('button.back')}}
        </el-button>
        <el-button type="success" size="large" @click="handleCreateCollection">
          <i class="feather icon-save mr-2" />
           {{$t('button.create')}}
        </el-button>
      </el-form-item>
    </el-form>
  </sa-section>
</template>
<script>
import { addCollection } from './api'
import { fetchPromotionGroups } from '@/api/promotion'
import { fetchProvinces } from '@/api/province'
import { debounce } from '@/utils/helpers'
import UploadFile from '@/components/globals/UploadFile'
import SaSection from '@/components/globals/SaSection.vue'
// declare const
const timeDebounce = 500
export default {
  name: 'CollectionCreate',
  components: {
    UploadFile,
    SaSection
  },
  data: (vm) => {
    return {
      // data fetch APIs.
      listProvinces: [],
      listPromotionGroups: [],
      // form input
      formData: {
        displayRadio: '',
        srcImage: '',
        title: '',
        displayType: '',
        display: '',
        flashSale: '',
        promotion: '',
        directDiscount: '',
        amenityPackHotel: '',
        loveHotel: '',
        travelHotel: '',
        hotHotel: '',
        newHotel: '',
        stamp: '',
        image36: '',
        hotelReview: '',
        hotelSearched: '',
        hotelBooked: '',
        hotelFavorite: '',
        hotelSuggestion: '',
        promotionSuggestion: '',
        g2jCertified: '',
        quarantine: '',
        displayProvince: '',
        image: '',
        displayCategory: '',
        status: ''
      },
      rules: {
        title: [
          { required: true, message: vm.$t('page.collection.requiredTitle'), trigger: 'blur' }
        ],
        displayType: [
          { required: true, message: vm.$t('page.collection.requiredDisplayType'), trigger: 'change' }
        ],
        displayCategory: [
          { required: true, message: vm.$t('page.collection.requiredDisplayCategory'), trigger: 'change' }
        ],
        displayRadio: [
          { required: true, message: vm.$t('page.collection.requiredHotelList'), trigger: ['change', 'blur'] }
        ]
      },
      ui: {
        // name item have to same with data from API collectionDetails
        checkBoxDisplays: [
          'flashSale',
          'promotion',
          'directDiscount',
          'amenityPackHotel',
          'loveHotel',
          'travelHotel',
          'hotHotel',
          'newHotel',
          'stamp',
          'image360',
          'hotelReview',
          'hotSearched',
          'hotelBooked',
          'hotelFavorite',
          'g2jCertified',
          'hotelSuggestion',
          'quarantine'
        ],
        loadingPromotion: false,
        loadingProvinces: false,
        loading: false
      }
    }
  },
  computed: {
    // translate language before v-bind to element-ui
    displayTypeOptions () {
      return [{
        label: this.$t('page.collection.detail'),
        value: 1
      },
      {
        label: this.$t('page.collection.summary'),
        value: 2
      },
      {
        label: this.$t('page.collection.collection'),
        value: 3
      },
      {
        label: this.$t('page.collection.circle'),
        value: 4
      },
      {
        label: this.$t('page.collection.lightSquare'),
        value: 5
      },
      {
        label: this.$t('page.collection.darkSquare'),
        value: 6
      },
      {
        label: this.$t('page.collection.rectangle1'),
        value: 7
      },
      {
        label: this.$t('page.collection.rectangle2'),
        value: 8
      },
      {
        label: this.$t('page.collection.icon'),
        value: 9
      }]
    },
    iconOptions () {
      return [{
        label: this.$t('page.collection.location'),
        value: 1
      },
      {
        label: this.$t('page.collection.bookingType'),
        value: 2
      },
      {
        label: this.$t('page.collection.go2jSpecial'),
        value: 3
      },
      {
        label: this.$t('page.collection.hotelType'),
        value: 4
      }]
    }
  },
  watch: {
    // Example: selected = hotHotel and user change to hotelBooked => oldValue = 'hotelBooked' and newValue = 'hotelBooked'
    'formData.displayRadio': function (newValue, oldValue) {
      if (oldValue) {
        // this.collectionDetails.hotHotel = 0
        this.formData[oldValue] = 0
      }
      // this.formData.hotelBooked = 1x`
      this.formData[newValue] = 1
      // user select promotionSuggestion and not fetch (fetchProvinces + fetchPromotionGroups) yet.
      if (this.listProvinces.length === 0 && newValue === 'promotionSuggestion') {
        this.fetchProvinces()
      }
      if (this.listPromotionGroups.length === 0 && newValue === 'promotionSuggestion') {
        this.fetchPromotionGroups({ limit: 100, keyword: '' })
      }
    }
  },
  methods: {
    handleFileUpload (file) {
      this.formData.image = file
      this.formData.srcImage = URL.createObjectURL(file)
    },
    // debounce
    searchRemotePromotions: debounce(function (keySearch) {
      this.fetchPromotionGroups({
        limit: 100,
        keyword: keySearch
      })
    }, timeDebounce),
    // fetch APIs
    async fetchProvinces () {
      this.ui.loadingProvinces = true
      try {
        this.listProvinces = [{ name: this.$t('page.collection.all'), sn: -1 }]
        const params = { limit: 100, status: 1 }
        const { data } = await fetchProvinces(params)
        this.listProvinces = [...this.listProvinces, ...data.data.provinces]
      } catch (error) {
        return false
      } finally {
        this.ui.loadingProvinces = false
      }
    },
    async fetchPromotionGroups (params) {
      this.ui.loadingPromotion = true
      try {
        const { data } = await fetchPromotionGroups(params)
        this.listPromotionGroups = data.data.promotionGroups
      } catch (error) {
        return false
      } finally {
        this.ui.loadingPromotion = false
      }
    },
    // submit form
    handleCreateCollection () {
      this.$refs.formConllectionDetails.validate(async (valid) => {
        if (!valid) {
          return false
        }
        this.formData.status = 1
        if (!this.formData.targetSn) {
          delete this.formData.targetSn
        }
        try {
        // append from object to FormData()
          const formData = Object.keys(this.formData).reduce((formData, key) => {
            if (key === 'display') {
              formData.append(key, this.formData[key] === true ? 1 : 0)
            } else {
              formData.append(key, this.formData[key])
            }
            return formData
          }, new FormData())
          await addCollection(formData)
          const message = this.$t('page.collection.editSuccess')
          this.$message({
            type: 'success',
            message: message
          })
          this.$router.push({ name: 'collection' })
        } catch (error) {
          return false
        }
      })
    },
    // set selected for radio
    setRadioValue () {
      let result = ''
      if (this.formData) {
        if (this.formData.promotionSuggestion === 1) {
          return 'promotionSuggestion'
        }
        this.ui.checkBoxDisplays.forEach(element => {
          if (this.formData[element] === 1) {
            result = element
          }
        })
      }
      return result
    }
  }
}
</script>
<style lang="scss" scoped>
.collection-edit {
  padding: 30px;
  &__form{
    .el-form-item {
      margin-bottom: 32px;
    }
  }
  &__image {
    width: 200px;
    border: 1px solid rgba(0,0,0,.125);
    min-height: 100px;
    margin-bottom: 16px;
    display: inline-table;
    img {
      max-width: 200px;
      display: inline;
      max-height: 200px;
      object-fit: scale-down;
      vertical-align: middle;
      border-style: none;
    }
  }
  &--flex {
    display: flex;
    align-items: flex-start;
  }
  .radio-item {
    width: 150px;
    height: 40px;
    display: inline-flex;
    align-items: center;
  }
}
</style>
