import React, { useEffect, useRef, useState } from 'react'
import { initialLines, otherLines } from '../Library'
import { LineType } from '../Types'
import { answerQuery, createQuery, getQuery } from '../API';

const arrayOfCommands = [
    'defaultCommand', 
    'load',
    'getQuery',
    'postAnswer',
    'createQuery',
] as const;

export type CommandEnum = typeof arrayOfCommands[number];

// type CommandParamsType = {
//     input: string;
//     // args: string[];
//     // id: string;
// }
type CommandType = (input: string) => Promise<void>;

type CommandMetaData = {
    input: string;
    name: string;
};

type ActiveCommandList = Partial<Record<CommandEnum, (...args: any[]) => void>> & { 
    defaultCommand: CommandType;
};

type ArgsType = {
    write: (lines: LineType[]) => Promise<void>;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    // setCachedId: React.Dispatch<React.SetStateAction<string>>;
}

export default function useCommands({
    write,
    setLoading,
}: ArgsType) {

    const init: CommandType = async (input) => {
        saveCommand(input, 'init');
        setActiveCommands(initialCommandSet);
        await write(initialLines);
    }

    const [activeCommands, setActiveCommands] = useState<ActiveCommandList>({defaultCommand: init});
    const [ cachedId, setCachedId ] = useState<string>('');
    /** command cache is ordered last to first, to search more recent commands first */
    const [commandCache, setCommandCache] = useState<CommandMetaData[]>([]); 
    const cachedIdRef = useRef(cachedId);
    const commandCacheRef = useRef(commandCache)

    useEffect(() => {cachedIdRef.current = cachedId}, [cachedId]);
    useEffect(() => {commandCacheRef.current = commandCache}, [commandCache]);
    

    const saveCommand = (input: string, name: string) => {
        console.log('saving command: ', name, commandCache);
        setCommandCache(prev => [{input, name}, ...prev]);
        // setCommandCache(prev => [{args: ['args'], input: 'input', id: 'id', name}]);
    }

    /** Command Functions --- can be named seperately from the keywords that fire them. */
    // console.log('activeCommands: ', activeCommands);
    // console.log('commandCache: ', commandCache);

    const load: CommandType = async (input) => {
        saveCommand(input, 'init');
        // setCommandCache(prev => [{args: ['args'], input: 'input', id: 'id', name: 'name'}]);
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 5000));
        setLoading(false);
    }

    const callGetQuery: CommandType = async (input) => {
        saveCommand(input, 'callGetQuery');
        setLoading(true);
        const res = await getQuery();
        setLoading(false);
        if(!res) return;
        console.log('setting id: ', res._id);
        setCachedId(res._id ?? '');
        setActiveCommands(listenForPost);
        await write([{strings: [res.query]}]);
    }

    const postAnswer: CommandType = async (input) => {
        saveCommand(input, 'postAnswer');
        const id = cachedIdRef.current;

        setLoading(true);
        if(!id) {
            await write([{strings: ['no query id on file to make this request']}]);
            setLoading(false);
            setActiveCommands(initialCommandSet);
            return console.warn('no id found to post with');
        }

        const res = await answerQuery(input, id);
        setLoading(false);
        if(!res) return;
        setActiveCommands(initialCommandSet);
        await write([{strings: [res.answer]}]);
    }

    const askForQuery: CommandType = async (input) => {
        saveCommand(input, 'createQuery');

        console.log('createQuery part 1');
        await write([{strings: ['What is your question?']}]);
        setActiveCommands(listenForQuery)
    }

    const askForInitAnswer: CommandType = async (input) => {
        saveCommand(input, 'askForInitAnswer');

        console.log('creatQuery part 2');
        await write([{strings: ['What is your answer?']}]);
        setActiveCommands(listenForInitAnswer);
    }

    const callCreateQuery: CommandType = async (input) => {
        saveCommand(input, 'callCreateQuery');
        const cache = commandCacheRef.current;
        const question = cache.find(obj => obj.name === 'askForInitAnswer')?.input ?? '';
        const answer = input;
        console.log('question: ', question, commandCache);
        setLoading(true);
        await createQuery(question, answer);
        setLoading(false);

        write([{strings: ['Thank you for your contribution.']}]);
        setActiveCommands(initialCommandSet);
    }

    const initHelp = async () => { await write([{strings: ['you need help!']}]); } // placeholder


    /** Active Command Lists --- key-value pairs linking valid keywords with command functions */
    const initialCommandSet: ActiveCommandList = {
        defaultCommand: initHelp,
        load,
        getQuery: callGetQuery,
        createQuery: askForQuery,
    }

    const listenForPost: ActiveCommandList = {
        defaultCommand: postAnswer,
    }

    const listenForQuery: ActiveCommandList = {
        defaultCommand: askForInitAnswer,
    }

    const listenForInitAnswer: ActiveCommandList = {
        defaultCommand: callCreateQuery,
    }

    return activeCommands;
}
