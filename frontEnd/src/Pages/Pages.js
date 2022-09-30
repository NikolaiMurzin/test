import "./Pages.css"
import react from "react"

function Pages(props)
{
    let { pageCount, currentPageNumber, setCurrentPageNumber } = props
    return (
        <div className="pages">
            {Array(pageCount).fill(1).map((x, i) => 
                {
                    return (<div key={i} className={currentPageNumber==i+1 ? "page_active page": "page"} onClick={() => { setCurrentPageNumber(i+1) }}>{i+1}</div>)
                }
            )}
        </div>
    )
}

export default Pages