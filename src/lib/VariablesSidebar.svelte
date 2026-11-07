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
    <section>
      <div class="title">
        {name}
      </div>
      <div>
        <input bind:value={variableValues[name]} />
      </div>
    </section>
  {/each}
</aside>

<style>
  aside {
    background-color: var(--dark-gray);
    width: 20rem;
    padding: 2rem;
  }

  section {
    margin-bottom: 1rem;
  }

  .title {
    margin-bottom: 0.4rem;
  }

  input {
    width: 100%;
  }
</style>
