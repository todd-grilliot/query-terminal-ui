import React, { useEffect, useState } from "react";

export type CursorPropsType = {
    disabled?: boolean;
    onSubmit: Function;
    text: string;
    setText: React.Dispatch<React.SetStateAction<string>>;
    loading: boolean;
};

    // const series = [`.   `, `..  `, `... `, `....`, ` ...`, `  ..`, `   .`, `    `];
    const series = [`.  `, `.. `, `...`, ` ..`, `  .`, `   `];

function Cursor({ disabled, onSubmit, text, setText, loading }: CursorPropsType) {
    const [isBlinked, setIsBlinked] = useState(false);
    const [loadingIndicator, setLoadingIndicator] = useState(series[0]);

    useEffect(()=>{
        const blinkTimer = setTimeout(() => {
			setIsBlinked(false);
		}, 40)
        return () => clearTimeout(blinkTimer);
    },[isBlinked]);

    useEffect(() => {
        if(!loading) return;
        const loadingTimer = setTimeout(() => {
            const next = series[series.indexOf(loadingIndicator) + 1] ?? series[0];
            setLoadingIndicator(next);
        }, 200);
        return () => clearTimeout(loadingTimer);
    }, [loading, loadingIndicator]);

    const handleKeyDown = (e: KeyboardEvent) => {
        if(
            e.key === 'Shift' 
            || e.key === 'Control'
            || e.key === 'CapsLock'
            || e.key === 'Alt'
            || e.key === 'Meta'
            || e.key === 'Tab'
        ) return

        setIsBlinked(true);
        
        e.key === 'Backspace' 
            ? setText(text.slice(0, text.length - 1)) 
        : e.key === 'Enter' 
            ? onSubmit(text)
        : setText(text + e.key)
    };

    window.onkeydown = handleKeyDown;

    return (
        <div className="h-6">
            <p className="text-white text-left font-mono" style={{whiteSpace: 'pre-wrap'}}>
                {text}{loading ? `${loadingIndicator}` : !isBlinked && '█'}
            </p>
        </div>
    );
}

export default Cursor;
