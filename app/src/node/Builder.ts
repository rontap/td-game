import {loadJsonNodeDefinitions, NodeTemplate, NodeTemplateMap} from "../app/NodeGroupLoader";
import {EdgeInvariant, EdgeLoader, edgeTypes} from "../app/EdgeLoader";
import {jsobj} from "../util/util";
import {Node} from './Node';
import State from "../graph/State";

EdgeLoader();

export class NodeBuilder {

    static get types(): NodeTemplateMap {
        return this._types;
    }

    private static _rawTypes = new Map<string, NodeTemplate>();
    private static _types = new Map<string, NodeTemplate>();

    static InstNodesFromTemplate() {
        NodeBuilder.Build(true);
        return [...this._types.values()].map(value => new Node(value.name));
    }


    static Build(shouldRebuild: boolean = false) {
        if (shouldRebuild) {
            this._types = new Map();
        }
        this._rawTypes = loadJsonNodeDefinitions();

        [...this._rawTypes.values()].map((value: NodeTemplate) => {
            if (!value.hide) {
                this._types.set(value.name, value);
            }
        })
        return this._types;
    }

    static EveryNodeTemplate(): NodeTemplate[] {
        return [...NodeBuilder.Build().values()];
    }

    static New(nodeType: string) {
        State.getState().addNode(new Node(nodeType))
    }

    static getType(name: string) {
        return this.types.get(name);
    }

}

//EdgeInvariant(true);