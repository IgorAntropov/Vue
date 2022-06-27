<template>
  <div class="node">
    <ul>
      <NodeItem
          v-model:item="treeData"
      />
    </ul>

  </div>
</template>

<script>
import NodeItem from "@/components/Node-Item";

export default {
  name: 'NodeComp',
  components: {
    NodeItem
  },
  data() {
    return {
      treeData: this.$store.state
    }
  },
  methods: {

  }
}
</script>

<style scoped>
.node {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
}
</style>