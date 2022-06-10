<template>
  <div class="counselings-mgt">
    <sa-section>
      <el-row>
        <el-col :span="4">
          <p>{{ $t("page.createCounselingMgt.title") }}</p>
        </el-col>
        <el-col :span="20">
          <el-input type="text" v-model="counselings.title"></el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4">
          <p>{{ $t("page.createCounselingMgt.content") }}</p>
        </el-col>
        <el-col :span="20">
          <el-input type="text" v-model="counselings.content"></el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4">
          <p>{{ $t("page.createCounselingMgt.sendUser") }}</p>
        </el-col>
        <el-col :span="20">
          <el-select
            v-model="counselings.appUserSn"
            v-bing :loading="isLoadingUser"
            element-loading-spinner="el-icon-loading"
            filterable
            :remote-method="reloadFilterDataUser"
            remote
            style="min-width: 250px; margin-right: 12px"
            prefix-icon="el-icon-search"
            clearable
          >
            <el-option
              v-for="item in user"
              :key="item.value"
              :label="item.nickName"
              :value="item.sn">
            </el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4">
          <p>{{ $t("page.createCounselingMgt.scope") }}</p>
        </el-col>
        <el-col :span="20">
          <el-select
            v-model="counselings.scope"
            element-loading-spinner="el-icon-loading"
            filterable
            :remote-method="reloadFilterDataUser"
            remote
            style="min-width: 250px; margin-right: 12px"
            prefix-icon="el-icon-search"
            clearable
          >
            <el-option
              v-for="item in scope"
              :key="item.value"
              :label="item.name"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <div class="right-content">
              <el-button  type="info" size="large" @click="$router.go(-1)">
                {{$t('button.back')}}
              </el-button>
              <el-button  type="success" size="large" @click="onCreateUser">
                <i class="feather icon-save mr-2"/>
                {{$t('button.create')}}
              </el-button>
            </div>
        </el-col>
      </el-row>
    </sa-section>
  </div>
</template>
<script>
import saSection from '@/components/globals/SaSection.vue'
import { listUsers, onCreateCounseling } from './api'
import { debounce } from '@/utils/helpers'
const timeDebounce = 500
export default {
  name: 'UserMgt',
  components: {
    saSection
  },
  data: () => {
    return {
      counselings: {},
      user: [],
      isLoadingUser: false
    }
  },
  computed: {
    scope () {
      return [
        { name: this.$t('option.public'), value: 2 },
        { name: this.$t('option.private'), value: 1 }
      ]
    }
  },
  created () {
    this.listUser({ status: 1 })
  },
  watch: {

  },
  methods: {
    async listUser (params) {
      try {
        this.isLoadingUser = true
        const { data } = await listUsers(params)
        this.user = data.data.appUsers
      } catch (error) {
        return false
      } finally {
        this.isLoadingUser = false
      }
    },
    reloadFilterDataUser: debounce(function (keyword) {
      this.listUser({ keyword: keyword })
    }, timeDebounce),
    async onCreateUser () {
      try {
        const { data } = await onCreateCounseling(this.counselings)
        this.user = data.data.appUsers
        this.$message({
          type: 'success',
          message: this.$t('message.success')
        })
        this.$router.push({ name: 'counselingMgt' })
      } catch (error) {
        return false
      }
    }
  }
}
</script>
<style lang="scss">
.right-content{
  float: right;
}
</style>
