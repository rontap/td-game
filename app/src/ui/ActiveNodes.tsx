import {Node} from "../node/Node";
import {jsobj} from "../util/util";
import State, {getState} from "../graph/State";
import React from "react";
import BtnGroup from "./components/BtnGroup";
import Button from "./components/Button";

export default function ActiveNodes(props: jsobj) {
    const nodes = State((state) => state.nodes)
    return <div>
        <h3>Current Nodes</h3>
        {
            nodes.map((node: Node) => NodeListItem(node))
        }
        <br/>
    </div>
}

function NodeListItem(node: Node) {
    return <div key={node.ID} className={"nodeListItem"}>
        <code style={{width: '15px', display: 'inline-block'}}>
            {node.ID}
        </code>
        {" | "}
        <span className={"listItemDescr"}>{node.nodeType}</span>
        {" "}
        <BtnGroup>
            <Button onClick={() => getState().setActiveNode(node.ID)}>
                Select
            </Button>
            <Button onClick={() => getState().removeNode(node.ID)}>
                Remove
            </Button>
        </BtnGroup>
    </div>
}
