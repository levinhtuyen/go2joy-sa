<template>
<div>
    <div class="product-type-create-segment">
        <SaSection v-loading="isLoading">
            <!-- Start Contentbar-->
            <el-form ref="dataCreatelProductType" :model="dataCreatelProductType" :rules="rules" label-position="left" label-width="25%" class="product-type-create-segment__form">
                <el-form-item :label="$t('page.productTypeAdd.product_type_name')" prop="name">
                    <el-input :placeholder="$t('page.productTypeAdd.product_type_name')" v-model="dataCreatelProductType.name" />
                </el-form-item>
                <el-form-item :label="$t('page.productTypeAdd.product_type_nameEn')" prop="nameEn">
                    <el-input :placeholder="$t('page.productTypeAdd.product_type_nameEn')" v-model="dataCreatelProductType.nameEn" />
                </el-form-item>
                <el-form-item :label="$t('page.productTypeAdd.image')">
                    <div class="product-type-create-segment__form--image">
                        <el-upload class="image-upload"
                        action=""
                        ref="upload"
                        :http-request="handleFileUpload"
                        :on-change="handleChange"
                        :show-file-list="false">
                          <img v-if="imageUrl" :src="imageUrl" class="avatar">
                          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>

                    </div>
                </el-form-item>
                <el-form-item  prop="srcImage">
                    <el-input  style="display:none" v-model="dataCreatelProductType.srcImage" ></el-input>
                </el-form-item>
                <el-form-item style="text-align: right;">
                    <el-button type="info" size="large" @click="$router.go(-1)">
                        {{$t('page.productTypeAdd.buttonBack')}}
                    </el-button>
                    <el-button type="success" size="large" @click="checkValidate('dataCreatelProductType')">
                        <i class="feather icon-save mr-2" />
                        {{$t('page.productTypeAdd.buttonAdd')}}
                    </el-button>
                </el-form-item>
            </el-form>
            <!-- Etart Contentbar-->
        </SaSection>

    </div>
</div>
</template>

<script>
import {
  createProductType
} from './api'
import SaSection from '@/components/globals/SaSection.vue'
export default {
  name: 'CreateProductType',
  components: {
    SaSection
  },
  data: (vm) => {
    return {
      isLoading: true,
      dataCreatelProductType: {
        name: '',
        nameEn: '',
        srcImage: ''
      },
      file: '',
      imageUrl: '',
      rules: {
        name: [{ required: true, message: vm.$t('page.productTypeAdd.requiredName'), trigger: 'blur' }],
        srcImage: [{ required: true, message: vm.$t('page.productTypeAdd.requiredImage'), trigger: 'blur' }]

      },
      dataRes: {}
    }
  },
  created () {
    this.isLoading = false
  },
  methods: {
    handleFileUpload (file) {
      this.imageUrl = URL.createObjectURL(file.file)
      this.dataCreatelProductType.srcImage = this.imageUrl
      this.file = this.$refs.upload.uploadFiles[0].raw
      this.$refs.dataCreatelProductType.validateField('srcImage')
    },
    handleChange (file) {
      this.dataCreatelProductType.srcImage = this.imageUrl
    },
    checkValidate (dataCreatelProductType) {
      this.$refs[dataCreatelProductType].validate((valid) => {
        if (valid) {
          this.createProductType()
        } else {
          return false
        }
      })
    },
    async createProductType () {
      this.isLoading = true

      const formData = new FormData()
      if (this.file) {
        formData.append('image', this.file)
      }
      formData.append('name', this.dataCreatelProductType.name)
      formData.append('nameEn', this.dataCreatelProductType.nameEn)

      try {
        const { data } = await createProductType(formData)
        this.dataRes = data
        this.$message({
          type: 'success',
          message: `${this.$t('Create success')}`
        })
      } catch (error) {
        return false
      } finally {
        this.$router.go(-1)
        this.isLoading = false
      }
    }, // createProductType

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
.product-type-create-segment {
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
