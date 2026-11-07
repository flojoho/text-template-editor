<script lang="ts">
  import ProjectsSidebar from "./ProjectsSidebar.svelte";
  import VariablesSidebar from "./VariablesSidebar.svelte";
  import InputTextarea from "./InputTextarea.svelte";
  import OutputTextarea from "./OutputTextarea.svelte";
  import Variable from './Variable';

  let template = $state('');

  const templateToTokens = () => {
    const tokens = [];
    let currentToken = '';
    let possibleSyntaxToken = '';

    for(const char of template) {
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

    return tokens;
  }

  let tokens = $derived.by(templateToTokens);

  const variableNamesFromTokens = () => {
    const variableNames = [];
    let bracketCount = 0;
    for(const token of tokens) {
      if(token === '{{') {
        bracketCount++;
      } else if(token === '}}') {
        bracketCount--;
      } else {
        if(bracketCount === 1) {
          variableNames.push(
            new Variable (
              token.trim(),
              ''
            )
          );
        }
      }
      if(bracketCount > 1) throw new Error('Nested brackets are not allowed!');
      if(bracketCount < 0) throw new Error('Brackets closed before they were opened!');
    }
    if(bracketCount !== 0) throw new Error('Unclosed brackets!');

    return variableNames;
  }

  let variables = $derived.by(variableNamesFromTokens);
</script>

<div class="container">
  <ProjectsSidebar />
  <main>
    <InputTextarea bind:value={template} />
    <OutputTextarea value={tokens.join(', ')} />
  </main>
  <VariablesSidebar bind:variables={variables} />
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
