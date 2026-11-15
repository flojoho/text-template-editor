<script lang="ts">
  import ProjectsSidebar from "./ProjectsSidebar.svelte";
  import ProjectEditor from "./ProjectEditor.svelte";
  import type { ProjectData } from "./Project";
  import Storage from "./storage";

  let storageData = $state(Storage.get());

  let currentProject: ProjectData = $state(storageData.projects[0]);
</script>

<div class="container">
  <ProjectsSidebar />
  <div class="template-container">
    <ProjectEditor project={currentProject} />
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
