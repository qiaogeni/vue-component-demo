<template>
  <div class="query-wrap">
    <Row class="head-wrap">
      <Col span="18">
        <l-bread></l-bread>
      </Col>
      <Col span="6" class="action-btn">
        <Button type="info" @click="cancel">返 回</Button>
        <slot name="action"></slot>
      </Col>
    </Row>
    <slot></slot>
    <l-table ref="list" :tableConfig="queryConfig" @pageChange="pageChange"></l-table>
  </div>
</template>
<script>
export default {
  /**
   * @msg: 查询参数配置
   * @param {Object} queryConfig
   */
  props: ['queryConfig'],
  data() {
    return {
      url: '', // 查询url
      backUrl: '', // 返回url
      para: {}, // 查询传参
      columns: [], // 表格参数
      data: [], // 表格数据
      total: 0, // 表格数据总数
      currentPagination: 1, // 当前页面
      currentPageSize: 10 // 每页条数
    }
  },
  methods: {
    /**
     * @msg: 查询列表
     * @param {String} url
     * @param {Object} para
     * @return: {Array} tableData 列表数据
     * @return: {Number} total 数据总数
     */
    doSearch() {
      let para = Object.assign({}, this.para, this.$refs.list.getPagenationInfo())
      this.$refs.list.loading = true
      this.$http.send(this.url, para, 'json').then(res => {
        this.$refs.list.loading = false
        if (res.code === 200) {
          this.queryConfig.tableData = res.result.list || []
          this.queryConfig.total = res.result.count
        }
      })
    },
    pageChange() {
      this.doSearch()
    },
    cancel() {
      this.$router.push({ path: this.backUrl })
    }
  },
  mounted() {
    this.url = this.queryConfig.url
    this.backUrl = this.queryConfig.backUrl
    this.para = this.queryConfig.para
    this.columns = this.queryConfig.columns
    this.doSearch()
  }
}
</script>
<style lang="less" scoped>
.query-wrap {
  padding: 5px;
  border-radius: 5px;
  box-shadow: 0 0 8px 1px silver;
  .head-wrap {
    margin-bottom: 5px;
  }
  .action-btn {
    padding-top: 5px;
    padding-right: 15px;
    text-align: right;
  }
}
</style>
