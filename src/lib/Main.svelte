<script lang="ts">
  import ProjectsSidebar from "./ProjectsSidebar.svelte";
  import VariablesSidebar from "./VariablesSidebar.svelte";
  import InputTextarea from "./InputTextarea.svelte";
  import OutputTextarea from "./OutputTextarea.svelte";
  import Variable from "./Variable";
  import StringPart from "./StringPart";
  import { templateToTokens } from "./parsingHelpers"; 

  type AbstractElement = Variable | StringPart;
  type ParseResult =
  | { ast: AbstractElement[]; error: null }
  | { ast: []; error: string };

  let template = $state('try changing the value of this {{variable}} in the text input on the right.\n\nit will automatically insert the value in the output below.');

  let tokens = $derived(templateToTokens(template));

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

  const errorHandler = (f: () => AbstractElement[]): ParseResult => {
    try {
      const ast = f();
      return { ast, error: null };
    } catch (e) {
      let errorMessage = 'Unknown error';
      if (e instanceof Error) errorMessage = 'Error: ' + e.message;
      return {ast: [], error: errorMessage};
    }
  }

  let parseResult = $derived.by(() => errorHandler(astFromTokens));

  const variableNamesFromAst = () => {
    const { ast } = parseResult;
    const variables = ast.filter(element => element instanceof Variable) as Variable[];

    const dictionary: Record<string, Variable> = {};
    variables.forEach(variable => dictionary[variable.name] = variable);
    return Object.keys(dictionary);
  }

  let variableNames = $derived.by(variableNamesFromAst);

  let variableValues = $state<Record<string, string>>({});

  const outputFromAst = () => {
    const { ast } = parseResult;
    let outputString = '';
    for(const astElement of ast) {
      if(astElement instanceof StringPart) outputString += astElement.value;
      if(astElement instanceof Variable) outputString += (variableValues[astElement.name] ?? '');
    }
    return outputString;
  }

  let outputText = $derived.by(outputFromAst);
</script>

<div class="container">
  <ProjectsSidebar />
  <main>
    <InputTextarea bind:value={template} />
    <OutputTextarea value={parseResult.error ?? outputText} />
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
