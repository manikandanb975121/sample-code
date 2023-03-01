import React, { useState, useEffect, Fragment } from "react";  
import data from "./data.json";
import "./tree.css";
const moment = require('moment');

function randomIntFromInterval(min, max) {  
    return Math.floor(Math.random() * (max - min + 1) + min)
}


const Card = (props) => { 
 

    return (
      <ul>
        {props.data.map((item,index) => { 
            return(
                <Fragment key={item.types}>
                  <li>
                    {(props.types=="directReport" ? 
                    <div className="card">
                      <div className="image">
                        <img
                          src={"https://randomuser.me/api/portraits/men/"+randomIntFromInterval(1,100)+".jpg"}
                          alt="Profile"
                          style={{ borderColor: "#009FDF" }}
                        />
                      </div>
                      <div className="card-body">
                        <p>{item.name}</p>
                        <p>Software Engineer</p>
                      </div>
                      <div></div>
                      </div>  :  
                      <div className="analytic_deteails">
                        <div className="analyticpic">
                          <img className="img-fluid" src="/img/analytic_team1.svg" />
                        </div>
                        <div className="analytic_info">
                          <h2>Anit Prajapati</h2>
                          <span>Goals : 02</span>
                        </div>
                      </div>
                      )}
                      
                    
                    {item.children?.length && <Card data={item.children} types={props.types}/>}
                  </li>
                </Fragment>
              )
        })}
      </ul>
    );
  };

  


export default function Tree(props) { 
  console.log("types ==== ", props.page);
	return (  
        <div className="org-tree">
           <Card data={data} types={props.page}/>
        </div>  
	)
}