<script lang="ts">
  import ProjectsSidebar from "./ProjectsSidebar.svelte";
  import Project from "./Project.svelte";

  let template = $state('try changing the value of this {{variable}} in the text input on the right.\n\nit will automatically insert the value in the output below.');
  let variables = $state({});
</script>

<div class="container">
  <ProjectsSidebar />
  <div class="template-container">
    <Project template={template} variables={variables}/>
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
