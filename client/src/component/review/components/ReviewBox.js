import React, { useState } from 'react';
import Rating from '@mui/material/Rating';
import TextField from '@mui/material/TextField';

const ReviewBox = ({ title, rating, value, compitancyId, onChange, rateChangeHandler, index }) => {
  return (
    <div style={{ padding: '10px'}}>
        <div style={{ display: 'flex', justifyContent: 'space-between'}}>
            <p>{ title }</p>
            <Rating
                name="simple-controlled"
                value={rating}
                readOnly={value}
                onChange={(event, newValue) => {
                    rateChangeHandler(compitancyId, newValue, index)
                }}
            />
        </div>
        <div>
            <TextField 
                onChange={(e) => {onChange(compitancyId, e.target.value)}} 
                fullWidth 
                multiline 
                disabled={value ? true : false }
                value={value ? value : null}
                variant="outlined" 
                rows={4}
            />
        </div>
    </div>
  )
}

export default ReviewBox