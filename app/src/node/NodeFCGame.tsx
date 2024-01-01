import State, {getState} from "../graph/State";
import CONST from "../const";
import {ErrorBoundary} from "react-error-boundary";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCode} from "@fortawesome/free-solid-svg-icons";
import {preventBubble} from "../util/util";
import {MovableState} from "../svg/Movable";
import {FormRoot} from "../ui/form/FormRoot";
import {Node} from "./Node";
import Button from "../ui/components/Button";
import {DragEventHandler} from "react";
import Game from "../game/Game.";

declare module 'react' {
    interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
        // extends React's HTMLAttributes
        xmlns?: string;
    }
}
const NodeFCGame = (props: { Node: Node }) => {

    const that: Node = props.Node;
    const noProperties = Object.values(that.configParams).length;
    const sumAdditionalHeight = Object.values(that.configParams).reduce(
        (prev: any, param: any) => (param?.additionalProps?.height || 0) + prev, 0
    )
    const height = 60;
    const width = 60;
    const tempSvgRender = State((state) => state.forceSvgRender)
    const a = that.nodeConfigTypes;

    const startNodeDrag = (event: any) => {
        console.log(that.ID)
        getState().setDragSelection({fromNode: that.ID, amount: 1})
    }
    const endNodeDrag = (event: any) => {
        console.log(that.ID, "END")
        getState().setDragSelection({toNode: that.ID})
        Game.applyDragSelection();
        getState().removeDragSelection();
    }
    // @ts-ignore
    return (<foreignObject key={that.ID + "::nodeFCGame"}
                           onClick={() => getState().setActiveNode(that.ID)}
                           className={`fo fog void data-node-${that.ID} ${that.nodeProps.className}`}
                           data-id={that.ID}
                           x={that.coords.x}
                           y={that.coords.y}
                           data-immovable={true}
                           onDragStart={startNodeDrag}
                           onDrop={endNodeDrag}
                           onDragOver={e => {
                               e.preventDefault();
                               // console.log('e', e)
                           }}
                           width={width} height={height}>
        {/*@ts-ignore*/}
        <div
            xmlns="http://www.w3.org/1999/xhtml"
            draggable={true}

            className={"boxedItem"}
        >
            <ErrorBoundary FallbackComponent={NodeError}>
                {that.configValues.default_items}
                <br/>
                {that.configValues.default_team}
            </ErrorBoundary>
        </div>
    </foreignObject>);
}

export default NodeFCGame;

const NodeError = ({resetErrorBoundary}: any) => <div className={"p-5"}>
    This node could not be loaded.<br/>
    <Button small onClick={resetErrorBoundary}>
        Retry
    </Button>
</div>