<script lang="ts">
  import type Variable from './Variable';
  
  let { variables = $bindable([]) }: {
    variables: Variable[]
  } = $props();
</script>

<aside>
  {#each variables as variable}
    <div>
      <div>
        {variable.name}
      </div>
      <div>
        <input value={variable.value} />
      </div>
    </div>
  {/each}
</aside>

<style>
  aside {
    background-color: var(--dark-gray);
    width: 20rem;
    padding: 2rem;
  }
</style>
