import React, { useEffect, useState, useRef } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import { environment } from 'src/configs/environment';
import axiosIntance from 'src/helper/axios';



const AddStrategy = ({ onSubmitHandler, onClose, strategy }) => {
    const [title, setTitle] = useState(null);
    const [description, setDescription] = useState(null);
    const inputFile = useRef(null);
    const [profileImage, setProfileImage] = useState('');
    const [isStrategyQuestion, setIsStrategyQuestions] = useState(false);
    const [question, setQuestions] = useState(null);
    const [answer, setAnswer] = useState(null);


    useEffect(() => {
        if (strategy) {
            setTitle(strategy.name);
        }
        if (strategy.name === 'Strategy Questions') {
            setIsStrategyQuestions(true);
        }
    }, [strategy])


    const handleFileChange = (e) => {
        const file = e.target.files[0]
        if (e.target.files) {
            setProfileImage(e.target.files[0]);
            var reader = new FileReader();
            reader.onloadend = function() {
                setProfileImage(reader.result);
            }
            reader.readAsDataURL(file);
        }
    }

    const submitHandler = async () => {
        if (!isStrategyQuestion) {
            if (title && description) {
                const data = {
                    title,
                    description,
                    type: title
                }
                onSubmitHandler(data);
            }
        } else {
            if (question && answer && description) {
                const data = {
                    question,
                    answer,
                    description,
                    oid: localStorage.getItem('orgId')
                }
                console.log({data});
                await axiosIntance.post(environment.baseAPIUrl + environment.endpoints.question.createQuestion, data);
                onClose(false)
            }
        }
        
        return;
    }

    
  return (
    <div style={{ lineHeight: '6.5em', padding: 10}}>
    { !isStrategyQuestion && <TextField value={title} fullWidth id="outlined-basic" label="Name"  inputProps={{ maxLength: 50 }} onChange={(e) => { setTitle(e.target.value)}}  /> }
    { isStrategyQuestion && <TextField value={question} fullWidth id="outlined-basic" label="Questions"  inputProps={{ maxLength: 50 }} onChange={(e) => { setQuestions(e.target.value)}}  /> }
    <TextField
        placeholder="Type Here..."
        multiline
        fullWidth
        rows={4}
        onChange={(e) => { setDescription(e.target.value)}}
        maxRows={4}
    />
    { isStrategyQuestion && <TextField
        placeholder="Type Your Answer Here..."
        multiline
        style={{ marginTop: 30}}
        fullWidth
        rows={4}
        onChange={(e) => { setAnswer(e.target.value)}}
        maxRows={4}
    /> }
    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '30px'}}>
        <div>
            <Button variant='outlined' onClick={() => { inputFile.current.click() }} type="button" className="refreshbt import-user-button">Upload Image</Button>
            <input
                style={{ display: 'none'}}
                type="file"
                onChange={handleFileChange}
                ref={inputFile} 
            />
        </div>

        <div>
            {
                profileImage &&     <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                    component="img"
                    height="194"
                    image={profileImage}
                    alt="Paella dish"
                />
                </Card>
            }
        </div>
        
    </div>
    
    


    <div style={{ display: 'flex', justifyContent: 'flex-end', margin: '10px 0px'}}>
        <Button variant="outlined" onClick={() => {submitHandler()}}>{ 'Add' }</Button>
        <Button variant="outlined" onClick={() => {onClose(false)}}>Cancel</Button>
    </div>

</div>
  )
}

export default AddStrategy