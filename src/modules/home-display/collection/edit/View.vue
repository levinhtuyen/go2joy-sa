<template>
  <sa-section class="collection-edit">
    <el-form
      ref="formConllectionDetails"
      v-loading="ui.loading"
      :model="collectionDetails"
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
        <ElInput placeholder="Title 1" v-model="collectionDetails.title" />
      </el-form-item>
       <el-form-item
        :label="$t('page.collection.description')"
      >
        <ElInput :placeholder="$t('page.collection.description')" v-model="collectionDetails.description" />
      </el-form-item>
      <el-form-item :label="$t('page.collection.display')">
        <div class="collection-edit--flex">
          <ElCheckbox
            v-model="collectionDetails.display"
            border
            style="margin-right: 100px;"
          />
          <el-form-item
            prop="displayType"
          >
            <el-select
              v-model="collectionDetails.displayType"
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
          <el-select
            v-if="collectionDetails.displayType == 9"
            v-model="collectionDetails.displayCategory"
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
        </div>
      </el-form-item>
      <el-form-item
        v-if="collectionDetails.displayType === 2 || collectionDetails.displayType === 4 || collectionDetails.displayType === 9"
        :label="$t(`page.collection.${collectionDetails.displayType == 9 ? 'icon' : 'image'}`)"
      >
        <div
          class="collection-edit__image"
        >
          <img
            v-if="collectionDetails.imagePath && !formData.srcImage"
            :src="formatImage(collectionDetails.imagePath)"
          />
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
      <el-form-item :label="$t('page.collection.hotelList')">
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
            v-if="collectionDetails.displayType == 1 || collectionDetails.displayType == 2"
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
          v-model="collectionDetails.targetSn"
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
          v-model="collectionDetails.displayProvince"
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
          v-model="collectionDetails.slug"
          placeholder="Slug"
        >
        </el-input>
      </el-form-item>
      <el-form-item
        label="Full link"
      >
        <div class="full-link">
          <el-popover
            placement="bottom"
            trigger="hover"
            :content="contentCopy"
            width="50"
            height="50"
            @after-leave="hidePopoverCopy"
            :append-to-body="false"
            class="full-link__popover"
          >
            <el-button
              plain
              icon="el-icon-document-copy"
              class="full-link__copy"
              @click="handleCopyLink"
              slot="reference"
            >
            </el-button>
          </el-popover>
          <el-input
            v-model="fullLink"
            class="full-link__input"
            disabled
          >
          </el-input>
          <el-button
            type="primary"
            @click="getFullLink"
            class="full-link__get"
          >
            {{ $t('page.collection.getLink') }}
          </el-button>
        </div>
      </el-form-item>
      <el-form-item style="text-align: right;">
        <el-button type="info" size="large" @click="$router.go(-1)">
          {{$t('button.back')}}
        </el-button>
        <el-button type="success" size="large" @click="handleEditCollection">
          <i class="feather icon-save mr-2" />
           {{$t('button.edit')}}
        </el-button>
      </el-form-item>
    </el-form>
  </sa-section>
</template>
<script>
import { getCollectionDetails, updateCollectionDetails } from './api'
import { fetchPromotionGroups } from '@/api/promotion'
import { fetchProvinces } from '@/api/province'
import { debounce } from '@/utils/helpers'
import UploadFile from '@/components/globals/UploadFile'
import SaSection from '@/components/globals/SaSection.vue'
// declare const
const timeDebounce = 500
export default {
  name: 'CollectionEdit',
  components: {
    UploadFile,
    SaSection
  },
  data: (vm) => {
    return {
      // data fetch APIs.
      collectionDetails: {},
      listProvinces: [],
      listPromotionGroups: [],
      // form input
      formData: {
        displayRadio: '',
        srcImage: ''
      },
      rules: {
        title: [
          { required: true, message: vm.$t('page.collection.requiredTitle'), trigger: 'blur' }
        ],
        displayType: [
          { required: true, message: vm.$t('page.collection.requiredDisplayType'), trigger: 'change' }
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
      },
      contentCopy: vm.$t('page.collection.copy'),
      fullLink: ''
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
        value: 3
      },
      {
        label: this.$t('page.collection.collection'),
        value: 2
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
  async created () {
    await this.getCollectionDetails()
  },
  watch: {
    // Example: selected = hotHotel and user change to hotelBooked => oldValue = 'hotelBooked' and newValue = 'hotelBooked'
    'formData.displayRadio': function (newValue, oldValue) {
      if (oldValue) {
        // this.collectionDetails.hotHotel = 0
        this.collectionDetails[oldValue] = 0
      }
      // this.collectionDetails.hotelBooked = 1x`
      this.collectionDetails[newValue] = 1
      // user select promotionSuggestion and not fetch (fetchProvinces + fetchPromotionGroups) yet.
      // if olValue null => get data from API(user not change).
      if (this.listProvinces.length === 0 && oldValue && newValue === 'promotionSuggestion') {
        this.fetchProvinces()
      }
      if (this.listPromotionGroups.length === 0 && oldValue && newValue === 'promotionSuggestion') {
        this.fetchPromotionGroups({ limit: 100 })
      }
    }
  },
  methods: {
    handleFileUpload (file) {
      this.collectionDetails.image = file
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
    async getCollectionDetails () {
      this.ui.loading = true
      try {
        const { data } = await getCollectionDetails(this.$route.params.sn)
        this.collectionDetails = { ...data.data[0] }
        this.collectionDetails.display = this.collectionDetails.display === 1
        this.formData.displayRadio = this.setRadioValue()
        if (!this.collectionDetails.description) {
          this.collectionDetails.description = ''
        }
        if (this.collectionDetails.promotionSuggestion === 1) {
          this.fetchProvinces()
          this.fetchPromotionGroups({ limit: 100 })
        }
        if (!this.collectionDetails.displayCategory) {
          this.collectionDetails.displayCategory = 3
        }
      } catch (error) {
        return false
      } finally {
        this.ui.loading = false
      }
    },
    // submit form
    handleEditCollection () {
      this.$refs.formConllectionDetails.validate(async (valid) => {
        if (!valid) {
          return false
        }
        this.collectionDetails.status = 1
        if (!this.collectionDetails.targetSn) {
          delete this.collectionDetails.targetSn
        }
        try {
        // append from object to FormData()
          const formData = Object.keys(this.collectionDetails).reduce((formData, key) => {
            if (key === 'display') {
              formData.append(key, this.collectionDetails[key] === true ? 1 : 0)
            } else {
              formData.append(key, this.collectionDetails[key])
            }
            return formData
          }, new FormData())
          await updateCollectionDetails(formData)
          const message = this.$t('page.collection.editSuccess')
          this.$message({
            type: 'success',
            message: message
          })
          if (this.formData.displayRadio === 'hotelSuggestion') {
            this.$router.push({ name: 'selectApplyHotel', params: { sn: this.collectionDetails.sn } })
          } else {
            this.$router.push({ name: 'collection' })
          }
        } catch (error) {
          return false
        }
      })
    },
    getFullLink () {
      if (this.collectionDetails.slug) {
        this.fullLink = `${process.env.VUE_APP_HOST_WEB_BOOKING}/hotellist/${this.collectionDetails.slug}-1003${this.collectionDetails.sn}`
      } else {
        this.fullLink = `${process.env.VUE_APP_HOST_WEB_BOOKING}/hotellist/1003${this.collectionDetails.sn}`
      }
    },
    hidePopoverCopy () {
      this.contentCopy = this.$t('page.collection.copy')
    },
    handleCopyLink () {
      navigator.clipboard.writeText(this.fullLink)
      this.contentCopy = this.$t('page.collection.copied')
    },
    // set selected for radio
    setRadioValue () {
      let result = ''
      if (this.collectionDetails) {
        if (this.collectionDetails.promotionSuggestion === 1) {
          return 'promotionSuggestion'
        }
        this.ui.checkBoxDisplays.forEach(element => {
          if (this.collectionDetails[element] === 1) {
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
  .full-link {
    display: flex;
    align-items: center;
    &__copy {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }
    &__input {
      ::v-deep .el-input__inner {
        border-radius: 0;
        border-right: none;
        border-left: none;
      }
    }
    &__get {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
    ::v-deep .el-popover {
      justify-content: center;
      width: auto !important;
      display: flex;
      align-items: center;
      padding: 0 16px;
      min-width: 50px !important;
    }
  }
}
</style>
