import React from 'react';
import Block from './Block';

function TerminalGui() {
    return (
        <div className='p-24 bg-zinc-900 h-screen w-screen'>
            <h1 className="text-white text-2xl font-bold underline">Hello world</h1>
            <Block>Welcome to query terminal</Block>
            <div className='typing-demo'>
                this is a typing demo
            </div>
        </div>
    );
}

export default TerminalGui;