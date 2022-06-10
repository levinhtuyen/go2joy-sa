<template>
    <div class="create-room-type">
      <sa-section>
        <el-row>
            <el-col :span="4">
              <p class="require">
                {{ $t("page.createRoomType.hotel_name") }}
              </p>
            </el-col>
            <el-col :span="20">
              <el-select
                v-model="sn"
                element-loading-spinner="el-icon-loading"
                :placeholder="$t('page.collection.hotelSuggestion')"
                remote
                filterable
                :remote-method="reloadFilterData"
                style="min-width: 250px; margin-right: 12px"
                prefix-icon="el-icon-search"
                clearable
              >
                <el-option
                  v-for="(item, index) in hotels"
                  :key="index"
                  :label="`${item.name}`"
                  :value="item.sn"
                  style="font-size: 13px; color: #4a5d6e;"
                />
              </el-select>
            </el-col>
        </el-row>  <!-- hotel name -->
        <el-row>
            <el-col :span="4">
              <p class="require">
                {{ $t("page.createRoomType.name_short_name") }}
              </p>
            </el-col>
            <el-col :span="16">
              <el-input
                :placeholder="$t('page.createRoomType.name_short_name')"
                type="text"
                v-model="dataRoomType.name"
              />
            </el-col>
            <el-col :span="4">
              <el-input
                :placeholder="$t('page.createRoomType.short_name')"
                type="text"
                v-model="dataRoomType.shortName"
              />
            </el-col>
        </el-row> <!-- name -->
        <el-row>
          <el-col :span="4">
            <p class="require">
              {{ $t("page.createRoomType.num_of_room") }}
            </p>
          </el-col>
          <el-col :span="4">
            <el-input
              :placeholder="$t('page.createRoomType.num_of_room')"
              name="numOfRoomHotel"
              type="text"
              v-model="dataRoomType.numOfRoomHotel"
            />
          </el-col>
        </el-row> <!-- num of room -->
        <el-row>
          <el-col :span="4">
            <p class="require">
              {{ $t("page.createRoomType.room_type") }}
            </p>
          </el-col>
          <el-col :span="20">
            <el-select
              v-model="dataRoomType.mode"
              element-loading-spinner="el-icon-loading"
              :placeholder="$t('page.collection.hotelSuggestion')"
              remote
              style="min-width: 250px; margin-right: 12px"
              prefix-icon="el-icon-search"
              clearable
            >
              <el-option
                v-for="(item, index) in selectRoomType"
                :key="index"
                :label="`${$t(item.key)}`"
                :value="item.value"
                style="font-size: 13px; color: #4a5d6e;"
              />
            </el-select>
          </el-col>
        </el-row> <!-- room type -->
        <el-row>
          <el-col :span="4">
            <p class="require">
              {{ $t("page.createRoomType.first_hours_price") }}
            </p>
          </el-col>
          <el-col :span="2">
            <p>
              {{ $t("page.createRoomType.first_hours_price") }}
            </p>
          </el-col>
          <el-col :span="4">
            <el-select
              v-model="dataRoomType.firstHours"
              element-loading-spinner="el-icon-loading"
              :placeholder="$t('page.collection.hotelSuggestion')"
              remote
              style="min-width: 250px; margin-right: 12px"
              prefix-icon="el-icon-search"
              clearable
            >
              <el-option
                v-for="(item, index) in selectNumHour"
                :key="index"
                :label="`${item.name}`"
                :value="item.value"
                style="font-size: 13px; color: #4a5d6e;"
              />
            </el-select>
          </el-col>
          <el-col :span="2">
            <p>
              {{ $t("page.createRoomType.price") }}
            </p>
          </el-col>
          <el-col :span="4">
            <el-input
              type="text"
              v-model="dataRoomType.firstHoursOrigin"
              @change="onInputPrice('first')"
            />
          </el-col>
          <el-col :span="2">
            <p>
              {{ $t("page.createRoomType.max_num_hour") }}
            </p>
          </el-col>
          <el-col :span="3">
            <el-input type="text" v-model="dataRoomType.maxNumHour" />
          </el-col>
          <el-col :span="1">
            <p><strong>h</strong></p>
          </el-col>
        </el-row> <!-- first hour price -->
        <el-row>
          <el-col :span="4">
            <p class="require">
              {{ $t("page.createRoomType.plus_hours_price") }}
            </p>
          </el-col>
          <el-col :span="2">
            <p>
              {{ $t("page.createRoomType.num_of_hours") }}
            </p>
          </el-col>
          <el-col :span="4">
            <el-select
              v-model="dataRoomType.additionalHours"
              element-loading-spinner="el-icon-loading"
              :placeholder="$t('page.collection.hotelSuggestion')"
              remote
              style="min-width: 250px; margin-right: 12px"
              prefix-icon="el-icon-search"
              clearable
            >
              <el-option
                v-for="(item, index) in selectNumHour"
                :key="index"
                :label="`${item.name}`"
                :value="item.value"
                style="font-size: 13px; color: #4a5d6e;"
              />
            </el-select>
          </el-col>
          <el-col :span="2">
            <p>
              {{ $t("page.createRoomType.price") }}
            </p>
          </el-col>
          <el-col :span="4">
            <el-input
              type="text"
              v-model="dataRoomType.additionalOrigin"
              @change="onInputPrice('plus')"
            />
          </el-col>
        </el-row> <!-- plus hour price -->
        <el-row>
          <el-col :span="4">
            <p class="require">
              {{ $t("page.createRoomType.overnight_price") }}
            </p>
          </el-col>
          <el-col :span="4">
            <el-input
              :placeholder="$t('page.createRoomType.overnight_price')"
              type="text"
              v-model="dataRoomType.overnightOrigin"
              @change="onInputPrice('overnight')"
            />
          </el-col>
        </el-row> <!-- overnight price -->
        <el-row>
          <el-col :span="4">
            <p class="require">
              {{ $t("page.createRoomType.one_day_price") }}
            </p>
          </el-col>
          <el-col :span="4">
            <el-input
              :placeholder="$t('page.createRoomType.one_day_price')"
              type="text"
              v-model="dataRoomType.oneDayOrigin"
              @change="onInputPrice('oneDay')"
            />
          </el-col>
        </el-row> <!-- one day price -->
        <el-row>
          <el-col :span="4">
            <p class="require">
              {{ $t("page.createRoomType.square_bed_type_view") }}
            </p>
          </el-col>
          <el-col :span="4">
            <el-input
              :placeholder="$t('page.createRoomType.square_bed_type_view')"
              type="text"
              v-model="dataRoomType.square"
              @change="onInputPrice('square')"
            />
          </el-col>
          <el-col :span="1">
            <p>
              <strong>m</strong><sup>2</sup>
            </p>
          </el-col>
          <el-col :span="4">
            <el-select
              v-model="dataRoomType.bedType"
              element-loading-spinner="el-icon-loading"
              :placeholder="$t('page.collection.hotelSuggestion')"
              remote
              style="min-width: 250px; margin-right: 12px"
              prefix-icon="el-icon-search"
              clearable
            >
              <el-option
                v-for="(item, index) in selectBedType"
                :key="index"
                :label="`${$t(item.name)}`"
                :value="item.value"
                style="font-size: 13px; color: #4a5d6e;"
              />
            </el-select>
          </el-col>
          <el-col :span="11">
            <el-select
              v-model="arrProvinces"
              multiple
              filterable
              allow-create
              default-first-option
              placeholder="Choose tags for your article"
              class="custom-multi-select">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.name"
                :value="item.sn">
              </el-option>
            </el-select>
          </el-col>
        </el-row> <!-- square. bed type and view -->
        <el-row>
          <el-col :span="4">
            <p class="require">
              {{ $t("page.createRoomType.limit_number") }}
            </p>
          </el-col>
          <el-col :span="4">
            <el-input
              :placeholder=" $t('page.createRoomType.limit_number' )"
              type="text"
              v-model="dataRoomType.maxBooking"
            />
          </el-col>
          <el-col :span="2">
            <p>(0 = {{ $t("page.createRoomType.no_limit") }})</p>
          </el-col>
        </el-row> <!-- limit number -->
        <el-row>
          <el-col :span="4">
            <p class="require">
              {{ $t("page.createRoomType.memo") }}
            </p>
          </el-col>
          <el-col :span="20">
            <el-input type="textarea" :rows="5" v-model="dataRoomType.memo" />
          </el-col>
        </el-row> <!-- memo -->
        <el-row>
          <el-col :span="4">
            <p class="require">
              {{ $t("page.createRoomType.facilities") }}
            </p>
          </el-col>
          <el-col :span="4">
            <el-select
              v-model="valFacilities"
              element-loading-spinner="el-icon-loading"
              :placeholder="$t('page.collection.hotelSuggestion')"
              filterable
              :remote-method="reloadFilterDataFaciliti"
              remote
              style="min-width: 250px; margin-right: 12px"
              prefix-icon="el-icon-search"
              clearable
            >
              <el-option
                v-for="(item, index) in optionFacilities"
                :key="index"
                :label="`${$t(item.name)}`"
                :value="item"
                style="font-size: 13px; color: #4a5d6e;"
              />
            </el-select>
          </el-col>
          <el-col :span="4">
            <el-button type="primary" @click="btnAddFaciliti()">
              {{ $t('button.add') }}
            </el-button >
          </el-col>
        </el-row> <!-- facilities select -->
        <el-row>
          <el-col :span="4">
          </el-col>
          <el-col :span="20">
            <el-tag
              style="margin-left: 15px;"
              v-for="(item, index) in addFacilities"
              :key="index"
              closable
              @close="handleCloseFaciliti(item)"
              type="success">
              {{item}}
          </el-tag>
          </el-col>
        </el-row> <!-- facilities tag -->
        <el-row
          v-for="(formImage, index) in formImages"
          :key="index"
        >
          <el-col :span="4">
            <p>
              {{
                index == 0
                  ? $t("page.createRoomType.home_image")
                  : $t("page.createRoomType.image") +
                    " " +
                    index
              }}
            </p>
          </el-col>
          <el-col :span="4">
            <div id="preview">
              <img :src="formImage.src" />
            </div>
          </el-col>
          <el-col :span="4">
            <label class="custom-file-upload">
              <i class="fa fa-upload"></i>
              {{ $t("button.chooseFile") }}
              <input
                type="file"
                accept="image/png, image/jpeg"
                id="file_detail_gift"
                ref="file_detail_gift"
                @change="handleFileUploadImage(formImage, $event)"
              />
            </label>
          </el-col>
          <el-col
            :span="4"
            style="float:left"
            v-if="index != 0"
          >
            <el-checkbox v-model="formImage.is360">{{
              $t("page.createRoomType._360image")
            }}</el-checkbox>
          </el-col>
          <el-col
            :span="4"
            style="float:left"
            v-if="formImage.src !== '' || formImage.file !== ''"
          >
            <el-button
              type="danger"
              @click="onDeleteImage(formImage, $event)"
              size="medium"
            >
              {{ $t("button.delete") }}
            </el-button >
          </el-col>
        </el-row> <!-- image -->
        <div class="right-content">
          <el-button
            type="info"
            size="large"
            @click="$router.push({path: 'room-type', query: {sn: sn}})"
          >
            {{ $t("button.back") }}
          </el-button>
          <el-button
            type="success"
            size="large"
            @click="onCreateRoomType"
            :class="isDisable == true ? 'disabled' : ' '"
          >
            <i v-if="isDisable == false" class="feather icon-save mr-2" />
            <i v-if="isDisable == true" class="el-icon-loading"></i>
            {{ $t("button.create") }}
          </el-button>
        </div>
      </sa-section>
    </div>
</template>
<script>
import { listHotels } from '@/api/hotels'
import { listFacilities, onCreateRoomType } from '@/api/roomType'
import saSection from '@/components/globals/SaSection.vue'
import { debounce } from '@/utils/helpers'
const timeDebounce = 500

export default {
  name: 'CreateRoomType',
  components: {
    saSection
  },
  data () {
    return {
      hotels: [],
      dataRoomType: {
        giftDescription: '',
        memo: ''
      },
      formImages: [
        { file: '', src: '', is360: false, firstDisplay: 1, flag: 4 },
        { file: '', src: '', is360: false, firstDisplay: 0, flag: 4 },
        { file: '', src: '', is360: false, firstDisplay: 0, flag: 4 },
        { file: '', src: '', is360: false, firstDisplay: 0, flag: 4 },
        { file: '', src: '', is360: false, firstDisplay: 0, flag: 4 },
        { file: '', src: '', is360: false, firstDisplay: 0, flag: 4 },
        { file: '', src: '', is360: false, firstDisplay: 0, flag: 4 },
        { file: '', src: '', is360: false, firstDisplay: 0, flag: 4 },
        { file: '', src: '', is360: false, firstDisplay: 0, flag: 4 },
        { file: '', src: '', is360: false, firstDisplay: 0, flag: 4 },
        { file: '', src: '', is360: false, firstDisplay: 0, flag: 4 },
        { file: '', src: '', is360: false, firstDisplay: 0, flag: 4 }
      ],
      options: [
        {
          name: 'Cửa Sổ | Window',
          sn: 1
        },
        {
          name: 'Ban Công | Balcony',
          sn: 2
        },
        {
          name: 'Thành Phố | City',
          sn: 3
        },
        {
          name: 'Sân Vườn | Garden',
          sn: 4
        },
        {
          name: 'Hồ Bơi | Pool',
          sn: 5
        },
        {
          name: 'Không Có | No view',
          sn: 6
        }
      ],
      arrProvinces: [],
      selectRoomType: [
        { key: 'page.createRoomType.normal_room', value: 1 }
      ],
      selectNumHour: [
        { name: '1', value: 1 },
        { name: '2', value: 2 },
        { name: '3', value: 3 },
        { name: '4', value: 4 },
        { name: '5', value: 5 }
      ],
      sn: this.$route.query.sn ? Number(this.$route.query.sn) : ' ',
      isDisable: false,
      optionFacilities: [],
      valFacilities: {},
      addFacilities: []
    }
  },
  computed: {
    selectBedType () {
      return [
        { name: this.$t('page.createRoomType.not_select'), value: 0 },
        { name: this.$t('page.createRoomType.single'), value: 1 },
        { name: this.$t('page.createRoomType.double'), value: 2 },
        { name: this.$t('page.createRoomType.twin'), value: 3 },
        { name: this.$t('page.createRoomType.triple'), value: 4 },
        { name: this.$t('page.createRoomType._2double'), value: 5 }
      ]
    }
  },
  async created () {
    this.listHotel()
    this.getFacilities()
  },
  mounted () {},
  methods: {
    async onCreateRoomType () {
      try {
        const formData = new FormData()
        formData.append('hotelSn', this.sn)
        formData.append('name', this.dataRoomType.name)
        formData.append('shortName', this.dataRoomType.shortName)
        formData.append('mode', this.dataRoomType.mode)
        formData.append('numOfRoomHotel', this.dataRoomType.numOfRoomHotel)
        formData.append('firstHours', this.dataRoomType.firstHours)
        formData.append('firstHoursOrigin', this.dataRoomType.firstHoursOrigin)
        formData.append('maxNumHour', this.dataRoomType.maxNumHour)
        formData.append('additionalHours', this.dataRoomType.additionalHours)
        formData.append('additionalOrigin', this.dataRoomType.additionalOrigin)
        formData.append('overnightOrigin', this.dataRoomType.overnightOrigin)
        formData.append('oneDayOrigin', this.dataRoomType.oneDayOrigin)
        formData.append('square', this.dataRoomType.square)
        formData.append('bedType', this.dataRoomType.bedType)
        this.arrProvinces.forEach((obj, index) => {
          formData.append(`roomViews[${index}][sn]`, obj.sn)
        })
        this.addFacilities.forEach((obj, index) => {
          formData.append(`facilities[${index}]`, obj)
        })
        formData.append('memo', this.dataRoomType.memo)
        formData.append('maxBooking', this.dataRoomType.maxBooking)
        const formImagesHasImg = this.formImages.filter(function (person) {
          return person.src !== ''
        })
        formImagesHasImg.forEach((obj, index) => {
          if (index === 0) {
            formData.append(`images[${index}][firstDisplay]`, 1)
          } else {
            formData.append(`images[${index}][firstDisplay]`, 0)
          }
          formData.append(`images[${index}][file]`, obj.file)
          formData.append(`images[${index}][flag]`, 2)
          formData.append(`images[${index}][type]`, obj.is360 === true ? 2 : 1)
        })
        await onCreateRoomType(formData)
        this.isDisable = false
        this.$router.push(`room-type${this.sn ? `?sn=${this.sn}` : ''}`)
        this.$message({
          type: 'success',
          message: `${this.$t('message.success')}`
        })
      } catch (error) {
        return false
      }
    },
    async getFacilities (keyword) {
      try {
        const params = {
          limit: 100
        }
        if (keyword) {
          params.keyword = keyword
        }
        const { data } = await listFacilities(params)
        const self = this
        const facilities = data.data
        if (facilities && facilities.meta.total > 0) {
          facilities.facilities.map(function (currentValue) {
            self.optionFacilities.push({
              name: currentValue.name,
              value: currentValue.sn
            })
          })
        } else {
          self.optionFacilities = []
        }
      } catch (error) {
        return false
      }
    },

    reloadFilterDataFaciliti: debounce(function (keyword) {
      this.getFacilities(keyword)
    }, timeDebounce),

    async listHotel (keyword) {
      try {
        const params = {}
        if (this.sn !== ' ' && !keyword) {
          params.hotelSn = this.sn
        } else if (keyword) {
          params.keyword = keyword
        }
        this.hotels = []
        const { data } = await listHotels(params)
        if (data.data.hotels && data.data.hotels.length > 0) {
          this.hotels = data.data.hotels
        }
      } catch (error) {
        return false
      }
    },
    reloadFilterData: debounce(function (keyword) {
      this.listHotel(keyword)
    }, timeDebounce),

    filterNumHourAdditionalHours (data) {
      this.additionalHours = data.item.value
    },
    filterNumHourFirstTime (data) {
      this.firstHours = data.item.value
    },
    onInputPrice (price) {
      switch (price) {
        case 'first':
          if (this.firstHoursOrigin < 0) this.firstHoursOrigin = 0
          break
        case 'plus':
          if (this.additionalOrigin < 0) this.additionalOrigin = 0
          break
        case 'overnight':
          if (this.overnightOrigin < 0) this.overnightOrigin = 0
          break
        case 'oneDay':
          if (this.oneDayOrigin < 0) this.oneDayOrigin = 0
          break
        case 'square':
          if (this.square < 0) this.square = 0
          break
      }
    },
    btnAddFaciliti () {
      this.clearInputFaci = 0
      let status = 0
      let addFaci = ''
      if (this.valFacilities) {
        addFaci = this.valFacilities.name
        if (this.addFacilities.length > 0) {
          this.addFacilities.forEach(element => {
            if (addFaci === element) {
              status = 1
            }
          })
        }
        if (status === 0) {
          this.addFacilities.push(addFaci)
          this.clearInputFaci = Number(this.addFacilities.length)
        }
      }
    },
    handleCloseFaciliti (item) {
      this.addFacilities.splice(this.addFacilities.indexOf(item), 1)
    },
    handleFileUploadImage (formImage, e) {
      formImage.file = e.target.files[0]
      formImage.src = URL.createObjectURL(e.target.files[0])
    },
    onDeleteImage (formImage, e) {
      formImage.src = ''
      formImage.file = ''
    }
  }
}
</script>
<style lang="scss" scoped>
  .right-content{
    text-align: right;
    margin-top: 12px;
  }
  .custom-multi-select{
    display: block;
    margin-left: 8px;
    .el-select__tags{
      max-width: unset;
    }
  }
</style>
