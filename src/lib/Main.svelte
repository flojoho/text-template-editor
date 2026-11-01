<script lang="ts">
  import ProjectsSidebar from "./ProjectsSidebar.svelte";
  import VariablesSidebar from "./VariablesSidebar.svelte";
  import InputTextarea from "./InputTextarea.svelte";
  import OutputTextarea from "./OutputTextarea.svelte";
</script>

<div class="container">
  <ProjectsSidebar />
  <main>
    <InputTextarea />
    <OutputTextarea />
  </main>
  <VariablesSidebar />
</div>

<style>
  main {
    display: flex;
    flex-direction: column;
    flex: 1;
  }

  .container {
    display: flex;
    height: 100%;
    align-items: stretch;
  }
</style>
