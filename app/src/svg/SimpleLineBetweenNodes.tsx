import {ResourceRoute} from "../game/gameSlice";
import {getState} from "../graph/State";

export default function SimpleLineBetweenNodes({route}: { route: ResourceRoute }) {
    const fromNode = getState().getNodeById(route.fromNode || -1)
    const toNode = getState().getNodeById(route.toNode || -1)
    if (!fromNode || !toNode) return <></>
    return <line x1={fromNode.coords.x}
                 y1={fromNode.coords.y}
                 markerMid="url(#arrow)"
                 markerEnd="url(#arrow)"
                 className="only-Play"
                 x2={toNode.coords.x} y2={toNode.coords.y} stroke="red"/>
}