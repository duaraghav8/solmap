# solmap
create a JSON representation of Solidity's import hierarchy

```solmap``` takes a single solidity file as input as an entry point, performs an AST walk on it and all files imported and creates a JSON representing the import tree.

#Install
```
npm install solmap
```

#Usage
```js
let solmap = require ('solmap');
const importTree = solmap ('./foo.sol');

console.log (JSON.stringify (importTree, null, 2));
```

##Example output
```json
{
  "foo.sol": [
    {
      "bar.sol": [
        {
          "baz.sol": []
        }
      ]
    },
    {
      "lorem.sol": []
    },
    {
      "ipsum.sol": [
        {
          "dolor.sol": []
        },
        {
          "sit.sol": []
        }
      ]
    }
  ]
}
```

#License
###MIT
