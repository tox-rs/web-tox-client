import { Vue } from 'vue-property-decorator';
export default Vue.extend({
  name: 'room-header',
  components: {},
  props: [],
  data() {
    return {};
  },
  computed: {
    name(): string {
      if (this.$store.state.rooms) {
        return this.$store.state.rooms[this.$store.state.selectedRoom]
          ? this.$store.state.rooms[this.$store.state.selectedRoom].name
          : 'Empty Room';
      } else {
        return 'Empty Room';
      }
    },
    count(): number {
      return this.$store.state.notifications
        ? this.$store.state.notifications.length
        : 0;
    },
  },
  mounted() {},
  methods: {
    tabSelect(id: any) {
      this.$store.dispatch('selectTab', id);
    },
    openSearch() {
      this.$store.commit('SEARCH_TRIGGER');
    },
    openQRcode() {
      this.$store.commit('DIALOG_TRIGGER', 'QRcode');
    },
  },
});
