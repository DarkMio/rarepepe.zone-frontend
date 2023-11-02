import { GridLayout } from "#/app/components/GridLayout/GridLayout"
import { FC } from "react"

interface NotFoundProps { }

export const NotFound: FC<NotFoundProps> = ({ }) => {
    return (
        <GridLayout>
            <div style={{ width: "100%", height: "100%", position: "relative" }}>
                <div className="row">
                    <div className="item"> <video src="https://rarepepe.zone/017_roller.mp4" loop autoPlay muted className="title-content"></video> </div>

                    <div className="item">
                        <div className="col">
                            <h1>404!</h1>
                            <h2>Whatever you were looking for, it ain't here.</h2>
                            <p>You're still welcome</p>
                        </div>
                    </div>
                </div>
            </div>
        </GridLayout>
    )
}