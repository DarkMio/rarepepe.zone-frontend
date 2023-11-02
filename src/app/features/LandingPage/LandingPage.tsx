import { Button } from "#/app/components/Button/Button";
import { GridLayout } from "#/app/components/GridLayout/GridLayout";
import { Skeleton } from "#/app/components/Skeleton/Skeleton";
import { useGetDirectoryMetaQuery, useGetDirectoryQuery } from "#/rest/papi";
import "./LandingPage.css";

import { FC } from "react";


const readableDate = (dateString?: string) => {
  if (!dateString) {
    return null;
  }

  // couldn't parse
  const dateNumber = Date.parse(dateString);
  if (dateNumber <= 0) {
    return null;
  }

  const date = new Date(dateNumber);
  const { timeZone, locale } = new Intl.DateTimeFormat().resolvedOptions();
  const localeDateString = date.toLocaleString("en-us", { timeZone: timeZone })
  const localeDate = new Date(Date.parse(localeDateString));

  const format = new Intl.DateTimeFormat(locale).format(localeDate);
  return format;
}

export const LandingPage: FC = () => {

  const { currentData } = useGetDirectoryMetaQuery();
  const mostRecentUpdate = readableDate(currentData?.changed);

  const totalPepes = currentData ? currentData.rares.count + currentData.simples.count + currentData.ultras.count : null;

  return (
    <GridLayout>
      <div className="row">
        <div className="item"> <video src="https://rarepepe.zone/017_roller.mp4" loop autoPlay muted className="title-content"></video> </div>
        <div className="item">
          <div className="col">
            <h1 className="emphasis">Hello there!</h1>
            <p>
              You have reached the <span className="emphasis italic">rarepepe.zone</span>,
              <br />
              a project of collecting the rarest pepes.
            </p>
            <p>
              The gallery currently hosts <span className="emphasis"><Skeleton value={totalPepes} /> </span> pepes.
              <br />
              The most recent update was on {<Skeleton value={mostRecentUpdate} />}
            </p>
            <p>
              🖐 Are you a developer?
              <br />
              API Docs can be found at:
              <br />
              <a href="https://a.rarepepe.zone/swagger" className="emphasis italic">a.rarepepe.zone/swagger</a>
            </p>
            <p>
              <Button linkTo="/daily">Lets go!</Button>
            </p>
          </div>
        </div>
      </div>
    </GridLayout>
  );
};
