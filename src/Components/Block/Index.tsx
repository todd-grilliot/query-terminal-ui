import { useEffect, useState } from "react";
import { BlockPropsType } from "../../Types";
import CurrentLine from "./CurrentLine";

/** Terminal wraps a series of Block components */
function Block({ 
	lines,
	resolvePromise,
	animated = true, 
	speed = 20, 
	...props 
}: BlockPropsType) {
	const [currentLineIndex, setCurrentLineIndex] = useState(0);

	useEffect(() => {
		if(currentLineIndex === lines.length && resolvePromise) resolvePromise();
	}, [lines, currentLineIndex]);


    return (
        <div className="text-left">
			{ /** previous lines shown statically */
			lines.map((line, index) => {
				if (currentLineIndex > index) /** condition that includes all the prev lines. */
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
