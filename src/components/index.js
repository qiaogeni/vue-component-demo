import QueryPage from '@/components/src/query-page'
import InfoPage from '@/components/src/info-page'
import Breadcrumb from '@/components/src/breadcrumb'
import SearchForm from '@/components/src/search-form'
import TableList from '@/components/src/table-list'

const lutil = {
  install(Vue) {
    Vue.component('l-info', InfoPage)
    Vue.component('l-query', QueryPage)
    Vue.component('l-bread', Breadcrumb)
    Vue.component('l-search', SearchForm)
    Vue.component('l-table', TableList)
  }
}

export default lutil
