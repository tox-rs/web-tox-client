import { Vue } from 'vue-property-decorator';
export default Vue.extend({
  name: 'item',
  components: {},
  props: ['type', 'room'],
  data() {
    return {};
  },
  computed: {
    name: function() {
      if (this.$store.state.rooms[this.$props.room]) {
        if (this.$props.type === 'rooms' || this.$props.type === 'people') {
          return this.$store.state.rooms[this.$props.room].name;
        }
      } else {
        return 'NULL';
      }
    },
  },
  mounted() {},
  methods: {
    click() {
      if (this.$props.type === 'rooms' || this.$props.type === 'people') {
        this.$store.dispatch('selectRoom', this.$props.room);
      }
    },
  },
});
