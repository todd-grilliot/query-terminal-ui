import { LineType } from "./Types";

export const initialLines: LineType[] =  [
    {
        strings: ['Hi there. This is a terminal for asking and answering questions.'],
    },
    {
        strings: ['This terminal accepts text input commands only. type -h or --help for help.', 'part two']
    },
    {
        strings: ['here are some accepted commands: ',]
    },
    {
        strings: ['getQuery ', "- grabs a new query from the database for you to answer."],
        styles: [{color: 'green'}, {}]
    }
];

export const otherLines: LineType[] = [
    {
        strings: ['Other Lines'],
    },
];
