<template>
<div>
    <div class="facility-edit-segment">
        <SaSection v-loading="ui.isLoadingFacilityEdit">
            <!-- Start Contentbar-->
            <el-form ref="dataEditFacility" :model="dataEditFacility" :rules="rules" label-position="left" label-width="25%" class="facility-edit-segment__form">
                <el-form-item :label="$t('page.facilityAdd.facility_name_vn')" prop="name">
                    <el-input :placeholder="$t('page.facilityAdd.facility_name_vn')" v-model="dataEditFacility.name" />
                </el-form-item>
                <el-form-item :label="$t('page.facilityAdd.facility_name_en')" prop="nameEn">
                    <el-input :placeholder="$t('page.facilityAdd.facility_name_en')" v-model="dataEditFacility.nameEn" />
                </el-form-item>
                <el-form-item :label="$t('page.facilityAdd.image')" prop="srcImage">
                    <div class="facility-edit-segment__form--image">
                        <div class="image">
                              <img v-if="srcImage" :src="srcImage" class="avatar">
                        </div>
                        <div>
                          <UploadFile accept="image/png, image/jpeg" @change="handleFileUpload">
                                Upload Image
                          </UploadFile>
                        </div>
                    </div>
                </el-form-item>
                <el-form-item style="text-align: right;">
                    <el-button type="info" size="large" @click="$router.go(-1)">
                        {{$t('button.back')}}
                    </el-button>
                    <el-button type="success" size="large" @click="updateFacility('dataEditFacility')">
                        <i class="feather icon-save mr-2" />
                        {{$t('button.add')}}
                    </el-button>
                </el-form-item>
            </el-form>
            <!-- Etart Contentbar-->
        </SaSection>

    </div>
</div>
</template>

<script>
import SaSection from '@/components/globals/SaSection'
import UploadFile from '@/components/globals/UploadFile'
import {
  getFacilityById,
  updateFacilityById
} from './api'

export default {
  name: 'EditFacility',
  components: {
    SaSection,
    UploadFile
  },
  data: (vm) => {
    return {
      ui: {
        isLoadingFacilityEdit: true
      },
      dataEditFacility: {
        name: '',
        nameEn: '',
        srcImage: ''
      },

      file: '',
      srcImage: '',
      rules: {
        name: [{ required: true, message: vm.$t('page.facilityAdd.requiredName'), trigger: 'blur' }],
        nameEn: [{ required: true, message: vm.$t('page.facilityAdd.requiredNameEn'), trigger: 'blur' }],
        srcImage: [{ required: true, message: vm.$t('page.facilityAdd.requiredImage'), trigger: 'blur' }]

      },
      dataRes: {}
    }
  },
  created () {
    this.getDataFacilityById()
  },
  methods: {
    async getDataFacilityById () {
      const id = this.$route.params.id
      this.ui.isLoadingFacilityEdit = true
      try {
        const data = await getFacilityById(id)
        this.dataEditFacility = data.data.data
        this.srcImage = this.formatImage(this.dataEditFacility.imagePath)
      } catch (error) {
        return false
      } finally {
        this.ui.isLoadingFacilityEdit = false
      }
    }, // getDataHotelStaffById

    handleFileUpload (file) {
      this.file = file
      this.srcImage = URL.createObjectURL(file)
      this.dataEditFacility.srcImage = this.srcImage
      this.$refs.dataEditFacility.validateField('srcImage')
    },

    checkValidate (dataEditFacility) {
      this.$refs[dataEditFacility].validate((valid) => {
        if (valid) {
          this.updateFacility()
        } else {
          return false
        }
      })
    },

    async updateFacility () {
      this.ui.isLoadingFacilityEdit = true
      const id = this.$route.params.id
      const formData = new FormData()
      if (this.file) {
        formData.append('image', this.file)
      }
      formData.append('name', this.dataEditFacility.name)
      formData.append('nameEn', this.dataEditFacility.nameEn)
      formData.append('status', 1)

      try {
        const { data } = await updateFacilityById(id, formData)
        this.dataRes = data
        this.$message({
          type: 'success',
          message: `${this.$t('message.updateSuccess')}`
        })
      } catch (error) {
        return false
      } finally {
        this.$router.go(-1)
        this.ui.isLoadingFacilityEdit = false
      }
    } // createFacility
  }
}
</script>

<style lang="scss" scoped>
.facility-edit-segment {
    min-height: calc(100vh - 220px);
    background-color: #ffffff;

    &__form {
        &--image {
            display: grid;
            grid-template-columns: 1fr 2fr;
            height: 150px;

            .image {
                width: 200px;
                border: 1px solid rgba(0, 0, 0, .125);
                height: 150px;
                margin-bottom: 16px;

                img {
                    width: 100%;
                    object-fit: cover;
                    height: 100%;
                    border-style: none;
                }
            }
        }
    }

    &__button {
        padding: 15px;

        &--content {
            display: flex;
            justify-content: flex-end;
        }
    }

    .style-color-red {
        color: red;
    }
}
</style>
