import { useCallback, useState } from "react";

import { Bootstrapper } from "./asset/Bootstrapper";
import Game from "./Game";

function App(): JSX.Element {
    const [gameMounted, setGameMounted] = useState(true);

    const mountHandle = useCallback((): void => {
        setGameMounted(value => !value);
    }, []);
    
    return (
        <div style={{ margin: 0, width: "100%", height: "100%" }}>
            <button 
                onClick={mountHandle}
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    zIndex: 1
                }}
            >
                {gameMounted ? "Unmount" : "Mount"}
            </button>
            { gameMounted &&
            <Game
                bootstrapper={Bootstrapper}
                handleEvents={true}
                autoResize={true}
            /> }
        </div>
    );
}

export default App;
