<script lang="ts">
  let {
    variableNames,
    variableValues = $bindable({})
  }: {
    variableNames: string[],
    variableValues: Record<string, string>
  } = $props();
</script>

<aside>
  {#each variableNames as name}
    <div>
      <div>
        {name}
      </div>
      <div>
        <input bind:value={variableValues[name]} />
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
