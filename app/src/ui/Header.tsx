import {useTemporalStore} from "../graph/State";
import BtnGroup from "../components/BtnGroup";
import Button from "../components/Button";
import AddNodes from "../components/AddNodes";
import React from "react";
import {Line} from "../node/Line";
import {jsobj} from "../app/util";
import {NodeBuilder} from "../node/Builder";

const items: Map<string, jsobj> = NodeBuilder.Build();

export default function Header() {

    const addLine = () => {
        const from = Number(window.prompt('from', "1"));
        const to = Number(window.prompt('to', "1"));

        Line.New(from, to);
    }

    const {
        undo,
        redo,
    } = useTemporalStore((state) => state);


    return <span id={"header"}>
        <BtnGroup>
            <Button onClick={() => undo()}>Undo</Button>
            <Button onClick={() => redo()}>Redo</Button>
        </BtnGroup>


        {/*<Button onClick={addLine}>Add new line</Button>*/}

        <Button className={"blue"}>Compile</Button>
    </span>
};