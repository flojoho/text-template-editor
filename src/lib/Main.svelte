<script lang="ts">
  import ProjectsSidebar from "./ProjectsSidebar.svelte";
  import Project from "./Project.svelte";
  import type { ProjectData } from "./Project";

  let project: ProjectData = $state({
    template: 'try changing the value of this {{variable}} in the text input on the right.\n\nit will automatically insert the value in the output below.',
    variables: {}
  })
</script>

<div class="container">
  <ProjectsSidebar />
  <div class="template-container">
    <Project project={project} />
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
