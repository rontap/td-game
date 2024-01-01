import AvailableNodes from "./AvailableNodes";
import PropertyViewer from "./PropertyViewer";
import React, {ReactElement, useState} from "react";
import {jsobj} from "../util/util";
import {DndContext, DragEndEvent, useDndMonitor, useDraggable, useDroppable} from '@dnd-kit/core';
import IO from "./IO";
import CONST from "../const";


const taskbarStyles = {
    nodes: {
        width: '280px',
        height: '240px'
    },
    properties: {
        right: '0px',
        width: '450px'
    },
    activeNodes: {
        top: '300px',
        width: '300px',
    },
    io: {
        top: '340px',
        width: '300px',
    }
}
export default function Taskbar({items}: { items: Map<string, jsobj> }) {
    const {setNodeRef} = useDroppable({
        id: 'unique-id',
    });
    if (CONST.dndBypass) return <></>
    return <>
        <div id={"taskbar"}>
            <DndContext>
                <WrapToTaskbarItem name="nodes" cid="nodes" element={<AvailableNodes items={items}/>}/>
                {/*<WrapToTaskbarItem name="active" cid="activeNodes" element={<ActiveNodes/>}/>*/}
                <WrapToTaskbarItem name="props" cid="properties" element={<PropertyViewer/>}  defaultMinimised={true}/>
                <WrapToTaskbarItem name="io" cid="io" element={<IO/>} defaultMinimised={true}/>
                <Droppable/>
                {/*<Draggable/>*/}
            </DndContext>
        </div>
    </>
}


function Droppable() {
    const {setNodeRef} = useDroppable({
        id: 'unique-id',
    });

    return (
        <div ref={setNodeRef} id={"ddctx"}>
        </div>
    );
}


function WrapToTaskbarItem({
                               cid,
                               name,
                               element,
                               title,
                               defaultMinimised
                           }: { title?: string, name: string, cid: string, defaultMinimised?: boolean, element: ReactElement }) {
    const [stateTransform, setStateTransform] = useState({x: 0, y: 0});
    const [minimised, setMinimised] = useState(defaultMinimised ?? false);
    const {isDragging, attributes, listeners, setNodeRef, transform} = useDraggable({
        id: cid,
    });

    useDndMonitor({
        onDragEnd(event: DragEndEvent) {
            if (cid !== event.active.id) {
                return;
            }
            if (!minimised) {
                setStateTransform(prevTransform => ({
                    x: prevTransform.x + event.delta.x,
                    y: prevTransform.y + event.delta.y
                }));
            }
        }
    })

    if (minimised) {
        return <div className={"minimisedItem"}>
            <button onClick={() => setMinimised(false)}>{name}</button>
        </div>
    }

    const actTransform = {
        x: (transform?.x || 0) + stateTransform.x,
        y: (transform?.y || 0) + stateTransform.y,
    }
    const style = {
        transform: `translate3d(${actTransform.x}px, ${actTransform.y}px, 0)`,
        ...(taskbarStyles[cid as keyof typeof taskbarStyles] || {})
    }


    return (
        <div ref={setNodeRef} style={style} className={"taskbarElement"}>
            <div  {...listeners}
                  {...attributes}
                  className={"taskbarHeader"}
                  title={"Drag Element"}
            >

            </div>
            <button onClick={() => setMinimised(true)} className={"minimiseButton"}>
                _
            </button>
            <div>
                {element}
            </div>
        </div>
    )
}