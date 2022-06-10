<template>
<div>
    <div class="product-type-edit-segment">
        <SaSection v-loading="isLoading">
            <!-- Start Contentbar-->
            <el-form
            ref="dataForm"
            :model="dataDetailProductType"
            :rules="rules"
            label-position="left"
            label-width="25%"
            class="product-type-edit-segment__form">
                <el-form-item :label="$t('page.productTypeAdd.product_type_name')" prop="name">
                    <ElInput :placeholder="$t('page.productTypeAdd.product_type_name')" v-model="dataDetailProductType.name" />
                </el-form-item>
                <el-form-item :label="$t('page.productTypeAdd.product_type_nameEn')">
                    <el-input :placeholder="$t('page.productTypeAdd.product_type_nameEn')" v-model="dataDetailProductType.nameEn" />
                </el-form-item>
                <el-form-item :label="$t('page.productTypeAdd.image')" prop="imagePath">
                    <div class="product-type-edit-segment__form--image">
                        <div class="image">
                              <img v-if="srcImage" :src="srcImage" class="avatar">
                        </div>
                        <div>
                          <upload-file accept="image/png, image/jpeg" @change="handleFileUpload">
                                Upload Image
                          </upload-file>
                        </div>
                    </div>
                </el-form-item>
                <el-form-item  prop="imagePath">
                    <el-input  style="display:none" v-model="dataDetailProductType.imagePath" ></el-input>
                </el-form-item>
                <el-form-item style="text-align: right;">
                    <el-button type="info" size="large" @click="$router.go(-1)">
                        {{$t('page.productTypeAdd.buttonBack')}}
                    </el-button>
                    <el-button type="success" size="large" @click="editProductType()">
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
import { getProductTypeDetail, updateProductTypeDetail } from './api'
import SaSection from '@/components/globals/SaSection.vue'
import UploadFile from '@/components/globals/UploadFile'
export default {
  name: 'EditProduct',
  components: {
    SaSection,
    UploadFile
  },
  data: (vm) => {
    return {
      isLoading: true,
      dataDetailProductType: {
        name: '',
        imagePath: ''
      },
      file: '',
      url: '',
      srcImage: '',
      rules: {
        name: [{ required: true, message: vm.$t('page.productTypeEdit.requiredName'), trigger: 'blur' }],
        imagePath: [{ required: true, message: vm.$t('page.productTypeEdit.image'), trigger: 'blur' }]
      }
    }
  },
  async created () {
    await this.getDataProductDetail()
  },
  methods: {
    handleFileUpload (file) {
      this.file = file
      this.srcImage = URL.createObjectURL(file)
    },
    async getDataProductDetail () {
      const id = this.$route.params.id
      this.isLoading = true
      try {
        const { data } = await getProductTypeDetail(id)
        this.dataDetailProductType = data.data
        this.srcImage = this.formatImage(data.data.imagePath)
      } catch (error) {
        return false
      } finally {
        this.isLoading = false
      }
    }, // getDataHotelStaffDetail

    editProductType () {
      this.$refs.dataForm.validate(async (valid) => {
        if (!valid) {
          return false
        }
        try {
          this.isLoading = true
          const id = this.$route.params.id
          const formData = new FormData()
          if (this.file) {
            formData.append('image', this.file)
          }
          formData.append('name', this.dataDetailProductType.name)
          formData.append('nameEn', this.dataDetailProductType.nameEn)

          updateProductTypeDetail(id, formData)
          this.$message({
            type: 'success',
            message: `${this.$t('Update success')}`
          })
          this.isLoading = false
          this.$router.go(-1)
        } catch (error) {
          return false
        }
      })
    } // updateProductType
  }
}
</script>
<style lang="scss" scoped>
.product-type-edit-segment {
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
