import './underConstruction.scss'

export function UnderConstruction({ title }) {
    return <div className="under-construction">

        <div className="under-construction-heading">{title}</div>
        <div className="under-construction-body">
            The page is under construction! Pleae be patient!
        </div>
    </div>
}