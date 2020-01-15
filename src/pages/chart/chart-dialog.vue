<template>
  <Modal v-model="visible" scrollable :title="title" :mask-closable="false" @on-cancel="loading = false">
    <Form ref="formValidate" :model="params" :rules="ruleValidate" :label-width="80">
      <FormItem label="图表名称：">
        <Input v-model="params.echartName"></Input>
      </FormItem>
      <FormItem label="数据维度：">
        <Select v-model="params.dataDimension" filterable multiple>
          <Option v-for="item in dataDimensions" :value="item.id + ''" :key="item.id">{{ item.name }}</Option>
        </Select>
      </FormItem>
      <FormItem label="时间范围：">
        <Row>
          <Col :span="5">
            <Input v-model="params.timeRange"></Input>
          </Col>
          <Col :span="5" :offset="1">
            <Select v-model="params.timeUnit">
              <Option v-for="item in units" :value="item.value" :key="item.value">{{ item.text }}</Option>
            </Select>
          </Col>
          <Col :span="5" :offset="1">前</Col>
        </Row>
      </FormItem>
      <FormItem label="步长时间：">
        <Row>
          <Col :span="5">
            <Input v-model="params.step"></Input>
          </Col>
          <Col :span="5" :offset="1">
            <Select v-model="params.stepUnit">
              <Option v-for="item in units" :value="item.value" :key="item.value">{{ item.text }}</Option>
            </Select>
          </Col>
        </Row>
      </FormItem>
    </Form>
    <div slot="footer">
      <Button type="info" size="large" :loading="loading" @click="save">保存</Button>
      <Button type="info" size="large" @click="preview(params)">预览</Button>
    </div>
  </Modal>
</template>
<script>
import Store from '@/assets/js/service/store.js'

export default {
  data() {
    return {
      visible: false,
      params: {},
      ruleValidate: {},
      dataDimensions: [],
      units: [{ value: 1, text: '分钟' }, { value: 2, text: '小时' }, { value: 3, text: '天' }],
      loading: false
    }
  },
  methods: {
    getDataDimensions() {
      this.$http.send('api/v1/dataruleInfo/query', { ruleId: 0, pageNumber: 1, pageSize: 1000 }, 'json').then(res => {
        if (res.code === 200) this.dataDimensions = res.result.list
      })
    },
    // 保存
    save() {
      let params = JSON.parse(JSON.stringify(this.params))
      params.dataDimension = this.params.dataDimension.join(',')
      let url = ''
      if (params.echartId === 0) {
        url = 'api/v1/dataruleEchart/add'
      } else {
        url = 'api/v1/dataruleEchart/update'
      }
      this.loading = true
      this.$http.send(url, params, 'json').then(res => {
        this.loading = false
        if (res.code === 200) {
          this.visible = false
          this.$Message.success('保存成功')

          Store.$emit('search')
        }
      })
    },
    preview(params) {
      const { href } = this.$router.resolve({
        path: '/extend/chart',
        name: 'chart',
        query: params
      })
      window.open(href, '_blank')
    }
  },
  computed: {
    title: function() {
      return this.params.echartId === 0 ? '新增' : '修改'
    }
  },
  mounted() {
    this.getDataDimensions()
  }
}
</script>
