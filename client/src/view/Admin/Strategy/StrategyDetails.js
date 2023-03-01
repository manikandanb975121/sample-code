import React, { useState, useRef, useEffect } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import "../../../App.css";
import { environment } from 'src/configs/environment';
import axiosIntance from 'src/helper/axios';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccordionDetails from '@mui/material/AccordionDetails';
import DeleteIcon from '@mui/icons-material/Delete';

const StrategyDetails = ({ name, content, image, id }) => {
  const [isEdit, setIsEdit] = useState(false);
  // const [names, setNames] = useState(null);
  const inputFile = useRef(null);
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const [profileImage, setProfileImage] = useState('');
  const [isStrategyQuestion, setIsStrategyQuestions] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [questionId, setQuestionId] = useState('');
  const [questionName, setQuestionName] = useState('');
  const [questionAnswerName, setQuestionAnswerName] = useState('');

  useEffect(() => {
    if (name == 'Strategy Questions') {
      setIsStrategyQuestions(true);
      fetchAllQuestionsAPI()
    } else {
      setIsStrategyQuestions(false);
    }
  }, [name])

  useEffect(() => {
    console.log('hello');
  }, [questions, questionId])

  const fetchAllQuestionsAPI = async () => {
    const response = await axiosIntance.get(environment.baseAPIUrl + environment.endpoints.question.createQuestion + `/${localStorage.getItem('orgId')}`);
    const updatedQuestions = response.data.map((x) => {
      x.isEdit = false;
      return x
    })
    setQuestions(updatedQuestions);
  }

  const updateHandler = async () => {
    // const response = await axiosIntance.post(environment.baseAPIUrl + environment.endpoints.strategy.getStrategy + '/id', );
    setIsEdit(false);
  }

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

    const handleAnswerInput = () => {
      console.log('log')
    }

    const editQuestions = (id) => {
      console.log({id});
      const questionIndex = questions.findIndex(x => x.id === id);
      questions[questionIndex].isEdit = true;
      console.log(questions);
      setQuestions(questions);
      setQuestionId(questions[questionIndex].id);
    }

    const updatQuestion = async () => {
      console.log({questionId});
      const data = {
        question: questionName,
        answer: questionAnswerName,
      }
      await axiosIntance.put(environment.baseAPIUrl + environment.endpoints.question.createQuestion + `/${questionId}`, data);
    }

    const deleteQuestion = async (id) => {
      console.log({id});
      await axiosIntance.delete(environment.baseAPIUrl + environment.endpoints.question.createQuestion + `/${id}`);
      const updatedQuestion = questions.filter(x => x.id !== id);
      setQuestions(updatedQuestion);
    }

  return (
    <div>
      <div className="container_strategye">
            <div className="row">
              {
                !isStrategyQuestion && 
                <div className="col-md-8">
                  <div className="strategye_content_wrp">
                    
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
  
                      <div>
                        {
                          !isEdit && <h2>{ name }</h2>
                        }
                        {
                          isEdit && <TextField value={title ? title : name } onChange={(e) => { setTitle(e.target.value)}}  fullWidth id="outlined-basic" label="Name"  inputProps={{ maxLength: 50 }}  />
                        }
                      </div>
                      
                      <div>
                        {
                          !isEdit &&  <IconButton onClick={() => { setIsEdit(true) }} color="success" aria-label="upload picture" component="label">
                                          <EditIcon />
                                      </IconButton>
                        }
                        {
                          isEdit &&  <IconButton onClick={updateHandler} color="success" aria-label="upload picture" component="label">
                          <CheckIcon />
                          </IconButton>
                        }
                      </div>
                      
                     
                    </div>
                    
                    {
                      !isEdit && <p>{ content }</p>
                    }
                    {
                      isEdit && <TextField
                      style={{ marginTop: '30px' }}
                        placeholder="Type Here..."
                        multiline
                        fullWidth
                        onChange={(e) => { setDescription(e.target.value) }}
                        value={description ? description : content}
                        rows={8}
                        maxRows={8}
                      />
                    }
                    
                  </div>
                </div>
                
              }
              {
                isStrategyQuestion && <div className='col-md-12'>
                { questions.map((question,i) => (
                  <Accordion style={{ padding: 10 }}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      { !question.isEdit &&  <h6>{i + 1}. { question.question }</h6> }
                      { question.isEdit && <h6>Edit Questions</h6> }
                    </AccordionSummary>
                    <AccordionDetails>
                      <div>
                        { !question.isEdit &&  <h6>Answers: </h6> }
                        { !question.isEdit && <p style={{ fontSize: '15px', fontWeight: 300 }}>{ question.answer }</p> }
                        { question.isEdit && 
                        <div>
                          <p>Questions</p>
                          <TextField
                            placeholder="Edit the Question..."
                            multiline
                            fullWidth
                            onChange={(e) => { setQuestionName(e.target.value) }}
                            value={questionName}
                            rows={1}
                          />
                        </div>
                         
                        }
                        { question.isEdit && 
                        <div style={{ marginTop: '10px'}}>
                          <p>Answer</p>
                          <TextField
                              placeholder="Edit the Answers..."
                              multiline
                              fullWidth
                              onChange={(e) => { setQuestionAnswerName(e.target.value) }}
                              value={questionAnswerName}
                              rows={4}
                              maxRows={8}
                          />
                        </div> 
                        }
                        <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                            { !question.isEdit && <IconButton onClick={() => { editQuestions(question.id ) }} color="success" aria-label="upload picture" component="label">
                                <EditIcon />
                            </IconButton> }
                            { !question.isEdit && 
                            <IconButton onClick={() => {deleteQuestion(question.id)}} color="error" aria-label="upload picture" component="label">
                                <DeleteIcon />
                            </IconButton> }
                            { question.isEdit && 
                            <IconButton onClick={updatQuestion} color="success" aria-label="upload picture" component="label">
                                <CheckIcon />
                            </IconButton> }
                        </div>
                      </div>   
                    </AccordionDetails>
                  </Accordion>
                ))}
                 
              </div>
              }
              {/* <div className="col-md-8">
                {
                  !isStrategyQuestion && <div className="strategye_content_wrp">
                    
                  <div style={{display: 'flex', justifyContent: 'space-between'}}>

                    <div>
                      {
                        !isEdit && <h2>{ name }</h2>
                      }
                      {
                        isEdit && <TextField value={title ? title : name } onChange={(e) => { setTitle(e.target.value)}}  fullWidth id="outlined-basic" label="Name"  inputProps={{ maxLength: 50 }}  />
                      }
                    </div>
                    
                    <div>
                      {
                        !isEdit &&  <IconButton onClick={() => { setIsEdit(true) }} color="success" aria-label="upload picture" component="label">
                                        <EditIcon />
                                    </IconButton>
                      }
                      {
                        isEdit &&  <IconButton onClick={updateHandler} color="success" aria-label="upload picture" component="label">
                        <CheckIcon />
                        </IconButton>
                      }
                    </div>
                    
                   
                  </div>
                  
                  {
                    !isEdit && <p>{ content }</p>
                  }
                  {
                    isEdit && <TextField
                    style={{ marginTop: '30px' }}
                      placeholder="Type Here..."
                      multiline
                      fullWidth
                      onChange={(e) => { setDescription(e.target.value) }}
                      value={description ? description : content}
                      rows={8}
                      maxRows={8}
                    />
                  }
                  
                </div>
                }
              </div> */}

              { !isStrategyQuestion && <div className="col-md-4">
                  <div className="strategye_mission_wrp" style={{ display: 'flex', justifyContent: 'center'}}>
                    {
                      !isEdit && <img src="img/strategye_mission.png" />
                    }
                    {
                      isEdit && <div>
                      <Button variant='outlined' onClick={() => { inputFile.current.click() }} type="button" className="refreshbt import-user-button">Upload Image</Button>
                      <input
                          style={{ display: 'none'}}
                          type="file"
                          onChange={handleFileChange}
                          ref={inputFile} 
                      />
                        {
                          profileImage &&   <Card  style={{ marginTop: '30px'}} sx={{ maxWidth: 345 }}>
                          <CardMedia
                              component="img"
                              height="194"
                              image={profileImage}
                              alt="Paella dish"
                          />
                          </Card>
                        } 
                    </div>
                    }
                  </div>
              </div> }
            </div>
        </div>
    </div>

  )
}

export default StrategyDetails