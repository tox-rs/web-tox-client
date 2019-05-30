import { Vue, Watch } from 'vue-property-decorator';

export default Vue.extend({
  name: 'vue-notification',
  components: {},
  props: [],
  data() {
    return { banner: true };
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
    activeBanner: {
      get(): boolean {
      return this.$store.state.info.banner;
      },
      set() {
        this.banner = false;
        this.$store.dispatch('disableBanner');
      },
    },
    err(): string {
      return this.$store.state.err;
    },
  },
  methods: {
    clickTrust() {
      this.activeBanner = false;
    },
  },
});
