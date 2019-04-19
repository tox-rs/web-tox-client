import { Vue } from 'vue-property-decorator';
import ToxArea from '@/components/ToxArea/index.vue';
import Sidebar from '@/components/Sidebar/index.vue';
import RoomHeader from '@/components/RoomHeader/index.vue';
export default Vue.extend({
  name: 'room',
  components: {
    RoomHeader,
    ToxArea,
    Sidebar
  },
  props: [],
  data () {
    return {

    }
  },
  computed: {

  },
  mounted () {
  },
  methods: {

  }
});
