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
import AddUser from './AddUser';
import DialogModal from './DialogModal';
import axiosIntance from 'src/helper/axios';
import { environment } from 'src/configs/environment';
import { useSelector } from "react-redux";
import { deepPurple } from '@mui/material/colors';
import Loader from '../common/Loader';
import Pagination from '@mui/material/Pagination';
import Avatar from 'src/component/avatar/Avatar';
import TextField from '@mui/material/TextField';

function createData(firstName, lastName, email) {
    return { firstName, lastName, email };
  }
  
  const rows = [
    createData('Mike', 'Reading', 'abc@gmail.com'),
    createData('Amber', 'Json', 'xyz@gmail.com'),
    createData('John', 'Brother', 'dcr@gmail.com'),
    createData('Hen', 'Walk', 'hew@gmail.com'),
    createData('Freya', 'Chal', 'freya@gmail.com'),
  ];

  
const UserList = () => {

    const auth = useSelector(state => state.auth);
    const token = auth.token;
    const [isEdit, setIsEdit] = useState(false);
    const [isDelete, setIsDelete] = useState(false);
    const [selectedUser, setSeletedUser] = useState({});
    const [users, setUsers] = useState([]);
    const [loader, setLoader] = useState(true);
    const [count, setCount] = useState(0);
    const [page, setPage] = useState(0)
    const [rowPerPage, setRowPerPage] = useState(10);
    const [search, setSearch] = useState(null);

    // useEffect(() => {
    //   async function fetchAllUserAPI() {
    //     const response = await axiosIntance.get(environment.baseAPIUrl + environment.endpoints.getAllUser())
    //     console.log(response.data);
    //     setUsers(response?.data?.data);
    //     setCount(response.data?.count)
    //     setLoader(false);
    //   }
    //   fetchAllUserAPI();
    // }, [])

    useEffect(() => {
      fetchAllUserAPI(rowPerPage, page+1, search)
    }, [page, rowPerPage, search])

    const fetchAllUserAPI = async (rowPerPage=10, page=1, search='', orgId = localStorage.getItem('orgId')) => {
      const response = await axiosIntance.get(environment.baseAPIUrl + environment.endpoints.getAllUser(rowPerPage, page, search, orgId))
      const orgUser = response?.data?.data;
      // .filter(x => x?.oid === localStorage.getItem('orgId'));
      setUsers(orgUser);
      setCount(response?.data?.count)
      setLoader(false);
    }

    const editHandler = (userData) => {

        setSeletedUser(userData);
        setIsEdit(true);    
    }

    const onSubmitHanlder = (data) => {
        console.log(data);
    }

    const onUpdateHandler = async (data) => {
      // const response = await axiosIntance.post(environment.baseAPIUrl + environment.endpoints.updateUser, data)
      const response = await axiosIntance.put(environment.baseAPIUrl + environment.endpoints.updateUser(selectedUser.id), data)
    }

    const handleChangePage = async (event, newPage) => {
      setPage(newPage)
      // await fetchAllUserAPI(rowPerPage, newPage)
      
    }

    const handleChangeRowsPerPage = (event) => { 
      setRowPerPage(event.target.value);
      // await fetchAllUserAPI()
    }

    const handleSearch = (e) => {
      console.log({e});
      setSearch(e);
    }

  return (
    <div>
      <Loader loading={loader} />
      <TextField value={search} fullWidth id="outlined-basic" label="Search" onChange={(e) => { handleSearch(e.target.value)}}  />

        <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Profile</TableCell>
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>Organization</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((row, index) => (
            <TableRow
              key={index}

            >
              <TableCell  component="th" scope="row">
                {
                  <Avatar profileImage={row.profileImage} name={row.fname} bgColor={'#8803fc'}/> 
                }
              </TableCell>
              <TableCell component="th" scope="row">
                {row.fname}
              </TableCell>
              <TableCell component="th" scope="row">
                {row.lname}
              </TableCell>
              <TableCell component="th" scope="row">
                {row.orgName}
              </TableCell>
              <TableCell component="th" scope="row">{row.email}</TableCell>
              <TableCell component="th" scope="row">
                <div style={{ display: 'flex', justifyContent: 'center'}}>
                    <IconButton onClick={() => { editHandler(row) }} color="success" aria-label="upload picture" component="label">
                        <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => { setIsDelete(true) }} color="error" aria-label="upload picture" component="label">
                        <DeleteIcon />
                    </IconButton>
                </div>
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
      {isEdit && <DialogModal open={isEdit} isEdit={isEdit}>
              <AddUser isEdit={isEdit} userData={selectedUser} onClose={setIsEdit} onSubmit={onUpdateHandler} />
        </DialogModal>}

        {isDelete && <DialogModal open={isDelete} isDelete={isDelete} isEdit={isEdit}>
              <AddUser isEdit={isEdit} isDelete={ isDelete } userData={selectedUser} onClose={setIsDelete} onSubmit={onSubmitHanlder} />
        </DialogModal>}
    </div>
  )

              }
export default UserList;