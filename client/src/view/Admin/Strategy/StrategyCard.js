import React from 'react'
import "../../../App.css";

const StrategyCard = ({ name, svgPath, defs, onClick, content, switchHandler }) => {
  return (
    <li className="nav-item" onClick={() => {switchHandler({name, content})}}>
        
        <a className="nav-link strategy_tab active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">
            <div style={{ display: 'flex', justifyContent: 'space-between'}}>
              <span>
                  <svg xmlns="http://www.w3.org/2000/svg" width={40} height={40} viewBox="0 0 40 40" fill="none">
                      { svgPath }
                      {defs}
                  </svg>
              </span>
              <span onClick={() => {onClick({name, content})}}><svg xmlns="http://www.w3.org/2000/svg" width={30} height={30} viewBox="0 0 16 16" fill="none">
                  <path d="M13 7.72353H7.85098V13H5.14902V7.72353H0V5.27647H5.14902V0H7.85098V5.27647H13V7.72353Z" fill="#fff" />
              </svg></span>
            </div>
            
            { name }
        </a>


    </li>
  )
}

export default StrategyCard