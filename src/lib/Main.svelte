<script lang="ts">
  import ProjectsSidebar from "./ProjectsSidebar.svelte";
  import Template from "./Template.svelte";
</script>

<div class="container">
  <ProjectsSidebar />
  <div class="template-container">
    <Template />
  </div>
</div>

<style>
  .container {
    display: flex;
    height: 100%;
    align-items: stretch;
  }

  .template-container {
    flex: 1;
  }
</style>
