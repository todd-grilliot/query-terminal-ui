import React, { useEffect, useState } from 'react';

type ChalkPropsType = {
    v: string,
    animated?: boolean,
    color?: string,
    speed?: number,
    visibleChalks?: number,
    setVisibleChalks?: Function,
    // probably a bunch of boolean colors..
}
function Chalk({
    v, 
    animated,
    speed, 
    setVisibleChalks,
    visibleChalks,
    color = 'white'
}: ChalkPropsType) {

    const [visibleChars, setVisibleChars] = useState(animated ? 0 : v.length);

    console.log('chalks', visibleChalks);

    useEffect(()=>{
        if ( visibleChars >= v.length){
            setVisibleChalks && visibleChalks &&
            setVisibleChalks(visibleChalks + 1);
            console.log('setting vis chalks')
            console.log(setVisibleChalks);
            return;
        }
        const timer = setTimeout(() => {
            setVisibleChars( visibleChars + 1);
        }, speed);

        return () => clearTimeout(timer);
    },[visibleChars])

    // console.log('animated', animated)
    return (
        <div className='text-left' >
            <p className='text-white font-mono mr-2.5'>
                {v.slice(0, visibleChars)}
            </p>
        </div>
    );
}

export default Chalk;