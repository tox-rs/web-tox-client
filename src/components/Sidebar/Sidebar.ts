import { Vue } from 'vue-property-decorator';
import List from '@/components/List/index.vue';
import Account from '@/components/Account/index.vue';
export default Vue.extend({
  name: 'sidebar',
  components: {
    List,
    Account,
  },
  props: ['type'],
  data() {
    return {};
  },
  computed: {
    selectedTab: function() {
      return this.$store.state.selectedTab;
    },
  },
  mounted() {},
  methods: {},
});
