import React from 'react'
import {useParams } from 'react-router-dom';

function FullContent() {
    const { id } = useParams();
    return (
        <div>
            Here lies the full content id: {id}
        </div>
    )
}

export default FullContent
