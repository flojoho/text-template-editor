<script lang="ts">
  import type { AppData } from "./Storage.svelte";
  import type { ProjectData } from "./Project";
  
  let {
    appData = $bindable()
  }: {
    appData: AppData
  } = $props();
  let projects = $derived(appData.projects);

  const changeProject = (project: ProjectData) => {
    appData.currentProject = project;
  }
</script>

<aside>
  {#each projects as project}
    <div class="entry">
      <button onclick={() => changeProject(project)}>{project.template}</button>
    </div>
  {/each}
</aside>

<style>
  aside {
    background-color: var(--dark-gray);
    width: 20rem;
    padding: 2rem;
  }

  .entry {

  }

  button {
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    border: none;
    cursor: pointer;
    text-align: left;
  }
  button:hover{
    background-color: var(--black);
  }
</style>
