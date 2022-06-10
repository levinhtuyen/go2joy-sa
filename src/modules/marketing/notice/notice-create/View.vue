<template>
  <sa-section class="notice">
    <el-form :model="form" :rules="rules" ref="form">
      <div class="notice__form">
        <el-form-item :label="$t('page.notice.title')" prop="title" required>
          <el-input :placeholder="$t('page.notice.title')" v-model="form.title" type="text"></el-input>
        </el-form-item>
      </div>
      <div class="notice__form">
        <el-form-item :label="$t('page.notice.content')" prop="content" required>
          <div class="notice__content">
            <tinymce v-model="form.content" :height="300" />
          </div>
        </el-form-item>
      </div>
      <div class="notice__form">
        <el-form-item :label="$t('page.notice.onTop')" required>
          <el-form-item>
            <el-select
            v-model="form.top"
            >
              <el-option
                  v-for="item in onTopOptions"
                :key="item.value"
                :label="$t(`${item.key}`)"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-form-item>
      </div>
      <div class="notice__form">
        <el-form-item :label="$t('page.notice.homePage')">
          <el-checkbox :true-label="1" :false-label="0" v-model="form.homePage"></el-checkbox>
        </el-form-item>
      </div>
      <div class="notice__button">
        <el-button type="info" size="large" @click="$router.go(-1)">
            {{ $t('button.back')}}
        </el-button>
        <el-button type="success" :loading="ui.isSubmiting" size="large" @click="preHandleBeforeSubmit">
            {{ $t('button.create')}}
        </el-button>
      </div>
    </el-form>
  </sa-section>
</template>

<script>
import SaSection from '@/components/globals/SaSection.vue'
import { createNotice } from './api'
import Tinymce from '@/components/globals/Tinymce/index.vue'

export default {
  name: 'Createnotice',
  components: {
    SaSection,
    Tinymce
  },
  data () {
    return {
      form: {
        title: '',
        content: '',
        top: 0,
        homePage: 0,
        createTime: ''
      },
      rules: {
        title: [
          { required: true, message: this.$t('page.notice.requiredTitle'), trigger: 'blur' }
        ],
        content: [
          { required: true, message: this.$t('page.notice.requiredContent'), trigger: 'blur' }
        ]
      },
      ui: {
        isSubmiting: false
      },
      hotels: [],
      onTopOptions: [
        { value: 1, key: 'option.yes' },
        { value: 0, key: 'option.no' }
      ]
    }
  },
  methods: {
    preHandleBeforeSubmit () {
      this.$refs.form.validate((valid) => {
        if (!valid) {
          return false
        }
        this.submit()
      })
    },
    async submit () {
      this.ui.isSubmiting = true
      try {
        const formData = Object.keys(this.form).reduce((formData, key) => {
          formData.append(key, this.form[key])
          return formData
        }, new FormData())

        await createNotice(formData)
        const message = this.$t('message.createSuccess')
        this.$message({
          type: 'success',
          message: message
        })
        this.$router.go(-1)
      } catch (error) {
        return false
      } finally {
        this.ui.isSubmiting = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .notice {
    .notice__form::v-deep {
      margin: 1em 0;
      .el-form-item {
        display: unset;
        margin-bottom: 1em;
        @media (min-width: 640px) {
          display: flex;
          flex-wrap: wrap;
        }
      }
      .el-form-item__label {
        text-align: left;
        @media (min-width: 640px) {
          flex: 1;
        }
      }
      .el-form-item__content {
        @media (min-width: 640px) {
          flex: 3;
        }
      }
      .el-form-item__error {
        margin-top: 0.5em;
        position: unset;
      }
    }
    &__row {
      @media (min-width: 640px) {
        display: flex;
        align-items: center;
        gap: 0 2em;
        flex-wrap: wrap;
      }
      img {
        width: 16em !important;
      }
      .upload-file {
        width: 10em;
      }
      &--margin {
        margin: 1em 0;
      }
    }
    &__content {
      clear: both;
    }
    &__button {
      display: flex;;
      justify-content: flex-end;
      margin-top: 2em;
    }
  }
  .select-check::v-deep {
    button {
      width: 100%;
      @media (min-width: 640px) {
        width: 16em;
      }
    }
  }
  .el-select {
    width: 100%;
  }
</style>
