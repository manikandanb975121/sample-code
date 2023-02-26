import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';


export default function SearchBar(props) {
  return (
    <Autocomplete
      loading={props.loader}
      disablePortal
      id="combo-box-demo"
      options={props.userList}
      sx={{ width: 300, marginBottom: 2 }}
      onChange={
        (event, value) => { 
            
            props.selectUser(value);
         }
      }
      renderInput={(params) => <TextField {...params} label="Search User" onChange={(e)=>{
       
        props.fetchUsers(e.target.value);
    }
    }/>}
    />
  );
}


