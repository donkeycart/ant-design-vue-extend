<template>
    <a-popover v-model="visible"
               trigger="click"
               placement="bottomRight"
               overlayClassName="header-notice-wrapper"
               :autoAdjustOverflow="true"
               :arrowPointAtCenter="true"
               :overlayStyle="{ width: '550px', top: '50px' }">
        <template slot="content">
            <a-spin :spinning="loadding">
                <a-list :grid="{ gutter: 3, column: 4 }"
                        :dataSource="data">
                    <a-list-item slot="renderItem" slot-scope="item">
                        <a-card >
                            <img alt="example"
                                 src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                                 slot="cover"/>
                            <a-card-meta :title="item.title"></a-card-meta>
                        </a-card>
                    </a-list-item>
                </a-list>
            </a-spin>
        </template>
        <span @click="fetchAppstore" class="header-notice">
            <a-icon style="font-size: 20px; padding: 4px" type="appstore"/>
        </span>
    </a-popover>
</template>

<script>

const data = [
    {
        title: 'Title 1'
    },
    {
        title: 'Title 2'
    },
    {
        title: 'Title 3'
    },
    {
        title: 'Title 4'
    }
]

export default {
    name: 'HeaderWebApps',
    data () {
        return {
            loadding: false,
            data,
            visible: false
        }
    },
    methods: {
        fetchAppstore () {
            if (!this.visible) {
                this.loadding = true
                setTimeout(() => {
                    this.loadding = false
                }, 2000)
            } else {
                this.loadding = false
            }
            this.visible = !this.visible
        }
    }
}
</script>

<style lang="css">
    .header-notice-wrapper {
        top: 50px !important;
    }
</style>

<style lang="less" scoped>
    .header-notice {
        display: inline-block;
        transition: all 0.3s;

        span {
            vertical-align: initial;
        }
    }
</style>
