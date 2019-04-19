import { Vue } from 'vue-property-decorator';
export default Vue.extend({
  name: 'room-header',
  components: {},
  props: [],
  data() {
    return {};
  },
  computed: {},
  mounted() {},
  methods: {
    tabSelect(id: any) {
      this.$store.dispatch('selectTab', id);
    },
  },
});
