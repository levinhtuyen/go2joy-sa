<template>
<div class="dashboard-block">
    <div class="product-type-mgt-segment" v-loading="ui.loadingProductType">

        <!-- Start Contentbar-->
        <div class="product-type-mgt-segment__filter">
          <el-button type="warning" icon="el-icon-plus" @click="onDirectAdd" plain>{{ $t('button.add') }}</el-button>
        </div>
        <el-table
          :data="tableData"
          class="product-type-mgt-segment__table"
        >
          <el-table-column
            type="index"
            label="#"
            min-width="2"
          />
          <el-table-column
            :label="$t('page.productType.name_product_type')"
            min-width="8"
          >
            <template slot-scope="scope">
                <p v-if="getLocalize === `vi`"> {{ scope.row.name }} </p>
                <p v-else> {{ scope.row.nameEn }} </p>
            </template>
          </el-table-column>
          <el-table-column
            :label="$t('page.productType.image_product_type')"
            min-width="8"
          >
            <template slot-scope="scope">
              <div class="table-image">
                <el-image :src="formatImage(scope.row.imagePath)" alt=""></el-image>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            :label="$t('page.productType.status_product_type')"
            min-width="4"
          >
            <template slot-scope="scope">
              <el-switch
              @change="changeStatusProduct(scope.row.sn,scope.row.status)" :active-value="activeValue"
              :inactive-value="inactiveValue"
              v-model="scope.row.status">
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column
            :label="$t('page.productType.last_update_product_type')"
            min-width="8"
          >
            <template slot-scope="scope">
              <span> {{ formatDate(scope.row.lastUpdate) }}</span>
            </template>
          </el-table-column>
          <el-table-column
            :label="$t('page.productType.operations')"
            align="center"
            min-width="5"
          >
            <template slot-scope="scope">
              <el-popover
                placement="left"
                trigger="click"
              >
                <i slot="reference" class="operations el-icon-more" />
                <div style="padding: 8px 12px;">
                  <el-button
                    type="success"
                    plain
                    size="small"
                    icon="el-icon-edit"
                    @click="onEditProduct(scope.row.sn)"
                  >
                    {{ $t('button.edit')}}
                  </el-button>
                  <el-button
                    type="text"
                    plain
                    size="small"
                    @click="onDirectDSKS(scope.row.sn)"
                  >
                    {{ $t('button.dsks')}}
                  </el-button>
                </div>
              </el-popover>
            </template>
          </el-table-column>
        </el-table>
        <div class="product-type-mgt-segment__footer">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :page-sizes="[10, 20, 30, 40, 50]"
            :page-size="pagination.perPage"
            layout="total, sizes, prev, pager, next, jumper"
            :total="pagination.total">
          </el-pagination>
        </div>
      </div>
</div>
</template>

<script>
// @ is an alias to /src
import {
  getProductTypeList,
  changeStatusProductType
} from './api'
export default {
  name: 'ProductMgt',
  components: {
  },
  data () {
    return {
      ui: {
        loadingProductType: false
      },

      pagination: {},
      query: {
        limit: 10,
        page: 1,
        keyword: '',
        type: 0
      },
      tableData: [],
      activeValue: 1,
      inactiveValue: 0
    }
  },
  async created () {
    await this.getProductsList(this.query)
  },
  computed: {
    getLocalize () {
      return this._i18n.locale
    }
  },
  methods: {
    async getProductsList (params) {
      this.ui.loadingProductType = true
      try {
        const { data } = await getProductTypeList(params)
        this.tableData = data.data.hotelProductTypes
        this.pagination = data.data.meta
      } catch (error) {
        return false
      } finally {
        this.ui.loadingProductType = false
      }
    }, // getListReview

    async changeStatusProduct (sn, status) {
      this.ui.loadingProductType = true
      const json = {
        hotelProductType: [{
          op: 'replace',
          path: '/status',
          value: status
        }]
      }
      try {
        await changeStatusProductType(sn, json)
        this.$message({
          type: 'success',
          message: `${this.$t('Update success')}`
        })
        this.getProductsList()
      } catch (error) {
        return false
      } finally {
        this.ui.loadingProductType = false
      }
    }, // changeStatusProduct

    onEditProduct (id) {
      this.$router.push({ name: 'product_type_edit', params: { id: id } })
    },
    onDirectAdd () {
      this.$router.push({ name: 'product_type_create' })
    },
    onDirectDSKS (id) {
      this.$router.push({ name: 'product_mgt', params: { filter: id } })
    },
    handleSizeChange (value) {
      // this.pagination.perPage = value
      this.query.limit = value
      this.getProductsList(this.query)
    },
    handleCurrentChange (value) {
      // this.pagination.currentPage = value
      this.query.page = value
      this.getProductsList(this.query)
    }

  }
}
</script>

<style lang="scss" scoped>
.operations {
  cursor: pointer;
  transform: rotate(90deg);
  &:hover {
    color: #ff6400;
  }
}
.el-table th, .el-table .custom-style-background{
  background-color: #fce5e5 !important;
}
.product-type-mgt-segment{
    min-height: calc(100vh - 150px );
    background-color: #ffffff;
    padding: 30px;

  .el-table {
    td {
      font-size: 12px;
    }
    .table-image{
      width:200px;
      height:150px;
      img{
        width: 100%;
        object-fit: cover;
        height: 100%;
      }
    }
  }
  &__header {
    margin-bottom: 20px;
    &--red {
      color: #F56C6C;
    }
  }
  &__footer {
    margin-top: 30px  ;
  }
  &__filter {
    width: 100%;
    button{
      float: right;
    }
  }
}

@media (max-width: 1200px) {
  .operations {
    color: green;
  }
}

</style>
