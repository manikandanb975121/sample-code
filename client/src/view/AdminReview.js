import { useState, useRef } from 'react';
import { useSelector } from "react-redux";
import Loader from './common/Loader';
import AddUser from './Admin/AddUser';
import DialogModal from './Admin/DialogModal';
import UserList from './Admin/UserList';
import { environment } from 'src/configs/environment';
import axiosIntance from 'src/helper/axios';
import TextField from '@mui/material/TextField';
import OrganizationDetails from './Admin/Organizations/OrganizationDetails';
import "../App.css";
import AddReview from './Admin/Review/AddReview';
import ReviewList from './Admin/Review/ReviewList';

const AdminReview = () => {
    const auth = useSelector(state => state.auth );
    const token = auth.token;
    const [loader, setLoader] = useState(false);
    const [isAddReviewTemplate, setIsAddReviewTemplate] = useState(false);
    const [isImportUser, setIsImportUser] = useState(false);
    const [file, setFile] = useState(null);
    const inputFile = useRef(null);
    const [search, setSearch] = useState(null);
    const [isUpdated, setUpdated] = useState(false);


    const handleFileChange = (e) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    }

    const closeDialogHandler = () => {
        setIsAddReviewTemplate(false);
    }

    const saveDialogHandler = async (data) => {
        console.log({data});
        try {
            setLoader(true);
            const response = await axiosIntance.post(environment.baseAPIUrl + environment.endpoints.review.reviewTemplate,  data);
            console.log({response});
            setUpdated(!isUpdated);
        } catch(err) {
            setLoader(false);
        } finally {
            setIsAddReviewTemplate(false);
            setLoader(false);
        }
    }


    const bulkImportHandler = async () => {
        try {
            setLoader(true)
            const formData = new FormData();
            formData.append('userxls', file);
            const response = await axiosIntance.post(environment.baseAPIUrl + environment.endpoints.addBulkUser, formData)
        } catch(err) {
        } finally {
            setLoader(false);
        }
    }

  return (
    <div className='wrapper'>
    <div id="content">
        <Loader loading={loader} />
        <div className="dashboard_main">
            <div className="row">
                <div className="col-md-12 pd_right_0">
                    <div className="main_inner_section">
                        <div className="reminders_haeder">
                            <div className='div'>Admin Review Panel - <OrganizationDetails /> </div>
                            <p>Create your own Review Template and edit their details</p>
                            <div>
                                <div onClick={() => { setIsAddReviewTemplate(true)}} type="button" className="refreshbt"> <span><svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 16 16" fill="none">
                                    <path d="M13 7.72353H7.85098V13H5.14902V7.72353H0V5.27647H5.14902V0H7.85098V5.27647H13V7.72353Z" fill="#717171" />
                                </svg></span>Add Template</div>
                            </div>
                        </div>
                        <ReviewList updated={isUpdated}/>
                    </div>
                </div>
            </div>
        </div>
    </div>

    {isAddReviewTemplate && <DialogModal open={isAddReviewTemplate} title={'Create Review Template'}>
        <AddReview onClose={closeDialogHandler} onSubmit={saveDialogHandler}/>
    </DialogModal>}
</div>
  )
}

export default AdminReview