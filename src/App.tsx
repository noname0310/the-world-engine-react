import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Game } from "the-world-engine";

import { Bootstrapper } from "./asset/Bootstrapper";

const ContainerDiv = styled.div`
    margin: 0;
    min-height: 100vh;
`;

function App(): JSX.Element {
    const [game, setGame] = useState<Game|null>(null);
    const gameContainer = useRef<HTMLDivElement>(null);

    useEffect((): (() => void)|void => {
        if (!gameContainer.current) return;
        if (game || false) return;

        console.log("Initializing game...");

        const newGame = new Game(gameContainer.current);
        setGame(newGame);
        newGame.run(Bootstrapper);
        newGame.inputHandler.startHandleEvents();
        
        return (): void => {
            console.log("Shutting down game...");

            newGame.inputHandler.stopHandleEvents();
            newGame.dispose();
            setGame(null);
        };
    }, [gameContainer]);

    return (
        <ContainerDiv ref={gameContainer}>
        </ContainerDiv>
    );
}

export default App;
