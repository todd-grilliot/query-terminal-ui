import React from 'react';
// import Block from './Block';
import Cursor from './Cursor';
// import Chalk from './Chalk';

import Block2 from './Block2';

function TerminalGui() {
    return (
        <div className='p-24 bg-zinc-900 h-screen w-screen'>
            <h1 className="text-white text-2xl font-bold underline">Hello <br/> world</h1>
            {/* <Block>Welcome to query terminal</Block>
            <Block animated >
                <Chalk v=' 1 2 3' />
                <Chalk v={'1 2 3'} />
                <Chalk v=" 3 " />
            </Block> */}
            <Block2 
            //if both blocks have 'display: inline-block' then a div can display inline with another div.
                lines={[
                    {
                        text: ['one ', 'two ', 'three words in a block ', 'fourth ', 'fifth'],
                    },
                    {
                        text: ['Ape ', 'Bird ', 'Cat', ],
                        styles: [{color: 'white'}, {color: 'red'}, {color: 'white'}]
                    },
                ]}
            />
            <Cursor />
        </div>
    );
}

export default TerminalGui;