import { Vue } from 'vue-property-decorator';
import Item from '@/components/Item/index.vue';
export default Vue.extend({
  name: 'list',
  components: { Item },
  props: ['type'],
  data() {
    return {};
  },
  computed: {},
  mounted() {},
  methods: {
    add() {
      console.log('click');
    },
  },
});
