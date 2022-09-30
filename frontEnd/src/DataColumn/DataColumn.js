import "./DataColumn.css"
import react from "react"

function DataColumn(props)
{
    let { data } = props
    return (
        <div className="dataColumns">
            <div className="dataColumns__row">
                <div className="dataColumn">Название</div>
                <div className="dataColumn">Дата</div>
                <div className="dataColumn">Количество</div>
                <div className="dataColumn">Расстояние</div>
            </div>
            {data.map((dataSingle, i) => {
            return(
                <div key={i} className="dataColumns__row">
                    <div className="dataColumn">{dataSingle.name}</div>
                    <div className="dataColumn">{dataSingle.date}</div>
                    <div className="dataColumn">{dataSingle.count}</div>
                    <div className="dataColumn">{dataSingle.distance}</div>
                </div>)
            })}
        </div>
    )
}

export default DataColumn