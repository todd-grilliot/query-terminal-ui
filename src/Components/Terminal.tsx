import { useEffect, useState } from 'react';
// import Block from './Block';
import Cursor from './Cursor';
// import Chalk from './Chalk';

import { BlockPropsType, LineType, ValidResponseType } from '../Types';
import Block from './Block/Index';
import useCommands, { CommandEnum } from './useCommands';


/** Terminal is rendered by App.tsx at the highest level, this should be the Parent of all */
function Terminal() {
    const [ blocks, setBlocks ] = useState<BlockPropsType[]>([]);
    const [ cursorText, setCursorText ] = useState('');
    const [ loading, setLoading ] = useState(false);
    
    const write = (lines: LineType[]): Promise<void> => {
        return new Promise((resolve, reject) => {
            const resolvePromise = (() => {
                resolve();
            });
            setBlocks(prev => [...prev, { lines, resolvePromise }]);
        });
    }

    const print = (lines: LineType[]) => {
        setBlocks(prev => [...prev, {lines, animated: false}]);
    }

    /** A hook for all the commands, to prevent this file from getting too huge */
    const {...commands} = useCommands({
        write, 
        setLoading,
        // setCachedId,
    });

    /** initialize */
    useEffect( () => {
        (async () => {
            if(!commands.defaultCommand) return console.warn('initial defaultCommand not found');
            await commands.defaultCommand();
        })();
    }, []);




    function onSubmit(input: string){

        print([{strings: ['Cmd: ', input], styles: [{color: 'GrayText' }]}])
        
        const [commandStr] = input.split(/\s+/);
        /** isActiveCommand is a custom type guard to check that the input string matches one of the active commands */
        const isActiveCommand = (input: string): input is keyof typeof commands => !!commands?.[input as CommandEnum];
        if(isActiveCommand(commandStr)) commands[commandStr]?.(input);
        else commands.defaultCommand(input);
 
        setCursorText('');
    }



    
    return (
        <div className='pl-32 pb-32 bg-zinc-900 h-screen w-screen flex flex-col'>
            <div className='grow'/>
            <div className='shrink'>

                {blocks.map((blockProps, index) => (
                    <Block 
                        key={index} 
                        {...blockProps}
                    />
                ))} 

                <Cursor
                    onSubmit={onSubmit}
                    text={cursorText}
                    setText={setCursorText}
                    loading={loading}
                />
            </div>

        </div>
    );
}

export default Terminal;