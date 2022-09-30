import React from "react"
import axios from "axios"
import { useState, useEffect } from "react";
import './App.css';
import DataColumn from "./DataColumn/DataColumn";
import Pages from "./Pages/Pages";
import Filter from "./Filter/Filter"

function App() {
  let [ data, setData ] = useState([])
  let [ maxDataPerPage, setMaxDataPerPage ] = useState(5)
  let [ dataOfThisPage, setDataOfThisPage ] = useState([]) // данные которые принадлежат к этой странице, нужны две, эта первая для передачи в фильтр, а вторая будет меняться в том числе и фильтре, и она будет отображаться
  let [ visibleData, setVisibleData ] = useState([]) // данные которые будут отображаться на этой странице
  let [ currentPageNumber, setCurrentPageNumber ] = useState(1)
  let [ pageCount, setPageCount ] = useState(0)

  useEffect(() => {
    axios.get("http://localhost:3001/data").then(res => {
      if (res.status === 200)
      {
        setData(res.data)
      }
    })
  }, [])

  function refreshDataOfThisPage()
  {
    let d = getDataOfThisPage(currentPageNumber, data, maxDataPerPage)
    setDataOfThisPage(d)
  }

  useEffect(() => {
    setPageCount(() => {
      return Math.ceil(data.length / maxDataPerPage)
    })
    refreshDataOfThisPage()
  }, [data])

  useEffect(() => {
    refreshDataOfThisPage()
  }, [currentPageNumber])
  useEffect(() => {
    setVisibleData(dataOfThisPage)
  }, [dataOfThisPage])
  return (
    <div className="App">
      <Filter FilterFunc={Filter} data={dataOfThisPage} setVisibleData={setVisibleData}></Filter>
      <DataColumn data={visibleData}></DataColumn>
      <Pages pageCount={pageCount} currentPageNumber={currentPageNumber} setCurrentPageNumber={setCurrentPageNumber}></Pages>
    </div>
  );
}


function getDataOfThisPage(page, data, maxDataPerPage)
{
  let startIndex = ((maxDataPerPage * (page - 1)))
  let endIndex = startIndex + maxDataPerPage;
  let returnArr = data.slice(startIndex, endIndex)
  return returnArr
}

function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
      charactersLength));
    }
   return result;
}


export default App;
