import React from 'react'
import Avatar from '@mui/material/Avatar';
import { deepPurple } from '@mui/material/colors';

const AvatarImage = ({ profileImage, name, bgColor=`${deepPurple[500]}` }) => {
  return (
    <div>
        {
            profileImage ? <Avatar alt={name} src={profileImage} /> 
                  : <Avatar sx={{ bgcolor: bgColor }}>{name?.substring(0, 1)?.toUpperCase()}</Avatar>
        }
    </div>
  )
}

export default AvatarImage