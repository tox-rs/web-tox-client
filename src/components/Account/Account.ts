import { Vue } from 'vue-property-decorator';
export default Vue.extend({
  name: 'account',
  components: {},
  props: [],
  data() {
    return {};
  },
  computed: {
    name(): string {
      return this.$store.state.info.name;
    },
  },
  mounted() {},
  methods: {},
});
