<template>
<div>
    <div class="facility-create-segment">
        <sa-section v-loading="ui.isLoadingFacilityCreate">
            <!-- Start Contentbar-->
            <el-form ref="dataCreatelFacility" :model="dataCreatelFacility" :rules="rules" label-position="left" label-width="25%" class="facility-create-segment__form">
                <el-form-item :label="$t('page.facilityAdd.facility_name_vn')" prop="name">
                    <el-input :placeholder="$t('page.facilityAdd.facility_name_vn')" v-model="dataCreatelFacility.name" />
                </el-form-item>
                <el-form-item :label="$t('page.facilityAdd.facility_name_en')" prop="nameEn">
                    <el-input :placeholder="$t('page.facilityAdd.facility_name_en')" v-model="dataCreatelFacility.nameEn" />
                </el-form-item>
                <el-form-item :label="$t('page.facilityAdd.image')" prop="srcImage">
                  <el-input  style="display:none" v-model="dataCreatelFacility.srcImage" ></el-input>

                </el-form-item>
                <el-form-item >
                    <div class="facility-create-segment__form--image">
                        <el-upload class="image-upload"
                        action=""
                        ref="upload"
                        :http-request="handleFileUpload"
                        :on-change="handleChange"
                        :on-success="handleAvatarSuccess"
                        :show-file-list="false">
                          <img v-if="srcImage" :src="srcImage" class="avatar">
                          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>

                    </div>
                </el-form-item>
                <el-form-item style="text-align: right;">
                    <el-button type="info" size="large" @click="$router.go(-1)">
                        {{$t('button.back')}}
                    </el-button>
                    <el-button type="success" size="large" @click="checkValidate('dataCreatelFacility')">
                        <i class="feather icon-save mr-2" />
                        {{$t('button.add')}}
                    </el-button>
                </el-form-item>
            </el-form>
            <!-- Etart Contentbar-->
        </sa-section>

    </div>
</div>
</template>

<script>
import {
  createFacility
} from './api'
import SaSection from '@/components/globals/SaSection'
export default {
  name: 'CreateFacility',
  components: {
    SaSection
  },
  data: (vm) => {
    return {

      ui: {
        isLoadingFacilityCreate: true
      },
      dataCreatelFacility: {
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
    this.ui.isLoadingFacilityCreate = false
  },
  methods: {
    handleFileUpload (file) {
      this.srcImage = URL.createObjectURL(file.file)
      this.dataCreatelFacility.srcImage = this.srcImage
      this.file = this.$refs.upload.uploadFiles[0].raw
      this.$refs.dataCreatelFacility.validateField('srcImage')
    },
    handleChange (file) {
      this.dataCreatelFacility.srcImage = this.srcImage
    },
    checkValidate (dataCreatelFacility) {
      this.$refs[dataCreatelFacility].validate((valid) => {
        if (valid) {
          this.createFacility()
        } else {
          return false
        }
      })
    },
    async createFacility () {
      this.ui.isLoadingFacilityCreate = true

      const formData = new FormData()
      if (this.file) {
        formData.append('image', this.file)
      }
      formData.append('name', this.dataCreatelFacility.name)
      formData.append('nameEn', this.dataCreatelFacility.nameEn)
      formData.append('status', 1)

      try {
        const { data } = await createFacility(formData)
        this.dataRes = data
        this.$message({
          type: 'success',
          message: `${this.$t('Create success')}`
        })
      } catch (error) {
        return false
      } finally {
        this.$router.go(-1)
        this.ui.isLoadingFacilityCreate = false
      }
    }, // createFacility

    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPG) {
        this.$message.error('Avatar picture must be JPG format!')
      }
      if (!isLt2M) {
        this.$message.error('Avatar picture size can not exceed 2MB!')
      }
      return isJPG && isLt2M
    }

  }
}
</script>

<style lang="scss" scoped>
.facility-create-segment {
    min-height: calc(100vh - 220px);
    background-color: #ffffff;

    &__form {
        &--image {
            display: grid;
            grid-template-columns: 1fr 2fr;
            .image-upload{
              border: 1px dashed #d9d9d9;
              width:200px;
              height: 200px;
              .el-upload{
                border: 1px dashed #d9d9d9;
                width: 200px;
                height: 200px;
              }
              .avatar-uploader .el-upload:hover {
              border-color: #409EFF;
              }
              .avatar-uploader-icon {
                font-size: 28px;
                color: #8c939d;
                width: 200px;
                height: 200px;
                line-height: 200px;
                text-align: center;
              }
              .avatar {
                width: 100%;
                height: 100%;
                object-fit: cover;
                display: block;
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
