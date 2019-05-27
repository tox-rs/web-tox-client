import { Vue, Watch } from 'vue-property-decorator';

export default Vue.extend({
  name: 'vue-notification',
  components: {},
  props: [],
  data() {
    return {};
  },
  computed: {
    active: {
      get(): boolean {
        return this.$store.state.err ? true : false;
      },
      set() {
        this.$store.commit('ERROR_MSG', '');
      },
    },
    err(): string {
      return this.$store.state.err;
    },
  },
  mounted() {},
  methods: {},
});
