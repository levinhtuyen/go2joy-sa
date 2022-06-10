<template>
  <div class="counselings-mgt">
    <sa-section>
      <div class="counselings-mgt__filter">
        <div class="float-left">
          <p>
            <span class="un-read"></span>
            <b>{{$t('page.counselingMgt.unread')}}</b>
          </p>
          <el-form :inline="true" :model="query" class="demo-form-inline">
              <el-form-item>
                <el-input
                  v-model="query.keyword"
                  :placeholder="$t('placeholder.keyword')"
                  clearable
                  prefix-icon="el-icon-search"
                />
              </el-form-item>
              <el-form-item>
                <el-button
                  plain
                  icon="el-icon-download"
                  @click="onSearch"
                >
                  {{ $t('button.search') }}
                </el-button>
              </el-form-item>
          </el-form>
        </div>
        <div class="float-right">
          <el-button
            type="danger"
            plain
            @click="onCreate"
          >
            <i class="el-icon-plus" />
            {{$t('button.add')}}
          </el-button>
        </div>
      </div>
      <div class="counselings-mgt__table">
        <el-table
          :data="data"
          :row-class-name="rowContentStyle"
          v-loading="isLoadingCounselings"
        >
          <el-table-column
            label="#"
            type="index"
          />
          <el-table-column
            :label="$t('page.counselingMgt.scope')"
            :width="160"
          >
            <template slot-scope="scope">
              {{ scope.row.scope === 1 ? $t('option.public') : $t('option.private') }}
            </template>
          </el-table-column>
          <el-table-column
            :label="$t('page.counselingMgt.title')"
            :width="160"
          >
            <template slot-scope="scope">
              {{ scope.row.title }}
            </template>
          </el-table-column>
          <el-table-column
            :label="$t('page.counselingMgt.nickname')"
            :width="160"
          >
            <template slot-scope="scope">
              {{ scope.row.nickName }}
            </template>
          </el-table-column>
          <el-table-column
            :label="$t('page.counselingMgt.create_time')"
            :width="220"
          >
            <template slot-scope="scope">
              {{ scope.row.createTime }}
            </template>
          </el-table-column>
          <el-table-column
            :label="$t('page.counselingMgt.last_update')"
            :width="180"
          >
            <template slot-scope="scope">
              <p>
                {{ scope.row.lastUpdate }}
              </p>
            </template>
          </el-table-column>
          <el-table-column
            :label="$t('page.userMgt.operations')"
            align="center"
            :width="120"
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
                    @click="onDirectEdit(scope.row.sn)"
                  >
                    {{ $t('button.reply') }}
                  </el-button>
                  <el-button
                    type="danger"
                    plain
                    size="small"
                    icon="el-icon-delete"
                    @click="onDelete(scope.row.sn)"
                  >
                    {{ $t('button.delete') }}
                  </el-button>
                </div>
              </el-popover>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          @size-change="onSizeChange"
          @current-change="onCurrentChange"
          :page-sizes="[10, 20, 30, 40, 50]"
          :page-size="pagination.perPage"
          :current-page="query.page"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pagination.total">
        </el-pagination>
      </div>
    </sa-section>
  </div>
</template>
<script>
import saSection from '@/components/globals/SaSection.vue'
import { listCounseling, onDeleteCounseling } from './api'

export default {
  name: 'CounselingsMgt',
  components: {
    saSection
  },
  data: () => {
    return {
      pagination: {},
      query: {
        limit: 10,
        page: 1,
        keyword: ''
      },
      data: [],
      isLoadingCounselings: false,
      dateRange: []
    }
  },
  created () {
    this.listCounseling({ limit: this.query.limit })
  },
  watch: {

  },
  methods: {
    async listCounseling (query) {
      this.isLoadingCounselings = true
      try {
        const { data } = await listCounseling(query)
        this.data = data.data.counselings
        this.pagination = data.data.meta
      } catch (error) {
        return false
      } finally {
        this.isLoadingCounselings = false
      }
    },
    onSearch () {
      this.listCounseling(this.query)
    },
    onSizeChange (size) {
      this.query.limit = size
      if (Math.ceil(this.pagination.total / size) < this.pagination.currentPage) {
        this.pagination.currentPage = Math.ceil(this.pagination.total / size)
      }// when curent page is larger than total page
      this.listCounseling(this.query)
    },
    onCurrentChange (currentPage) {
      this.query.page = currentPage
      this.listCounseling(this.query)
    },
    onDirectEdit (sn) {
      this.$router.push({ name: 'replyCounselings', params: { sn: sn } })
    },
    onCreate () {
      this.$router.push({ name: 'createCounselings' })
    },
    async onDelete (sn) {
      this.$confirm(this.$t('table.deleteButton.message_alert'), this.$t('table.deleteButton.message_warning'), {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(async () => {
        try {
          await onDeleteCounseling(sn)
          this.listCounseling(this.query)
          this.$message({
            type: 'success',
            message: this.$t('message.success')
          })
        } catch (error) {
          return false
        }
      })
    },
    rowContentStyle ({ row, rowIndex }) {
      if (row.qaStatus === 1) {
        return ' un-read'
      } else {
        return ''
      }
    }
  }
}
</script>
<style lang="scss">
.counselings-mgt__filter{

}
.un-read {
  background-color: #5dcc0b7d !important;
  margin: 5px;
  padding-left: 30px;
  padding-top: 10px;
}
</style>
