import React, {useEffect, useState} from 'react'
import {useHistory, useLocation} from "react-router-dom"
import Pagination from "react-js-pagination";

export const MyPagination = (props) => {
    const history = useHistory()
    const queryParams = useLocation().search;
    const [currentPage, setCurrentPage] = useState(1)

    const pageChangeHandler = (pageNum) => {

        let newQueryLink = ''
        if (queryParams) {
            if (new URLSearchParams(queryParams).get('page')) {
                newQueryLink = new URLSearchParams(queryParams)
                newQueryLink.set('page', `${pageNum}`)
                newQueryLink = '?'+newQueryLink
            }
            else
                newQueryLink = queryParams+'&page='+(pageNum)
        }
        else {
            newQueryLink = '?page='+(pageNum)
        }
        history.push('task'+newQueryLink)
        props.rerender()

    }

    useEffect(() => {
        setCurrentPage(props.currentPage)
    }, [props.currentPage])

    return (
        <Pagination
            activePage={currentPage}
            itemsCountPerPage={1}
            totalItemsCount={props.maxPages}
            pageRangeDisplayed={3}
            itemClass='waves-effect'
            onChange={pageChangeHandler}
            hideFirstLastPages={true}

        />
    )
}


// <div className='footer-copyright'>
//     <ul className="pagination" id='pagination'>
//         <li className="disabled"><a href="#!"><i className="material-icons">chevron_left</i></a></li>
//         <li className="active"><a href="#!">1</a></li>
//         <li className="waves-effect"><a href="#!">2</a></li>
//         <li className="waves-effect"><a href="#!">3</a></li>
//         <li className="waves-effect"><a href="#!">4</a></li>
//         <li className="waves-effect"><a href="#!">5</a></li>
//         <li className="waves-effect"><a href="#!"><i className="material-icons">chevron_right</i></a></li>
//     </ul>
// </div>