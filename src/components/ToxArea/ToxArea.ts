import { Component, Prop, Vue } from 'vue-property-decorator';
export default Vue.extend({
  name: 'tox-area',
  components: {},
  props: [],
  data() {
    return {
      message: '',
    };
  },
  computed: {
    content: function() {
      return this.$store.state.rooms[this.$store.state.selectedRoom]
        ? this.$store.state.rooms[this.$store.state.selectedRoom].msgs
        : [];
    },
  },
  created() {
    const self = this;
    setTimeout(function() {
      self.$store.dispatch('initUser');
    }, 100);
  },
  mounted() {},
  methods: {
    submit(ev: any) {
      this.$store.dispatch('sendMsg', {
        room: this.$store.state.selectedRoom,
        msg: this.message,
        author: this.$store.state.info.name,
      });
      this.message = '';
    },
  },
});
