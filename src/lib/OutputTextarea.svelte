<script lang="ts">
  let { value }: { value: string } = $props();
</script>

<textarea value={value} readonly></textarea>

<style>
  textarea {
    width: 100%;
    height: 100%;
  }
</style>
