import { Vue } from 'vue-property-decorator';
export default Vue.extend({
  name: 'account',
  components: {},
  props: [],
  data() {
    return {};
  },
  computed: {
    name(): string | undefined {
      if (this.$store.state.info) {
        return this.$store.state.info.name;
      }
    },
  },
  mounted() {},
  methods: {},
});
