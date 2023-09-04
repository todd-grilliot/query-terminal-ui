import { useState, useEffect } from "react";
import { BlockPropsType, isValidResponseKey} from "../../Types";
import CurrentLine from "./CurrentLine";

function Block({ 
	lines,
	finishCallback,
	// setLines,
	animated = true, 
	speed = 20, 
	// handleResponse,
	// prevResCache,
	// initLines,
	// input,
	// call,
	// args,
	// lineAfterCall,
	// chain,
	...props 
}: BlockPropsType) {
	const [currentLineIndex, setCurrentLineIndex] = useState(0);
	// const [loading, setLoading] = useState(false);
	// const [lines, setLines] = useState(initLines);

	// hi todd. 4/15 here. you are about to figure out how to get the call here into the block compont
	// seperate out the animation.

	//fskj213
	// await call.. then create block? orrrr just await and then show this block.
	// wait I kind of like the idea of just using the call to make the next block.
	// or making the call immediately and then passing it to the next block...
	// alternatively. I can make the call and render the response in the same block. yeah let's do that.

	//chaining... i'd like to do another lookup, but from a smaller pool of possible blocks.
	// right now i have chaining as a prop being passed into the block right here... it could be looked up... but new blocks are made in terminal...
	// so if I wanted to chain from terminall.. I could set somekind of chain state? and then use that to lookup the next command?
	
	// useEffect(() => {
	// 	if(!call?.promise) return;
	// 	if(lines !== initLines) return;
	// 	(async () => {
	// 		console.log('starting useeffect for block');
	// 		setLoading(true);
	// 		// const response = await call.promise(input);
	// 		const response = await call.promise();
	// 		setLoading(false);

	// 		handleResponse(response);

	// 		console.log('resposnse: ', response);

	// 		const resLines = response ? 
	// 		(
	// 			call.readFields.map((field, index) => {
	// 				if(!isValidResponseKey(field)) return {strings: []};
	// 				const header = call.readHeaders?.[index] as string;
	// 				const resString = response[field] as string;
	// 				return {strings: [ header, resString ]}
	// 			})
	// 		) : [call.failMessage];
	// 		if(resLines.length) setLines(prev => [...prev, ...resLines]);
	// 		if(lineAfterCall) setLines(prev => [...prev, lineAfterCall]);
	// 	})();
	// },[]);

	useEffect(() => {
		// i'm not sure if the finish callback needs to be a boolean, the idea is that I might be able to handle failures.
		if(currentLineIndex === lines.length && finishCallback) finishCallback();
	}, [lines, currentLineIndex]);


    return (
        <div className="text-left">
			{ //previous lines shown statically
			lines.map((line, index) => {
				if (currentLineIndex > index) //condition that includes all the prev lines.
				return (
					<div key={index}>
						{line.strings.map((text, i) => {
							return (
								<span
									className="text-white font-mono"
									key={i}
									style={line.styles ? { ...line.styles[i] } : {}}
								>
									{text}
								</span>
							)
						})}
					</div>
				)
			})}

			<CurrentLine
				lines={lines}
				animated={animated}
				speed={speed}
				currentLineIndex={currentLineIndex}
				setCurrentLineIndex={setCurrentLineIndex}
			/>

			
        </div>
    );
}

export default Block;
