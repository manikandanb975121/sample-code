
import { baseUrl } from '../../src/config';

export const getAllNodeURI = `${baseUrl}/org-tree/`;
export const getAllNodeByIdURI = `${baseUrl}/org-tree/`
export const updateNodeMappingURI = `${baseUrl}/org-tree/updateSupervisor`;
export const addSupervisorURI = `${baseUrl}/org_employee_relations/addSupervisorToEmployees`
// export const getReviewTemplateByOidUrl = (oid) => `${baseUrl}/review-template/findByOid/${oid}`
export const getReviewTemplateByOidUrl = (oid) => `${baseUrl}/review-template`
export const createReviewUrl = `${baseUrl}/review`
export const getDirectReportee = (page, per_page, searchText)=>{
//   return 'https://pm-staging.api.maximumaccountability.net/'+'org_employee_relations/employee_under_supervisor/search?searchParameter=' + searchText + "&limit=" + per_page + "&page=" + page;}
     return `${baseUrl}/`+"org_employee_relations/employee_under_supervisor/search?searchParameter=" + searchText + "&limit=" + per_page + "&page=" + page;}
export const getPreviousReviewUrl = (id)=>{return `${baseUrl}/review/previous-review/${id}`}