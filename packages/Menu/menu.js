import { mapGetters } from 'vuex'
import Menu from 'ant-design-vue/es/menu'
import Icon from 'ant-design-vue/es/icon'

const { Item, SubMenu } = Menu

export default {
    name: 'SMenu',
    props: {
        menu: {
            type: Array,
            required: true
        },
        theme: {
            type: String,
            required: false,
            default: 'dark'
        },
        mode: {
            type: String,
            required: false,
            default: 'inline'
        },
        collapsed: {
            type: Boolean,
            required: false,
            default: false
        }
    },
    data () {
        return {
            openKeys: [],
            selectedKeys: [],
            cachedOpenKeys: []
        }
    },
    computed: {
        sideMenuWatch () {
            return this.$store.state.app.sideMenuList
        },
        rootSubmenuKeys: vm => {
            const keys = []
            vm.menu.forEach(item => keys.push(item.path))
            return keys
        },
        ...mapGetters(['sideMenuList', 'sideMenu'])
    },
    watch: {
        collapsed (val) {
            if (val) {
                this.cachedOpenKeys = this.openKeys.concat()
                this.openKeys = []
            } else {
                this.openKeys = this.cachedOpenKeys
            }
        },
        $route: function () {
            this.updateMenu()
        },
        sideMenuWatch () {
            this.updateMenu()
        }
    },
    methods: {
        // select menu item
        onOpenChange (openKeys) {
            // 在水平模式下时执行，并且不再执行后续
            if (this.mode === 'horizontal') {
                this.openKeys = openKeys
                return
            }
            // 非水平模式时
            const latestOpenKey = openKeys.find(key => !this.openKeys.includes(key))
            if (!this.rootSubmenuKeys.includes(latestOpenKey)) {
                this.openKeys = openKeys
            } else {
                this.openKeys = latestOpenKey ? [latestOpenKey] : []
            }
        },
        // 选中菜单 并且展开本菜单
        updateMenu () {
            const routes = this.$route.matched.concat()
            let routePaths = routes.reverse()
            let selectedItem = null
            for (let i = 0; i < routePaths.length; i++) {
                let value = routePaths[i]
                let item = this.sideMenuList.filter(item => value.path === item.path)
                if (item.length > 0) {
                    this.selectedKeys = [item[0].path]
                    selectedItem = item[0]
                    break
                }
            }
            routePaths = this.$route.matched.concat()
            const openKeys = []
            if (this.mode === 'inline') {
                for (let i = 0; i < routePaths.length; i++) {
                    let item = routePaths[i]
                    if (item.path && selectedItem) {
                        if (selectedItem.path === item.path) {
                            break
                        }
                        openKeys.push(item.path)
                    }
                }
            }
            this.collapsed ? (this.cachedOpenKeys = openKeys) : (this.openKeys = openKeys)
        },

        // render
        renderItem (menu) {
            // console.log(menu)
            if (!menu.hidden) {
                return menu.children && !menu.hideChildrenInMenu ? this.renderSubMenu(menu) : this.renderMenuItem(menu)
            }
            return null
        },
        renderMenuItem (menu) {
            const target = menu.target
            const tag = (target && 'a') || 'router-link'
            const props = { to: { path: menu.path } }
            const attrs = { href: menu.path, target: target }
            return (
                <Item {...{ key: menu.path }}>
                    <tag {...{ props, attrs }}>
                        {this.renderIcon(menu.icon)}
                        <span>{menu.name}</span>
                    </tag>
                </Item>
            )
        },
        renderSubMenu (menu) {
            const itemArr = []
            if (!menu.hideChildrenInMenu) {
                menu.children.forEach(item => itemArr.push(this.renderItem(item)))
            }
            return (
                <SubMenu {...{ key: menu.path }}>
                    <span slot="title">
                        {this.renderIcon(menu.icon)}
                        <span>{menu.name}</span>
                    </span>
                    {itemArr}
                </SubMenu>
            )
        },
        renderIcon (icon) {
            if (icon === 'none' || icon === undefined) {
                return null
            }
            const props = {}
            typeof (icon) === 'object' ? props.component = icon : props.type = icon
            return (<Icon {...{ props }}/>)
        }
    },
    render () {
        const { mode, theme, menu } = this
        const props = {
            mode: mode,
            theme: theme,
            openKeys: this.openKeys
        }
        const on = {
            select: obj => {
                this.selectedKeys = obj.selectedKeys
                this.$emit('select', obj)
            },
            openChange: this.onOpenChange
        }

        const menuTree = menu.map(item => {
            if (item.hidden) {
                return null
            }
            return this.renderItem(item)
        })
        // {...{ props, on: on }}
        return (
            <Menu vModel={this.selectedKeys} {...{ props, on: on }}>
                {menuTree}
            </Menu>
        )
    }
}
