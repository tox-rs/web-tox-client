<template>
  <div class="home">
    <ToxArea/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ToxArea from '@/components/ToxArea/index.vue';

@Component({
  components: {
    ToxArea,
  },
})
export default class Home extends Vue {}
</script>
