<template>
  <div class="query-form">
    <div>
      <Form :model="para" :label-width="80">
        <template v-for="(formItem, index) in queryConfig.formItems">
          <FormItem :label="formItem.label" :label-width="formItem.width" class="form-item" :key="index">
            <Input clearable v-model="para[formItem.model]" v-if="formItem.type == 'input'"></Input>
            <Select clearable filterable v-model="para[formItem.model]" v-if="formItem.type == 'select'">
              <Option :value="option.value" v-for="option in formItem.options" :key="option.value">{{option.text}}</Option>
            </Select>
            <Row v-if="formItem.type == 'datepicker'">
              <Col span="11">
                <DatePicker type="date" :value="para[formItem.model[0]]" format="yyyy-MM-dd HH:mm" @on-change="para[formItem.model[0]] = $event"></DatePicker>
              </Col>
              <Col span="2" style="text-align: center" v-if="para[formItem.model[1]]">至</Col>
              <Col span="11" v-if="para[formItem.model[1]]">
                <DatePicker type="date" :value="para[formItem.model[1]]" format="yyyy-MM-dd HH:mm" @on-change="para[formItem.model[1]] = $event"></DatePicker>
              </Col>
            </Row>
            <Row v-if="formItem.type == 'datetimepicker'">
                <Col span="10">
                <DatePicker type="datetime" :value="para[formItem.model[0]]" format="yyyy-MM-dd HH:mm" @on-change="para[formItem.model[0]] = $event" ></DatePicker>
                </Col>
                <Col span="3" style="text-align: center">至</Col>
                <Col span="10">
                <DatePicker type="datetime" :value="para[formItem.model[1]]" format="yyyy-MM-dd HH:mm" @on-change="para[formItem.model[1]] = $event" ></DatePicker>
                </Col>
            </Row>
            <RadioGroup v-model="para[formItem.model]" v-if="formItem.type == 'radio'">
              <Radio :label="option.value" v-for="option in formItem.options" :key="option.value">{{option.text}}</Radio>
            </RadioGroup>
            <CheckboxGroup v-model="para[formItem.model]" v-if="formItem.type == 'checkbox'">
              <Checkbox :label="option.value" v-for="option in formItem.options" :key="option.value">{{option.text}}</Checkbox>
            </CheckboxGroup>
            <i-switch v-model="para[formItem.model]" size="large" true-value="1" false-value="0" v-if="formItem.type == 'switch'">
              <span slot="open">On</span>
              <span slot="close">Off</span>
            </i-switch>
          </FormItem>
        </template>
        <FormItem class="text-right">
          <Button type="info" @click="doSearch">搜 索</Button>
        </FormItem>
      </Form>
    </div>
  </div>
</template>
<script>
import Store from '@/assets/js/service/store.js'
export default {
  /**
   * @msg: 查询配置
   * @param {Object} queryConfig
   * @return: {Function} doSearch
   */
  props: ['queryConfig'],
  data() {
    return {
      para: {},
      formItem: {}
    }
  },
  methods: {
    doSearch() {
      this.$emit('doSearch')
    }
  },
  mounted() {
    this.para = this.queryConfig.para
    this.formItem = this.queryConfig.formItem
  },
  created() {
    Store.$on('search', () => {
      this.doSearch()
    })
  }
}
</script>
<style lang="less" scoped>
.query-form {
  padding: 0 15px;
  .form-item {
    display: inline-block;
    margin-bottom: 10px;
    width: 400px;
  }
  .text-right {
    text-align: right;
  }
}
</style>
