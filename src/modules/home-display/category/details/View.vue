<template>
  <div>
    <sa-section class="category-details">
      <div
        v-for="(item, index) in ui.displayCategoryDetails"
        :key="index"
        class="category-details__card"
      >
        <p class="category-details__card--left">
          {{ $t(`page.dashboard.${item}`) }}
        </p>
        <p v-if="item==='lastUpdate'"
          class="category-details__card--right"
        >
          {{ formatDate(categotyDetails[item]) }}
        </p>
        <p v-else-if="item==='category'">
          {{ categotyDetails.title1 }}
        </p>
        <p v-else-if="item==='display'">
          {{ categotyDetails[item] === 1 ? '✓' : '' }}
        </p>
        <p v-else>
          {{ categotyDetails[item] }}
        </p>
      </div>
    </sa-section>
    <sa-section
      v-if="listHomeCollections.length"
      title="Hotel Collections"
    >
      <el-table
        :data="listHomeCollections"
      >
        <el-table-column
          type="index"
          label="#"
          min-width="2"
        >
        </el-table-column>
        <el-table-column
          :label="$t('page.dashboard.title')"
          min-width="75"
        >
          <template slot-scope="scope">
            <router-link :to="{ name: 'collectionDetails', params: { sn: scope.row.sn } }">
              {{ scope.row.title }}
            </router-link>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('page.dashboard.display')"
          min-width="5"
        >
          <template slot-scope="scope">
            {{ scope.row.display === 1 ? '✓': '' }}
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('page.dashboard.display_type')"
          min-width="5"
        >
          <template slot-scope="scope">
            <p v-if="scope.row.displayType == 1">{{$t('page.collection.detail')}}</p>
            <p v-else-if="scope.row.displayType == 2">{{$t('page.collection.collection')}}</p>
            <p v-else-if="scope.row.displayType == 3">{{$t('page.collection.summary')}}</p>
            <p v-else-if="scope.row.displayType == 4">{{$t('page.collection.circle')}}</p>
        </template>
        </el-table-column>
        <el-table-column
          prop="idx"
          :label="$t('page.dashboard.order')"
          min-width="5"
        />
        <el-table-column
          :label="$t('page.dashboard.lastUpdate')"
          min-width="8"
        >
          <template slot-scope="scope">
            {{ formatDate(scope.row.lastUpdate) }}
          </template>
        </el-table-column>
      </el-table>
    </sa-section>
    <div class="category-details__footer">
      <el-button type="success" size="large" @click="$router.back()" style="text-align: right;">
        {{$t('button.back')}}
      </el-button>
    </div>
  </div>
</template>
<script>
import SaSection from '@/components/globals/SaSection.vue'
import { getCategotyDetails } from './api'
import { fetchHomeCollections } from '../../collection/list/api'
export default {
  components: { SaSection },
  name: 'CategoryDetails',
  data: () => {
    return {
      ui: {
        loading: false,
        displayCategoryDetails: [
          'category',
          'display',
          'lastUpdate',
          'title1',
          'title2',
          'title3',
          'content'
        ]
      },
      categotyDetails: {},
      listHomeCollections: []
    }
  },
  created () {
    this.getCategotyDetails()
    if (this.$route.params.sn === '4') {
      this.fetchHomeCollections()
    }
  },
  methods: {
    async getCategotyDetails () {
      this.ui.loading = true
      try {
        const { data } = await getCategotyDetails(this.$route.params.sn)
        this.categotyDetails = data.data
      } catch (error) {
        return false
      } finally {
        this.ui.loading = false
      }
    },
    async fetchHomeCollections () {
      this.ui.loading = true
      try {
        const { data } = await fetchHomeCollections()
        this.listHomeCollections = data.data
      } catch (error) {
        return false
      } finally {
        this.ui.loading = false
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.category-details {
  &__card {
    padding: 16px;
    display: flex;
    align-items: center;
    &--left {
      width: 35%;
      font-weight: 600;
    }
    &--right {
      width: 65%;
    }
  }
  &__card:not(:last-child) {
    border-bottom: 1px solid rgba(0, 0, 0, 0.125);
  }
  &__footer {
    width: 100%;
    text-align: right;
  }
}
</style>
