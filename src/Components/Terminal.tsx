import { useEffect, useState } from 'react';
// import Block from './Block';
import Cursor from './Cursor';
// import Chalk from './Chalk';

import { initialLines, otherLines } from '../Library';
import { BlockPropsType, LineType, ValidResponseType } from '../Types';
import Block from './Block/Index';
import useCommands, { CommandEnum, isCommandEnum } from './useCommands';


/** Terminal is rendered by App.tsx at the highest level, this should be the Parent of all */
function Terminal() {
    const [ blocks, setBlocks ] = useState<BlockPropsType[]>([]);
    const [ validCommands, setValidCommands ] = useState<CommandEnum[]>([]);
    const [ cursorText, setCursorText ] = useState('');
    const [ prevResCache, setPrevResCache ] = useState<ValidResponseType>();
    
    const write = (lines: LineType[]): Promise<void> => {
        return new Promise((resolve, reject) => {
            setBlocks(prev => [...prev, { lines, resolvePromise }]);
            const resolvePromise = (() => {
                resolve();
            })
        })
    }

    /** A hook for all the commands, to prevent this file from getting too huge */
    const {...commands} = useCommands(write, setValidCommands);

    useEffect( () => {
        (async () => {
        // initialize
        // await write(initialLines)
        await commands.initialize();
        console.log('done writing init')
        await write(otherLines) 
        })()
    }, []);



    function onSubmit(input: string){
        console.log('onSubmit: ' + input);

        if(isCommandEnum(input)) commands[input]();

        // const lookup = isEmptyObj(currentChain) ? input : currentChain[input];
        // const defaultCommand = commandList[currentChain.defaultCmd] ?? commandList.defaultCmd;
        // const command = commandList[lookup] ?? defaultCommand;
        // let newBlock;

        // if( typeof command === 'function') command(); 

        // else {
        //     if (command.chain) setCurrentChain(command.chain);
        //     newBlock = {...command, input}
        //     setBlocks([...blocks, newBlock]);
        // }
 
        // setCursorText('');
    }



    // bug where a new line will not animate if there is a line before it that is an empty string.
    // a space string ' ' will stop rendering that line entirely.
    // i would like to have a way to insert a line that creates a 'enter' effect. an empty line used for spacing.

    // maybe after a certain number of blocks I'll start deleting the oldest ones that are way off screen.
    // --help -h commands.
    // immediately finish animating a block on key press. don't type anything on that key press. 
    // maybe add an easter egg with a cool ascii animation
    // there's probably a way to make this somewhat mobile friendly. Maybe it already is? the styles might not need to change that much.
    return (
        <div className='pl-32 pb-32 bg-zinc-900 h-screen w-screen flex flex-col'>
            <div className='grow'/>
            <div className='shrink'>

                {blocks.map((blockProps, index) => (
                    <Block 
                        // lines={mainLines}
                        // setLines={setMainLines}
                        key={index} 
                        {...blockProps}
                        // handleResponse={handleResponse}
                        // prevResCache={prevResCache}
                    />
                ))} 

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