import { useCallback, useState } from "react";
import styled from "styled-components";

import { Bootstrapper } from "./asset/Bootstrapper";
import Game from "./Game";

const ContainerDiv = styled.div`
    margin: 0;
    min-height: 100vh;
    width: 100vw;
`;

const MountButton = styled.button`
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
`;

function App(): JSX.Element {
    const [gameMounted, setGameMounted] = useState(true);

    const mountHandle = useCallback((): void => {
        setGameMounted(value => !value);
    }, []);
    
    return (
        <ContainerDiv>
            <MountButton onClick={mountHandle}>
                {gameMounted ? "Unmount" : "Mount"}
            </MountButton>
            { gameMounted &&
            <Game
                bootstrapper={Bootstrapper}
                handleEvents={true}
            /> }
        </ContainerDiv>
    );
}

export default App;
