Vue.component('pane', {
  name: 'pane',
  template: `
    <div class="pane" v-if="show">
       <slot> </slot>
    </div>
    `,
  props: {
    name: {
      type: String,
    },
    label: {
      type: String,
      default: '',
    },
    closable: {
      type: Boolean,
      default: true,
    },
  },

  data: function () {
    return {
      show: true,
    }
  },
  methods: {
    updateNav() {
      this.$parent.updateNav()
    },
  },
  watch: {
    label() {
      this.updateNav()
    },
  },
  mounted() {
    this.updateNav()
  },
})
