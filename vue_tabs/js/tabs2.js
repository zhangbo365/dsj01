Vue.component('tabs', {
  template: `
    <div class="tabs">
      <div class="tabs-bar">
        <div :class="tabCls(item)" v-for="(item, index) in navList" @click="handleChange(index)">
          {{item.label}}
        </div>
        <button @click="removePane()"> 启用/禁用 </button>
      </div>
      <div class="tabs-content">
             <slot></slot>  
      </div>
    </div>
    `,
  props: {
    value: {
      type: [String, Number],
    },
  },
  data: function () {
    return {
      currentValue: this.value,
      navList: [],
    }
  },
  methods: {
    tabCls: function (item) {
      return [
        'tabs-tab',
        {
          'tabs-tab-active': item.name === this.currentValue,
        },
      ]
    },
    getTabs() {
      return this.$children.filter(function (item) {
        return item.$options.name === 'pane'
      })
    },
    updateNav() {
      this.navList = []
      var _this = this

      this.getTabs().forEach(function (pane, index) {
        _this.navList.push({
          label: pane.label,
          name: pane.name || index,
          bool: pane.closable,
        })
        if (!pane.name) pane.name = index
        if (index === 0) {
          if (!_this.currentValue) {
            _this.currentValue = pane.name || index
          }
        }
      })
      this.updateStatus()
    },
    updateStatus() {
      var tabs = this.getTabs()
      var _this = this
      tabs.forEach(function (tab) {
        return (tab.show = tab.name === _this.currentValue)
      })
    },
    handleChange: function (index) {
      var nav = this.navList[index]
      var name = nav.name

      this.currentValue = name
      this.$emit('input', name)
      // this.$emit('on-click', name);
    },
    removePane: function () {
      var bool = this.navList[1].bool
      console.log(bool)
      if (bool) {
        this.navList[1].bool = false
        this.currentValue = '0'
      }
      if (!bool) {
        this.navList[1].bool = true
        this.currentValue = '1'
        this.$emit('input', '1')
      }
    },
  },
  watch: {
    value: function (val) {
      this.currentValue = val
    },
    currentValue: function () {
      console.log('demo')
      this.updateStatus()
    },
  },
})
