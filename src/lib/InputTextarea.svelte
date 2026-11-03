<script lang="ts">
  let { value = $bindable('') } = $props();
</script>

<textarea bind:value={value}>
</textarea>

<style>
  textarea {
    width: 100%;
    height: 100%;
  }
</style>
