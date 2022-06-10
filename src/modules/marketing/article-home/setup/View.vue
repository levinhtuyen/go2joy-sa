<template>
  <sa-section class="setup">
    <el-form
      label-position="left"
      label-width="15%"
      v-loading="ui.loading"
    >
      <el-form-item
        v-if="Number($route.params.sn) === 1"
        :label="$t('page.article.image')"
        prop="imageFile"
      >
        <div
          v-if="Number($route.params.sn) === 1"
          class="setup__image"
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
        v-if="Number($route.params.sn) !== 1"
        :label="$t('page.article.title')"
      >
        <el-input v-model="formData.title"></el-input>
      </el-form-item>
      <el-form-item
        v-if="Number($route.params.sn) !== 1"
        :label="$t('page.article.display')"
      >
        <el-checkbox v-model="formData.display" border></el-checkbox>
      </el-form-item>
      <el-form-item>
        <div style="width: 100%; text-align: right;">
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
            {{ $t('button.save') }}
          </el-button>
        </div>
      </el-form-item>
    </el-form>
  </sa-section>
</template>
<script>
import SaSection from '@/components/globals/SaSection.vue'
import { updateDisplayType, getDisplayTypeDetail } from './api'
import UploadFile from '@/components/globals/UploadFile.vue'
export default {
  name: 'ArticleSetup',
  components: {
    SaSection,
    UploadFile
  },
  data: () => {
    return {
      ui: {
        loading: false,
        hashtagLoading: false
      },
      hashtags: [],
      srcImage: '',
      formData: {
        title: '',
        display: false
      }
    }
  },
  created () {
    this.getDisplayTypeDetail()
    // this.fetchHashtags()
  },
  methods: {
    handleFileUpload (file) {
      this.formData.imageFile = file
      this.srcImage = URL.createObjectURL(file)
    },
    // async fetchHashtags () {
    //   try {
    //     this.ui.hashtagLoading = true
    //     const { data } = await fetchHashtags()
    //     this.hashtags = data.data
    //   } catch (error) {
    //     return false
    //   } finally {
    //     this.ui.hashtagLoading = false
    //   }
    // },
    async getDisplayTypeDetail () {
      try {
        this.ui.loading = true
        const { data } = await getDisplayTypeDetail({ displayTypeSn: this.$route.params.sn })
        this.formData = data.data
        this.formData.display = data.data.display === 1
      } catch (error) {
        return false
      } finally {
        this.ui.loading = false
      }
    },
    async submitForm () {
      try {
        let formData
        if (Number(this.$route.params.sn) === 1) {
          formData = new FormData()
          formData.append('displayTypeSn', this.formData.sn)
          formData.append('imageFile', this.formData.imageFile)
        } else {
          formData = {
            title: this.formData.title,
            hashTagSn: this.formData.hashTagSn,
            display: Number(this.formData.display),
            displayTypeSn: this.formData.sn
          }
        }
        await updateDisplayType(formData)
        this.$message({
          type: 'success',
          message: `${this.$t('message.updateSuccess')}`
        })
        this.$router.push({ name: 'articleHome' })
      } catch (error) {
        return false
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.setup {
  &__image {
    border: 1px solid #ccc;
    text-align: center;
    height: 160px;
    width: 350px;
    margin-bottom: 16px;
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
}
</style>
