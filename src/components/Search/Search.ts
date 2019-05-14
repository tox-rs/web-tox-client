import { Component, Prop, Vue } from 'vue-property-decorator';
export default Vue.extend({
  name: 'search',
  components: {},
  props: [],
  data() {
    return {
      selectedCountry: null,
      selectedEmployee: null,
    };
  },
  computed: {
    msgs() {
      return this.$store.state.rooms[
        this.$store.state.selectedRoom
      ].msgs.filter((msg: any, index: number) => {
        if (msg) {
          msg.id = index;
          msg.toLowerCase = () => msg.value.toLowerCase();
          msg.toString = () => msg.value;
          return msg;
        }
      });
    },
    open() {
      return this.$store.state.searchActive;
    },
  },
  mounted() {},
  methods: {
    select: function(ev: any) {
      this.$parent.$children.forEach((child) => {
        if (child.$el.classList.contains('tox-area__content')) {
          const toxAreaContent = child;
          const selectedMsg = toxAreaContent.$children[ev.id];
          toxAreaContent.$el.scrollTop =
            (selectedMsg.$el as HTMLElement).offsetTop - 200;
          (selectedMsg.$el as HTMLElement).style.backgroundColor = '#f7f7f7';
          (selectedMsg.$el as HTMLElement).style.border =
            '2px solid var(--md-theme-default-primary)';
          setTimeout(() => {
            (selectedMsg.$el as HTMLElement).style.backgroundColor = 'white';
            (selectedMsg.$el as HTMLElement).style.border = 'unset';
          }, 2500);
        }
      });
      this.$store.commit('SEARCH_TRIGGER');
    },
  },
});
