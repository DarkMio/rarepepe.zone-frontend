import React, { FC } from "react";
import "./Button.css";
import { Link } from "react-router-dom";

interface ButtonProps {
    children?: React.ReactNode,
    size?: "big" | "medium" | "small",
    linkTo?: string
}

export const Button: FC<ButtonProps> = ({ children, size, linkTo }) => {
    const button = (
        <button className={`button content-button ${size ?? "medium"}`} >
            <div>
                {children}
            </div>
        </button>
    )

    return linkTo ?
        <Link to={linkTo}>{button}</Link> :
        button;
} 