import React from 'react';

type LineProps = {
    v?: string,
    children?: any
}

function Block({ v, children } : LineProps) {
    return (
        <div className='text-left'>
            <p className='text-white font-mono'>
                {children}
            </p>
        </div>
    );
}

// whereas recognition of the inherent dignity
// line will proably end up as more of a wrapper.. for chalk children or something like that.. I don't know if i want to chalk everythign...
// but different chars may have different styles.. on the fly.. some will be pressable.. 
// lines can be animated.. probably can group together a group of lines.. maybe we should call it something else..
// group together several lines with a loading sequence.. pretty much all of the fun ui stuff is going to happen here..
// maybe we should call it block instead of line...

export default Block;