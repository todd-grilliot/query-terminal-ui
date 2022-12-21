import React, { useState, useEffect } from 'react';

import Chalk from './Chalk';

type LineProps = {
    v?: string,
    animated?: boolean,
    speed?: number,
    children?: any,
}

function Block({ animated = false, speed = 180, children, ...props } : LineProps) {

    // you might consider getting rid of the chalk thing altogether.. and just consider the v text to be the children of the child?? that could be messy in it's own way..
    // how i'm doing it right now i'm going to have to mount them in order.. a series of flags.. an array of flags, one for each child. in state, but pass it to the chalks..

    // i think that cloning this thing is making everyone behave very strange...
    // yeah i'm not so sure about the cloning...
    // this is pretty strange and maybe too ambitious..

    const [visibleChalks, setVisibleChalks] = useState(0);

    useEffect(()=>{

        console.log('vis chalks block', visibleChalks);
        
    })
    
    const clonedChildren = React.Children.map(children, (child, index) => {
        if (React.isValidElement(child)) {
            return index === visibleChalks && React.cloneElement(child as React.ReactElement<any>, { animated, speed, visibleChalks, setVisibleChalks, ...props });
        }
    });
    return (
        <div className='text-left flex flex-wrap'>
            {clonedChildren}
            <Chalk animated v='this animated'/>
        </div>
    );
}

// whereas recognition of the inherent dignity
// line will proably end up as more of a wrapper.. for chalk children or something like that.. I don't know if i want to chalk everythign...
// but different chars may have different styles.. on the fly.. some will be pressable.. 
// lines can be animated.. probably can group together a group of lines.. maybe we should call it something else..
// group together several lines with a loading sequence.. pretty much all of the fun ui stuff is going to happen here..
// maybe we should call it block instead of line...

// so blocks have children with different styles and attributes...
// and we are going to use state to add one char at a time rather quickly until the whole thing shows..
// maybe the chalks will have to animate themselves.. and then the block can just add them in order, until the next one is finished.. 
//so it will need to know when each one is finished.. like.. in an array.. how does it know how many children it has? - children.count() - gotcha..
// so we can make an array of flags for children animations, and run all the children animations in order.. yes. a goofy fun way to make it look like text appears..
// also the active block has a cursor?? or is the cursor static right below all that?
// what do you think of animating blocks to slide in? that's cool but I feel like it wouldn't be that hard to add that later...
// static cursor is good.. it could have a disabled state when animations are running, that just skips on any key..
// yeh yeh that sounds fun to me. not as spooky as css animations and stuff. more fun and thinky.


export default Block;