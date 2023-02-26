import React from 'react'
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import ReviewTemplateList from './ReviewTemplateList';

const ReviewList = ({ updated }) => {
    const [value, setValue] = React.useState('1') ;

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
        <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Review Template" value="1" />
            <Tab label="Core Competencies" value="2" />
            <Tab label="Technical Competencies" value="3" />
          </TabList>
        </Box>
        <TabPanel value="1">
            <ReviewTemplateList updated={updated} />
        </TabPanel>
        <TabPanel value="2">Item Two</TabPanel>
        <TabPanel value="3">Item Three</TabPanel>
      </TabContext>
    </Box>
    </div>
  )
}

export default ReviewList