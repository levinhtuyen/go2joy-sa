<template>
  <sa-section v-loading="ui.loadingSection" class="category-details">
    <div v-if="category_details">
      <div class="category-details__row">
        <div class="category-details__row--left">
          <p>{{ $t('page.dashboard.title1')}}</p>
        </div>
        <div class="category-details__row--right">
          <el-input type="text" v-model="category_details.title1"></el-input>
        </div>
      </div>
      <div class="category-details__row" v-if="$route.params.sn == 4">
        <div class="category-details__row--left">
          <p>{{ $t('page.dashboard.title2')}}</p>
        </div>
        <div class="category-details__row--right">
          <el-input type="text" v-model="category_details.title2"></el-input>
        </div>
      </div>
      <div class="category-details__row" v-if="$route.params.sn == 4">
        <div class="category-details__row--left">
          <p>{{ $t('page.dashboard.title3')}}</p>
        </div>
        <div class="category-details__row--right">
          <el-input type="text" v-model="category_details.title3"></el-input>
        </div>
      </div>
      <div class="category-details__row">
        <div class="category-details__row--left">
          <p>{{ $t('page.dashboard.display')}}</p>
        </div>
        <div class="category-details__row--right">
          <el-checkbox v-model="category_details.display" border />
        </div>
      </div>
      <div class="category-details__row" v-if="$route.params.sn == 6">
        <div class="category-details__row--left">
          <p>{{ $t('page.dashboard.content')}}</p>
        </div>
        <div class="category-details__row--right">
          <Tinymce v-model="category_details.content" />
        </div>
      </div>
      <div class="category-details__footer">
        <div class="col-md-12">
          <div class="right-content">
            <el-button  type="info" size="large" @click="$router.go(-1)">
              {{$t('page.dashboard.back')}}
            </el-button>
            <el-button  type="success" size="large" @click="onSubmit">
              {{$t('page.dashboard.save')}}
            </el-button>
          </div>
        </div>
      </div>
    </div>
    <div class="contentbar" v-else>
      <div class="card m-b-30" style="text-align: center;padding: 20px;">
        <p>{{$t('no_data')}}</p>
      </div>
    </div>
  </sa-section>
</template>
<script>
import { getHomeCategoryDetails, updateHomeCategory } from './api'
import SaSection from '@/components/globals/SaSection.vue'
import Tinymce from '@/components/globals/Tinymce'
export default {
  name: 'category_details',
  components: {
    SaSection,
    Tinymce
  },
  data: () => {
    return {
      category_details: {},
      ui: {
        loadingSection: false,
        loadingButton: false
      }
    }
  },
  created () {
    this.getHomeCategoryDetails()
  },
  methods: {
    async getHomeCategoryDetails () {
      this.ui.loadingSection = true
      if (!this.$route.params.sn) {
        return false
      }
      try {
        const { data } = await getHomeCategoryDetails(this.$route.params.sn)
        this.category_details = data.data
        this.category_details.display = this.category_details.display === 1
      } catch {
        return false
      } finally {
        this.ui.loadingSection = false
      }
    },
    async onSubmit () {
      this.ui.loadingButton = true
      try {
        const formData = {
          ...this.category_details
        }
        formData.display = Number(formData.display)
        await updateHomeCategory(formData)
        this.$message({
          type: 'success',
          message: `${this.$t('page.dashboard.editSuccess')}`
        })
        this.$router.push('/hotel/sadmin/dashboard')
      } catch {
        return false
      } finally {
        this.ui.loadingButton = true
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.category-details {
  &__row {
    padding-bottom: 12px;
    display: flex;
    align-items: center;
    &--left {
      min-width: 10%;
    }
    &--right {
      flex: 1;
    }
  }
  &__footer {
    text-align: right;
  }
}
</style>
