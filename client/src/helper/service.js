import axios from "axios";
import { baseUrl, baseUrlUser } from "../config";
import { handleResponse } from "./handle-response";

export const GET = async (url, token) => {
    const bearer = "Bearer " + token;
    const configData = {
        headers: { "content-type": "application/json", Authorization: bearer },
    };
    return axios
        .get(url, configData)
        .then((res) => {
            return handleResponse(res);
        })
        .catch((error) => {
            return handleResponse(error.response);
        });
};

export const POST = async (url, data, token) => {
    const bearer = "Bearer " + token;
    const configData = {
        headers: { "content-type": "application/json", Authorization: bearer },
    };
    return axios
        .post(url, data, configData)
        .then((res) => {
            return handleResponse(res);
        })
        .catch((error) => {
            return handleResponse(error.response);
        });
};

export const PUT = async (url, data, token) => {
    const bearer = "Bearer " + token;
    const configData = {
        headers: { "content-type": "application/json", Authorization: bearer },
    };
    return axios
        .put(url, data, configData)
        .then((res) => {
            return handleResponse(res);
        })
        .catch((error) => {
            return handleResponse(error.response);
        });
};

export const PATCH = async (url, data, token) => {
    const bearer = "Bearer " + token;
    const configData = {
        headers: { "content-type": "application/json", Authorization: bearer },
    };
    return axios
        .patch(url, data, configData)
        .then((res) => {
            return handleResponse(res);
        })
        .catch((error) => {
            return handleResponse(error.response);
        });
};

export const DELETE = async (url, token) => {
    const bearer = "Bearer " + token;
    const configData = {
        headers: { "content-type": "application/json", Authorization: bearer },
    };
    return axios.delete(url, configData).then(handleResponse);
};
export const LOGOUT = async () => {
    localStorage.clear();
    window.location = "/";
};

export const createGoal = async (params, values, token) => {
    const multiArray = JSON.parse(params);
    var newObj = [];
    multiArray.forEach((item) => {
        let obj = {
            userId: item.assignee,
            name: item.tactic,
            description: item.tacticDescription,
            frequency: item.frequency,
            startDate: item.startDate,
            endDate: item.endDate,
        };
        newObj.push(obj);
    });
    const bearer = "Bearer " + token;
    const config = {
        headers: { "content-type": "application/json", Authorization: bearer },
    };
    const data = {
        name: values.goal_name,
        description: values.description,
        type: values.goal_type,
        startDate: new Date(),
        endDate: new Date(),
        tactics: newObj,
    };
    return await axios
        .post(baseUrl + "/goals-tactics", data, config)
        .then((res) => res);
};
export const createUser = async (params, token) => {
    // const values = JSON.parse(params);
    console.log("params ===" ,params);
    const bearer = "Bearer " + token;
    
    let formData = new FormData();
    formData.append('fname', params.fname);
    formData.append('lname', params.lname);
    formData.append('email', params.email);
    formData.append('password', params.password);
    formData.append('profileImage',params.profileImage);
    const config = {
        headers: { "content-type": "multipart/form-data", Authorization: bearer },
    };
    

    const response = await axios.post(
        baseUrl + "/admin/create-users",
        formData,
        config,
    );

    const responseContent = await response.data;
    return responseContent;
};

/**
 * Takes in a supervisor id, employee id, and token. Uses the supervisor id and employee id to access the endpoint POST addSupervisorToEmployees
 * @see {@link https://github.com/Quantum-Ecosystem/quantum-performance-management/blob/7953db3884e49479601a5c9448ed546ceaa01f87/server/src/org_employee_relations/org_employee_relations.controller.ts#L41 addSupervisorToEmpliyee}
 *
 * @param {string} supervisorId - The id of the supervisor we are adding the employee to
 * @param {string} employeeId - The id of the employee we are adding underneath the supervisor specified above
 * @param {string} token - The token used for authorization
 */
export const addCreatedUserToSupervisor = async (
    supervisorId,
    employeeId,
    token,
) => {
    const tokenForAuth = `Bearer ${token}`;

    const configurationHeaders = {
        headers: {
            "content-type": "application/json",
            Authorization: tokenForAuth,
        },
    };

    const postData = {
        supervisorId,
        employeeId,
    };

    const response = await axios.post(
        baseUrl + "/org_employee_relations/addSupervisorToEmployees",
        postData,
        configurationHeaders,
    );

    const responseContent = await response.data;

    return responseContent;
};

// export const createUser = async (params, values, token) => {

//     const bearer = "Bearer " + token;
//     const config = {
//       headers: { 'content-type': 'application/json', 'Authorization': bearer }
//     }
//     const data = {
//         "fname":fname,
//         "lname":lname,
//         "email":email,
//         "password":password
//     }
//     return await axios.post(baseUrl + "/goals-tactics", data, config).then(res => res)
//   }

export const deleteTacticData = async (ids, token) => {
    const bearer = "Bearer " + token;
    const configData = {
        headers: { "content-type": "application/json", Authorization: bearer },
    };
    const data = {
        ids: ids,
    };
    return axios
        .post(baseUrl + "/tactics/delete", data, configData)
        .then((res) => res.data);
};

export const getCountryList = async (token) => {
    const bearer = "Bearer " + token;
    const configData = {
        headers: { "content-type": "application/json", Authorization: bearer },
    };
    const data = {
        page: 0,
        size: 100,
    };
    return axios
        .post(baseUrlUser + "/api/v1/utility/country-list", data, configData)
        .then((res) => res.data);
};

export const updateUserProfile = async (token, req) => {
    const bearer = "Bearer " + token;
    const configData = {
        headers: { "content-type": "application/json", Authorization: bearer },
    };
    let formData = new FormData();
    if (req.fname) {
        formData.append("fname", req.fname);
    }
    if (req.lname) {
        formData.append("lname", req.lname);
    }
    if (req.designation) {
        formData.append("title", req.designation);
    }
    if (req.country) {
        formData.append("country", req.country);
    }
    if (req.bio) {
        formData.append("bio", req.bio);
    }
    if (req.phone) {
        formData.append("phone", req.phone);
    }
    if (req.selctedImage) {
        formData.append("profileImage", req.selctedImage);
    }

    return axios
        .post(baseUrl + "/users/profile/update", formData, configData)
        .then((res) => res.data);
};
