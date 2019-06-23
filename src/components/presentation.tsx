import * as React from 'react'

export interface Props {
    name : string
}

function Presentation(props : Props) {
    return (
        <div>
            <h1> { props.name } </h1>

        </div>
    )
}

export default Presentation;
