import { Vue, Watch } from 'vue-property-decorator';
export default Vue.extend({
  name: 'vue-dialog',
  components: {},
  props: [],
  data() {
    return { value: null };
  },
  computed: {
    active: {
      get: function() {
        if (this.$store.state.dialogActive) {
          const self = this;
          setTimeout(function() {
            console.log(self);
            self.$children[0].$children[0].$children[3].$children[1].$el
            .classList.add(
              'md-raised',
            );
          }, 100);
        }
        return this.$store.state.dialogActive;
      },
      set: function() {
        this.$store.commit('DIALOG_TRIGGER');
      },
    },
  },
  mounted() {},
  methods: {
    onConfirm(value: any) {
      this.$store.dispatch('addFriend', value);
    },
  },
});
