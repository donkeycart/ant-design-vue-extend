<template>
    <div class="user-wrapper">
        <div class="content-box">
            <a href="https://pro.loacg.com/docs/getting-started" target="_blank">
                <span class="action">
                  <a-icon type="question-circle-o" style="font-size: 20px; padding: 4px"></a-icon>
                </span>
            </a>
            <web-apps class="action"/>
            <notice-icon class="action"/>
            <a-dropdown>
                <span class="action ant-dropdown-link user-dropdown-menu">
                  <a-avatar class="avatar" size="small" :src="avatar()"/>
                  <span>{{ nickname() }}</span>
                </span>
                <a-menu slot="overlay" class="user-dropdown-menu-wrapper">
                    <a-menu-item key="0">
                        <router-link :to="{ name: 'center' }">
                            <a-icon type="user"/>
                            <span>个人中心</span>
                        </router-link>
                    </a-menu-item>
                    <a-menu-item key="1">
                        <router-link :to="{ name: 'settings' }">
                            <a-icon type="setting"/>
                            <span>账户设置</span>
                        </router-link>
                    </a-menu-item>
                    <a-menu-item key="2">
                        <a href="javascript:" @click="handleTest">
                            <a-icon type="setting"/>
                            <span>Debug API</span>
                        </a>
                    </a-menu-item>
                    <a-menu-divider/>
                    <a-menu-item key="3">
                        <a href="javascript:" @click="handleLogout">
                            <a-icon type="logout"/>
                            <span>退出登录</span>
                        </a>
                    </a-menu-item>
                </a-menu>
            </a-dropdown>
        </div>
    </div>
</template>

<script>

import NoticeIcon from '@/NoticeIcon'
import WebApps from '@/Webapp'
import { mapGetters } from 'vuex'

export default {
    name: 'UserMenu',
    components: {
        NoticeIcon,
        WebApps
    },
    methods: {
        ...mapGetters(['nickname', 'avatar']),
        handleLogout () {
            this.$confirm({
                title: '提示',
                content: '真的要注销登录吗 ?',
                onOk () {
                    window.location.href = './logout'
                }
            })
        },
        handleTest () {
            window.location.replace('./swagger-ui.html')
        }
    }
}
</script>
