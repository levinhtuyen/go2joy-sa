<template>
    <div class="inviteFriend">
      <sa-section
        v-loading="ui.isLoading"
      >
      <div class="inviteFriend__info">
        <div class="card-item" v-for="(value, label, index) in ui.form" :key="index">
          <p class="card-item__label">
            {{ $t(`page.inviteFriend.${label}`) }}
          </p>
          <div v-if="label === 'guidelinesVn' || label === 'guidelinesEn' || label === 'memo'" class="card-item__value">
            <p v-html="value"></p>
          </div>
          <div v-else-if="label === 'status'" class="card-item__value">
            <p v-if="value === 1">{{ $t('option.status.active') }}</p>
            <p v-else-if="value === 2">{{ $t('option.status.expired') }}</p>
            <p v-else-if="value === 3">{{ $t('option.status.temp') }}</p>
            <p v-else-if="value === 4">{{ $t('option.status.draft') }}</p>
            <p v-else-if="value === 5">{{ $t('option.status.wait_confirm') }}</p>
          </div>
          <div v-else-if="label === 'createBy'" class="card-item__value">
            <span class="mr-1" v-if="value.manual">✔ Manual</span>
            <span class="mr-1" v-if="value.facebook">✔ Facebook</span>
            <span class="mr-1" v-if="value.google">✔ Google</span>
            <span class="mr-1" v-if="value.apple">✔ Apple</span>
          </div>
          <p v-else class="card-item__value">
            {{ value }}
          </p>
        </div>
      </div>
      <div class="inviteFriend__button">
          <el-button
              @click="$router.go(-1)"
              icon="el-icon-refresh-left"
              type="info"
              plain
          >
              {{ $t('button.back') }}
          </el-button>
          <el-button
              @click="sendRequestActivity"
              icon="el-icon-position"
              type="primary"
              plain
              :loading="ui.isSubmiting"
          >
              {{ $t('button.sendRequest') }}
          </el-button>
      </div>
    </sa-section>
  </div>
</template>
<script>
import SaSection from '@/components/globals/SaSection.vue'
import { getInviteFriendDetails, sendRequestActivity } from './api'
export default {
  name: 'InviteFriendDetails',
  components: {
    SaSection
  },
  data () {
    return {
      ui: {
        isLoading: false,
        isSubmiting: false,
        form: {}
      }
    }
  },
  created () {
    this.getInviteFriendDetails()
  },

  methods: {
    async getInviteFriendDetails () {
      this.ui.isLoading = true
      try {
        const { data } = await getInviteFriendDetails(this.$route.params.sn)
        this.ui.form = {
          title: data.data.title,
          typeOfInvitation: data.data.typeApply === 0 ? 'Signed Up' : 'Checked-in',
          status: data.data.status,
          startEndDate: `${this.formatDate(data.data.startDate, false)} ~ ${this.formatDate(data.data.endDate, false)}`,
          inviteeInviter: `${data.data.inviteeAmout} / ${data.data.inviterAmout}`,
          dailyBudget: data.data.dailyBugget ? `${this.formatMoney(data.data.dailyBugget)} VNĐ` : this.$t('page.inviteFriend.unlimited'),
          createBy: data.data,
          via: data.data.link ? '✔' : this.$t('option.all'),
          guidelinesVn: data.data.guideline,
          guidelinesEn: data.data.guidelineEn,
          SMSContent: data.data.memo
        }
      } catch (error) {
        return false
      } finally {
        this.ui.isLoading = false
      }
    },
    async sendRequestActivity () {
      this.ui.isSubmiting = true
      try {
        const params = {
          targetSn: this.$route.params.sn,
          type: 2
        }
        await sendRequestActivity(params)
        this.$message({
          type: 'success',
          message: `${this.$t('message.sendSuccess')}`
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
  .mr-1 {
    margin-right: 10px;
  }
  .card-item {
    padding: 16px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.125);
    display: flex;
    align-items: center;
    &__label {
      width: 30%;
      font-weight: 600;
    }
    &__value {
      width: 70%;
    }
  }

  .inviteFriend {
    &__button {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      margin-top: 20px;
    }
  }
</style>
