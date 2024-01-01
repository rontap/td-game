import {NodeId} from "../node/Node";

export {}
type TransferAmount = number | "half" | "other"

export type ResourceRoute = {
    fromNode?: NodeId,
    toNode?: NodeId | null
    amount?: TransferAmount
}

export type GameState = {
    dragSelection: ResourceRoute | null,
    setDragSelection: (item: ResourceRoute) => void
    removeDragSelection: () => void
    routes: ResourceRoute[]
    getRouteBetween: (from: NodeId, to: NodeId) => ResourceRoute | undefined
    getRouteIndexBetween: (from: NodeId, to: NodeId) => number
    toggleRoute: (item: ResourceRoute) => void
}

export const initialGameState = {
    dragSelection: null,
    routes: []
};


export const gameState = {}