<template>
    <div class="popup">
      <sa-section
        v-loading="ui.isLoading"
      >
      <div class="popup__info">
        <div class="card-item" v-for="(item, index) in ui.form" :key="index">
          <p class="card-item__label">
            {{ $t(`page.popup.${item}`) }}
          </p>
          <p v-if="item ==='status'" class="card-item__value">
            {{ bannerDetails[item] === 0 ? $t('option.status.disable') : $t('option.status.active') }}
            /
            {{ bannerDetails.maxView !== 0 ? bannerDetails.maxView : $t('page.popup.noLimit') }}
          </p>
          <div v-else-if="item === 'targetType'" class="card-item__value">
            <router-link
              v-if="bannerDetails[item] === 10  && bannerDetails.targetSn !== null"
              :to="{ name: '', params: { sn: bannerDetails.targetSn }}">
              {{bannerDetails.targetName}}
            </router-link>

            <div v-else-if="bannerDetails[item] === 1  && bannerDetails.targetSn !== null">
              <p>{{ $t('option.targetType.promotionEvent') }}</p>
              <router-link
                :to="{ name: '', params: { sn: bannerDetails.targetSn }}">
                {{bannerDetails.targetName}}
              </router-link>
            </div>

            <router-link
              v-else-if="bannerDetails[item] === 2  && bannerDetails.targetSn !== null"
              :to="{ name: '', params: { sn: bannerDetails.targetSn }}">
              {{bannerDetails.targetName}}
            </router-link>

            <router-link
              v-else-if="bannerDetails[item] === 3  && bannerDetails.targetSn !== null"
              :to="{ name: '', params: { sn: bannerDetails.targetSn }}">
              {{bannerDetails.targetName}}
            </router-link>

            <div v-else-if="bannerDetails[item] === 4">
              <p>{{ $t('option.targetType.link') }}</p>
              <a :href="bannerDetails.targetInfo">
                {{ bannerDetails.targetInfo }}
              </a>
            </div>

            <p v-else-if="bannerDetails[item] === 5 && bannerDetails.targetSn != null">
              {{ bannerDetails.targetInfo }}
            </p>

            <p v-else-if="bannerDetails[item] === 6">{{ $t('option.targetType.mileagePoint') }}</p>
            <p v-else-if="bannerDetails[item] === 7">{{ $t('option.targetType.coupon') }}</p>
            <p v-else-if="bannerDetails[item] === 8">{{ $t('option.targetType.directDiscount') }}</p>
            <p v-else-if="bannerDetails[item] === 9">{{ $t('option.targetType.inviteFriend') }}</p>
            <p v-else-if="bannerDetails[item] === 12">{{ $t('option.targetType.amenityPack') }}</p>
            <p v-else-if="bannerDetails[item] === 13">{{ $t('option.targetType.hotelGo2Choice') }}</p>
            <p v-else></p>

          </div>
          <p v-else-if="item ==='listProvince'" class="card-item__value">
            <el-tag class="mr-mt-1" v-for="(province, index) in bannerDetails[item]" :key="index">
              {{province.name}}
            </el-tag>
          </p>
          <p v-else-if="item ==='lastUpdate'">
            {{ formatDate(bannerDetails[item]) }}
          </p>
          <p v-else-if="item ==='content'" v-html="bannerDetails[item]"></p>
          <p v-else-if="item ==='imagePath'" class="card-item__value">
            <el-image
            :src="formatImage(bannerDetails[item])"
            fit="scale-down"></el-image>
          </p>
          <p v-else class="card-item__value">
            {{ bannerDetails[item] }}
          </p>
        </div>
      </div>
    </sa-section>
  </div>
</template>
<script>
import SaSection from '@/components/globals/SaSection.vue'
import { getPopupDetails } from './api'
export default {
  name: 'PopupDetails',
  components: {
    SaSection
  },
  data () {
    return {
      ui: {
        isLoading: false,
        form: [
          'title',
          'targetType',
          'status',
          'listProvince',
          'lastUpdate',
          'content',
          'imagePath'
        ]
      },
      bannerDetails: {}
    }
  },
  created () {
    this.getPopupDetails()
  },
  methods: {
    async getPopupDetails () {
      this.ui.isLoading = true
      try {
        const { data } = await getPopupDetails(this.$route.params.sn)
        this.bannerDetails = data.data
      } catch (error) {
        return false
      } finally {
        this.ui.isLoading = false
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
</style>
