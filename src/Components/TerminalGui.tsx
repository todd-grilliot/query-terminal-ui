import React from 'react';
import Block from './Block';
import Cursor from './Cursor';
import Chalk from './Chalk';

function TerminalGui() {
    return (
        <div className='p-24 bg-zinc-900 h-screen w-screen'>
            <h1 className="text-white text-2xl font-bold underline">Hello world</h1>
            <Block>Welcome to query terminal</Block>
            <Block animated >
                {/* <p className='text-white'>4 {' '}</p> */}
                <Chalk v=' 1 2 3' />
                <Chalk v={'1 2 3'} />
                <Chalk v=" 3 " />
            </Block>
            {/* <div className='typing-demo'>
                this is a typing demo
            </div> */}
            <Cursor />
        </div>
    );
}

export default TerminalGui;