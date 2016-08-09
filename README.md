# solmap
create a JSON representation of Solidity's import hierarchy

```solmap``` takes a single solidity file as input as an entry point, performs an AST walk on it and all files imported and creates a JSON representing the import tree.

**NOTE:** In case of circular dependencies, the second and subsequent occurance(s) of a file are simply ignored and are not part of the final JSON.

For eg- here is ```a.sol```:
```
import "b.sol";
import "c.sol";
```
here is ```b.sol```
```
import "a.sol";
```
In this case, ```b.sol```'s object will not contain ```a.sol``` as a key (see the output format below)

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
