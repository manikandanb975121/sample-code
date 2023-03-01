import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { baseUrl } from '../../config';
import { GET, POST } from "src/helper/service";
import { getReviewTemplateByOidUrl, createReviewUrl, getDirectReportee,getPreviousReviewUrl } from "src/helper/urlConfig";
import CoreCompetencyModal from "./modal/CoreCompetencyModal";
import TechnicalCompetencyModal from "./modal/TechnicalCompetencyModal";
import Loader from "src/view/common/Loader";
import ReviewTemplateModal from "./modal/ReviewTemplateModal";
import Rightsidebar from "./RightSideBar";
import TableSort from "./TableSort";
import UserTable from "./UserTable";
import SummaryModal from "./modal/SummaryModal";
import Norecordsfound from "src/view/common/Norecordsfound";
import ReactPaginate from "react-paginate";
import PreviousReviewModal from "./modal/PreviousReviewModal";

function PaginatedItems({ itemsPerPage, totalRecord, method }) {
    const [itemOffset, setItemOffset] = useState(0);
    const endOffset = itemOffset + itemsPerPage;
    const pageCount = Math.ceil(totalRecord / itemsPerPage);
    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % totalRecord;
        setItemOffset(newOffset);
        method(event.selected + 1);
    };
    return (
        <>
            <ReactPaginate
                nextLabel=">>"
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                marginPagesDisplayed={2}
                pageCount={pageCount}
                previousLabel="<<"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakLabel="..."
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination mygoalspages"
                activeClassName="active"
                renderOnZeroPageCount={null}
            />
        </>
    );
}



export default function Review() {
    const auth = useSelector(state => state.auth);
    const token = auth.token;

    const [showReviewTemplateModal, setShowReviewTemplateModal] = useState(false);
    const [showCoreCompetencyModal, setShowCoreCompetencyModal] = useState(false);
    const [showTechnicalCompetencyModal, setShowTechnicalCompetencyModal] = useState(false)
    const [isReviewTemplateSelected, setIsReviewTemplateSelected] = useState(false);
    const [coreCompetencyReview, setCoreCompetencyReview] = useState([]);
    const [technicalCompetencyReview, setTechnicalCompetencyReview] = useState([]);
    const [isCoreCompetencyReveiwSubmited, setIsCoreCompetencyReviewSubmited] = useState(false);
    const [isTechnicalCompetencyReviewSubmited, setIsTechnicalCompetencyReviewSubmited] = useState(false);
    const [showSummaryModal, setShowSummaryModal] = useState(false);
    const [showPreviousReviewModule,setShowPreviousReviewModule] = useState(false);
    const [reviewTemplateArray, setReviewTemplateArray] = useState([]);
    const [selectedUser, setSelectedUser] = useState({ id: 0, name: "", team: "" });
    const [reviewType, setReviewType] = useState("other");
    const [page, setPage] = useState(1);
    const [toalUsers, setToalUsers] = useState(0);
    const [ReportData, setReportData] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [loader, setLoader] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [loggedInUser, setLoggedInUser] = useState([]);
    const [previousCoreCompetencyReview,setPreviousCoreCompetencyReview] = useState([]);
    const [previousTechnicalCompetencyReview,setPreviousTechnicalReview] = useState([]);
    

    const per_page = 4;
    const getReviewTemplateByOrgId = async (Oid) => {

        let url = getReviewTemplateByOidUrl(Oid);
        setLoader(true)
        GET(url, token).then((data) => {
            setReviewTemplateArray(data.data)
            setLoader(false)
        }).catch((err)=>{
            setLoader(false);
            alert(err)})

    }

    const getPreviousReview = async (id)=>{

        setLoader(true)
        let url = getPreviousReviewUrl(id);
        GET(`${url}`,token).then((data)=>{
           
            // setPreviousReview(data);
            if(data.hasOwnProperty('coreCompetencyReview')){
            setPreviousCoreCompetencyReview(data.coreCompetencyReview);
            setPreviousTechnicalReview(data.technicalCompetencyReview);}else{
            setPreviousCoreCompetencyReview([]);
            setPreviousTechnicalReview([]);}
            setLoader(false);
        }).catch((error)=>{
            setLoader(false);
            setPreviousCoreCompetencyReview([]);
            setPreviousTechnicalReview([]);
            alert(error);
        })

    }


    const fetchDirectReport = (page, per_page, searchText) => {
        setLoader(true)
        const url = getDirectReportee(page, per_page, searchText);
        GET(url, token).then(response => {
            setToalUsers(response.count);
            setReportData(response.data);

            setLoader(false)
        }).catch((err)=>{
            setLoader(false);
            alert(err);
        })
    }

    

    const paginationMethod = (selectedPage) => {
        setPage(selectedPage);
        fetchDirectReport(selectedPage, per_page, searchText);
    }

    const createReview = async () => {

        const data = {
            review: { user_id: selectedUser.id, review_type: reviewType },
            technicalCompetencyReview: technicalCompetencyReview,
            coreCompetencyReview: coreCompetencyReview
        }

   

        let url = createReviewUrl
        setLoader(true)
        POST(url, data, token).then((data) => {
           
            setIsReviewTemplateSelected(false);
            setIsCoreCompetencyReviewSubmited(false);
            setIsTechnicalCompetencyReviewSubmited(false);
            setTechnicalCompetencyReview([]);
            setCoreCompetencyReview([]);
            setShowSummaryModal(false);
            setLoader(false);
            getPreviousReview(selectedUser.id)
        }).catch((err)=>{
            setLoader(false);
            alert(err);
        })
    }

   

    useEffect(() => {

        let Oid = auth.user.oid
        setLoggedInUser([ auth.user ])

         getReviewTemplateByOrgId(Oid);

    }, [])

    useEffect(() => {

        fetchDirectReport(page, per_page, searchText);

    }, [searchText]);

    useEffect(()=>{
        if(selectedUser.id !== 0){
        getPreviousReview(selectedUser.id);}
    },[selectedUser]);


    const getCompetencyByTemplateId = (coreCompetencyArray, technicalCompetencyArray) => {

        setShowReviewTemplateModal(false);
        convertCoreToCoreReview(coreCompetencyArray);
        convertTechnicalToTechnicalReview(technicalCompetencyArray);
        setIsReviewTemplateSelected(true);

    }

    const convertCoreToCoreReview = (coreValues) => {

       
        if (coreValues[0] === null) { setCoreCompetencyReview([]) }
        else {
            let coreReview = [];

            coreValues.forEach(element => {
                coreReview.push({
                    name: element.name,
                    rate: 1,
                    description: "",
                    core_competency_id: element.id
                })
            })

            setCoreCompetencyReview(coreReview);
        }
    }

    const convertTechnicalToTechnicalReview = (technicalValues) => {

        
        if (technicalValues[0] === null) { setTechnicalCompetencyReview([]) }
        else {
            let technincalReview = [];

            technicalValues.forEach(element => {
                technincalReview.push({
                    name: element.name,
                    rate: 1,
                    description: "",
                    technical_competency_id: element.id
                })
            })

            setTechnicalCompetencyReview(technincalReview);
        }
    }


    const onCloseReviewTemplatemodal = () => {
        setShowReviewTemplateModal(false)
    }


    const onSubmitReviewTemplateModal = (data) => {
        let CoreCompetency = data.coreCompetency
        let technicalCompetency = data.technicalCompetency
        getCompetencyByTemplateId(CoreCompetency, technicalCompetency);

        // call the get core competency api for getting all the competency related to the template id

    }


    const onClickCoreCompetencyReviewButton = () => {

        if (selectedUser.id === 0) {
            alert("no user is selected")
            return;
        }
        if (isReviewTemplateSelected) {
            setShowCoreCompetencyModal(true)
        } else {
            setShowReviewTemplateModal(true)
        }
    }

    const onClickTechnincalCompetencyReviewButton = () => {

        if (selectedUser.id === 0) {
            alert("no user is selected")
            return;
        }

        if (isReviewTemplateSelected) {
            setShowTechnicalCompetencyModal(true)
        } else {
            setShowReviewTemplateModal(true)
        }

    }

    const onCloseCoreCompetencyModal = () => {

        setShowCoreCompetencyModal(false)
    }

    const onSubmitCoreCompetencyModal = () => {
        setShowCoreCompetencyModal(false)
    }

    const onCloseTechnicalCompetencyModal = () => {
        setShowTechnicalCompetencyModal(false)
    }

    const onSubmitTechnicalCompetencyModal = () => {
        setShowTechnicalCompetencyModal(false)
    }

    const onCloseSummaryModal = () => {
        setShowSummaryModal(false)
    }


    const handleChangeDescriptionInTechnicalComeptency = (id, value) => {

        
        // Find the object in the array with the matching technical_competency_id
        const objectToUpdate = technicalCompetencyReview.find((object) => object.technical_competency_id === id);

        // Make a copy of the object to avoid directly manipulating the state
        const updatedObject = { ...objectToUpdate };

        // Update the rate property of the object
        updatedObject.description = value;

        // Find the index of the object in the array
        const index = technicalCompetencyReview.findIndex((object) => object.technical_competency_id === id);

        // Make a copy of the array to avoid directly manipulating the state
        const newArray = [...technicalCompetencyReview];

        // Update the object at the specified index with the updated object
        newArray[index] = updatedObject;

        // Set the state to the updated array
        setTechnicalCompetencyReview(newArray);


    }

    const handleChangeRateInTechnicalCompetency = (id, value) => {

       
        // Find the object in the array with the matching technical_competency_id
        const objectToUpdate = technicalCompetencyReview.find((object) => object.technical_competency_id === id);

        // Make a copy of the object to avoid directly manipulating the state
        const updatedObject = { ...objectToUpdate };

        // Update the rate property of the object
        updatedObject.rate = value;

        // Find the index of the object in the array
        const index = technicalCompetencyReview.findIndex((object) => object.technical_competency_id === id);

        // Make a copy of the array to avoid directly manipulating the state
        const newArray = [...technicalCompetencyReview];

        // Update the object at the specified index with the updated object
        newArray[index] = updatedObject;

        // Set the state to the updated array

        
        setTechnicalCompetencyReview(newArray);


    }

    const handleChangeDescriptionInCoreCompetency = (id, value) => {
        // Find the object in the array with the matching technical_competency_id
        const objectToUpdate = coreCompetencyReview.find((object) => object.core_competency_id === id);

        // Make a copy of the object to avoid directly manipulating the state
        const updatedObject = { ...objectToUpdate };

        // Update the rate property of the object
        updatedObject.description = value;

        // Find the index of the object in the array
        const index = coreCompetencyReview.findIndex((object) => object.core_competency_id === id);

        // Make a copy of the array to avoid directly manipulating the state
        const newArray = [...coreCompetencyReview];
       
        // Update the object at the specified index with the updated object
        newArray[index] = updatedObject;

        // Set the state to the updated array
        setCoreCompetencyReview(newArray);
    }

    const handleChangeRateInCoreCompetency = (id, value) => {
        // Find the object in the array with the matching technical_competency_id
        
        const objectToUpdate = coreCompetencyReview.find((object) => object.core_competency_id === id);

        // Make a copy of the object to avoid directly manipulating the state
        const updatedObject = { ...objectToUpdate };

        // Update the rate property of the object
        updatedObject.rate = value;

        // Find the index of the object in the array
        const index = coreCompetencyReview.findIndex((object) => object.core_competency_id === id);

        // Make a copy of the array to avoid directly manipulating the state
        const newArray = [...coreCompetencyReview];

        // Update the object at the specified index with the updated object
        newArray[index] = updatedObject;

        // Set the state to the updated array
        setCoreCompetencyReview(newArray);



    }

    const onClickReviewButton = () => {
       
        setShowSummaryModal(true);
    }

    const handleOnChange = () => {
        setIsChecked(!isChecked);
        
    };

    return (
        <>
            <Loader loading={loader} />
            <div className="dashboard">
                <div className="row">
                    <div className="col-md-8 pd_right_0">
                        <div className="mygoals_inner_section">
                            <div className="searchbaar_wrp">
                                <div className="searchbaar_inner_wrp">
                                    <div className="left_section">
                                        <div className="toggle-button-cover appraisal_individual_goals">
                                            <div className="button-cover">
                                                <div className="button b2" id="button-10">
                                                    {/* <input type="checkbox" className="checkbox" /> */}

                                                    <input
                                                        type="checkbox"
                                                        className="checkbox"
                                                        id="topping"
                                                        name="topping"
                                                        value="Paneer"
                                                        Q={isChecked}
                                                        onChange={handleOnChange}
                                                    />
                                                    <div className="knobs goal_report_view">
                                                        <span>Individual Goals</span>
                                                    </div>
                                                    <div className="layer" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="right_section">
                                        <div className="searchbaarinput">
                                            <input type="text" name placeholder="Search" onChange={(e) => { setSearchText(e.target.value) }} />
                                            <button type="button"><svg xmlns="http://www.w3.org/2000/svg" width={17} height={17} viewBox="0 0 17 17" fill="none">
                                                <path d="M15.75 15.75L12.3855 12.3795M14.25 7.875C14.25 9.56576 13.5784 11.1873 12.3828 12.3828C11.1873 13.5784 9.56576 14.25 7.875 14.25C6.18424 14.25 4.56274 13.5784 3.36719 12.3828C2.17165 11.1873 1.5 9.56576 1.5 7.875C1.5 6.18424 2.17165 4.56274 3.36719 3.36719C4.56274 2.17165 6.18424 1.5 7.875 1.5C9.56576 1.5 11.1873 2.17165 12.3828 3.36719C13.5784 4.56274 14.25 6.18424 14.25 7.875V7.875Z" stroke="#717171" strokeWidth={2} strokeLinecap="round" />
                                            </svg></button>
                                        </div>
                                    </div>
                                </div>
                            </div>



                            {/* <TableSort /> */}

   

                            <UserTable userData={!isChecked?loggedInUser: ReportData} selectedRow={selectedUser} setSelectedRow={setSelectedUser} />


                            {isChecked?<>{(ReportData.length > 0 ?
                                <div className="pagination_wrp">
                                    <PaginatedItems itemsPerPage={4} totalRecord={toalUsers} method={paginationMethod} />
                                </div> : <Norecordsfound message="Sorry No Records Found.." />)}</>:<></>}

 


                        </div>
                    </div>
                    <div className="col-md-4">
                        <Rightsidebar onClickCoreCompetencyReviewButton={onClickCoreCompetencyReviewButton} onClickTechnincalCompetencyReviewButton={onClickTechnincalCompetencyReviewButton} isCoreCompetencyReveiwSubmited={isCoreCompetencyReveiwSubmited} isTechnicalCompetencyReviewSubmited={isTechnicalCompetencyReviewSubmited} onClickReviewButton={onClickReviewButton} onClickPreviousReviewModule={()=>{setShowPreviousReviewModule(true)}}/>
                    </div>
                </div>
            </div>

            <CoreCompetencyModal show={showCoreCompetencyModal} onClose={onCloseCoreCompetencyModal} onSubmit={onSubmitCoreCompetencyModal} coreCompetencyReview={coreCompetencyReview} setCoreCompetencyReview={setCoreCompetencyReview} handleChangeDescriptionInCoreCompetency={handleChangeDescriptionInCoreCompetency} handleChangeRateInCoreCompetency={handleChangeRateInCoreCompetency} setIsCoreCompetencyReviewSubmited={setIsCoreCompetencyReviewSubmited} />
            <ReviewTemplateModal show={showReviewTemplateModal} onClose={onCloseReviewTemplatemodal} onSubmit={onSubmitReviewTemplateModal} reviewTemplateArray={reviewTemplateArray} />
            <TechnicalCompetencyModal show={showTechnicalCompetencyModal} onClose={onCloseTechnicalCompetencyModal} onSubmit={onSubmitTechnicalCompetencyModal} technicalCompetencyReview={technicalCompetencyReview} handleChangeDescriptionInTechnicalComeptency={handleChangeDescriptionInTechnicalComeptency} handleChangeRateInTechnicalCompetency={handleChangeRateInTechnicalCompetency} setIsTechnicalCompetencyReviewSubmited={setIsTechnicalCompetencyReviewSubmited} />
            <SummaryModal coreCompetencyReview={coreCompetencyReview} technicalCompetencyReview={technicalCompetencyReview} show={showSummaryModal} createReview={createReview} onCloseSummaryModal={onCloseSummaryModal} />
            <PreviousReviewModal coreCompetencyReview={previousCoreCompetencyReview} technicalCompetencyReview={previousTechnicalCompetencyReview} show={showPreviousReviewModule}  onCloseSummaryModal={()=>{setShowPreviousReviewModule(false)}}/>
        </>

    )
}