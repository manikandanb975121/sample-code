import React, { useState,useEffect } from 'react';

import {useSelector,useDispatch} from "react-redux";
// import Loader from "react-loader-spinner";

import StrategyHeader from "./userprofile/StrategyHeader";
import {Link,Redirect,useNavigate} from 'react-router-dom'
//import Loader from 'react-loader-spinner';

// import "../App.css";
import axios from 'axios';
import {baseUrl} from '../config';
import axiosInstance from '../helper/helper'


export default function Strategycomponent() {

  const [mission,setMission]=useState('');
  const [vision,setVision]=useState('');
  const [values,setvalues]=useState('');
  const [messages,setMessage]=useState('');
  const [question,setQuestion]=useState([]);
  const [answertext,setAnswerText]=useState([{}]);
  const [loader,setLoader]=useState(false)
  const navigate = useNavigate();

  
  let userdata=JSON.parse(localStorage.getItem('userdata'));
  
  


  const handleAnswerInput = (event, index,quesId) => {
    // const value = inputEv.target.value;
    // setAnswerText((state) => state.map((val, i) => (i !== index ? val : value)));

    console.log(event.target.value, index);
        let newArr = [...answertext]; // copying the old datas array
        let item = newArr[index];
        item = {...item, "answer": event.target.value};
        newArr[index] = item;
        newArr[index].quesId=quesId;
        // console.log(newArr)
        // console.log(quesId)
        setAnswerText(newArr);
  };

  const fetchStrategy= ()=>{
    console.log('fetchStrategy')
    let oid=userdata?.oid;
    let APIURL=baseUrl+"/strategy/"+oid;
    axiosInstance.get(APIURL,{}).then(response => {
      console.log(response)

      let responseData=response.data;
      setMission(responseData.mission)
      setVision(responseData.vision)
      setvalues(responseData.values)
     

    }).catch(error => {
      console.log('it called first')
      setLoader(false)
      setMessage('Something went wrong');
    });
  }

  const fetchStrategy1= ()=>{
    console.log('in fetch 1')
    let oid=userdata.oid;
    let APIURL=baseUrl+"/strategy/"+oid;
    axiosInstance.get(APIURL,{}).then(response => {
      console.log(response)
      let responseData=response.data;
      setMission(responseData.mission)
      setVision(responseData.vision)
      setvalues(responseData.values)
     

    }).catch(error => {
      setLoader(false)
      setMessage('Something went wrong');
    });
  }

  const fetchQuestion= ()=>{
    
    let oid=userdata?.oid;
    let APIURL=baseUrl+"/question/"+oid;
    axiosInstance.get(APIURL,{}).then(response => {
      
      
    let responseData=response.data;
      setQuestion(responseData);
      let AnswerArray=[];
      responseData.forEach(element => {
        let temp={};
        temp.quesId=element.quesId;
        temp.answer=element.answer;
        AnswerArray.push(temp);
      });
     console.log(AnswerArray)
     setAnswerText(AnswerArray)

    }).catch(error => {
      setLoader(false)
      setMessage('Something went wrong');
    });
  }

  const publishFn = () =>{
    console.log('here check')
    let oid=userdata.oid;

    console.log(answertext);
    setLoader(true)
    // let questionAnswerAPIURL=baseUrl+"/question-answer/"+oid;
    let questionAnswerAPIURL=baseUrl+"/strategy/question/"+oid;
  

    console.log(mission,vision,values)
   
    let APIURL=baseUrl+"/strategy";
    axiosInstance.post(APIURL, {mission:mission,vision:vision,values:values,oid:oid}).then(response => {
        console.log('here Startegy')

        axios.post(questionAnswerAPIURL, answertext).then(response => {
          console.log('here quesion answer')
          setLoader(false)
    
        }).catch(error => {
          setLoader(false)
          setMessage('Something went wrong');
        });
       
  
      }).catch(error => {
        setLoader(false)
        setMessage('Something went wrong');
      });
  }

  useEffect(() => {
    //fetchStrategy1();
    // if(userdata==null){
    //   navigate("/")
    // }
      fetchStrategy();
      fetchQuestion();

    return () => {
      console.log('un subscribe')
    }



  }, [])

	return (
		
    <div className='goals row Strategycomponent Strategypage'>
        <StrategyHeader />
      <div id="ember906" className="StrategyForm is-editing ember-view ">
        <div className="strategy-card intro-text">
          <p>Welcome! Use this page to publish your organization’s mission statement, vision statement, core values, and the answers to 10 key questions that clarify your strategy. When employees understand these items, they can make better decisions and achieve more at work. Only the fields you fill out will appear on the published page.</p>
        </div>

        <div className="strategy-card">
    <div className="StrategyQuestion">
      <h2>Mission</h2>
      <small>A concise statement of your organization's essential purpose or intent.</small>
      <md-input-container id="ember907" className="md-block md-default-theme ember-view">

  <textarea 
      className="md-input" id="input-ember907" 
      aria-describedby="ember907-char-count ember907-error-messages" 
      rows="1"
      value={mission}
      onChange={e => setMission(e.target.value)} 
      >
  </textarea>

  <div className="md-errors-spacer" id="ember907-char-count">
 </div>



</md-input-container>
    </div>

    <div className="StrategyQuestion">
      <h2>Vision</h2>
      <small>A concise statement of the ideal future state your organization will create.</small>
      <md-input-container id="ember908" className="md-block md-default-theme ember-view">

  <textarea 
  className="md-input" 
  id="input-ember908" 
  aria-describedby="ember908-char-count ember908-error-messages" 
  rows="1"
  value={vision}
  onChange={e => setVision(e.target.value)} 
  ></textarea>

  <div className="md-errors-spacer" id="ember908-char-count">
 </div>



</md-input-container>
    </div>

    <div className="StrategyQuestion">
      <h2>Values</h2>
      <small>The specific beliefs that should influence every decision the organization makes.</small>
      <md-input-container id="ember909" className="md-block md-default-theme ember-view">

  <textarea className="md-input" 
  id="input-ember909" 
  aria-describedby="ember909-char-count ember909-error-messages" 
  rows="1" 
  value={values}
  onChange={e => setvalues(e.target.value)} 
  ></textarea>

  <div className="md-errors-spacer" id="ember909-char-count">
 </div>



</md-input-container>
    </div>

    <h2>Strategy Questions</h2>

    <ol>
     

{ 

question.map((item, index) => (
  
<li className="StrategyQuestion">
        <h3>{item.question}</h3>
        <small>{item.description}</small>
        <md-input-container id="ember910" className="md-block md-default-theme ember-view">

  <textarea className="md-input" 
  id="input-ember910" 
  aria-describedby="ember910-char-count ember910-error-messages" 
  rows="1"
  onChange={(e) => handleAnswerInput(e, index,item.quesId)}
 
  >{item.answer}</textarea>

  <div className="md-errors-spacer" id="ember910-char-count">
 </div>
  </md-input-container>
  </li>

))
      
      }

      

{/* 
      <li className="StrategyQuestion">
        <h3>What is the vision we want to own?</h3>
        <small>Explain the idealized view of the world your organization hopes to create. Focus on the essence of what inspires stakeholders—customers, employees, shareholders, etc.—to engage with the organization and the difference it makes in their lives.</small>
        <md-input-container id="ember910" className="md-block md-default-theme ember-view">

  <textarea className="md-input" id="input-ember910" aria-describedby="ember910-char-count ember910-error-messages" rows="1" ></textarea>

  <div className="md-errors-spacer" id="ember910-char-count">
 </div>
</md-input-container>
      </li>

      <li className="StrategyQuestion">
        <h3>How is the organization going to grow?</h3>
        <small>Share your thoughts on how the organization will grow sustainably, and specify the level of growth desired. Then explore how that growth will be achieved (organic growth, expansion into new markets, development of new products, M&amp;A, and so on).</small>
        <md-input-container id="ember911" className="md-block md-default-theme ember-view">

  <textarea className="md-input" id="input-ember911" aria-describedby="ember911-char-count ember911-error-messages" rows="1"></textarea>

  <div className="md-errors-spacer" id="ember911-char-count">
 </div>



</md-input-container>
      </li>

      <li className="StrategyQuestion">
        <h3>What should the organization do more of?</h3>
        <small>Explain the organization’s greatest strengths as of this moment—the elements that are foundational to its performance and should be increased or at least proactively maintained. Do not be afraid to challenge assumptions and conventional wisdom here.</small>
        <md-input-container id="ember912" className="md-block md-default-theme ember-view">

  <textarea className="md-input" id="input-ember912" aria-describedby="ember912-char-count ember912-error-messages" rows="1" ></textarea>

  <div className="md-errors-spacer" id="ember912-char-count">
  </div>



</md-input-container>
      </li>

      <li className="StrategyQuestion">
        <h3>What should the organization quit doing?</h3>
        <small>Explore processes and activities the organization currently participates in that should be discontinued. What items are hurting organizational focus and consuming resources without creating actual value, whether it’s an unpromising customer segment you’re pursuing or an internal process that decreases agility? Again, think deeply and challenge your assumptions.</small>
        <md-input-container id="ember913" className="md-block md-default-theme ember-view">

  <textarea className="md-input" id="input-ember913" aria-describedby="ember913-char-count ember913-error-messages" rows="1" ></textarea>

  <div className="md-errors-spacer" id="ember913-char-count">
</div>



</md-input-container>
      </li>

      <li className="StrategyQuestion">
        <h3>What are the biggest roadblocks the organization faces?</h3>
        <small>Give your take on the biggest threats to organizational performance, both external and internal. These may be items the organization has battled historically or issues that you anticipate worsening soon.</small>
        <md-input-container id="ember914" className="md-block md-default-theme ember-view">

  <textarea className="md-input" id="input-ember914" aria-describedby="ember914-char-count ember914-error-messages" rows="1" ></textarea>

  <div className="md-errors-spacer" id="ember914-char-count">
 </div>



</md-input-container>
      </li>

      <li className="StrategyQuestion">
        <h3>What could disrupt our organization?</h3>
        <small>Whether it’s the rise of a strong competitor or the release of a game-changing technology, assess the potential disruptions your organization faces—the sudden shifts that could change everything. What will you do about them? Can you initiate any disruptions of your own?</small>
        <md-input-container id="ember915" className="md-block md-default-theme ember-view">

  <textarea className="md-input" id="input-ember915" aria-describedby="ember915-char-count ember915-error-messages" rows="1" ></textarea>

  <div className="md-errors-spacer" id="ember915-char-count">
  </div>



</md-input-container>
      </li>

      <li className="StrategyQuestion">
        <h3>How can we improve the product we offer?</h3>
        <small>Share your ideas on how the products or services you bring to the market can be improved. Explore your own observations on the organization’s offerings, as well as product improvements needed to address competitor plays, market changes, or customer difficulties.</small>
        <md-input-container id="ember916" className="md-block md-default-theme ember-view">

  <textarea className="md-input" id="input-ember916" aria-describedby="ember916-char-count ember916-error-messages" rows="1" ></textarea>

  <div className="md-errors-spacer" id="ember916-char-count">
 </div>



</md-input-container>
      </li>

      <li className="StrategyQuestion">
        <h3>How are our customers changing and what might they want in the future?</h3>
        <small>Explore the dynamics of your customer base and the implications for strategy. Bringing in specific examples—for example, market research or conversations with customers—lends credibility, but don’t be afraid to synthesize your observations and give your gut take on what your customers might want and need from you in the future.</small>
        <md-input-container id="ember917" className="md-block md-default-theme ember-view">

  <textarea className="md-input" id="input-ember917" aria-describedby="ember917-char-count ember917-error-messages" rows="1" ></textarea>

  <div className="md-errors-spacer" id="ember917-char-count">
  </div>



</md-input-container>
      </li>

      <li className="StrategyQuestion">
        <h3>How will we engage and empower the talent in our organization?</h3>
        <small>Share your thoughts on how the organization will strategically grow its ability to attract, retain, and capitalize on talent. Think through what the organization currently does well in this domain and where it might lack. Also consider anticipated changes in the level or type of talent required to fulfill the strategic plan.</small>
        <md-input-container id="ember918" className="md-block md-default-theme ember-view">

  <textarea className="md-input" id="input-ember918" aria-describedby="ember918-char-count ember918-error-messages" rows="1" ></textarea>

  <div className="md-errors-spacer" id="ember918-char-count">
 </div>



</md-input-container>
      </li>

      <li className="StrategyQuestion">
        <h3>How do we best serve our shareholders?</h3>
        <small>Explain what the owners of the business expect the business to deliver. It may be cash flow, stock appreciation, or another type of growth. What bearing does this have on strategy?</small>
        <md-input-container id="ember919" className="md-block md-default-theme ember-view">

  <textarea className="md-input" id="input-ember919" aria-describedby="ember919-char-count ember919-error-messages" rows="1" ></textarea>

  <div className="md-errors-spacer" id="ember919-char-count">
  </div>



</md-input-container>
      </li> */}
    
    </ol>
    {loader &&
    <div className="loader"></div>
  }

    <div className="StrategyForm-actions ">


        <div>
       </div>
        <div>
          <button  
          tabindex="-1"
           id="ember921" 
           className="md-default-theme md-button md-primary md-raised ember-view md-ink-ripple"
           type="button" 
           onClick={publishFn}>  Publish
            <div className="md-ripple-container"></div>
          </button>
          <button  tabindex="-1" id="ember920" className="md-default-theme md-button md-primary ember-view md-ink-ripple" type="button"> Save Draft
            <div className="md-ripple-container"></div>
          </button>
            
        </div>
    </div>
</div>
      </div>
    </div>
				
		
	)
}