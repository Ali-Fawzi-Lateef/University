import { DataGrid  } from '@mui/x-data-grid';
import { useEffect, useRef, useState, useMemo } from 'react';
import axios from '../../../utils/axios';
import ManageGrades from "./ManageGrades";

/**
 *
 * @returns Users page
 */
export default function Students()
{

    const [rowId, setRowId] = useState(null);

    //page size
    const [pageSize, setPageSize] = useState(5);

    // to make sure that api call happens only once.
    const dataFetchedRef = useRef(false);
    // const [selectedUser, setSelectedUser] = useState("");
    /**
     * fetch users data via http request and assign the data to a state varible
     * to use it in the table
     */
    const [rows, setRows] = useState([]);
    useEffect(()=>{
        if (dataFetchedRef.current) return;
        dataFetchedRef.current = true;
        axios.get('/getStudentGrades').then((respone)=>{
            setRows(respone.data)
        })
    },[])


    const columns = useMemo(
        () => [
            { field: 'name', headerName: 'Full Name', width: 240, editable: false},
            { field: 'subject1', headerName: 'subject1', width: 90, editable: true, type: 'number'},
            { field: 'subject2', headerName: 'subject2', width: 90, editable: true, type: 'number'},
            { field: 'subject3', headerName: 'subject3', width: 90, editable: true, type: 'number'},
            { field: 'subject4', headerName: 'subject4', width: 90, editable: true, type: 'number'},
            { field: 'subject5', headerName: 'subject5', width: 90, editable: true, type: 'number'},
            { field: 'Year', headerName: 'Year', width: 90, editable: true, type: 'number'},

            {
                field: 'actions',
                headerName: 'Save',
                type: 'actions',
                renderCell: (params) => (
                    <ManageGrades {...{ params, rowId, setRowId }} />
                ),
            },
        ],
        [rowId]
    );
    /**
     * page content
     */
    return (
        <>

            <section className='w-full h-5/6 bg-slate-100'>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    rowsPerPageOptions={[5, 10, 20]}
                    sx={{maxHeight : 620}}
                    pageSize={pageSize}
                    onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                    getRowSpacing={(params) => ({
                        top: params.isFirstVisible ? 0 : 5,
                        bottom: params.isLastVisible ? 0 : 5,
                    })}
                    onCellEditCommit={(params) => setRowId(params.id)}
                />
            </section>
        </>
    )
}