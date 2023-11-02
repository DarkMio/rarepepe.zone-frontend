import { GridLayout } from "#/app/components/GridLayout/GridLayout";
import { ImageCard } from "#/app/components/ImageCard/ImageCard";
import { useGetHashQuery } from "#/rest/papi";
import { FC, useEffect, useState } from "react";

interface HasherProps {

}

export const Hasher: FC<HasherProps> = ({ }) => {

    const [ phrase, setPhrase ] = useState("");
    const [ input, setInput ] = useState(""); 

    useEffect(() => {
        if(phrase == input) {
            return;
        }
        const timer = setTimeout(() => {
            if(phrase != input) {
                setPhrase(input);
            }
        }, 1500)
        return () => clearTimeout(timer);
    }, [phrase, setPhrase, input, setInput]);
    const hashResult = useGetHashQuery({ phrase: phrase }, { skip: phrase.length <= 0 });

    return (
        <GridLayout>
            <div style={{ width: "100%", height: "100%", position: "relative" }}>
                <div className="row">
                    <div className="item">
                        <ImageCard imageUrl={hashResult.data?.url} placeholder={"https://i.rarepepe.zone/nothing.gif"} />
                    </div>
                    <div className="item">
                        <div className="col">
                            <h1>PepeGPT</h1>
                            <p>
                                <span>
                                    <input
                                        value={input}
                                        onChange={e => setInput(e.target.value)}
                                        style={{caretShape: "block", border: "3px solid", padding: "10px", borderRadius: "15px", fontSize: "1.5em"}}
                                    />
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </GridLayout>
    )
}