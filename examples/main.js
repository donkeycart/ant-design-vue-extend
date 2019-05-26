import Vue from 'vue'
import Antd from 'ant-design-vue'
import AntdE from '../packages/index.js'
import 'ant-design-vue/dist/antd.less'
import App from './App.vue'

Vue.use(Antd)
Vue.use(AntdE)

Vue.config.productionTip = false

new Vue({
    render: h => h(App)
}).$mount('#app')
