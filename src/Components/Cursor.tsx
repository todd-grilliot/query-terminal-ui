import React from 'react';


type CursorPropsType = {
    disabled?: boolean,
}
function Cursor({disabled}: CursorPropsType) {
    return (
        <div>
            <p className='text-white text-left font-mono'>cursor</p>
        </div>
    );
}

export default Cursor;