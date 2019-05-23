<template>
  <div class="home" v-touch:swipe.right="swipeRight" v-touch:swipe.left="swipeLeft">
    <Sidebar type="main"/>
    <Room/>
    <Dialog/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Sidebar from '@/components/Sidebar/index.vue';
import Room from '@/components/Room/index.vue';
import Dialog from '@/components/Dialog/index.vue';

@Component({
  components: {
    Sidebar,
    Room,
    Dialog,
  },
})
export default class Home extends Vue {
  mounted() {
    if (
      navigator.appVersion.match(/iPhone/) ||
      navigator.appVersion.match(/Android/)
    ) {
      this.$store.commit('MAIN_SIDEBAR_TRIGGER');
      this.$store.commit('SUB_SIDEBAR_TRIGGER');
    }
  }
  public swipeLeft(): void {
    if (
      navigator.appVersion.match(/iPhone/) ||
      navigator.appVersion.match(/Android/)
    ) {
      const mainSidebar = this.$store.state.mainSidebarActive;
      const secondSidebar = this.$store.state.subSidebarActive;
      const toxArea = this.$store.state.toxAreaActive;
      const roomHeader = this.$children[1].$children[0];
      if(secondSidebar){
        return;
      }
      if (mainSidebar) {
        this.$store.commit('MAIN_SIDEBAR_TRIGGER');
      } else {
        this.$store.commit('SUB_SIDEBAR_TRIGGER');
        this.$store.commit('TOX_AREA_TRIGGER');
        (roomHeader.$children[1].$el as HTMLElement).style.display = 'none';
        (roomHeader.$children[2].$el as HTMLElement).style.display = 'none';
        (roomHeader.$children[3].$el as HTMLElement).style.display = 'none';
        (roomHeader.$children[4].$el as HTMLElement).style.display = 'none';
        (roomHeader.$children[5].$el as HTMLElement).style.display = 'block';
      }
      // if (!mainSidebar) {
      //   this.$store.commit('SUB_SIDEBAR_TRIGGER');
      //   this.$store.commit('TOX_AREA_TRIGGER');
      //   (roomHeader.$children[1].$el as HTMLElement).style.display = 'none';
      //   (roomHeader.$children[2].$el as HTMLElement).style.display = 'none';
      //   (roomHeader.$children[3].$el as HTMLElement).style.display = 'none';
      //   (roomHeader.$children[4].$el as HTMLElement).style.display = 'none';
      //   (roomHeader.$children[5].$el as HTMLElement).style.display = 'block';
      // }
    }
  }
  public swipeRight(): void {
    if (
      navigator.appVersion.match(/iPhone/) ||
      navigator.appVersion.match(/Android/)
    ) {
      const mainSidebar = this.$store.state.mainSidebarActive;
      const secondSidebar = this.$store.state.subSidebarActive;
      const toxArea = this.$store.state.toxAreaActive;
      const roomHeader = this.$children[1].$children[0];
      if(mainSidebar){
        return;
      }
      if (secondSidebar) {
        this.$store.commit('SUB_SIDEBAR_TRIGGER');
        this.$store.commit('TOX_AREA_TRIGGER');
        (roomHeader.$children[1].$el as HTMLElement).style.display = 'block';
        (roomHeader.$children[2].$el as HTMLElement).style.display = 'block';
        (roomHeader.$children[3].$el as HTMLElement).style.display = 'block';
        (roomHeader.$children[4].$el as HTMLElement).style.display = 'block';
        (roomHeader.$children[5].$el as HTMLElement).style.display = 'none';
      } else {
        if (toxArea) {
          this.$store.commit('MAIN_SIDEBAR_TRIGGER');
        }
      }
      // if (!secondSidebar) {
      //   if (toxArea) {
      //     this.$store.commit('MAIN_SIDEBAR_TRIGGER');
      //   }
      // }
    }
  }
}
</script>
<style lang="scss">
.home {
  display: flex;
  height: 100%;
}
</style>