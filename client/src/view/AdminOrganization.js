import { useState } from 'react';
import Loader from './common/Loader';
import { environment } from 'src/configs/environment';
import axiosIntance from 'src/helper/axios';
import "../App.css";
import DialogModal from './Admin/DialogModal';
import AddOrganizations from './Admin/Organizations/AddOrganizations';
import OrganizationList from './Admin/Organizations/OrganizationList';
import OrganizationDetails from './Admin/Organizations/OrganizationDetails';

const AdminOrganization = () => {

    const [isAddOrganization, setIsAddOrganization] = useState(false);
    const [loader, setLoader] = useState(false);

    const closeDialogHandler = () => {
        setIsAddOrganization(false);
    };

    const saveDialogHandler = async (organiztionsData, isUpdate, organizationId) => {
        try {
            setLoader(true);
            if (!isUpdate) {
                await axiosIntance.post(environment.baseAPIUrl + environment.endpoints.organization.createOrganization, organiztionsData)
            } else {
                delete organiztionsData.maxUsers;
                await axiosIntance.put(environment.baseAPIUrl + environment.endpoints.organization.createOrganization + `/${organizationId}`, organiztionsData)
            }
        } catch(err) {

        } finally {
            setIsAddOrganization(false);
            setLoader(false)
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
                                <div className='div'>Admin Organization Panel - <OrganizationDetails /></div>
                                    <p>Create your organizations and edit their details</p>
                                    <button onClick={() => {setIsAddOrganization(true)}} type="button" className="refreshbt"> <span><svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 16 16" fill="none">
                                        <path d="M13 7.72353H7.85098V13H5.14902V7.72353H0V5.27647H5.14902V0H7.85098V5.27647H13V7.72353Z" fill="#717171" />
                                    </svg></span>Add Organizations</button>
                                </div>
                                <OrganizationList />
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            {
                isAddOrganization && <DialogModal title={'Add Organizations'} open={isAddOrganization}>
                    <AddOrganizations onClose={closeDialogHandler} onSubmit={saveDialogHandler} />
                </DialogModal>
            }
        </div>
    )
}

export default AdminOrganization