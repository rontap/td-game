import {getState} from "../graph/State";
import {Simulate} from "react-dom/test-utils";
import drag = Simulate.drag;
import {tick} from "./conceptOfTime";

export {}

tick();
const Game = {
    applyDragSelection: () => {
        const dragSelection = getState().dragSelection;
        if (dragSelection) {
            getState().toggleRoute(dragSelection)
        }
    }
};
export default Game;