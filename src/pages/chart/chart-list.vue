<template>
  <div>
    <l-query ref="query" :query-config="queryConfig" @doAdd="add"></l-query>
    <chartInfo ref="chartInfo"></chartInfo>
  </div>
</template>
<script>
import Store from '@/assets/js/service/store.js'

export default {
  data() {
    return {
      queryConfig: {
        url: 'api/v1/dataruleEchart/query',
        para: {
          echatId: 0
        },
        formItems: [
          {
            type: 'input',
            label: '图表',
            model: 'echartName',
            width: 120
          }
        ],
        columns: [
          {
            title: '图表Id',
            key: 'echartId'
          },
          {
            title: '图表名称',
            key: 'echartName'
          },
          {
            title: '操作',
            key: 'action',
            width: 200,
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h(
                  'Button',
                  {
                    props: {
                      type: 'info',
                      size: 'small'
                    },
                    style: {
                      marginRight: '5px'
                    },
                    on: {
                      click: () => {
                        this.modify(params.row.echartId)
                      }
                    }
                  },
                  '修 改'
                ),
                h(
                  'Button',
                  {
                    props: {
                      type: 'info',
                      size: 'small'
                    },
                    style: {
                      marginRight: '5px'
                    },
                    on: {
                      click: () => {
                        this.view(params.row.echartId)
                      }
                    }
                  },
                  '查 看'
                ),
                h(
                  'Button',
                  {
                    props: {
                      type: 'error',
                      size: 'small'
                    },
                    on: {
                      click: () => {
                        this.remove(params.row.echartId)
                      }
                    }
                  },
                  '删 除'
                )
              ])
            }
          }
        ],
        tableData: [],
        total: 0
      },
      master: {
        echartId: 0,
        echartName: '',
        dataDimension: '',
        timeRange: '',
        timeUnit: '',
        step: '',
        stepUnit: '',
        isvalid: 1
      }
    }
  },
  methods: {
    // 新增
    add() {
      this.$refs.chartInfo.visible = true
      let params = JSON.parse(JSON.stringify(this.master))
      params.dataDimension = []
      this.$refs.chartInfo.params = params
    },
    // 修改
    modify(id) {
      this.$http.send('api/v1/dataruleEchart/query', { echartId: id }, 'json').then(res => {
        if (res.code === 200) {
          let params = JSON.parse(JSON.stringify(res.result))
          params.dataDimension = params.dataDimension.split(',')
          this.$refs.chartInfo.params = params
          this.$refs.chartInfo.visible = true
        }
      })
    },
    view(id) {
      const { href } = this.$router.resolve({ path: '/extend/chart', query: { id: id } })
      window.open(href, '_blank')
    },
    // 删除
    remove(id) {
      this.$Modal.confirm({
        title: '确定删除该条数据？',
        onOk: () => {
          this.$http.send('api/v1/dataruleEchart/deleteByUpdate', { echatId: id }).then(res => {
            if (res.code === 200) {
              this.$Message.success('删除成功')
              Store.$emit('search')
            }
          })
        }
      })
    }
  },
  components: {
    chartInfo: () => import('@/pages/chart/chart-dialog.vue')
  }
}
</script>
<style>
</style>
