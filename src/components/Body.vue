<template>
  <div class="body flex-text-start">
    <NodeComponent />
  </div>
</template>

<script>
import NodeComponent from './Node'

export default {
  name: 'BodyComp',
  components: {
    NodeComponent
  }
}
</script>

<style scoped>
.body {
  flex-direction: column;
  margin: 5px 0;
  min-height: 300px;
  max-height: 500px;
  overflow-y: auto;
}

.body > div {
  margin-top: 5px;
}
</style>