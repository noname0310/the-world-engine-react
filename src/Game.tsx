import { useEffect, useRef, useState } from "react";
import { Bootstrapper, BootstrapperConstructor, Game as TGame } from "the-world-engine";

type InteropObject<B extends Bootstrapper> = 
    B extends Bootstrapper<infer T> ? T : never;

interface GameProps<B extends Bootstrapper, O extends InteropObject<B>> {
    /**
     * The bootstrapper that constructs the game.
     */
    bootstrapper: BootstrapperConstructor<O, B>;
    
    /**
     * The object to pass to the bootstrapper.
     */
    interopObject?: O;

    /**
     * If true, the game will handle input events. (default: false)
     */
    handleEvents?: boolean;

    /**
     * Automatically resize the game to the size of the container. (default: true)
     */
    autoResize?: boolean;
}

/**
 * A React component that renders a the-world-engine game.
 * @param props
 * @returns 
 */
function Game<B extends Bootstrapper, O extends InteropObject<B>>(props: GameProps<B, O>): JSX.Element {
    const { bootstrapper, interopObject, handleEvents, autoResize } = props;

    const gameContainer = useRef<HTMLDivElement>(null);
    const [game, setGame] = useState<TGame|null>(null);

    useEffect((): (() => void)|void => {
        if (!gameContainer.current) return;

        if (game) {
            game.dispose();
            setGame(null);
        }

        const newGame = new TGame(gameContainer.current, autoResize);
        setGame(newGame);
        newGame.run(bootstrapper, interopObject);

        return (): void => {
            newGame.dispose();
            setGame(null);
        };
    }, [gameContainer, bootstrapper, interopObject, autoResize]);

    useEffect((): void => {
        if (!game) return;

        const value = handleEvents === undefined ? false : handleEvents;
        if (value) game.inputHandler.startHandleEvents();
        else game.inputHandler.stopHandleEvents();
    }, [handleEvents, game]);

    return (
        <div
            ref={gameContainer}
            style={{ margin: 0,  width: "100%", height: "100%" }}
        />
    );
}

export default Game;
