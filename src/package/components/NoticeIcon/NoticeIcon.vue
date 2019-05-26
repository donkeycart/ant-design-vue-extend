<template>
    <a-popover v-model="visible"
               trigger="click"
               placement="bottomRight"
               overlayClassName="header-notice-wrapper"
               :autoAdjustOverflow="true"
               :arrowPointAtCenter="true"
               :overlayStyle="{ width: '500px', top: '50px', height: '600px' }">
        <template slot="content">

            <a-spin :spinning="loadding">
                <a-list :pagination="pagination"
                        itemLayout="vertical"
                        size="small"
                        :dataSource="messageData">
                    <div slot="header">
                        <a-row type="flex" justify="center">
                            <a-col>
                                <a-radio-group :defaultValue="filter.isRead" size="small" @change="loadMyMessageByType">
                                    <a-radio-button value="">全部消息</a-radio-button>
                                    <a-radio-button value="Y">已读消息</a-radio-button>
                                    <a-radio-button value="N">未读消息</a-radio-button>
                                </a-radio-group>
                            </a-col>
                        </a-row>
                    </div>
                    <a-list-item slot="renderItem" slot-scope="item">
                        <a-list-item-meta>
                            <a slot="title" :href="item.href"><ellipsis :length="30">{{item.title}}</ellipsis></a>
                            <a-avatar title="发送人头像" slot="avatar" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>
                        </a-list-item-meta>
                        <ellipsis :length="170">{{item.body}}</ellipsis>
                    </a-list-item>
                </a-list>
            </a-spin>
        </template>
        <span @click="fetchNotice" class="header-notice">
            <a-badge :count="messageCount"><a-icon style="font-size: 20px; padding: 4px" type="bell"/></a-badge>
        </span>
    </a-popover>
</template>

<script>
import { Ellipsis } from '@/components'
import ACol from 'ant-design-vue/es/grid/Col'

export default {
    name: 'HeaderNotice',
    components: {
        ACol,
        Ellipsis
    },
    data () {
        return {
            loadding: false,
            visible: false,
            messageCount: 0,
            messageData: [],
            pagination: {
                onChange: (page) => {
                    this.filter.pageNo = page
                    this.loadMyMessage()
                },
                pageSize: 5
            },
            filter: {
                pageSize: 5,
                isRead: 'N',
                pageNo: 0
            }
        }
    },
    created () {
        this.loadMyMessage()
    },
    methods: {
        fetchNotice () {
            if (!this.visible) {
                this.loadMyMessage()
            } else {
                this.loadding = false
            }
            this.visible = !this.visible
        },
        // 切换过滤条件
        loadMyMessageByType (event) {
            this.filter.isRead = event.target.value
            this.filter.pageNo = 0
            this.loadMyMessage()
        },
        loadMyMessage () {
            this.loadding = true
            this.$fetch.apiCommon.loadMyMessage(this.filter).then(messages => {
                this.messageCount = messages.totalCount
                this.pagination.total = messages.totalCount
                this.messageData = messages.data
                this.loadding = false
            }, reasn => {
                this.loadding = false
            })
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
