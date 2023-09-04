import { BlockPropsType, CallType, LineType, QueryResponseType } from "./Types";
import { writeAnswer, getQuery } from "./API";





export const initialBlock: BlockPropsType = {
    lines: [
        {
            strings: ['Welcome Friend. This is a place to ask and answer questions.', 'PART TWO'],
            styles: [{color: 'white'}, {color: 'red'}]
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
    ]
}

export const initialLines: LineType[] =  [
    {
        strings: ['Welcome Friend. This is a place to ask and answer questions.', 'PART TWO'],
        styles: [{color: 'white'}, {color: 'red'}]
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

const getQueryCall: CallType<QueryResponseType> = {
    promise: getQuery,
    failMessage: {strings: ['getQuery call failed']},
    readFields: ['query', 'answer'],
    readHeaders: ['query: ', 'answer: '],
}

const writeAnswerCall: CallType<QueryResponseType> = {
    promise: writeAnswer,
    failMessage: {strings: ['writeAnswerCall failed']},
    readFields: ['answer'],
    readHeaders: ['previous answer: '],
}

// export const commandList: Record<string, BlockType | Function> = {
//     defaultCmd: {
//         initLines: [{ strings: ['no command found by that name. Try typing -h for help'] }]
//     },
//     getQuery: {
//         initLines: [{ strings: ['getQuery has been called'] }
//         ],
//         call: getQueryCall,
//         // input: null, // won't input always be null here because it's not set here. it's set by the user? I suppose I might want to set it manually in some cases?
//         lineAfterCall: {strings: ['press any for the next chain...']},
//         chain: {
//             defaultCmd: 'testDefault',
//             any: 'nextBlock',

//         }
//     },
//     writeAnswerFunction: (answer: string, id: string) => ({
//         initLines: [{ strings: ['submit your answer: '] }],
//         call: writeAnswerCall,
//         args: [answer, id],
//         // input: null,
//         //here's where we left off. it'll be fun to plug this all in.
//         // we need to make an writeAnswerCall obj. we need to feed it a parameter of :id, as well as the answer in the body...
//         // not sure what it will look like but it should be fun.
//         // we need to give the call.promise(answer, id); the id is from the chain. it has to come down the chain.

//         // someone needs to see this coming and pass him his stuff.
//         // or else he could grab his stuff from a big pool of data that's just always there.
//         // the args need to always be there, or need to be passed down by someone who knows when they will be needed.
//     }),
//     nextBlock: {
//         initLines: [{ strings: ['nextBlock text, resetting chain'] }],
//         chain: {},
//     },
//     testDefault: {
//         initLines: [{ strings: ['default for getQuery test'] }],
//         chain: {},
//     }
// }

