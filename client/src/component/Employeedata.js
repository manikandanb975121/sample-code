import React from 'react'

import {useSelector,useDispatch} from "react-redux";


export default function DashboardCard() {

  const auth = useSelector(state=>state.auth);
  const couponData = useSelector(state=>state?.category?.coupon)
  const dispatch = useDispatch();

	return (

            // <div className="PagePanel Reminders accent-color">
            <div className="">
            <div id="ember67" className="ember-view">
                <div className='UserCompliance PagePanel accent-color'>
                    <div className="UserComplianceTitle">
                        <h2 className="PagePanel-heading">Employee Compliance Data</h2>

                        <div className="UserComplianceFilters">
                            <div id="ember78" className="Dropdown SelectionPicker ember-view"><div className="SelectionPicker-dropdown Dropdown--container">
                    <div className="Dropdown--menu">
                        <div className="SelectionPicker-button">
                            {/* My Direct Reports
                            <i className="icon icon-norgie"></i> */}
                            <label>
                            My Direct Reports
                            <select>
                            <option value="My Direct Reports">My Direct Reports</option>
                            <option value="My Organization">My Organization</option>
                            <option value="Company">Company</option>
                            </select>
                        </label>
                        </div>
                        
                    </div>
                    </div>
                    </div>
                        </div>
                    </div>

                    {/* Code for employee graph */}
                    <div id="ember82" className="ember-view">
                    <div id="ember84" className="liquid-container ember-view">
                        <div id="ember145" className="liquid-child ember-view">

                            {/* code for 1st graph */}
                            <div id="ember131" className="UserComplianceItem ember-view">
                                <div className="ComplianceMetric">
                                <div className="ComplianceMetric-chartWrapper">
                                    <div id="ember147" className="ember-view">
                                        <svg id="user-compliance-item-chart-ember147" height="140px" width="140px">
                                            <g transform="translate(70, 70)">
                                            <g>
                                                <text text-anchor="middle" className="ComplianceMetric-empty-message" transform="translate(0, 8)">100%</text>
                                            </g>
                                            {/* <g>
                                                <text text-anchor="middle" className="ComplianceMetric-empty-message" transform="translate(0, 20)">created</text>
                                            </g> */}
                                            <g className="arc">
                                                <path d="M3.67394039744206e-15,-60A60,60,0,1,1,-2.2971412193561696e-14,60L-2.029141410431283e-14,53A53,53,0,1,0,3.245314017740486e-15,-53Z" fill="#dcdcdc"></path>
                                            </g>
                                            <g className="arc">
                                                <path d="M-2.2971412193561696e-14,60A60,60,0,1,1,4.226888398968133e-14,-60L3.733751419088518e-14,-53A53,53,0,1,0,-2.029141410431283e-14,53Z" fill="#dcdcdc"></path>
                                            </g>
                                            </g>
                                        </svg>
                                    </div>
                                </div>
                                <div className="ComplianceMetric-info">
                                    <p className="ComplianceMetric-title">Goal Creation</p>
                                    <p className="ComplianceMetric-subtitle">Q2 2021</p>
                                </div>
                                <div className="ComplianceMetric-summary">
                                    <a href="" id="ember148" className="ember-view">
                                        <div>
                                            <span className="ComplianceMetric-circle ComplianceMetric-circle-red"></span>
                                            <span>No goals</span>
                                            <span className="ComplianceMetric-count">0</span>
                                        </div>
                                    </a>
                                    <div>
                                        <span className="ComplianceMetric-circle ComplianceMetric-circle-green"></span>
                                        <span>With goals</span>
                                        <span className="ComplianceMetric-count">0</span>
                                    </div>
                                </div>
                                </div>
                            </div>

                            {/* code for 2nd graph */}
                            <div id="ember134" className="UserComplianceItem ember-view">
                                <div className="ComplianceMetric">
                                    <div className="ComplianceMetric-chartWrapper">
                                        <div id="ember135" className="ember-view">
                                            <svg id="user-compliance-item-chart-ember135" height="140px" width="140px">
                                            <g transform="translate(70, 70)">
                                                <g>
                                                    <text text-anchor="middle" className="ComplianceMetric-empty-message" transform="translate(0, 8)">40%</text>
                                                </g>
                                                {/* <g>
                                                    <text text-anchor="middle" className="ComplianceMetric-empty-message" transform="translate(0, 20)">to update</text>
                                                </g> */}
                                                <g className="arc">
                                                    <path d="M3.67394039744206e-15,-60A60,60,0,1,1,-2.2971412193561696e-14,60L-2.029141410431283e-14,53A53,53,0,1,0,3.245314017740486e-15,-53Z" fill="#dcdcdc"></path>
                                                </g>
                                                <g className="arc">
                                                    <path d="M-2.2971412193561696e-14,60A60,60,0,1,1,4.226888398968133e-14,-60L3.733751419088518e-14,-53A53,53,0,1,0,-2.029141410431283e-14,53Z" fill="#dcdcdc"></path>
                                                </g>
                                            </g>
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="ComplianceMetric-info">
                                        <p className="ComplianceMetric-title">Weekly Predictions</p>
                                        <p className="ComplianceMetric-subtitle">May 17 - 28, 2021</p>
                                    </div>
                                    <div className="ComplianceMetric-summary">
                                        <a href="#/users/set/userComplianceMetric/fully_updated-directs/matchedUsers" id="ember136" className="ember-view">
                                            <div>
                                            <span className="ComplianceMetric-circle ComplianceMetric-circle-red"></span>
                                            <span>Not updated</span>
                                            <span className="ComplianceMetric-count">0</span>
                                            </div>
                                        </a>
                                        <div>
                                            <span className="ComplianceMetric-circle ComplianceMetric-circle-green"></span>
                                            <span>Updated</span>
                                            <span className="ComplianceMetric-count">0</span>
                                        </div>
                                    </div>
                                </div>
                                </div>

                            {/* code for 3rd graph */}
                            <div id="ember137" className="UserComplianceItem ember-view">
                            <div className="ComplianceMetric">
                                <div className="ComplianceMetric-chartWrapper">
                                    <div id="ember138" className="ember-view">
                                        <svg id="user-compliance-item-chart-ember138" height="140px" width="140px">
                                        <g transform="translate(70, 70)">
                                            <g>
                                                <text text-anchor="middle" className="ComplianceMetric-empty-message" transform="translate(0, 8)">100%</text>
                                            </g>
                                            {/* <g>
                                                <text text-anchor="middle" className="ComplianceMetric-empty-message" transform="translate(0, 20)">to finalize</text>
                                            </g> */}
                                            <g className="arc">
                                                <path d="M3.67394039744206e-15,-60A60,60,0,1,1,-2.2971412193561696e-14,60L-2.029141410431283e-14,53A53,53,0,1,0,3.245314017740486e-15,-53Z" fill="#dcdcdc"></path>
                                            </g>
                                            <g className="arc">
                                                <path d="M-2.2971412193561696e-14,60A60,60,0,1,1,4.226888398968133e-14,-60L3.733751419088518e-14,-53A53,53,0,1,0,-2.029141410431283e-14,53Z" fill="#dcdcdc"></path>
                                            </g>
                                        </g>
                                        </svg>
                                    </div>
                                </div>
                                <div className="ComplianceMetric-info">
                                    <p className="ComplianceMetric-title">Finalization</p>
                                    <p className="ComplianceMetric-subtitle">Q1 2021</p>
                                </div>
                                <div className="ComplianceMetric-summary">
                                    <a href="#/users/set/userComplianceMetric/fully_finalized-directs/matchedUsers" id="ember139" className="ember-view">
                                        <div>
                                        <span className="ComplianceMetric-circle ComplianceMetric-circle-red"></span>
                                        <span>Not finalized</span>
                                        <span className="ComplianceMetric-count">0</span>
                                        </div>
                                    </a>
                                    <div>
                                        <span className="ComplianceMetric-circle ComplianceMetric-circle-green"></span>
                                        <span>Finalized</span>
                                        <span className="ComplianceMetric-count">0</span>
                                    </div>
                                </div>
                            </div>
                            </div>

                            {/* COde enf for graph */}
                        </div>
                    </div>
                    </div>

                    {/* Code end for employee graph */}
                </div>
            </div>
            </div>

		
	)
}