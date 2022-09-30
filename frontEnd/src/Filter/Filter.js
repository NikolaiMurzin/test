import { isValidDateValue } from "@testing-library/user-event/dist/utils"
import react from "react"
import { useState, useEffect } from "react"
import "./Filter.css"


function Filter(props){
    let { data, setVisibleData } = props
    let [ selectedField, setSelectedField ] = useState("name")
    let [ selectedExpression, setSelectedExpression ] = useState("equal")
    let [ value, setValue ] = useState("")
    let [ filterOpen, setFilterOpen ] = useState(false)

    let expressionButton = <div></div> 
    if (selectedField === "name") // Eсли у нас выбранная колонка название(текст) то текст может фильтроваться только по содержит либо равно
    {
        expressionButton = <div className="expressions">
                <button 
                className={selectedExpression==="equal" ? "expression_active expression": "expression"}
                onClick={() => {setSelectedExpression("equal")}}>равно</button>
                <button 
                className={selectedExpression==="contain" ? "expression_active expression": "expression"}
                onClick={() => {setSelectedExpression("contain")}}>содержит</button>
        </div>
    } else  // это для остальных колонок (Количество, расстояние)
    {
        expressionButton = <div className="expressions">
            <button 
            className={selectedExpression==="bigger" ? "expression_active expression": "expression"}
            onClick={() => {setSelectedExpression("bigger")}}>больше</button>
            <button 
            className={selectedExpression==="smaller" ? "expression_active expression": "expression"}
            onClick={() => {setSelectedExpression("smaller")}}>меньше</button>
            <button 
            className={selectedExpression==="equal" ? "expression_active expression": "expression"}
            onClick={() => {setSelectedExpression("equal")}}>равно</button>
        </div>
    }
    useEffect(function() { // при переключении поля пусть введенное значение обнуляется
        setValue("")
    },[selectedField])
    useEffect(function() { // профильтровать и обновить данные когда value меняется
        if (onlySpaces(value)) // если строка пустая то устанавливаем данные без фильтрации (все)
        {
            setVisibleData(data)
        } else 
        {
            if (selectedField === "name") // если выбранная колонка название
            {
                setVisibleData(filterData(data, selectedField,selectedExpression, value))
            } else  // если выбранная колонка не название то остальные у нас идут числовые
            {
                let intValue = parseInt(value)
                if (Number.isInteger(intValue))
                {
                    setVisibleData(filterData(data, selectedField,selectedExpression, intValue))
                } 
            }
        }
    }, [value])

    const onChangeValue = function(event) {
        setValue(event.target.value)
    }

    return (
        <div>
            <div onClick={() => {setFilterOpen(!filterOpen)}} 
            className="openClose">open/close filter</div>
            <div className={filterOpen? "filter_open filter" : "filter_closed filter"}>
                <div className="columns">
                    <button onClick={() => {setSelectedField("name")}}
                    className={selectedField==="name" ? "column_active column": "column"}>Название</button>
                    <button onClick={() => {setSelectedField("count")}}
                    className={selectedField==="count" ? "column_active column": "column"}>Количество</button>
                    <button onClick={() => {setSelectedField("distance")}}
                    className={selectedField==="distance" ? "column_active column": "column"}>Расстояние</button>
                </div>
                {expressionButton}
                <input className="input" type="text" value={value} onChange={onChangeValue}></input>
            </div>
        </div>
    )
}

function filterData(data, field, expression, value)
{
    return data.filter(function (el) {
        if (typeof value === "string")
        {
            switch(expression){
                case "equal":
                    return el[field] === value
                case "contain":
                    return el[field].includes(value)
            }
        } else 
        {
            switch(expression)
            {
                case "bigger":
                    return el[field] > value
                case "smaller":
                    return el[field] < value
                case "equal":
                    return el[field] === value
            }
        }
    })
}
function onlySpaces(str) { // проверить если в строке только пробелы и нет слов
  return str.trim().length === 0;
}

export default Filter