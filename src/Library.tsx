import { BlockType, CallType, QueryResponseType } from "./Types";
import { answerQuery, getQuery } from "./API";

export const initialBlock: BlockType = {
    // animated: true,
    initLines: [
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

const getQueryCall: CallType<QueryResponseType> = {
    promise: getQuery,
    failMessage: {strings: ['getQuery call failed']},
    readFields: ['query', 'answer'],
    readHeaders: ['query: ', 'answer: '],
}

const answerQueryCall: CallType<QueryResponseType> = {
    promise: answerQuery,
    failMessage: {strings: ['answerQueryCall failed']},
    readFields: ['answer'],
    readHeaders: ['previous answer: '],
}

export const commandList: Record<string, BlockType | Function> = {
    defaultCmd: {
        initLines: [{ strings: ['no command found by that name. Try typing -h for help'] }]
    },
    getQuery: {
        initLines: [{ strings: ['getQuery has been called'] }
        ],
        call: getQueryCall,
        input: null,
        lineAfterCall: {strings: ['press any for the next chain...']},
        chain: {
            defaultCmd: 'testDefault',
            any: 'nextBlock',

        }
    },
    answerQuery: {
        initLines: [{ strings: ['submit your answer: '] }],
        call: answerQueryCall,
        input: null,
        //here's where we left off. it'll be fun to plug this all in.
        // we need to make an asnwerQueryCall obj. we need to feed it a parameter of :id, as well as the answer in the body...
        // not sure what it will look like but it should be fun.
        // we need to give the call.promise(answer, id); the id is from the chain. it has to come down the chain.
    },
    nextBlock: {
        initLines: [{ strings: ['nextBlock text, resetting chain'] }],
        chain: {},
    },
    testDefault: {
        initLines: [{ strings: ['default for getQuery test'] }],
        chain: {},
    }
}

