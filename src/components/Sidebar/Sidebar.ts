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
  created() {
    this.$store.dispatch('getLocalStorage');
  },
  mounted() {
    // if (this.$props.type === 'main') {
    //   this.$store.dispatch('addRoom', {
    //     name: 'Empty Room',
    //     msgs: [],
    //     type: 'group',
    //     number: 1,
    //   });
    //   this.$store.dispatch('addRoom', {
    //     name: 'Empty Room 1',
    //     msgs: [],
    //     type: 'group',
    //     number: 2,
    //   });
    //   this.$store.dispatch('addRoom', {
    //     name: 'Empty Room 2',
    //     msgs: [],
    //     type: 'group',
    //     number: 3,
    //   });
    // }
  },
  methods: {},
});
