import React, { useEffect, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import axiosIntance from 'src/helper/axios';
import { environment } from 'src/configs/environment';
import { useSelector } from "react-redux";
import Loader from 'src/view/common/Loader';
import AddDepartments from './AddDepartments';
import DialogModal from '../DialogModal';
import TextField from '@mui/material/TextField';

const DepartmentList = () => {
  const [loader, setLoader] = useState(true);
  const [isEdit, setIsEdit] = useState(false);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(0)
  const [rowPerPage, setRowPerPage] = useState(10);
  const [selectDepartment, setSelectedDepartment] = useState([]);
  const [department, setDepartment] = useState([]);
  const [search, setSearch] = useState(null);

  // useEffect(() => {
  //   async function fetchAllDepartmentsAPI() {
  //     const response = await axiosIntance.get(environment.baseAPIUrl + environment.endpoints.department.getAllDepartments(rowPerPage, page));
  //     setDepartment(response.data.data);
  //     setLoader(false);
  //   }
  //   fetchAllDepartmentsAPI();
  // }, []);

  useEffect(() => {
    fetchAllDepartmentAPI(rowPerPage, page+1, search)
  }, [page, rowPerPage, search])

  const onSubmitHanlder = async (data) => {
    await axiosIntance.put(environment.baseAPIUrl + `${environment.endpoints.department.createDepartments}/${selectDepartment.id}`, data);
    setIsEdit(false);
  }

  // oid=localStorage.getItem('orgId')
  const fetchAllDepartmentAPI = async (rowPerPage = 10, page=1, search='', oid=localStorage.getItem('orgId')) => {
    const response = await axiosIntance.get(environment.baseAPIUrl + environment.endpoints.department.getAllDepartments(rowPerPage, page, search, oid));
    setDepartment(response.data.data);
    setCount(response.data?.count);
    setLoader(false);
  }

  const editHandler = (userData) => {
    setSelectedDepartment(userData);
    setIsEdit(true);
  }

  const handleChangePage = async (event, newPage) => {
    setPage(newPage)
    // await fetchAllDepartmentAPI(newPage)
  }

  const handleChangeRowsPerPage = async (event) => {
    setRowPerPage(event.target.value);
    // await fetchAllDepartmentAPI()
  }

  const handleSearch = (e) => {
    setSearch(e);
  }
  
  return (
    <div>
      <Loader loading={loader} />
      <TextField value={search} fullWidth id="outlined-basic" label="Search" onChange={(e) => { handleSearch(e.target.value)}}  />
       <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Department Name</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {department.map((row, index) => (
            <TableRow
              key={index}

            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell component="th" scope="row">
                    <IconButton onClick={() => { editHandler(row) }} color="success" aria-label="upload picture" component="label">
                        <EditIcon />
                    </IconButton>
                    <IconButton  color="error" aria-label="upload picture" component="label">
                        <DeleteIcon />
                    </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow style={{ margin: 20}}>
            <TablePagination
              rowsPerPageOptions={[5, 10, 20, 30]}
              colSpan={4}
              count={count}
              rowsPerPage={rowPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableRow>
        </TableFooter>
      </Table>
      {
        isEdit && <DialogModal title={'Update Departments'} open={isEdit} isEdit={isEdit}>
         <AddDepartments isEdit={isEdit} userData={selectDepartment} onClose={setIsEdit} onSubmit={onSubmitHanlder} />
        </DialogModal>
      }
    </div>
  )
}

export default DepartmentList