<template>
  <div class="layout">
    <Layout>
      <Header class="main-header">
        <div class="main-logo">监控平台</div>
        <Icon @click.native="collapsedSider" :class="rotateIcon" :style="{margin: '0 20px'}" type="md-menu" size="24"></Icon>
        <div class="main-user">
          <Menu mode="horizontal" theme="dark" class="main-user-operation" @on-select="clickUserMenuItem">
            <Submenu name="header-user" style="float:none">
              <template slot="title">
                <Icon type="md-person"/>
                <span v-text="username"></span>
              </template>
              <MenuItem name="logout">
                <span>退出</span>
              </MenuItem>
            </Submenu>
          </Menu>
        </div>
      </Header>
      <Layout class="main-wrapper">
        <Sider ref="outsider" hide-trigger collapsible :collapsed-width="0" v-model="isCollapsed">
          <Menu ref="menu" width="auto" theme="dark" accordion :class="menuitemClasses" :active-name="activemenu" :open-names="openNames">
            <Submenu :name="menu.name" v-for="(menu, key) in menus" :key="key">
              <template slot="title">
                <Icon type="ios-navigate"/>
                <span v-text="menu.title"></span>
              </template>
              <a :href="'#/'+ subMenu.address" v-for="(subMenu, subkey) in menu.childMenus" :key="subkey">
                <MenuItem :name="menu.name + '-' + subMenu.name">
                  <span>{{subMenu.title}}</span>
                </MenuItem>
              </a>
            </Submenu>
          </Menu>
        </Sider>
        <Content>
          <div class="main-content">
            <router-view/>
          </div>
        </Content>
      </Layout>
    </Layout>
  </div>
</template>

<script>
import Icon from 'iview/src/components/icon/icon'
export default {
  components: {Icon},
  data() {
    return {
      isCollapsed: false,
      username: '',
      activemenu: '',
      openNames: []
    }
  },
  computed: {
    rotateIcon() {
      return ['menu-icon', this.isCollapsed ? 'rotate-icon' : '']
    },
    menuitemClasses() {
      return ['menu-item', this.isCollapsed ? 'collapsed-menu' : '']
    },
    menus() {
      this.setMene(this.$root.$data.menus)
      return this.$root.$data.menus || []
    }
  },
  methods: {
    // 收缩展开菜单
    collapsedSider() {
      this.$refs.outsider.toggleCollapse()
    },
    clickUserMenuItem(itemName) {
      // 退出登录
      if (itemName === 'logout') location.href = '/conan-holmes/logout'
    },
    setMene(val) {
      for (let i = 0, menus = val; i < menus.length; i++) {
        for (let j = 0, subMenus = menus[i].childMenus; j < subMenus.length; j++) {
          if ('/' + subMenus[j].address === this.$route.path) {
            this.activemenu = menus[i].name + '-' + subMenus[j].name
            this.openNames = [menus[i].name]
          }
        }
      }
      this.$nextTick(function() {
        this.$refs.menu.updateOpened()
        this.$refs.menu.updateActiveName()
      })
    }
  },
  created() {
    // let userInfo = JSON.parse(this.$cookie.get('conanHolmes.user'))
    // if (!userInfo) {
    //   location.href = '/conan-holmes/logout'
    // }
    // this.username = userInfo.username
    this.username = 'user'
  }
}
</script>

<style scoped>
.main-header {
  padding: 0;
  font-size: 25px;
  background-color: #1e276a;
  color: #ffffff;
  clear: both;
}
.main-logo {
  width: 164px;
  height: 50px;
  line-height: 50px;
  background: #5b6270;
  border-radius: 3px;
  float: left;
  position: relative;
  top: 5px;
  left: 20px;
  font-size: 20px;
  text-align: center;
}
.main-user {
  width: 164px;
  height: 64px;
  line-height: 64px;
  background: #5b6270;
  border-radius: 3px;
  float: right;
  font-size: 20px;
  text-align: center;
}
.main-user-operation {
  width: 164px;
  height: 64px;
  line-height: 64px;
}
.main-wrapper {
  height: calc(100vh - 64px);
}
.menu-icon {
  transition: all 0.3s;
}
.rotate-icon {
  transform: rotate(-90deg);
}
.menu-item span {
  display: inline-block;
  overflow: hidden;
  width: auto;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: bottom;
  transition: width 0.2s ease 0.2s;
}
.collapsed-menu span {
  width: 0px;
  transition: width 0.2s ease;
}
.main-content {
  padding: 10px;
  height: 100%;
}
</style>
<style>
.ivu-layout {
  background-color: #fff !important;
}
/* 菜单箭头 */
.menu-item.collapsed-menu span + i {
  visibility: hidden;
}
</style>
