<script lang="ts">
  import ProjectsSidebar from "./ProjectsSidebar.svelte";
  import ProjectEditor from "./ProjectEditor.svelte";
  import Storage from "./Storage.svelte";

  let appData = $state(Storage.get());

  let currentProject = $derived(appData.currentProject);
</script>

<div class="container">
  <ProjectsSidebar bind:appData={appData} />
  <div class="template-container">
    {#if currentProject !== null}
      <ProjectEditor bind:project={currentProject} />
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
