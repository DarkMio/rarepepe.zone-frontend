import { FC } from "react";
import "./ImageCard.css";
import ExpandMoreIcon from "#resources/icons/expand-more.svg";
import DownloadIcon from "#resources/icons/download.svg";
import FlagIcon from "#resources/icons/flag.svg";
import FavoriteIcon from "#resources/icons/favorite.svg";
import FavoriteFilledIcon from "#resources/icons/favorite_fill.svg";

type ImageCardProps = { imageUrl: string, placeholder?: string } | { imageUrl?: string, placeholder: string }

export const ImageCard: FC<ImageCardProps> = (props) => {
    const image = props.imageUrl ?? props.placeholder;


    return (
        <div className="image-card" style={{ backgroundImage: `url(${image})` }}>
            <div className="info col">
                <div className="item" />
                <div className="item row title-bar">
                    <div>
                        <div className="open-indicator">
                            <img className="icon" src={ExpandMoreIcon} />
                        </div>
                    </div>
                    <div>
                        <span className="emphasis">High Roller</span>
                    </div>
                    <div>
                        <span className="emphasis">122 ⭐</span>
                    </div>
                </div>
                <div className="item row">
                    <div style={{marginLeft: ".5em"}}>
                        Report
                        <img className="icon" src={FlagIcon} />
                    </div>
                    <div style={{marginRight: ".5em"}}>
                        Download
                        <img className="icon" src={DownloadIcon} />
                    </div>
                </div>

            </div>

        </div>
    )
}