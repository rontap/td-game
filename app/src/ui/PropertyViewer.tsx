import State, {End, getState} from "../graph/State";
import Button from "../components/Button";
import {Line} from "../node/Line";
import {Node} from "../node/Node";
import {NodeEdgeRef} from "../graph/EdgeLoader";
import SingleEdgeRef from "./SingleEdgeRef";

export default function PropertyViewer() {
    const node = State((state) => state.activeNode)

    const linesFrom: Line[] = getState().getLinesAtNodeConnection(node?.ID, End.FROM);
    const linesTo: Line[] = getState().getLinesAtNodeConnection(node?.ID, End.TO);

    if (!node) return <></>;

    console.log(node.nodeInputs)
    return <div id={"propertyViewer"}>
        {/*<Button*/}
        {/*    onClick={() => getState().setActiveNode()}*/}
        {/*    className={"closer"}>×</Button>*/}
        {/*<br/>*/}
        {/*<br/>*/}
        <h3>Properties of {node.ID} {node?.nodeType} </h3>

        {node.nodeProps.description}
        {/*<br/>*/}

        <hr/>
        <div className={"grid gtc-2"}>
            <div className={"gridItem"}>

                FROM
                <br/>
                {
                    linesTo
                        .map((line, i) => SingleNodeItem(getState().getNodeById(line.from), i))
                }
            </div>
            <div className={"gridItem"}>
                TO
                <br/>
                {
                    linesFrom
                        .map((line, i) => SingleNodeItem(getState().getNodeById(line.to), i))
                }
                <br/>
            </div>
        </div>
        <hr/>
        <div className={"grid gtc-3 gtc-m-10"}>
            <div className={"gridItem"}>
                {/*todo editable props dont work well*/}
                MISSING INPUTS
                <br/>
                {node.nodeInputs
                    ?.filter(nodeInput => !node.getConnectedInputIfAnyByName(nodeInput.name))
                    .map((edgeRef, i) => <SingleEdgeRef
                        edgeRef={edgeRef} key={i} i={i}/>)}
                <br/>
                INPUTS
                {node.nodeInputs
                    ?.filter(nodeInput => node.getConnectedInputIfAnyByName(nodeInput.name))
                    .map((edgeRef, i) => <SingleEdgeRef
                        edgeRef={edgeRef} key={i} i={i}/>)}
                <br/>

            </div>
            <div className={"gridItem"}>
                OTHER INPUTS
                {node.getConnectedNodeInputs
                    ?.filter(nodeInput => !node.nodeInputs.includes(nodeInput))
                    .map((edgeRef, i) => <SingleEdgeRef small constant={true}
                                                        edgeRef={edgeRef} key={i} i={i}/>)}
            </div>
            <div className={"gridItem"}>
                OUTPUTS
                <br/>
                {node.nodeOutputs?.map((edgeRef, i) => <SingleEdgeRef
                    edgeRef={edgeRef} key={i} i={i}/>)}
            </div>
        </div>
        <br/>
        {/*<hr/>*/}
        {/*<Config node={node}/>*/}
    </div>
}


const SingleNodeItem = (node: Node | undefined, i: number) => {
    return <span key={i}><Button small>
            {node?.nodeType} #{node?.ID}
                </Button>
                <br/>
                </span>
}