import React, { useState } from 'react';
// import Block from './Block';
import Cursor from './Cursor';
// import Chalk from './Chalk';

import Block from './Block';
import { BlockType } from '../Types';
import { initialBlock } from '../Library';


function Terminal() {
    console.log('terminal gui');
    const [ blocks, setBlocks ] = useState<BlockType[]>([initialBlock]);
    const [cursorText, setCursorText] = useState('');


    function onSubmit(text: string){
        console.log('onSubmit: ' + text);
        const newBlock = {
            lines: [
                // {text: [' ']},
                {
                text: ['here is the new block'],
                },
                // { text: ['']}
            ]

        }
        setBlocks([...blocks, newBlock]);
        setCursorText('');
    }

    //the user will take an action and i'll need to generate a block. or add a line, or delete things maybe even.
    // or do an animation.. whatever.. I need a content controller with a simple API. probably just an array, of children? and it just shows all it's children? oh wait.. this sounds familiar
    // all the content will exist in a timeline. it could just be a seamless array of blocks. and the text you submit is basically just a block. and maybe I would have more than one line sometimes
    // can you think of any reason that an array of blocks being mapped through wouldn't be fine?
    // prolly don't even need a controller, we can just map right here in the terminal. and then have a state object for all the blocks.
    // an array of prop objects, {...props, lines: [{text: [''], styles: [{}] }]}... it's a bit nested now. but I think that makes sense. this way we can manipulate the blocks in arr
    //

    // bug where a new line will not animate if there is a line before it that is an empty string.
    // a space string ' ' will stop rendering that line entirely.
    // i would like to have a way to insert a line that creates a 'enter' effect. an empty line used for spacing.
    return (
        <div className='pl-32 pb-32 bg-zinc-900 h-screen w-screen flex flex-col'>
            <div className='grow'/>
            <div className='shrink'>

                {blocks.map((blockProps, index) => (
                    <Block key={index} {...blockProps} />
                ))}

                {/* <Block 
                    animated={false}
                    lines={[
                        {
                            text: ['Welcome Friend. This is a place to ask and answer questions.'],
                        },
                        {
                            text: ['Ape ', 'Bird ', 'Cat ', 'Dog' ],
                            styles: [{color: 'white'}, {color: 'red'}, {}, {color: 'blue'}]
                        },
                        {
                            text: ['a third line']
                        }
                    ]}
                /> */}
                <Cursor
                    onSubmit={onSubmit}
                    text={cursorText}
                    setText={setCursorText}
                />
            </div>

        </div>
    );
}

export default Terminal;