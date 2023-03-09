import {jsobj} from "../app/util";
import {create, useStore} from 'zustand'
import {devtools, persist} from 'zustand/middleware'
import {Node} from "../node/Node";
import {Line} from "../node/Line";
import {unwatchFile} from "fs";
import {temporal, TemporalState} from 'zundo'
import {shallow} from "zustand/shallow";

// export default class State {
//     static nodes: Node[] = [];
// }

interface AppState {
    nodes: Node[],
    lines: Line[],
    addNode: (node: Node) => void
    getNodeById: (id: number) => Node | undefined
    removeNode: (id: number) => void,
    removeLine: (id: number) => void,
    getLineBetween: (from: number, to: number) => Line | undefined
    zoom: number,
    contextMenu: any,
    lineAddAt: {
        id?: number,
        evt?: any
    }
    activeNode: Node | undefined,
    setActiveNode: (id?: NodeID | undefined) => void,

    getLinesAtNodeConnection: (id: NodeID | undefined, end: End) => Line[]
}

export enum End { FROM, TO}

type NodeID = number;
type LineID = number;

const State = create<AppState>()(
    devtools(
        temporal(
            //persist(
            (set, get) => ({
                nodes: [],
                zoom: 1,
                addNode: (node: Node) => set((state) =>
                    ({nodes: state.nodes.concat(node)})),
                getNodeById: (id: NodeID) =>
                    get().nodes.find(item => item.ID === Number(id)),
                removeNode: (id: NodeID) => set((state) =>
                    ({nodes: state.nodes.filter(item => item.ID !== Number(id))})),
                removeLine: (id: number) => set((state) =>
                    ({lines: state.lines.filter(item => item.ID !== Number(id))})),
                getLineBetween: (from: number, to: number) =>
                    get().lines.find(line => line.from === from && line.to === to),
                setActiveNode: (id) => set((state) =>
                    ({activeNode: id ? get().nodes.find(item => item.ID === Number(id)) : undefined})
                ),
                getLinesAtNodeConnection: (id: NodeID | undefined, end: End) => {
                    if (!id) return [];
                    const whichJunction = end === End.FROM ? "from" : "to";
                    return get().lines.filter(line => line[whichJunction] === id)
                },
                lines: [],
                lineAddAt: {},
                contextMenu: {},
                activeNode: undefined
            }),
            {
                partialize: (state) => {
                    const {lines, nodes, ...rest} = state
                    return {lines, nodes}
                },
                equality: shallow
            }
            //)
        ) // temporal
        , {
            name: 'store',
        }
    )
);

const useTemporalStore = <T, >(
    selector: (state: TemporalState<any>) => T,
    equality?: (a: T, b: T) => boolean,
) => useStore(State.temporal, selector, equality);

export default State;
const {getState, setState, subscribe} = State
export {
    getState,
    setState,
    subscribe,
    useTemporalStore
};
// @ts-ignore
window.State = State;