import { Vue } from 'vue-property-decorator';
export default Vue.extend({
  name: 'item',
  components: {},
  props: ['type', 'room'],
  data() {
    return {};
  },
  computed: {
    status: function() {
      return this.$store.state.info.friends[this.$props.room.number].status ===
        'None'
        ? Math.round(
            this.$store.state.info.friends[this.$props.room.number]
              .last_online / 10,
          ) === Math.round(Date.now() / 10000)
          ? 'Online'
          : 'Offline'
        : this.$store.state.info.friends[this.$props.room.number].status;
    },
  },
  mounted() {},
  methods: {
    click() {
      if (this.$props.type === 'rooms' || this.$props.type === 'people') {
        this.$store.dispatch('selectRoom', this.$props.room.id);
      }
    },
  },
});
