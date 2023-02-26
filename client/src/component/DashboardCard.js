import React from 'react' 
 

import Employeedata from "../component/Employeedata";
import Companygoal from "../component/Companygoal";

export default function DashboardCard() { 
  
	return (
		
    <div className='dashboard row'>
      <div className='col-sm-6 dashboardleft'>
        <div class="PagePanel Reminders accent-color">
          <h2 class="PagePanel-heading">Reminders</h2>
        <div id="ember67" class="liquid-container ember-view">
            <div id="ember149" class="liquid-child ember-view">              
                <h3 class="PagePanel-subheading">For Q3 2022</h3>
                <ul class="borderleft PagePanel-list RemindersList">
                    <li id="ember152" class="PagePanel-list-item RemindersList-reminder ember-view">Week 10: grow Rev 5%
                    
                    <a href="" id="ember155" class="RemindersList-reminder-action accent-color ember-view">   
                     {/* <i class="icon icon-add"></i> */}
                        Update
                    </a>
                    </li>
                </ul>

                <ul class="PagePanel-list RemindersList">
                    <li id="ember152" class="PagePanel-list-item RemindersList-reminder ember-view">Finalized: Ship iphone App
                    
                    <a href="" id="ember155" class="RemindersList-reminder-action accent-color ember-view">   
                     {/* <i class="icon icon-add"></i> */}
                     Finalize Results
                    </a>
                    </li>
                </ul>
            </div>
        </div>

        <div id="ember67" class="liquid-container ember-view">
            <div id="ember149" class="liquid-child ember-view">              
                <h3 class="PagePanel-subheading">For Q2 2021</h3>
                <ul class="PagePanel-list RemindersList">
                    <li id="ember152" class="PagePanel-list-item RemindersList-reminder ember-view">Appraisals due 5/10/2021
                    
                    <a href="" id="ember155" class="RemindersList-reminder-action accent-color ember-view">   
                     {/* <i class="icon icon-add"></i> */}
                        View
                    </a>
                    </li>
                </ul>
            </div>
        </div>

        <div id="ember67" class="liquid-container ember-view">
            <div id="ember149" class="liquid-child ember-view">              
                <h3 class="PagePanel-subheading">For Q4 2020</h3>
                <ul class="PagePanel-list RemindersList">
                    <li id="ember152" class="PagePanel-list-item RemindersList-reminder ember-view">Appraisal Needs Signature
                    
                    <a href="" id="ember155" class="RemindersList-reminder-action accent-color ember-view">   
                     {/* <i class="icon icon-add"></i> */}
                        View Appraisal
                    </a>
                    </li>
                </ul>
            </div>
        </div>

      </div>


    <Employeedata />

      </div>

      <div className='col-sm-6 dashboardright'>
        <Companygoal />
      </div>
    </div>
				
		
	)
}