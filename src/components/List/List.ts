import { Vue } from 'vue-property-decorator';
import Item from '@/components/Item/index.vue';
export default Vue.extend({
  name: 'list',
  components: { Item },
  props: ['type'],
  data() {
    return {};
  },
  computed: {
    rooms: function() {
      return this.$store.state.rooms.filter((room: any, id: number) => {
        if (room.type === 'group') {
          room.id = id;
          return room;
        }
      });
    },
    people: function() {
      return this.$store.state.rooms.filter((room: any, id: number) => {
        if (room.type === 'people') {
          room.id = id;
          return room;
        }
      });
    },
  },
  mounted() {},
  methods: {
    add() {
      this.$store.commit('DIALOG_TRIGGER');
    },
  },
});
