import React from 'react'

import {useSelector,useDispatch} from "react-redux";


export default function DashboardCard() {

  const auth = useSelector(state=>state.auth);
  const couponData = useSelector(state=>state?.category?.coupon)
  const dispatch = useDispatch();

	return (

        <div className="PagePanel profile-section-2 accent-color">
          <div className="layout-row layout-align-space-between-center">
            <div className="layout-row">
              <h2 className="PagePanel-heading">Goals</h2>
              <div  id="ember1187" className="ember-view">  
                <md-menu aria-owns="ember-basic-dropdown-content-ember1200" tabindex="-1" data-ebd-id="ember1200-trigger" role="button" id="ember1201" className="ember-basic-dropdown-trigger ember-view">
                  <span  id="ember1202" className="QuarterYearDisplay ember-view">
                    <span className="QuarterYearDisplay-text">
                    <select>
                                <option>Q1 2022</option>
                                <option>Q2 2022</option>
                                <option>Q3 2022</option>
                                <option>Q4 2022</option>
                                <option>Q1 2021</option>
                                <option>Q2 2021</option>
                                <option>Q3 2021</option>
                                <option>Q4 2021</option>
                              </select>
                    </span>
                  </span>
                  {/* <i className="fa-solid fa-caret-down"></i> */}
                </md-menu> 
              </div>
            </div>
            <a  href="/goals" id="ember1204" className="BriefGoalList-title-action ember-view">View List</a>
          </div>

          <div id="ember1192" className="liquid-container ember-view" ><div id="ember1207" className="liquid-child ember-view" >
            <ul className="PagePanel-list">
              <li id="ember1208" className="BriefGoalItem ember-view">
                <div id="ember1209" className="GoalRedactor ember-view">    
                <div className="GoalRedactor-unredacted-container">
                <div className="GoalRedactor-content">
                <div id="ember1211" className="liquid-container ember-view"><div id="ember1214" className="liquid-child ember-view" > 
                <div className="BriefGoalList-goal"  data-ember-action="" data-ember-action-1215="1215">
                <div className="BriefGoalItem-left-container">
                <div className="BriefGoalList-status--trend"><div id="ember1216" className="PredictionTrend ember-view"><div className="PredictionTrend--mini solicited-12 solicited-13 solicited-14
            updatable-12 updatable-13 updatable-14
            actionable" data-current-week="14">
      <div data-week="11" id="ember1217" className="Trend-week ember-view"><div id="ember1218" className="Trend-scores ember-view"><i className="Trend-score Trend-likelihood"></i>
<i className="Trend-score Trend-quality"></i>
</div>
</div>
      <div data-week="12" id="ember1219" className="Trend-week ember-view"><div id="ember1220" className="Trend-scores ember-view"><i className="Trend-score Trend-likelihood"></i>
<i className="Trend-score Trend-quality"></i>
</div>
</div>
      <div data-week="13" id="ember1221" className="Trend-week ember-view"><div id="ember1222" className="Trend-scores ember-view"><i className="Trend-score Trend-likelihood"></i>
<i className="Trend-score Trend-quality"></i>
</div>
</div>
      <div data-week="14" id="ember1223" className="Trend-week ember-view"><div id="ember1224" className="Trend-scores ember-view"><i className="Trend-score Trend-likelihood"></i>
<i className="Trend-score Trend-quality"></i>
</div>
</div>
</div>
</div></div>
        <div className="BriefGoalList-title">
          PARENT TEST GOAL 9_14
          <span id="ember1225" className="GoalFollowing is-followed ember-view">  
            <span className="fa-stack" data-ember-action="" data-ember-action-1226="1226">
              <i className="fa-regular fa-star"></i>
            </span>
          </span>
        </div>
        <div className="BriefGoalList-state-text">(Waiting for approval)</div>
      </div>

      <div className="BriefGoalList-actions">
     </div>
    </div>

</div></div>
      </div>
   </div>

        </div>
        </li>
        <li id="ember1227" className="BriefGoalItem ember-view"><div id="ember1228" className="GoalRedactor ember-view">    <div className="GoalRedactor-unredacted-container">
      <div className="GoalRedactor-content">
        <div id="ember1230" className="liquid-container ember-view" ><div id="ember1233" className="liquid-child ember-view">
            <div className="BriefGoalList-goal"  data-ember-action="" data-ember-action-1234="1234">
      <div className="BriefGoalItem-left-container">
          <div className="BriefGoalList-status--trend"><div id="ember1235" className="PredictionTrend ember-view"><div className="PredictionTrend--mini
            solicited-14
            updatable-14
            actionable" data-current-week="14">
      <div data-week="11" id="ember1236" className="Trend-week ember-view"><div id="ember1237" className="Trend-scores ember-view"><i className="Trend-score Trend-likelihood"></i>
<i className="Trend-score Trend-quality"></i>
</div>
</div>
      <div data-week="12" id="ember1238" className="Trend-week ember-view"><div id="ember1239" className="Trend-scores ember-view"><i className="Trend-score Trend-likelihood"></i>
<i className="Trend-score Trend-quality"></i>
</div>
</div>
      <div data-week="13" id="ember1240" className="Trend-week ember-view"><div id="ember1241" className="Trend-scores ember-view"><i className="Trend-score Trend-likelihood"></i>
<i className="Trend-score Trend-quality"></i>
</div>
</div>
      <div data-week="14" id="ember1242" className="Trend-week ember-view"><div id="ember1243" className="Trend-scores ember-view"><i className="Trend-score Trend-likelihood"></i>
<i className="Trend-score Trend-quality"></i>
</div>
</div>
</div>
</div></div>
        <div className="BriefGoalList-title">
          PARENT TEST GOAL 9/28
          <span id="ember1244" className="GoalFollowing is-followed ember-view">  <span className="fa-stack" data-ember-action="" data-ember-action-1245="1245">
          <i className="fa-regular fa-star"></i>
  </span>
</span>
        </div>
        <div className="BriefGoalList-state-text">(Waiting for approval)</div>
      </div>

      <div className="BriefGoalList-actions">
    </div>
    </div>

</div></div>
      </div>
   </div>

</div></li>
    </ul>

</div></div>

        </div>
		
	)
}











