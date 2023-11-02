import { ImageCard } from "#/app/components/ImageCard/ImageCard";
import { useGetPotdByYearByMonthByDayQuery } from "#/rest/papi";
import { FC } from "react";

import AddIcon from "#resources/icons/add.svg";
import RemoveIcon from "#resources/icons/remove.svg";
import React from "react";
import { GridAnimatedLayout } from "#/app/components/GridLayout/GridLayout";

interface DailyProps { }

const DailyContent: FC<{ date: Date }> = ({ date }) => {
    const language = navigator.language;

    const i18n = new Intl.DateTimeFormat(language, { dateStyle: "full" });
    const potd = useGetPotdByYearByMonthByDayQuery({ year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate() });

    return (
        <div style={{ width: "100%", height: "100%", position: "relative" }}>
            <div className="row">
                <div className="item">
                    <ImageCard imageUrl={potd.currentData?.url} placeholder={"https://i.rarepepe.zone/nothing.gif"} />
                </div>
                <div className="item">
                    <div className="col">
                        <h1>Pepe of the Day!</h1>
                        <h2>{i18n.format(date)}</h2>
                    </div>
                </div>
            </div>
        </div>
    );
}

export const Daily: FC<DailyProps> = ({ }) => {
    const [index, setIndex] = React.useState(1);
    const referenceDay = new Date();
    const offsetDate = (days: number) => new Date(referenceDay.getTime() + -days * 24 * 60 * 60 * 1000)
    const [direction, setDirection]  = React.useState<"forward" | "backward">("forward"); 



    const [cards, setCards] = React.useState<{id: string, component: React.ReactNode}[]>([{ id: `${index - 1}`, component: <DailyContent date={referenceDay} key={index - 1} />}]);


    const [ change, setChange ] = React.useState(new Date().getUTCMilliseconds())
    const addCard = () => {
        setIndex(index + 1);
        setDirection("forward");
        setChange(new Date().getUTCMilliseconds())
    }

    const removeCard = () => {
        setIndex(index - 1);
        setDirection("backward");
        setChange(new Date().getUTCMilliseconds());
    }



    return <GridAnimatedLayout
        topCenter={<>
            <button className="center-layout-button" style={{ backgroundImage: `url(${RemoveIcon})` }} onClick={removeCard} />
            <button className="center-layout-button" style={{ backgroundImage: `url(${AddIcon})` }} onClick={addCard} />
        </>}
        direction={direction}
        change={change}
    >
        <DailyContent date={offsetDate(index)} />
    </GridAnimatedLayout>
} 