import React from 'react'
import { initialLines, otherLines } from '../Library'
import { LineType } from '../Types'

const arrayOfCommands = ['initialize', 'writeABunch'] as const;
export type CommandEnum = typeof arrayOfCommands[number];

export function isCommandEnum(input: string): input is CommandEnum {
    return arrayOfCommands.includes(input as CommandEnum);
}

export default function useCommands(
    write: (lines: LineType[]) => Promise<void>, 
    setValidCommands: React.Dispatch<React.SetStateAction<CommandEnum[]>>,
) {

    const validOnInit: CommandEnum[] = ['writeABunch', 'initialize']

    const init = async () => {
        setValidCommands(validOnInit);
        await write(initialLines);
        await write(otherLines);
    }

    const writeABunch = async() => {
        await write(otherLines);
        await write(otherLines);
        await write(otherLines);
    }

    const commands = {
        initialize: init,
        writeABunch: writeABunch,
    };

  return commands;
}
