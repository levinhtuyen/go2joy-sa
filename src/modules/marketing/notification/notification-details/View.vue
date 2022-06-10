<template>
    <div class="notification">
      <sa-section
        v-loading="ui.isLoading"
      >
      <div class="notification__info">
        <div class="card-item" v-for="(value, label, index) in ui.form" :key="index">
          <p class="card-item__label">
            {{ $t(`page.notification.${label}`) }}
          </p>
          <div v-if="label === 'type'" class="card-item__value">
            <p v-if="value == 1">{{ $t('option.status.normal')}}</p>
            <p v-else-if="value == 2">{{ $t('option.status.donateCoupon')}}</p>
            <p v-else-if="value == 3">{{ $t('option.status.remindCoupon')}}</p>
            <p v-else></p>
          </div>
          <div v-else-if="label === 'title'" class="card-item__value card-item__flex">
            {{ value.title }}
            <el-image
            v-if="value.imagePath"
            style="width: 30px; height: 30px;margin-left: 1em;"
            :src="formatImage(value.imagePath)"
            :fit="fit"></el-image>
          </div>
          <div v-else-if="label === 'createStaff'" class="card-item__value">
            <router-link
            :to="{ name: 'hotelDisplayDetails', params: { sn: value.createStaffSn }}">
              {{value.fullName}}
            </router-link>
          </div>
          <div v-else-if="label === 'targetType'" class="card-item__value">
            <router-link
            v-if="value.type != 3 && (value.targetType == 1 || value.targetType == 2 || value.targetType == 4)"
            :to="{ name: value.targetType === 2 ? 'hotelDisplayDetails' : 'hotelDisplayDetails', params: { sn: value.targetSn }}">
              {{ getTarget(value.targetType) }}
            </router-link>
            <p v-else-if="value.type == 3">N/A</p>
            <p v-else>
              <el-link disabled v-html="getTarget(value.targetType)"></el-link>
            </p>
          </div>
          <div v-else-if="label === 'sendTo'" class="card-item__value">
            <div v-if="value.type != 3">
              <p v-if="value.sendTo === 1">{{ $t("option.status.allUser") }}</p>
              <p v-else-if="value.sendTo === 2">{{ $t("option.status.go2joy") }}</p>
              <p v-else-if="value.sendTo === 3">{{ $t("option.status.allPartner") }}</p>
              <p v-else-if="value.sendTo === 4">{{ $t("option.status.booking") }}</p>
              <p v-else-if="value.sendTo === 5">{{ $t("option.status.hotel") }}</p>
              <p v-else-if="value.sendTo === 6">{{ $t("option.status.allTrailPartner") }}</p>
              <p v-else-if="value.sendTo === 7">{{ $t("option.status.allContractPartner") }}</p>
              <p v-else-if="value.sendTo === 8">
                <el-link :underline="false" :href="formatImage(value.filePath)" type="primary">{{ value.originalFileName }}</el-link>
              </p>
              <p v-else-if="value.sendTo === 9">{{ $t("option.status.crmFilter") }}</p>
              <p v-else></p>
            </div>
            <div v-else>N/A</div>
          </div>
          <div v-else-if="label === 'filterByLocation'" class="card-item__value">
            <div v-if="value.sendTo == 1">
              <p v-if="value.openApp == 1">{{ $t('page.notification.lastOpenApp')}}</p>
              <p v-if="value.provinceNameList">
                <el-tag class="mr-mt-1" v-for="(province, index) in value.provinceNameList" :key="index">
                  {{province.name}}
                </el-tag>
              </p>
              <p v-if="value.districtNameList">
                <el-tag type="info" class="mr-mt-1" v-for="(district, index) in value.districtNameList" :key="index">
                  {{district.name}}
                </el-tag>
              </p>
            </div>
          </div>
          <div v-else-if="label === 'schedule'" class="card-item__value">
            <p v-if="value.type != 3 && value.sendTimeSchedule">{{formatDate(value.sendTimeSchedule)}}</p>
            <p v-else-if="value.type == 3">N/A</p>
            <p v-else>{{ $t('page.notification.rightNow') }}</p>
          </div>
          <div v-else-if="label === 'content'" class="card-item__value">
            <router-link
            v-if="value.targetType == 1 || value.targetType == 2 || value.targetType == 4"
            :to="{ name: value.targetType === 2 ? 'hotelDisplayDetails' : 'hotelDisplayDetails', params: { sn: value.targetSn }}">
              {{ getTarget(value.targetType) }}
            </router-link>
          </div>
          <p v-else class="card-item__value">
            {{ value }}
          </p>
        </div>
        <div class="notification__button" v-if="$route.params.type == 'resend'">
          <el-button type="info" size="large" @click="$router.go(-1)">
              {{ $t('button.back')}}
          </el-button>
          <el-button type="success" :loading="ui.isSubmiting" icon="el-icon-position" size="large" @click="sendNotificationDetails">
              {{ $t('button.send')}}
          </el-button>
        </div>
      </div>
    </sa-section>
  </div>
</template>
<script>
import SaSection from '@/components/globals/SaSection.vue'
import { getNotificationDetails, sendNotificationDetails } from './api'
export default {
  name: 'NotificationDetails',
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
    this.getNotificationDetails()
  },
  methods: {
    async getNotificationDetails () {
      this.ui.isLoading = true
      try {
        const { data } = await getNotificationDetails(this.$route.params.sn)
        this.ui.form = {
          type: data.data.type,
          title: {
            title: data.data.title,
            imagePath: data.data.imagePath
          },
          subTitle: data.data.subTitle,
          createStaff: {
            createStaffSn: data.data.createStaffSn,
            fullName: data.data.fullName
          },
          targetType: {
            type: data.data.type,
            targetType: data.data.targetType,
            targetSn: data.data.targetSn
          },
          sendTo: {
            type: data.data.type,
            sendTo: data.data.sendTo,
            originalFileName: data.data.originalFileName,
            filePath: data.data.filePath
          },
          filterByLocation: {
            openApp: data.data.openApp,
            sendTo: data.data.sendTo,
            provinceNameList: data.data.provinceNameList,
            districtNameList: data.data.districtNameList
          },
          schedule: {
            type: data.data.type,
            sendTimeSchedule: data.data.sendTimeSchedule
          },
          createTime: this.formatDate(data.data.createTime),
          sentTime: this.formatDate(data.data.sendTime),
          content: {
            targetType: data.data.targetType,
            targetSn: data.data.targetSn
          }
        }
      } catch (error) {
        return false
      } finally {
        this.ui.isLoading = false
      }
    },
    getTarget (target) {
      switch (target) {
        case 1:
          return `${this.$t('option.targetType.notice')}`
        case 2:
          return `${this.$t('option.targetType.promotion')}`
        case 3:
          return `${this.$t('option.targetType.serviceAgreement')}`
        case 4:
          return `${this.$t('option.targetType.hotel')}`
        case 5:
          return `${this.$t('option.targetType.faq')}`
        case 6:
          return `${this.$t('option.targetType.inviteFriend')}`
        case 7:
          return `${this.$t('option.targetType.openApp')}`
        case 8:
          return `${this.$t('option.targetType.mileagePoint')}`
        case 9:
          return `${this.$t('option.targetType.directDiscount')}`
        case 10:
          return `${this.$t('option.targetType.signup')}`
        case 11:
          return `${this.$t('option.targetType.promotionGroup')}`
        case 12:
          return `${this.$t('option.targetType.amenityPack')}`
        case 13:
          return `${this.$t('option.targetType.hotelGo2Choice')}`
      }
    },
    async sendNotificationDetails () {
      this.ui.isSubmiting = true
      try {
        await sendNotificationDetails(this.$route.params.sn)
        this.$message({
          type: 'success',
          message: `${this.$t('message.sendSuccess')}`
        })
        this.$router.push({ name: 'notification' })
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
  .mr-mt-1 {
    margin-right: 10px;
    margin-top: 10px;
  }

  .notification {
    &__button {
      margin-top: 2em;
      display: flex;;
      justify-content: flex-end;
    }
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
    &__flex {
      align-items: center;
      display: flex;
    }
  }
</style>
