import React, { FC, createRef, useEffect, useRef, useState } from "react"
import "./GridLayout.css";
import { Color, blend, toHex } from "./color-mixer";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { PropsOf } from "@emotion/react";

type ReactComponent =
    React.ReactElement<any, string | React.JSXElementConstructor<any>>
    & { key: Exclude<React.Key, null | number | bigint> };


interface GridLayoutMinimumProps {
    topLeft?: React.ReactNode,
    topCenter?: React.ReactNode,
    topRight?: React.ReactNode,
    middleLeft?: React.ReactNode,
    middleRight?: React.ReactNode,
    bottomLeft?: React.ReactNode,
    bottomCenter?: React.ReactNode,
    bottomRight?: React.ReactNode
};

interface GridLayoutProps extends GridLayoutMinimumProps {
    children?: React.ReactNode;
}

interface GridStackLayoutProps extends GridLayoutMinimumProps {
    stack?: ReactComponent[]
}

interface GridAnimatedLayoutProps extends GridLayoutMinimumProps {
    children: React.ReactNode;
    direction?: "forward" | "backward",
    change?: number
}

const provideStyle = (idx: number, backgroundColor: Color, componentColor: Color, shadowColor: Color): React.CSSProperties => {
    const blendFactor = idx <= 0 ? 1 : Math.max(0, 0.8 - 0.2 * idx);
    const finalBackgroundColor = blend(componentColor, backgroundColor, blendFactor);
    const finalShadowColor = blend(shadowColor, backgroundColor, blendFactor);

    const distance = 13 * Math.max(idx, 0);


    const result = {
        color: `${toHex(finalShadowColor)}`,
        backgroundColor: `${toHex(finalBackgroundColor)}`,
        transform: `translate(${distance}px, ${distance}px)`,
        zIndex: -idx
    }
    return result;
}

const StackCard: FC<{ children?: React.ReactNode, index: number, length: number, key?: string }> = ({ children, index, length, key }) => {
    const style = (idx: number) => provideStyle(idx, { r: 83, g: 46, b: 231 }, { r: 255, g: 255, b: 255 }, { r: 0, g: 0, b: 0 });

    // get an index from the tail, the last element lives "on top"
    const stackTailIndex = index < 0 ? index : length - index - 1;
    const fallbackKey = key ?? stackTailIndex;
    const propKey = (children && typeof children === "object" && "key" in children)
        ? children.key ?? fallbackKey
        : fallbackKey;
    const componentStyle = style(stackTailIndex);

    const nodeRef = useRef(null);

    return (

        <CSSTransition nodeRef={nodeRef} enter exit classNames="some-prop" timeout={1000} key={propKey}>
            <div ref={nodeRef}
                className="stack-card"
                style={componentStyle}
                key={propKey}
            >
                {children}
            </div>
        </CSSTransition>
    )
}

const provideKey = (index: number, length: number, children?: React.ReactNode) => {
    // get an index from the tail, the last element lives "on top"
    const stackTailIndex = length - index - 1;
    const propKey = (children && typeof children === "object" && "key" in children)
        ? children.key ?? stackTailIndex
        : stackTailIndex;
    return propKey;
}


type GridBaseLayoutProps = Omit<GridLayoutProps, "stack">;
const GridBaseLayout: FC<GridBaseLayoutProps> = (props) => {
    return (
        <div className="grid-row grid-fill" >
            <div className="grid-column left">
                <div className="top box">
                    {props.topLeft}
                </div>
                <div className="middle box">
                    {props.middleLeft}
                </div>
                <div className="bottom box">
                    {props.bottomLeft}
                </div>
            </div>

            <div className="grid-column center">
                <div className="top box">
                    {props.topCenter}
                </div>
                <div className="middle box">
                    <main style={{ width: "100%", height: "100%" }}>
                        {props.children}
                    </main>
                </div>
                <div className="bottom box">
                    {props.bottomCenter}
                </div>
            </div>

            <div className="grid-column right">
                <div className="top box">
                    {props.topRight}
                </div>
                <div className="middle box">
                    {props.middleRight}
                </div>
                <div className="bottom box">
                    {props.bottomRight}
                </div>
            </div>
        </div>
    )
}


export const GridLayout: FC<GridLayoutProps> = (props) => {
    return (
        <GridBaseLayout
            topLeft={props.topLeft}
            topCenter={props.topCenter}
            topRight={props.topRight}
            middleLeft={props.middleLeft}
            middleRight={props.middleRight}
            bottomLeft={props.bottomLeft}
            bottomCenter={props.bottomCenter}
            bottomRight={props.bottomRight}
        >
            <div className="stack-card">
                {props.children}
            </div>
        </GridBaseLayout>
    )
}


export const GridStackLayout: FC<GridStackLayoutProps> = (props) => {
    const minimumStack = props.stack ?? [];

    const [stack, setStack] = useState(minimumStack.map(x => ({
        ...x,
        ref: createRef<HTMLDivElement>()
    })
    ));

    const notInStack = minimumStack.filter(x => !stack.some(y => x.key == y.key));
    if (notInStack.length > 0) {
        console.log(`immedtiately inserting in stack`);
        const newElements = notInStack.map(x => ({ ...x, ref: createRef<HTMLDivElement>() }));
        setStack([
            ...stack,
            ...newElements
        ]);
    }
    // const notInMinimumStack = stack.filter(x => !minimumStack.some(y => x.key == y.key));

    return (
        <GridBaseLayout
            topLeft={props.topLeft}
            topCenter={props.topCenter}
            topRight={props.topRight}
            middleLeft={props.middleLeft}
            middleRight={props.middleRight}
            bottomLeft={props.bottomLeft}
            bottomCenter={props.bottomCenter}
            bottomRight={props.bottomRight}
        >
            {
                stack.map((x, i, arr) => {
                    const index = minimumStack.findIndex(y => y.key == x.key);


                    return (
                        <CSSTransition
                            key={x.key}
                            exit
                            timeout={200}
                            classNames={"stack-card"}
                            in={minimumStack.some(y => y.key == x.key)}
                            appear={true} f
                            onExited={() => {
                                setStack(stack.filter(y => y.key !== x.key));
                                console.log("delayed exit on stack")
                            }}
                        >
                            <StackCard key={x.key} index={index} length={minimumStack.length}>{x}</StackCard>

                        </CSSTransition>
                    )
                })
            }
        </GridBaseLayout>
    )
}


const referencedDiv = (children?: React.ReactNode) => {
    const ref = createRef<HTMLDivElement>();
    const node = <div ref={ref}>{children}</div>;
    return [ ref, node ] as const;
}

export const GridAnimatedLayout: FC<GridAnimatedLayoutProps> = (props) => {
    type ChangeTicket = { state: typeof props.change, time: number };

    const [ change, setChange ] = React.useState({ state: props.change, time: new Date().getUTCMilliseconds() });
    const [ onTheWayOut, setOnTheWayOut ] = React.useState<ChangeTicket[]>([])

    if(change.state != props.change) {
        console.log("detected change");
        const changeTicket = { state: props.change, time: new Date().getUTCMilliseconds() };
        setChange(changeTicket);
        setOnTheWayOut([ ...onTheWayOut, changeTicket ]);
    }

    
    useEffect(() => {
        const timer = setTimeout(() => {
            const expiredTicketTime = new Date().getUTCMilliseconds() - 250; 
            setOnTheWayOut(onTheWayOut.filter(x => x.time < expiredTicketTime ))
        }, 500);

        return () => clearTimeout(timer);
    }, [onTheWayOut, setOnTheWayOut])

    const direction = props.direction ?? "forward";

    return (
        <GridBaseLayout
            topLeft={props.topLeft}
            topCenter={props.topCenter}
            topRight={props.topRight}
            middleLeft={props.middleLeft}
            middleRight={props.middleRight}
            bottomLeft={props.bottomLeft}
            bottomCenter={props.bottomCenter}
            bottomRight={props.bottomRight}
        >
            <div className="stack-card">{props.children}</div>
            {
                onTheWayOut.map((x,i) => (
                    <div className={`stack-card slide-exit-${direction}`} style={{zIndex: -1}} key={x.time}>
                        {props.children}
                    </div>
                    
                ))
            }
            
        </GridBaseLayout>
    )
}
