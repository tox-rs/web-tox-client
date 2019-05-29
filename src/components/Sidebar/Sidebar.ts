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
    selectedTab(): string {
      return this.$store.state.selectedTab;
    },
    active(): boolean {
      if (this.type === 'main') {
        return this.$store.state.mainSidebarActive;
      } else {
        return this.$store.state.subSidebarActive;
      }
    },
  },
});
