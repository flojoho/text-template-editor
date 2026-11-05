<script lang="ts">
  import ProjectsSidebar from "./ProjectsSidebar.svelte";
  import VariablesSidebar from "./VariablesSidebar.svelte";
  import InputTextarea from "./InputTextarea.svelte";
  import OutputTextarea from "./OutputTextarea.svelte";

  let template = $state('');

  let tokens = $derived.by(() => {
    const tokens = [];
    let currentToken = '';
    let possibleSyntaxToken = '';

    for(const char of template) {
      console.log(currentToken);
      if(char === '{') {
        if(possibleSyntaxToken === '{') {
          if(currentToken !== '') {
            tokens.push(currentToken);
            currentToken = '';
          }
          tokens.push('{{');
          possibleSyntaxToken = '';
          continue;
        } else {
          //currentToken += char;
          possibleSyntaxToken += '{';
        }
        continue;
      } else if (char === '}') {
        if(possibleSyntaxToken === '}') {
          if(currentToken !== '') {
            tokens.push(currentToken);
            currentToken = '';
          }
          tokens.push('}}');
          possibleSyntaxToken = '';
          continue;
        } else {
          //currentToken += char;
          possibleSyntaxToken += '}';
        }
        continue;
      }

      if(possibleSyntaxToken !== '') {
        currentToken += possibleSyntaxToken;
        possibleSyntaxToken = '';
      }

      currentToken += char;
    }

    if(possibleSyntaxToken !== '') {
      tokens.push(currentToken + possibleSyntaxToken);
    } else if(currentToken !== '') {
      tokens.push(currentToken);
    }

    console.log(tokens);

    return tokens;
  });
</script>

<div class="container">
  <ProjectsSidebar />
  <main>
    <InputTextarea bind:value={template} />
    <OutputTextarea value={tokens.join('\n')} />
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
