<template>
  <sa-section v-if="$route.fullPath === '/hotel/sadmin/collection'">
    <template slot="header">
      <div>
        <el-input
          v-model="filter.keyword"
          :placeholder="$t('placeholder.search')"
          style="width: 350px; margin-right: 16px;"
          prefix-icon="el-icon-search"
          @input="handleSearch"></el-input>
        <el-select
          v-model="filter.type"
          @change="fetchHomeCollections"
        >
          <el-option
            v-for="item, id in ui.type"
            :key="id"
            :value="item.value"
            :label="item.label"
          ></el-option>
        </el-select>
      </div>
      <el-button
        plain
        type="success"
        icon="el-icon-plus"
        @click="$router.push({ name: 'collectionCreate' })"
      >
        {{ $t('button.add') }}
      </el-button>
    </template>
    <table
      v-loading="ui.loading"
      class="table-components data-table"
      >
      <thead>
        <th class="table-head" v-for="(item, index) in ui.tableColumns" :key="index">
          <p v-if="item.prop === 'firstColumn'">
            #
          </p>
          <p v-else :class="{ 'align-center': item.prop === 'operations' || item.prop === 'display' }">{{ $t(`${item.label}`) }}</p>
        </th>
      </thead>
      <!-- <draggableComponent
        v-model="listHomeCollections"
        tag="tbody"
        @change="changePosition"
        class="draggable"
      > -->
      <tbody>
        <tr v-for="(dataRow, index) in listHomeCollections"
          :key="index + 1"
        >
          <td
            v-for="(item, index) in ui.tableColumns"
            :key="index"
          >
            <div v-if="item.prop === 'firstColumn'" style="width: 100%; height: 100%; cursor: pointer;">
              <!-- <i class="el-icon-menu"></i> -->
              <el-checkbox
                v-model="position[dataRow.sn]"
                @change="changePosition(dataRow.sn)">
              </el-checkbox>
            </div>
            <div v-if="item.prop=== 'type'">
              <p v-if="dataRow.flashSale == 1">{{$t('page.collection.flashSale')}}</p>
              <p v-else-if="dataRow.promotion == 1">{{$t('page.collection.promotion')}}</p>
              <p v-else-if="dataRow.directDiscount == 1">{{$t('page.collection.directDiscount')}}</p>
              <p v-else-if="dataRow.amenityPackHotel == 1">{{$t('page.collection.amenityPackHotel')}}</p>
              <p v-else-if="dataRow.hotHotel == 1">{{$t('page.collection.hotHotel')}}</p>
              <p v-else-if="dataRow.loveHotel == 1">{{$t('page.collection.loveHotel')}}</p>
              <p v-else-if="dataRow.newHotel == 1">{{$t('page.collection.newHotel')}}</p>
              <p v-else-if="dataRow.travelHotel == 1">{{$t('page.collection.travelHotel')}}</p>
              <p v-else-if="dataRow.stamp == 1">{{$t('page.collection.stamp')}}</p>
              <p v-else-if="dataRow.image360 == 1">{{$t('page.collection.image360')}}</p>
              <p v-else-if="dataRow.hotelReview == 1">{{$t('page.collection.hotelReview')}}</p>
              <p v-else-if="dataRow.hotelSearched == 1">{{$t('page.collection.hotSearched')}}</p>
              <p v-else-if="dataRow.hotelBooked == 1">{{$t('page.collection.hotelBooked')}}</p>
              <p v-else-if="dataRow.hotelFavorite == 1">{{$t('page.collection.hotelFavorite')}}</p>
              <p v-else-if="dataRow.hotelSuggestion == 1">{{$t('page.collection.hotelSuggestion')}}</p>
              <p v-else-if="dataRow.g2jCertified == 1">{{$t('page.collection.g2jCertified')}}</p>
              <p v-else-if="dataRow.promotionSuggestion == 1">{{$t('page.collection.promotionSuggestion')}}</p>
              <p v-else-if="dataRow.quarantine == 1">{{$t('page.collection.quarantine')}}</p>
            </div>
            <router-link
              v-else-if="item.prop === 'title'"
              :to="{ name: 'collectionDetails', params: { sn: dataRow.sn } }"
            >
              {{ dataRow[item.prop] }}
            </router-link>
            <p v-else-if="item.prop === 'display'"  style="text-align: center;"> {{ dataRow[item.prop] === 1 ? '✔' : '' }}</p>
            <div v-else-if="item.prop === 'displayType'">
              <p>{{$t(ui.displayType[dataRow.displayType])}}</p>
            </div>
            <div
              v-else-if="item.prop === 'operations'"
              style="text-align: center;"
            >
              <el-popover
                placement="left"
                trigger="click"
              >
                <i slot="reference" class="operations el-icon-more" />
                <div style="padding: 8px 12px;">
                  <el-button
                    type="success"
                    size="small"
                    plain
                    @click="handleEdit(dataRow.sn)"
                    icon="el-icon-edit"
                  >
                    {{$t('page.collection.edit')}}
                  </el-button>
                  <el-button
                    v-if="dataRow.promotionSuggestion != 1"
                    type="edit"
                    size="small"
                    plain
                    icon="el-icon-menu"
                    @click="onDirecHotelList(dataRow.sn)"
                  >
                    {{$t('page.collection.hotelList')}}
                  </el-button>
                </div>
              </el-popover>
            </div>
            <p v-else>{{ dataRow[item.prop] }}</p>
          </td>
        </tr>
      </tbody>
      <!-- </draggableComponent> -->
    </table>
  </sa-section>
  <router-view v-else />
</template>
<script>
// import draggableComponent from '@/utils/draggable.js'
import SaSection from '@/components/globals/SaSection.vue'
import { fetchHomeCollections, sortHotelCollectionV1 } from './api'
import { debounce } from '@/utils/helpers'
const timeDebounce = 500
export default {
  name: '',
  components: {
    SaSection
    // draggableComponent
  },
  data: (vm) => {
    return {
      listHomeCollections: [],
      filter: {
        keyword: '',
        type: ''
      },
      position: [],
      ui: {
        loading: false,
        displayType: {
          1: 'page.collection.detail',
          2: 'page.collection.collection',
          3: 'page.collection.summary',
          4: 'page.collection.circle',
          5: 'page.collection.lightSquare',
          6: 'page.collection.darkSquare',
          7: 'page.collection.rectangle1',
          8: 'page.collection.rectangle2',
          9: 'page.collection.icon'
        },
        tableColumns: [
          {
            prop: 'firstColumn'
          },
          {
            prop: 'type',
            label: 'page.collection.type'
          },
          {
            prop: 'title',
            label: 'page.collection.title1'
          },
          {
            prop: 'display',
            label: 'page.collection.display'
          },
          {
            prop: 'displayType',
            label: 'page.collection.displayType'
          },
          {
            prop: 'lastUpdate',
            label: 'page.collection.lastUpdate'
          },
          {
            prop: 'operations',
            label: 'page.collection.operations'
          }
        ],
        type: [
          {
            label: vm.$t('page.collection.allType'),
            value: ''
          },
          {
            label: vm.$t('page.collection.flashSale'),
            value: 1
          },
          {
            label: vm.$t('page.collection.promotion'),
            value: 2
          },
          {
            label: vm.$t('page.collection.directDiscount'),
            value: 3
          },
          {
            label: vm.$t('page.collection.amenityPackHotel'),
            value: 4
          },
          {
            label: vm.$t('page.collection.loveHotel'),
            value: 5
          },
          {
            label: vm.$t('page.collection.travelHotel'),
            value: 6
          },
          {
            label: vm.$t('page.collection.hotHotel'),
            value: 7
          },
          {
            label: vm.$t('page.collection.newHotel'),
            value: 8
          },
          {
            label: vm.$t('page.collection.stamp'),
            value: 9
          },
          {
            label: vm.$t('page.collection.image360'),
            value: 10
          },
          {
            label: vm.$t('page.collection.hotelReview'),
            value: 11
          },
          {
            label: vm.$t('page.collection.hotSearched'),
            value: 12
          },
          {
            label: vm.$t('page.collection.hotelBooked'),
            value: 13
          },
          {
            label: vm.$t('page.collection.hotelFavorite'),
            value: 14
          },
          {
            label: vm.$t('page.collection.hotelSuggestion'),
            value: 15
          },
          {
            label: vm.$t('page.collection.g2jCertified'),
            value: 16
          },
          {
            label: vm.$t('page.collection.quarantine'),
            value: 17
          }
        ]
      },
      positionsSelected: []
    }
  },
  watch: {
    '$route.fullPath' (fullPath) {
      if (fullPath === '/hotel/sadmin/collection') {
        this.fetchHomeCollections()
      }
    }
  },
  created () {
    if (this.$route.fullPath === '/hotel/sadmin/collection') {
      this.fetchHomeCollections()
    }
  },
  methods: {
    handleSearch: debounce(function () {
      this.fetchHomeCollections()
    }, timeDebounce),
    async fetchHomeCollections () {
      this.ui.loading = true
      try {
        const { data } = await fetchHomeCollections(this.filter)
        this.listHomeCollections = data.data
      } catch (error) {
        return false
      } finally {
        this.ui.loading = false
      }
    },
    handleEdit (sn) {
      this.$router.push({ name: 'collectionEdit', params: { sn: sn } })
    },
    async changePosition (sn) {
      try {
        this.positionsSelected.push(sn)
        if (this.positionsSelected.length === 2) {
          this.ui.loading = true
          await sortHotelCollectionV1(this.positionsSelected)
          this.position[this.positionsSelected[0]] = false
          this.position[this.positionsSelected[1]] = false
          this.positionsSelected = []
          this.fetchHomeCollections()
        }
      } catch (error) {
        return false
      }
    },
    // async changePosition (e) {
    //   if (!e.moved) {
    //     return false
    //   }
    //   const query = `positionBefore=${e.moved.oldIndex}&positionAfter=${e.moved.newIndex}`
    //   try {
    //     await sortHotelCollection(query)
    //     const message = this.$t('page.collection.editSuccess')
    //     this.$message({
    //       type: 'success',
    //       message: message
    //     })
    //   } catch (error) {
    //     return false
    //   } finally {
    //     this.ui.loading = false
    //   }
    // },
    onDirecHotelList (sn) {
      this.$router.push({ name: 'selectApplyHotel', params: { sn: sn } })
    }
  }
}
</script>
<style lang="scss" scoped>
.draggable {
  tr {
    cursor: pointer;
  }
  tr:hover {
    td {
      background-color: #F5F7FA;
    }
  }
  .firstColumn {
    width: 2%;
  }
  .type, .display, .displayType, .lastUpdate, .operations {
    width: 12%;
  }
  .title {
    width: 38%;
  }
  td, th {
    padding: 12px 0;
    transition: background-color .25s ease;
    min-width: 0;
    box-sizing: border-box;
    text-overflow: ellipsis;
    vertical-align: middle;
    position: relative;
    text-align: left;
    color: #606266;
  }
}
.align-center {
  text-align: center;
}
.operations {
  cursor: pointer;
  transform: rotate(90deg);
  &:hover {
    color: #ff6400;
  }
}
</style>
