// import React from 'react'
import { Check } from 'react-feather';

import {useSelector,useDispatch} from "react-redux";

import React, { useState } from "react";
import ReactDOM from "react-dom";

// import useCollapse from 'react-collapsed';

export default function DashboardCard() {

  const auth = useSelector(state=>state.auth);
  const couponData = useSelector(state=>state?.category?.coupon)
  const dispatch = useDispatch();

  
const [show1, toggleShow1] = React.useState(false);
const [show2, toggleShow2] = React.useState(false);

// State with list of all checked item
const [checked, setChecked] = useState([]);
const checkList = ["Draft", "Draft in review", "Approved", "Shelved", "Shelving in review", "Finalized", "Results in review"];

// Add/Remove checked item from list
const handleCheck = (event) => {
  var updatedList = [...checked];
  if (event.target.checked) {
    updatedList = [...checked, event.target.value];
  } else {
    updatedList.splice(checked.indexOf(event.target.value), 1);
  }
  setChecked(updatedList);
};

// Generate string of checked items
const checkedItems = checked.length
  ? checked.reduce((total, item) => {
      return total + ", " +item;
    })
  : "";

// Return classes based on whether item is checked
var isChecked = (item) =>
  checked.includes(item) ? "checked-item" : "not-checked-item";

//   const { getCollapseProps, getToggleProps, isExpanded } = useCollapse()



	return (

        <div className="Goals-filter-and-list-container ">
            <div id="ember262" className="GoalFilters show-advanced-filters ember-view">
                <div className="GoalFilters-top-container">
                    <section className="GoalFilters-quickFilters">
                        <h4 className="GoalFilters-SectionLabel">
                        Goal Quick Filters
                        </h4>
                        <div id="ember264" className="LinkGroup ember-view">
                        <a href="" id="ember266" className="LinkGroup-link active accent-background-color ember-view">          My Goals
                        </a>
                        <a href="" id="ember268" className="LinkGroup-link disabled ember-view">        My Direct Reports
                        </a>
                        <a className="LinkGroup-link withIcon" data-ember-action="" data-ember-action-269="269">

                        {/* Code for Start More and Less  */}
                        {/* <span>
                            More
                        </span> */}
                        
                            <span onClick={() => toggleShow1(!show1)}>
                                {show1 ? 'Less' : 'More'}
                            </span>

                        {/* Code for End More and Less  */}
                        <i className="material-icons arrow-drop-down"></i>
                        </a>
                        </div>
                        
                        {show1 && 
                        <div id="ember271" className="liquid-container ember-view" >
                            <div id="ember1113" className="liquid-child ember-view">
                                <h4 className="GoalFilters-quickFilterlabel">Direct Reports</h4>
                                <div id="ember1114" className="LinkGroup ember-view">
                                    <a href="" id="ember1116" className="LinkGroup-link ember-view">        Trending Down
                                    </a>
                                    <a href="" id="ember1118" className="LinkGroup-link ember-view">        In Trouble
                                    </a>
                                    <a href="" id="ember1120" className="LinkGroup-link ember-view">        Needs Review
                                    </a>
                                </div>
                                <h4 className="GoalFilters-quickFilterlabel">Others</h4>
                                <div id="ember1121" className="LinkGroup ember-view">
                                    <a href="" id="ember1124" className="LinkGroup-link active accent-background-color ember-view">              Company Goals
                                    </a>
                                </div>
                            </div>
                        </div>
                        }
                    </section>

                    {/* <div id="ember274" className="GoalSearch ember-view">
                        {show && <div>Hi there</div>}
                    </div> */}

                    <div id="ember274" className="GoalSearch ember-view">
                        <div aria-owns="ember-basic-dropdown-content-ember277" tabindex="-1" data-ebd-id="ember277-trigger" role="button" id="ember278" className="ember-power-select-trigger ember-power-select-multiple-trigger ember-basic-dropdown-trigger ember-view">
                        {/* <ul id="ember-power-select-multiple-options-ember277" className="ember-power-select-multiple-options">
                            <input className="ember-power-select-trigger-multiple-input" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" id="ember-power-select-trigger-multiple-input-ember277" aria-controls="ember-power-select-options-ember277" />
                        </ul> */}
                        {/* <select>
                            <option>TEST</option>
                            <option>TEST</option>
                            <option>TEST</option>
                            <option>TEST</option>
                            <option>TEST</option>
                        </select> */}
                        <span className="ember-power-select-status-icon"></span>
                        </div>
                        <div id="ember-basic-dropdown-content-ember277" className="ember-basic-dropdown-content-placeholder"></div>
                    </div>
                    <div className="LinkGroup GoalFilters-moreFilters">
                        <a className="LinkGroup-link withIcon" data-ember-action="" data-ember-action-281="281">
                        Q3 2022
                        <i className="material-icons arrow-drop-down"></i>
                        </a>
                        
                        <a className="LinkGroup-link withIcon" onClick={() => toggleShow2(!show2)}>
                            {show2 ? 'Advanced' : 'Advanced'}
                        <i className="material-icons arrow-drop-up"></i>
                        </a>
                    </div>
                </div>

                {/* Start second colleps cantainer  */}
                {show2 && 
                <div className="GoalFilters-middle-container">
                    <div id="ember592" className="liquid-container ember-view">
                        <div id="ember719" className="liquid-child ember-view">
                            <div id="ember720" className="GoalFilters-AdvancedFilters ember-view">
                                <button className="GoalFilters-hidePanel">
                                <i className="material-icons close"></i>
                                </button>
                                <div className="AdvancedFilters-list">
                                <h4 className="GoalFilters-SectionLabel">
                                    Goal State
                                </h4>
                                <div className="AdvancedFilters-section AdvancedFilters-goalStates">
                                {checkList.map((item, index) => (
                                    <md-checkbox aria-labelledby="ember725-label" aria-checked="false" role="checkbox" tabindex="0" id="ember725" className="md-checkbox md-default-theme ember-view">
                                        <div className="md-container md-ink-ripple">
                                        <input value={item} type="checkbox" onChange={handleCheck} />
                                        </div>
                                        <div className="md-label">
                                            <span id="ember725-label" className={isChecked(item)}>
                                                {item}
                                            </span>
                                        </div>
                                    </md-checkbox>
                                ))}
                                </div>
                                {/* <h4 className="GoalFilters-SectionLabel">Alignment</h4> */}
                                </div>
                                <div className="AdvancedFilters-actions">
                                    <button tabindex="0" id="ember755" className="md-default-theme md-button md-primary ember-view md-ink-ripple" type="button">
                                        Create Report
                                        <div className="md-ripple-container"></div>
                                    </button>
                                    <button tabindex="0" id="ember756" className="md-default-theme md-button md-primary md-raised ember-view md-ink-ripple" type="button">
                                        Search
                                        <div className="md-ripple-container"></div>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                }
                {/* End second colleps cantainer  */}

                <div>
                    {/* {`Items checked are: ${checkedItems}`} */}
                    <span>{checkedItems}</span>
                </div>

                {/* Start 3rd colleps cantainer  */}

                <div className="GoalFilters-bottom-container">
                    <div id="ember634" className="GoalFilters-ActiveFilters ember-view">
                        <h4 className="GoalFilters-SectionLabel">Active Filters</h4>
                        <div className="GoalFilters-ActiveFilters-list">
                            <span id="ember641" className="KhorusChip ember-view">
                                <span className="GoalFilters-Active-label">User:</span> <span className='username'>Kyle Fisher</span>
                                <button data-ember-action="" data-ember-action-642="642">
                                <md-icon md-font-icon="" aria-label="close" id="ember643" className="paper-icon md-font material-icons md-default-theme ember-view">x
                                </md-icon>
                                </button>
                            </span>
                            <span id="ember641" className="KhorusChip ember-view">
                                <span className="GoalFilters-Active-label">User:</span> <span className='username'> William Rizzo</span>
                                <button data-ember-action="" data-ember-action-642="642">
                                <md-icon md-font-icon="" aria-label="close" id="ember643" className="paper-icon md-font material-icons md-default-theme ember-view">x
                                </md-icon>
                                </button>
                            </span>
                            <span id="ember641" className="KhorusChip ember-view">
                                <span className="GoalFilters-Active-label">State:</span> <span className='username'>Approved</span>
                                <button data-ember-action="" data-ember-action-642="642">
                                <md-icon md-font-icon="" aria-label="close" id="ember643" className="paper-icon md-font material-icons md-default-theme ember-view">x
                                </md-icon>
                                </button>
                            </span>
                            <span id="ember644" className="KhorusChip ember-view">
                                <span className="GoalFilters-Active-label">State:</span> <span className='username'>Results in review</span>
                                <button data-ember-action="" data-ember-action-645="645">
                                <md-icon md-font-icon="close" aria-label="close" id="ember646" className="paper-icon md-font material-icons md-default-theme ember-view">x
                                </md-icon>
                                </button>
                            </span>
                            <span id="ember647" className="KhorusChip ember-view">
                                <span className="GoalFilters-Active-label">State:</span> <span className='username'>Shelved</span>
                                <button data-ember-action="" data-ember-action-648="648">
                                <md-icon md-font-icon="close" aria-label="close" id="ember649" className="paper-icon md-font material-icons md-default-theme ember-view">x
                                </md-icon>
                                </button>
                            </span>
                        </div>
                        <div className="GoalFilters-ActiveFilters-meta-row">
                            <div>
                                <div id="ember1162" className="ember-view">
                                </div>
                            </div>
                            <md-checkbox aria-labelledby="ember654-label" aria-checked="true" role="checkbox" tabindex="0" id="ember654" className="md-checkbox md-default-theme md-checked ember-view">
                                <div className="md-container md-ink-ripple">
                                <div className="md-icon"></div>
                                <div className="md-ripple-container"></div>
                                </div>
                                <div className="md-label">
                                <span id="ember654-label">
                                Include private goals
                                </span>
                                </div>
                            </md-checkbox>
                        </div>
                    </div>
                </div>

                {/* End 3rd colleps cantainer  */}

            </div>

            <div id="ember1159" className="GoalPreviewList ember-view">
                {/* <p className="GoalDisplay-emptyText">
                    There are no goals that match your search.
                </p> */}

                <div id="ember1779" className="GoalPreview ember-view">
                <div className="GoalPreview-card indicator">
                    <div className="GoalPreview-avatar">
                        <div id="ember1780" className="UserAvatar ember-view">
                            <div className="img-circle UserAvatar-no-link-img" data-ember-action="" data-ember-action-1781="1781">KF</div>
                        </div>
                    </div>
                    <div className="GoalPreview-body">
                        <h2 className="GoalPreview-title">
                            <small className="GoalPreview-subtitle">
                                Kyle Fisher
                            </small>
                            <br></br>
                            <small className="goal_name">
                                PARENT TEST GOAL 9_14
                            </small>
                            
                        </h2>
                        <div className="GoalPreview-statusBar">
                            <div id="ember1782" className="ember-view">
                            <span id="ember1783" className="UiBadge color-accent ember-view">needs update
                            </span>
                            </div>
                            <div id="ember1784" className="ember-view">
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
		
	)
}