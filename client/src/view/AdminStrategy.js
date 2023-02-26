import React, { useEffect, useState } from 'react';
import "../App.css";
import StrategyCard from './Admin/Strategy/StrategyCard';
import StrategyCards from './Admin/Strategy/CardList';
import AddStrategy from './Admin/Strategy/AddStrategy';
import DialogModal from './Admin/DialogModal';
import StrategyDetails from './Admin/Strategy/StrategyDetails';
import { environment } from 'src/configs/environment';
import axiosIntance from 'src/helper/axios';

export const AdminStrategy = () => {

    const [isAddStrategy, setIsAddStrategy] = useState(false);
    const [selectedStrategy, setSelectedStrategy] = useState(StrategyCards[0]);
    const [overAllStrategy, setOverAllStrategy] = useState([]);
    const [currentStrategy, setCurrentStrategy] = useState(null);

    useEffect(() => {
        fetchAllStrategy();
    }, [])

    const fetchAllStrategy = async () => {
        const response = await axiosIntance.get(environment.baseAPIUrl + environment.endpoints.strategy.getStrategy + `?oid=${localStorage.getItem('orgId')}`);
        console.log(response.data);
        setOverAllStrategy(response.data);
        setCurrentStrategy(response.data.find(x => x.title === 'Mission'));

        // setDepartment(response.data.data);
        // setCount(response.data?.count);
        // setLoader(false);
      }

    const onSubmitHandler = async (data) => {
        console.log(data);
        await axiosIntance.post(environment.baseAPIUrl + environment.endpoints.strategy.createStrategy, data);
        setIsAddStrategy(false);
    }

    const onClose = () => {
        setIsAddStrategy(false);
    }

    const cardHandler = (data) => {
        console.log({data});
        setIsAddStrategy(true);
        setSelectedStrategy(data);
    }

    const switchHandler = (data) => {
        console.log({data});
        console.log({overAllStrategy});
        if (data.name !== 'Strategy Questions') {
            setCurrentStrategy(overAllStrategy.find(x => x.title === data.name))
        } else {
            setCurrentStrategy({title: data.name})
        }
    }

  return (
    <div className='wrapper'> 
        <div id="content">
            <div className="dashboard_main">
                <div className="row">
                    <div className="col-md-12">     
                        <div className="my_profile_wrapper">       
                            <div className="mygoals_inner_section">        
                                <div className="mydetails_section_strategye"> 
                                    <div className="reminders_haeder">
                                        <h4>Admin Strategy Panel</h4>
                                        <p>Create your strategy and edit their details</p>
                                        <button onClick={() => { setIsAddStrategy(true) }}  type="button" className="refreshbt"> <span><svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 16 16" fill="none">
                                            <path d="M13 7.72353H7.85098V13H5.14902V7.72353H0V5.27647H5.14902V0H7.85098V5.27647H13V7.72353Z" fill="#717171" />
                                        </svg></span>Add Strategy</button>
                                    </div>       
                                    <div className="personal_info">                                        
                                        <ul className="nav nav-tabs strategye_navlink" id="myTab" role="tablist">
                                            {
                                                StrategyCards.map((card, index) => (
                                                    <StrategyCard key={index} content={card.content} switchHandler={switchHandler} onClick={cardHandler} name={card.name} svgPath={card.svgPath} defs={card.defs}  />
                                                ))
                                            }
                                        </ul>
                                        <div className="tab-content" id="myTabContent">
                                            {/* <StrategyDetails  name={selectedStrategy.name} content={selectedStrategy.content} /> */}
                                            {currentStrategy && <StrategyDetails  name={currentStrategy?.title} content={currentStrategy?.description} id={currentStrategy?.id}/> }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {isAddStrategy && <DialogModal open={isAddStrategy} title={'Add Strategy'}>
                <AddStrategy  onSubmitHandler={onSubmitHandler} onClose={onClose} strategy={selectedStrategy}/>
            </DialogModal>}
    </div>
  )
}
