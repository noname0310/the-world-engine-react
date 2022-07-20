# the-world-engine-react
the world engine react component

## [build](https://noname0310.github.io/the-world-engine-react/build/index.html)

## usage
for install,
```npm
npm i the-world-engine-react
```

for use,
```tsx
import { Game } from 'the-world-engine-react';
import { Bootstrapper as BaseBootstrapper } from "the-world-engine";

class Bootstrapper extends BaseBootstrapper {
    public override run(): SceneBuilder {
        return this.sceneBuilder;
    }
}

function App(): JSX.Element {
    return (
        <Game
            bootstrapper={Bootstrapper}
            handleEvents={true}
            autoResize={true}
        />
    );
}
```
