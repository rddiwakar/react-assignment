import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { BsArrowDownUp } from 'react-icons/bs'
import { SORTS, pagination } from '../../Utils/index';
import {
    MdKeyboardArrowLeft as BackBtnICon,
    MdKeyboardArrowRight as NextBtnIcon
}
    from 'react-icons/md'

const TableData = styled.table`
border:1px solid rgb(230, 230, 230);
thead{    
    font-weight: 700;
    background: rgb(230, 230, 230);
    tr{
        th{
            padding:1rem;
            text-align:left;
            cursor:pointer;
        }
    }
}
tbody{
    tr{
        td{
            padding:1rem;
            border-bottom: 1px solid rgb(230, 230, 230);
        }
    }
    & .username{
        text-decoration:none;
        color:black;
    }
}
`
const PaginationBtnStyle = styled.div`
margin:2rem;
& .btn{
    border: 1px solid rgb(230, 230, 230);
    background: white;
    color:black;
    padding: 8px
}
& .pageNavBtn{
    border: 1px solid blue;
}
`

const Table = ({ data, handleUserData }) => {
    const [sort, setSort] = React.useState(
        {
            sortKey: 'NONE',
            isReverse: false,
        }
    );
    const [pageNum, setPageNum] = React.useState(0)
    const handleSort = (sortKey) => {
        const isReverse = sort.sortKey === sortKey && !sort.isReverse;

        setSort({ sortKey, isReverse });
    };

    const sortFunction = SORTS[sort.sortKey];
    const sortedList = sort.isReverse
        ? sortFunction(data).reverse()
        : sortFunction(data);

    const paginatedList = pagination(sortedList, 15);
    return (
        <>
            <div style={{ overflow: 'auto' }}>
                <TableData >
                    <thead>
                        <tr>
                            <th onClick={() => handleSort('FIRST_NAME')}>First Name  <BsArrowDownUp /></th>
                            <th onClick={() => handleSort('LAST_NAME')}>Last Name  <BsArrowDownUp /></th>
                            <th onClick={() => handleSort('AGE')}>Age  <BsArrowDownUp /></th>
                            <th onClick={() => handleSort('EMAIL')}>Email  <BsArrowDownUp /></th>
                            <th onClick={() => handleSort('WEB')}>Website  <BsArrowDownUp /></th>

                        </tr>
                    </thead>

                    <tbody>
                        {paginatedList[pageNum] && paginatedList[pageNum].map((itm) => {

                            return (
                                <tr key={itm.id}>
                                    <td>
                                        <Link to={`/users/${itm.id}`} className='username' >
                                            <div onClick={() => handleUserData(itm)}>
                                                {itm.first_name}
                                            </div>
                                        </Link>
                                    </td>
                                    <td>{itm.last_name}</td>
                                    <td>{itm.age}</td>
                                    <td>{itm.email}</td>
                                    <td>
                                        <a href={itm.web} target='_blank' >{itm.web}</a>
                                    </td>

                                </tr>
                            )
                        })}
                    </tbody>
                </TableData >
            </div>

            <PaginationBtnStyle>
                <button
                    onClick={() => setPageNum(pageNum === 0 ? 0 : pageNum - 1)}
                    className='btn'
                >
                    <BackBtnICon size='14px' />
                </button>
                {paginatedList.map((itm, idx) => {
                    return (
                        <button
                            key={idx + 1}
                            onClick={() => setPageNum(idx)}
                            className={`btn ${pageNum === idx ? 'pageNavBtn' : ''}`}
                        >
                            {idx + 1}
                        </button>
                    )
                })}
                <button
                    onClick={
                        () => setPageNum(pageNum !== (paginatedList.length - 1) ? (pageNum + 1) : (paginatedList.length - 1))
                    }
                    className='btn'
                >
                    <NextBtnIcon size='14px' />
                </button>
            </PaginationBtnStyle>
        </>
    )
}
export default Table;