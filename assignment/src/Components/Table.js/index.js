import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import {BsArrowDownUp } from 'react-icons/bs'
import {SORTS} from '../../Utils/index'

const TableData = styled.table`
border:1px solid black;
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
    .username{
        text-decoration:none;
        color:black;
    }
}
`

const Table = ({ data, handleUserData }) => {
    const [sort, setSort] = React.useState(
        {
            sortKey: 'NONE',
            isReverse: false,
        }
    );
    const handleSort = (sortKey) => {
        const isReverse = sort.sortKey === sortKey && !sort.isReverse;
        
        setSort({ sortKey, isReverse });
    };

    const sortFunction = SORTS[sort.sortKey];
    const sortedList = sort.isReverse
        ? sortFunction(data).reverse()
        : sortFunction(data);
    return (
        <TableData >
            <thead>
                <tr>
                    <th onClick={() => handleSort('FIRST_NAME')}>First Name  <BsArrowDownUp /></th>
                    <th onClick={() => handleSort('LAST_NAME')}>Last Name  <BsArrowDownUp/></th>
                    <th onClick={() => handleSort('AGE')}>Age  <BsArrowDownUp/></th>
                    <th onClick={() => handleSort('EMAIL')}>Email  <BsArrowDownUp/></th>
                    <th onClick={() => handleSort('WEB')}>Website  <BsArrowDownUp/></th>
                    
                </tr>
            </thead>
            <tbody>
                {sortedList && sortedList.map((itm) => {
                    
                    return (
                        <tr key={itm.id}>
                            <td>
                                <Link to={`/users/${itm.id}`} className='username' >
                                    <div onClick={()=>handleUserData(itm)}>
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
    )
}
export default Table;