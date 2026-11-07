<script lang="ts">
  import ProjectsSidebar from "./ProjectsSidebar.svelte";
  import VariablesSidebar from "./VariablesSidebar.svelte";
  import InputTextarea from "./InputTextarea.svelte";
  import OutputTextarea from "./OutputTextarea.svelte";
  import Variable from "./Variable";
  import StringPart from "./StringPart";

  type AbstractElement = Variable | StringPart;

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

  const astFromTokens = () => {
    const astElements: AbstractElement[] = [];
    let bracketCount = 0;
    for(const token of tokens) {
      if(token === '{{') {
        bracketCount++;
      } else if(token === '}}') {
        bracketCount--;
      } else {
        if(bracketCount === 1) {
          astElements.push(new Variable(token.trim()));
        } else {
          astElements.push(new StringPart(token));
        }
      }
      if(bracketCount > 1) throw new Error('Nested brackets are not allowed!');
      if(bracketCount < 0) throw new Error('Brackets closed before they were opened!');
    }
    if(bracketCount !== 0) throw new Error('Unclosed brackets!');

    return astElements;
  }

  const errorHandler = (f: () => AbstractElement[]) => {
    try {
      const value = f();
      return value;
    } catch {
      return [];
    }
  }

  let ast = $derived.by(() => errorHandler(astFromTokens));

  const variableNamesFromAst = () => {
    const variables = ast.filter(element => element instanceof Variable);

    const dictionary: Record<string, Variable> = {};
    variables.forEach(variable => dictionary[variable.name] = variable);
    return Object.keys(dictionary);
  }

  let variableNames = $derived.by(variableNamesFromAst);

  let variableValues = $state<Record<string, string>>({});

  const outputFromAst = () => {
    let outputString = '';
    for(const astElement of ast) {
      if(astElement instanceof StringPart) outputString += astElement.value;
      if(astElement instanceof Variable) outputString += (variableValues[astElement.name] || '');
    }
    return outputString;
  }

  let outputText = $derived.by(outputFromAst);
</script>

<div class="container">
  <ProjectsSidebar />
  <main>
    <InputTextarea bind:value={template} />
    <OutputTextarea value={outputText} />
  </main>
  <VariablesSidebar variableNames={variableNames} bind:variableValues={variableValues}/>
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
