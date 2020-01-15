<template>
  <div class="table">
    <div class="table-list">
      <Table width="100%" border :loading="loading" :columns="tableConfig.columns" :data="tableConfig.tableData"></Table>
    </div>
    <div class="table-pagination">
      <Page
        :total="tableConfig.total"
        show-elevator
        show-sizer
        show-total
        :page-size-opts="pageSizes"
        :page-size="currentPageSize"
        :current="currentPage"
        @on-change="handleCurrentChange"
        @on-page-size-change="handleSizeChange"
      />
    </div>
  </div>
</template>

<script>
export default {
  /**
   * @msg: 表格
   * @param {Array} columns  表格参数
   * @param {Array} tableData  表格数据
   * @param {Number} total  表格数据总数
   * @return: {Function} pageChange 页码修改时触发
   */
  props: ['tableConfig'],
  data() {
    return {
      loading: false,
      currentPageSize: 10,
      currentPage: 1,
      pageSizes: this.pageSize || [10, 20, 30, 40, 50]
    }
  },
  methods: {
    getPagenationInfo: function() {
      return {
        pageSize: this.currentPageSize,
        pageNumber: this.currentPage
      }
    },
    handleSizeChange(val) {
      this.currentPageSize = val
      this.$emit('pageChange')
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.$emit('pageChange')
    }
  },
  watch: {
    'tableConfig.total': function(val, oldVal) {
      let realPage = Math.ceil(val / this.currentPageSize)
      if (this.currentPage > realPage && val !== 0) {
        this.currentPage = realPage
        this.$emit('pageChange')
      }
    }
  }
}
</script>
<style scoped>
.table-pagination {
  margin-top: 5px;
}
</style>
