<script lang="ts">
  import ProjectsSidebar from "./ProjectsSidebar.svelte";
  import ProjectEditor from "./ProjectEditor.svelte";
  import type { ProjectData } from "./Project";
  import Storage from "./storage";

  let storageData = $state(Storage.get());

  let currentProject: ProjectData | null = $state(storageData.projects[0] || null);
</script>

<div class="container">
  <ProjectsSidebar />
  <div class="template-container">
    {#if currentProject !== null}
      <ProjectEditor project={currentProject} />
    {:else}
    <div class="empty">
      &lt;- create a new project or select an existing one in the sidebar
    </div>
    {/if}
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

  .empty {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 3rem;
    text-align: center;
  }
</style>
