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
      return this.$store.state.rooms[this.$store.state.selectedRoom]
        ? this.$store.state.rooms[this.$store.state.selectedRoom].name
        : 'Empty Room';
    },
  },
  mounted() {},
  methods: {
    tabSelect(id: any) {
      this.$store.dispatch('selectTab', id);
    },
  },
});
