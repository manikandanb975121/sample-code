import React, { useEffect, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination ';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import DialogModal from '../DialogModal';
import axiosIntance from 'src/helper/axios';
import { environment } from 'src/configs/environment';
import { useSelector } from "react-redux";
import { deepPurple } from '@mui/material/colors';
import Loader from 'src/view/common/Loader';
import Pagination from '@mui/material/Pagination';
import TextField from '@mui/material/TextField';
import AddReview from './AddReview';

const ReviewTemplateList = ({ updated }) => {
    const auth = useSelector(state => state.auth);
    const token = auth.token;
    const [loader, setLoader] = useState(true);
    const [count, setCount] = useState(0);
    const [page, setPage] = useState(0)
    const [rowPerPage, setRowPerPage] = useState(10);
    const [search, setSearch] = useState(null);
    const [reviewTemplates, setReviewTemplates] = useState([]);
    const [isEdit, setIsEdit] = useState(false);
    const [editData, setEditData] = useState({});

    useEffect(() => {
        fetchAllReviewTemplate();
    }, [updated])

    const fetchAllReviewTemplate = async(rowPerPage=10, page=1, search='', orgId = localStorage.getItem('orgId')) => {
        // const response = await axiosIntance.get(environment.baseAPIUrl + environment.endpoints.getAllUser(rowPerPage, page, search, orgId))
        const response = await axiosIntance.get(environment.baseAPIUrl + environment.endpoints.review.reviewTemplate + `?oid=${orgId}`);
        console.log(response.data);
        setCount(response?.data?.count)
        setReviewTemplates(response?.data?.data);
        setLoader(false);
    }

    const updateTemplate = async (data, id) => {
      console.log(data);
      setLoader(true);
      const response = await axiosIntance.put(environment.baseAPIUrl + environment.endpoints.review.reviewTemplate + `/${id}`, data);
      console.log(response.data);
      await fetchAllReviewTemplate();
      setIsEdit(false);
      setLoader(false);
    }

    const deleteTemplate = async (id) => {
      setLoader(true);
      const response = await axiosIntance.delete(environment.baseAPIUrl + environment.endpoints.review.reviewTemplate + `/${id}`);
      await fetchAllReviewTemplate();
      setLoader(false);
    }

    const handleSearch = (e) => {
        console.log({e});
    }

    const handleChangePage = (e) => {
        console.log({e})
    }
    const handleChangeRowsPerPage = (e) =>{
        console.log({e});
    }
    const editHandler = (data) => {
        console.log({data});
        setEditData(data);
        setIsEdit(true);
    }
    const deleteHandler = async (data) => {
      await deleteTemplate(data.id)
    }
    const updateHanlder = async (data) => {
      console.log({data});
      const id = data?.id;
      delete data?.id
      await updateTemplate(data, id);
    }
    const onCloseEditHandler = () => {
      setIsEdit(false);
    }
  return (
    <div>
        <Loader loading={loader} />
        <TextField value={search} fullWidth id="outlined-basic" label="Search" onChange={(e) => { handleSearch(e.target.value)}}  />
        <Table style={{ marginTop: '15px'}} sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Core Competencies</TableCell>
            <TableCell>Technical Competencies</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {reviewTemplates.map((row, index) => (
            <TableRow
              key={index}
            >
              <TableCell component="th" scope="row">
                {row.template_name}
              </TableCell>
              <TableCell component="th" scope="row">
                {row.template_name}
              </TableCell>
              <TableCell component="th" scope="row">
                {row.template_name}
              </TableCell>
              <TableCell component="th" scope="row">
                <div style={{ display: 'flex', justifyContent: 'center'}}>
                    <IconButton onClick={() => { editHandler(row) }} color="success" aria-label="upload picture" component="label">
                        <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => { deleteHandler(row) }} color="error" aria-label="upload picture" component="label">
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
      {
        isEdit && <DialogModal open={isEdit} title={'Update Template'}>
          <AddReview onClose={onCloseEditHandler} onSubmit={updateHanlder} isEdit={isEdit} data = {editData} />
        </DialogModal>
      }
    </div>
  )
}

export default ReviewTemplateList