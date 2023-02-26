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
import AddOrganizations from './AddOrganizations';
import DialogModal from '../DialogModal';
import Loader from 'src/view/common/Loader';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';

function createData(name, maxUsers) {
  return { name, maxUsers };
}

const rows = [
  createData('Quantum', '500'),
  createData('Quantum 2', '400'),
  createData('Quantum 3', '540'),
  createData('Quantum 4', '620'),
  createData('Quantum 5', '150'),

];

const OrganizationList = () => {
    const auth = useSelector(state => state.auth);
    const token = auth.token;
    const [loader, setLoader] = useState(true);
    const [isEdit, setIsEdit] = useState(false);
    const [selectedUser, setSeletedUser] = useState({});
    const [organization, setOrganizations] = useState([]);
    const [count, setCount] = useState(0);
    const [page, setPage] = useState(0)
    const [rowPerPage, setRowPerPage] = useState(10);
    const [check, setCheck]= useState(1);
    const [selectedValue, setSelectedValue] = useState('Please Select from the Dropdown')
    const [search, setSearch] = useState('');

    useEffect(() => {
        async function fetchAllOrganizationsAPI() {
            const response = await axiosIntance.get(environment.baseAPIUrl + environment.endpoints.organization.getAllOrganizations(rowPerPage, page, search));
            const updatedValue = response.data.rows.map((x) => {
              const index = x.settings.findIndex(y => y.setting_type==='GOAL-FREQUENCY');
              if (index !== -1) {
                  x.frequency = x.settings[index].value;
              } else {
                  x.frequency = ''
              }
              return x;
          })
            setOrganizations(updatedValue)
            setLoader(false);
        }
        fetchAllOrganizationsAPI();
    }, []);

    useEffect(() => { console.log('updating', organization)}, [check])
    useEffect(() => { fetchAllOrganizationsAPI(rowPerPage, page, search) }, [search])

    const fetchAllOrganizationsAPI = async (rowPerPage=10, page=1, search='') => {
      const response = await axiosIntance.get(environment.baseAPIUrl + environment.endpoints.organization.getAllOrganizations(rowPerPage, page, search))
      // const updatedResponse = response.data.rows;
      const updatedValue = response.data.rows.map((x) => {
        const goalFrequency = x.settings.filter(y => y.setting_type==='GOAL-FREQUENCY');
        const index = goalFrequency.length - 1;
        if (index !== -1) {
            x.frequency = x.settings[index].value;
            x.isEdit = false;
        } else {
            x.frequency = null;
        }
        return x;
    })
      setOrganizations(updatedValue);
      setCount(response.data?.total)
      setLoader(false);
    }

    const editHandler = (userData) => {
      setSeletedUser(userData);
      setIsEdit(true);
    }

    const onSubmitHanlder = async (organiztionsData, isUpdate ,organizationId) => {
      delete organiztionsData.maxUsers;
      await axiosIntance.put(environment.baseAPIUrl + `${environment.endpoints.organization.createOrganization}/${organizationId}`, organiztionsData)
    }

    const handleChangePage = async (event, newPage) => {
      setPage(newPage)
      await fetchAllOrganizationsAPI(newPage)
      
    }

    const handleChangeRowsPerPage = async (event) => {
      setRowPerPage(event.target.value);
      await fetchAllOrganizationsAPI()
    }

    const dropDownHandler = async (value, row, index) => {
      organization[index].frequency = value;
      setOrganizations(organization);
      setCheck(`${index}_${Math.random()}`);
      const data = {
        oid: row.id,
        setting_type: 'GOAL-FREQUENCY',
        value
      }
      const response = await axiosIntance.post(environment.baseAPIUrl + environment.endpoints.organization.updateFrequency, data);
    }
    
    const handleSearch = (e) => {
      setSearch(e);
    }

    const editFrequencyHandler = (data, index) => {
      organization[index].frequency = null;
      console.log({organization});
      setOrganizations(organization);
      setCheck(index)
    }

  return (
    <div>
      <Loader loading={loader} />
      <TextField value={search} fullWidth id="outlined-basic" label="Search" onChange={(e) => { handleSearch(e.target.value)}}  />
       <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
          <TableCell>Organizations Name</TableCell>
            <TableCell>Frequency</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {organization.map((row, index) => (
            <TableRow
              key={index}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell component="th" scope="row">
                { row.frequency && 
                  <div style={{ display: 'flex', justifyContent: 'flex-start'}}>
                    <p style={{ marginTop: '15px'}}>{ row.frequency  }</p>
                    <IconButton onClick={() => { editFrequencyHandler(row, index) }} color="success" aria-label="upload picture" component="label">
                        <EditIcon />
                    </IconButton>
                  </div>
                }
                { !row.frequency && 
                <div>
                  <InputLabel id="demo-simple-select-label">Select from the dropdown</InputLabel>
                  <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={row.frequency}
                  label="Select"
                  onChange={(e) => dropDownHandler(e.target.value, row, index)}
                >
                  <MenuItem value={'QUATERLY'}>QUATERLY</MenuItem>
                  <MenuItem value={'HALF_YEARLY'}>HALF YEARLY</MenuItem>
                  <MenuItem value={'YEARLY'}>YEARLY</MenuItem>
                </Select>
                </div>
                }
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
        isEdit && <DialogModal title={'Update Organizations'} open={isEdit} isEdit={isEdit}>
         <AddOrganizations isEdit={isEdit} userData={selectedUser} onClose={setIsEdit} onSubmit={onSubmitHanlder} />
        </DialogModal>
      }
    </div>
  )
}

export default OrganizationList