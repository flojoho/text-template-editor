
const templateToTokens = (template: string) => {
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

export { templateToTokens };
