<template>
  <el-form
    ref="categoryForm"
    :model="formData"
    v-loading="ui.loading"
    :rules="rules"
    label-width="12%"
    hide-required-asterisk
    class="category-form"
  >
    <el-form-item
      prop="name"
      :label="$t('page.article.categoryName')"
    >
      <el-input v-model="formData.name"></el-input>
    </el-form-item>
    <el-form-item
      prop="hashTag"
      :label="$t('page.article.hashtag')"
    >
      <el-input v-model="formData.hashTag"></el-input>
    </el-form-item>
    <el-form-item
      :label="$t('page.article.image')"
      prop="imageFile"
    >
      <div
        class="category-form__image"
      >
        <img v-if="srcImage" :src="srcImage">
        <img v-else-if="formData.imagePath && !srcImage" :src="formatImage(formData.imagePath)" :alt="formData.imagePath">
      </div>
      <upload-file
        accept="image/png, image/jpeg"
        @change="handleFileUpload"
      >
        {{ $t('button.chooseFile') }}
      </upload-file>
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
        :loading="ui.submitLoading"
      >
        {{ $t('button.save') }}
      </el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import UploadFile from '@/components/globals/UploadFile.vue'
import { getCategoryDetails, updateCategory } from '../edit/api'
import { createCategory } from '../create/api'
export default {
  name: 'ArticleCategoryForm',
  components: {
    UploadFile
  },
  props: {
    page: {
      type: String,
      default: ''
    }
  },
  data: (vm) => {
    return {
      ui: {
        loading: false,
        submitLoading: false
      },
      srcImage: '',
      formData: {
        name: '',
        hashTag: ''
      },
      rules: {
        name: [
          { required: true, message: vm.$t('page.article.requiredCategoryName'), trigger: 'blur' }
        ],
        hashTag: [
          { required: true, message: vm.$t('page.article.requiredHashtag'), trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    if (this.page === 'edit') {
      this.getCategoryDetails()
    }
  },
  methods: {
    handleFileUpload (file) {
      this.formData.imageFile = file
      this.srcImage = URL.createObjectURL(file)
    },
    async getCategoryDetails () {
      this.ui.loading = true
      try {
        const params = { categorySn: this.$route.params.sn }
        const { data } = await getCategoryDetails(params)
        this.formData = data.data
      } catch (error) {
        return false
      } finally {
        this.ui.loading = false
      }
    },
    submitForm () {
      this.$refs.categoryForm.validate(async (valid) => {
        if (!valid) {
          return false
        }
        if (this.page === 'edit') {
          this.updateCategory()
        } else if (this.page === 'create') {
          this.createCategory()
        }
      })
    },
    async createCategory () {
      this.ui.submitLoading = true
      try {
        const formData = new FormData()
        formData.append('imageFile', this.formData.imageFile)
        formData.append('name', this.formData.name)
        formData.append('hashTag', this.formData.hashTag)
        await createCategory(formData)
        const message = this.$t('message.createSuccess')
        this.$message({
          type: 'success',
          message: message
        })
        this.$router.push({ name: 'articleCategory' })
      } catch (error) {
        return false
      } finally {
        this.ui.submitLoading = false
      }
    },
    async updateCategory () {
      this.ui.submitLoading = true
      try {
        const formData = new FormData()
        formData.append('imageFile', this.formData.imageFile)
        formData.append('name', this.formData.name)
        formData.append('hashTag', this.formData.hashTag)
        await updateCategory(this.$route.params.sn, formData)
        const message = this.$t('message.updateSuccess')
        this.$message({
          type: 'success',
          message: message
        })
        this.$router.push({ name: 'articleCategory' })
      } catch (error) {
        return false
      } finally {
        this.ui.submitLoading = false
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.category-form {
  ::v-deep
  .el-form-item__label {
    text-align: left;
  }
  &__image {
    border: 1px solid #ccc;
    text-align: center;
    height: 190px;
    width: 420px;
    margin-bottom: 16px;
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
}
</style>
