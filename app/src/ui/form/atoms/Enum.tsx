import {MouseEvent} from "react";

export default function Enum(props: any) {
    const onBeforeChange = (value: any) => (evt: MouseEvent<HTMLButtonElement>) => {

        props.onChange(value);
    }
    return <div className={"configEnumContainer"}>

        {props.values.map((value: any) => <button
            className={"configButtonItem configEnum "+(value === props.value ? "active" : "")}
            onClick={onBeforeChange(value)}
        >{value}</button>)}
    </div>

}