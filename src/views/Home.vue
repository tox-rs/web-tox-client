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
  swipeLeft(): void {
    console.log(navigator);
    if (
      navigator.appVersion.match(/iPhone/) ||
      navigator.appVersion.match(/Android/)
    ) {
      const mainSidebar = this.$children[0].$el as HTMLElement;
      const secondSidebar = this.$children[1].$children[2].$el as HTMLElement;
      const toxArea = this.$children[1].$children[1].$el as HTMLElement;
      const roomHeader = this.$children[1].$children[0];
      if (mainSidebar.style.display === 'block') {
        mainSidebar.style.display = 'none';
      } else {
        secondSidebar.style.display = 'block';
        toxArea.style.display = 'none';
        (roomHeader.$children[1].$el as HTMLElement).style.display = 'none';
        (roomHeader.$children[2].$el as HTMLElement).style.display = 'none';
        (roomHeader.$children[3].$el as HTMLElement).style.display = 'none';
        (roomHeader.$children[4].$el as HTMLElement).style.display = 'none';
        (roomHeader.$children[5].$el as HTMLElement).style.display = 'block';
      }
    }
  }
  swipeRight(): void {
    if (
      navigator.appVersion.match(/iPhone/) ||
      navigator.appVersion.match(/Android/)
    ) {
      const mainSidebar = this.$children[0].$el as HTMLElement;
      const secondSidebar = this.$children[1].$children[2].$el as HTMLElement;
      const toxArea = this.$children[1].$children[1].$el as HTMLElement;
      const roomHeader = this.$children[1].$children[0];
      if (secondSidebar.style.display === 'block') {
        secondSidebar.style.display = 'none';
        toxArea.style.display = 'block';
        (roomHeader.$children[1].$el as HTMLElement).style.display = 'block';
        (roomHeader.$children[2].$el as HTMLElement).style.display = 'block';
        (roomHeader.$children[3].$el as HTMLElement).style.display = 'block';
        (roomHeader.$children[4].$el as HTMLElement).style.display = 'block';
        (roomHeader.$children[5].$el as HTMLElement).style.display = 'none';
      } else {
        if (toxArea.style.display === 'block') {
          mainSidebar.style.display = 'block';
        }
      }
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