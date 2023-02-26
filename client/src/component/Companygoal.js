import React from 'react'

import {useSelector,useDispatch} from "react-redux";

import ProgressBar from 'react-bootstrap/ProgressBar';
import Fourbox from '../assets/fourbox.png';


export default function DashboardCard() {

  const auth = useSelector(state=>state.auth);
  const couponData = useSelector(state=>state?.category?.coupon)
  const dispatch = useDispatch();

	return (

        <div class="PagePanel Reminders accent-color">
        <h2 class="PagePanel-heading">Company Goals Q2 2021</h2>
        <div id="ember67" class="liquid-container ember-view">
           <div id="ember149" class="liquid-child ember-view">
              <ul class="borderright PagePanel-list RemindersList">
                 <li id="ember152" class="PagePanel-list-item RemindersList-reminder ember-view">
                    Add Theme for Q2
                    <a href="" id="ember155" class="RemindersList-reminder-action accent-color ember-view">   
                        <i class="icon icon-add"></i>
                        Update
                    </a>
                 </li>
              </ul>
              
           </div>

           <div id="ember149" class="liquid-child ember-view">
              <ul class="borderright PagePanel-list RemindersList progressbar">
                 <li id="ember152" class="RemindersList-reminder ember-view liprogress">
                    <span className='lipro1'><ProgressBar variant="default" now={40} /></span>
                    <span className='startpro'> <p>Goal 1</p>
                    </span>

                    <span className='startpro'>
                    <a href="" id="ember155" class="">   
                        {/* <i class="icon icon-add"></i> */}
                        <img src={Fourbox} />
                    </a>
                    </span>
                    
                 </li>
                 <li id="ember152" class="RemindersList-reminder ember-view liprogress">
                    <span className='lipro1'><ProgressBar variant="default" now={80} /></span>
                    <span className='startpro'> <p>Goal 2</p>
                    </span>

                    <span className='startpro'>
                    <a href="" id="ember155" class="">   
                        {/* <i class="icon icon-add"></i> */}
                        <img src={Fourbox} />
                    </a>
                    </span>
                    
                 </li>
                 <li id="ember152" class="RemindersList-reminder ember-view liprogress">
                    <span className='lipro1'><ProgressBar variant="default" now={30} /></span>
                    <span className='startpro'> <p>Goal 3</p>
                    </span>

                    <span className='startpro'>
                    <a href="" id="ember155" class="">   
                        {/* <i class="icon icon-add"></i> */}
                        <img src={Fourbox} />
                    </a>
                    </span>
                    
                 </li>
                 <li id="ember152" class="RemindersList-reminder ember-view liprogress">
                    <span className='lipro1'><ProgressBar variant="default" now={50} /></span>
                    <span className='startpro'> <p>Goal 4</p>
                    </span>

                    <span className='startpro'>
                    <a href="" id="ember155" class="">   
                        {/* <i class="icon icon-add"></i> */}
                        <img src={Fourbox} />
                    </a>
                    </span>
                    
                 </li>

              </ul>
              
           </div>
        </div>
     </div>

		
	)
}