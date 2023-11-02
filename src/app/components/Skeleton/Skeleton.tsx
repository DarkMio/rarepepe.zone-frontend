import { FC } from "react"
import "./Skeleton.css";

interface SkeletonProps {
    value?: string | number | null
}

export const Skeleton: FC<SkeletonProps> = ({value}) => {

    if(!value) {
        return <span className="skeleton-box"></span>
    }
    return (
        <>{value}</>
    )
} 