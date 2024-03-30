import {React,useState} from 'react'

const Footer = ({PageNo, onUpdateUrl }) => {

    var [pageNo, setPageNo] = useState(PageNo);
    const baseUrl = "https://www.capitoltrades.com/trades?page="
    const handlePrev = () => {

        setPageNo(pageNo-1);
        const url = baseUrl + (pageNo-1);
        console.log(url);
        onUpdateUrl(url);
    };

    const handleNext = () => {

        setPageNo(pageNo+1);
        const url = baseUrl + (pageNo+1);
        console.log(url);
        onUpdateUrl(url);
    };


  return (
    <div className="Footer">
        <div className='Prev_button'>
                <button type="button" onClick={handlePrev} disabled={pageNo === 1}>Prev</button>
        </div>
        {'<'} {pageNo} {'>'}
        <div className='Next_button'>
                <button onClick={handleNext} type="button">Next</button>
        </div>
    </div>
  )
}

export default Footer;