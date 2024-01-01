import {getState} from "../graph/State";


const tick = () => {
    moveResources();
}


const moveResources = () => {
    const routes = getState().routes;

    routes.forEach(route => {
        const [fromNode, toNode] = getState().getNodeByIds([route.fromNode || -1, route.toNode || -1])
        console.log(fromNode, toNode)
    })
}

console.log('tick')
// @ts-ignore
window._tick = tick;
export {tick}