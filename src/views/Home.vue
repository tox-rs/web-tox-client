<template>
  <div class="home">
    <Sidebar type="main"/>
    <Room/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Sidebar from '@/components/Sidebar/index.vue';
import Room from '@/components/Room/index.vue';

@Component({
  components: {
    Sidebar,
    Room,
  },
})
export default class Home extends Vue {}
</script>
<style lang="scss">
  .home{
    display: flex;
    height: 100%;
  }
</style>