import React, { useState, useEffect } from "react"; 
import {useDispatch,useSelector} from "react-redux";
import Dashboard from '../component/DashboardCard';
import {GET} from '../helper/service'; 
import "../App.css";
import OrgChart from "../orgTree";
import Layout from "../layout";
import Header from './common/Header';
import Footer from './common/Footer';
import Sidebar from './common/Sidebar';
import {baseUrl} from '../config';  

export default function Strategy() {
	const auth = useSelector(state=>state.auth);
  const [questionsList, setQuestionsList] = useState([]); 
  const token  = auth.token;
  const oid = auth.user.oid;
  useEffect(() => {   
    fetchQuestions(); 
  }, []);

  const fetchQuestions = (e) => { 
    // const url = baseUrl + '/question-answer/'+oid; 
    const url = baseUrl + '/strategy/question/'+oid; 
    GET(url,token).then(data => {   
      setQuestionsList(data); 
    })  
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
                  <div className="personal_info">
                    <ul className="nav nav-tabs strategye_navlink" id="myTab" role="tablist">
                      <li className="nav-item">
                        <a className="nav-link strategy_tab active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">
                          <span><svg xmlns="http://www.w3.org/2000/svg" width={40} height={40} viewBox="0 0 40 40" fill="none">
                              <g clipPath="url(#clip0_206_4311)">
                                <path className="iconHvr" d="M19.0575 30.6229C13.5294 29.6673 10.3412 26.4791 9.38565 20.969C9.27849 20.969 9.12667 20.969 8.98378 20.969C6.34926 20.969 3.71474 20.969 1.08023 20.969C0.294336 20.969 -0.178984 20.3528 0.0621416 19.674C0.213961 19.2454 0.571184 19.031 1.16953 19.031C3.6433 19.031 6.10813 19.031 8.5819 19.031C8.84982 19.031 9.11773 19.031 9.37672 19.031C10.3234 13.5387 13.5116 10.3327 19.0485 9.37709C19.0485 9.25206 19.0485 9.09132 19.0485 8.9395C19.0485 6.37642 19.0485 3.82228 19.0485 1.25921C19.0485 1.02701 19.0575 0.776958 19.1378 0.562625C19.2807 0.16968 19.7451 -0.0535842 20.1559 0.0178603C20.5846 0.0893048 20.9061 0.428666 20.9507 0.866264C20.9686 1.00022 20.9597 1.13418 20.9597 1.26814C20.9597 3.81335 20.9597 6.35856 20.9597 8.90377C20.9597 9.06452 20.9597 9.22527 20.9597 9.43068C21.3347 9.49319 21.7009 9.54677 22.0581 9.61822C26.6038 10.5649 29.8992 14.1014 30.5064 18.6917C30.5511 19.031 30.7208 19.04 30.9798 19.04C33.6143 19.031 36.2488 19.04 38.8833 19.04C39.5174 19.04 39.9193 19.3436 39.9818 19.8526C40.0711 20.5046 39.6335 20.969 38.9101 20.969C36.3828 20.9779 33.8465 20.969 31.3191 20.969C30.5868 20.969 30.5868 20.969 30.4618 21.6834C29.6045 26.4434 26.1037 29.8281 21.299 30.5247C21.2008 30.5425 21.1026 30.5604 20.9507 30.5783C20.9507 30.7479 20.9507 30.9087 20.9507 31.0694C20.9507 33.5521 20.9507 36.0438 20.9507 38.5265C20.9507 38.6872 20.9507 38.8569 20.9507 39.0176C20.9329 39.5981 20.5489 39.9911 20.013 40C19.4593 40.0089 19.0575 39.6071 19.0396 39.0087C19.0307 38.8301 19.0396 38.6515 19.0396 38.4729C19.0396 36.0348 19.0485 33.5879 19.0485 31.1498C19.0575 30.9623 19.0575 30.7658 19.0575 30.6229ZM11.4218 20.969C11.7969 25.3003 15.6817 28.426 19.0575 28.5599C19.0575 28.0241 19.0307 27.4972 19.0664 26.9703C19.0842 26.7203 19.1557 26.4345 19.3075 26.2291C19.5486 25.9076 19.9237 25.8093 20.3077 25.9433C20.7275 26.0862 20.9597 26.3988 20.9686 26.8542C20.9775 27.4258 20.9686 27.9973 20.9686 28.5778C24.7998 28.3278 28.3095 24.8806 28.5864 20.969C28.0237 20.969 27.4611 20.9868 26.8985 20.969C26.1037 20.9422 25.6482 20.1741 26.0322 19.5222C26.2376 19.165 26.577 19.031 26.9699 19.031C27.5147 19.031 28.0595 19.031 28.6042 19.031C28.1309 14.4139 24.0496 11.5204 20.9597 11.4579C20.9597 11.9759 20.9597 12.4939 20.9597 13.0118C20.9597 13.6816 20.5756 14.1103 19.9952 14.1103C19.4147 14.1103 19.0485 13.6906 19.0396 13.0029C19.0307 12.4849 19.0396 11.967 19.0396 11.4579C15.8157 11.1275 11.0914 15.8518 11.4486 19.031C11.9666 19.031 12.4846 19.0221 13.0025 19.031C13.6813 19.04 14.101 19.4061 14.101 19.9955C14.101 20.585 13.6902 20.96 13.0115 20.969C12.4846 20.9779 11.9577 20.969 11.4218 20.969Z" fill="#009FDF" />
                                <path className="iconHvr" d="M5.64385 17.3164C4.99191 17.3164 4.38464 17.3164 3.71484 17.3164C4.31319 13.8513 5.82246 10.8864 8.26943 8.40365C10.77 5.8763 13.7796 4.32239 17.3429 3.70618C17.3429 4.33132 17.3607 4.89394 17.325 5.45657C17.3161 5.5548 17.1018 5.68876 16.9589 5.72448C14.5923 6.26032 12.4668 7.2784 10.6182 8.85018C8.09975 10.9935 6.46546 13.6727 5.75101 16.9056C5.71529 17.0306 5.67957 17.1556 5.64385 17.3164Z" fill="#009FDF" />
                                <path className="iconHvr" d="M22.6743 36.2581C22.6743 35.6866 22.6832 35.1507 22.6653 34.6238C22.6564 34.338 22.844 34.3291 23.0315 34.2934C26.0768 33.6325 28.6578 32.159 30.7564 29.8728C32.5336 27.9348 33.7035 25.6754 34.2661 23.1123C34.2929 22.9873 34.3287 22.8533 34.3644 22.7104C34.9895 22.7104 35.6147 22.7104 36.2309 22.7104C35.4539 29.2387 29.5955 35.3472 22.6743 36.2581Z" fill="#009FDF" />
                                <path className="iconHvr" d="M36.2752 17.2985C36.2037 17.3074 36.1323 17.3253 36.0608 17.3253C35.5161 17.3253 34.9624 17.3253 34.3997 17.3253C34.239 16.7358 34.105 16.1554 33.9175 15.6017C32.1046 10.3326 28.4698 7.04617 23.0668 5.73338C22.7543 5.65301 22.6471 5.55477 22.665 5.2422C22.6918 4.75102 22.6739 4.26877 22.6739 3.77759C28.711 4.43845 35.1856 9.8593 36.2752 17.2985Z" fill="#009FDF" />
                                <path className="iconHvr" d="M17.3337 36.267C10.7697 35.3383 4.82195 29.837 3.73242 22.7104C4.36649 22.7104 4.99163 22.7104 5.65249 22.7104C5.95613 24.2286 6.44731 25.6933 7.22427 27.0418C9.40333 30.8641 12.6451 33.2842 16.9407 34.2755C17.2444 34.347 17.3694 34.4363 17.3515 34.7667C17.3158 35.2579 17.3337 35.758 17.3337 36.267Z" fill="#009FDF" />
                                <path className="iconHvr" d="M16.6641 19.9955C16.6641 18.1469 18.1734 16.6376 20.0041 16.6465C21.8885 16.6555 23.362 18.1469 23.362 20.0312C23.362 21.862 21.8528 23.3534 19.9863 23.3623C18.1555 23.3623 16.6552 21.853 16.6641 19.9955Z" fill="#009FDF" />
                              </g>
                              <defs>
                                <clipPath id="clip0_206_4311">
                                  <rect width={40} height={40} fill="white" />
                                </clipPath>
                              </defs>
                            </svg></span>
                          Mission</a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link strategy_tab" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false"><span><svg xmlns="http://www.w3.org/2000/svg" width={40} height={40} viewBox="0 0 40 40" fill="none">
                              <g clipPath="url(#clip0_206_4320)">
                                <path className="iconHvr" d="M19.9889 29.5786C16.185 29.5711 12.6348 28.527 9.25606 26.8413C6.06382 25.2452 3.19975 23.1867 0.611646 20.7328C0.574354 20.6955 0.537061 20.6657 0.507227 20.6284C-0.164039 19.9646 -0.171498 19.5991 0.507227 18.9502C3.91577 15.6983 7.7569 13.1177 12.1873 11.4619C17.7066 9.39587 23.1811 9.54504 28.6109 11.7751C32.7578 13.4757 36.3901 15.9519 39.5973 19.0696C40.1268 19.5842 40.1268 19.9944 39.5973 20.5016C35.6219 24.3204 31.102 27.2441 25.7617 28.7731C23.8747 29.3101 21.9505 29.5861 19.9889 29.5786ZM28.1186 19.7707C28.1037 15.2508 24.4565 11.6483 19.9292 11.6558C15.4988 11.6707 11.8442 15.3478 11.8591 19.7856C11.8665 24.2905 15.5212 27.9228 20.0411 27.9154C24.5013 27.9079 28.1336 24.2383 28.1186 19.7707ZM13.0002 26.6325C11.2251 24.6858 10.248 22.4184 10.2555 19.7781C10.263 17.1378 11.2251 14.8779 13.0152 12.9461C8.8533 14.4527 5.25084 16.8246 1.96164 19.8005C5.25084 22.7615 8.8533 25.1333 13.0002 26.6325ZM38.031 19.7856C34.7269 16.8096 31.1244 14.4304 26.9775 12.9387C28.7675 14.8779 29.7446 17.1453 29.7371 19.7856C29.7371 22.4259 28.7675 24.6933 26.9775 26.6325C31.1319 25.1333 34.7343 22.7615 38.031 19.7856Z" fill="#009FDF" />
                                <path className="iconHvr" d="M18.5196 15.2657C20.332 14.4975 22.771 15.3403 23.9793 17.1452C25.2472 19.0322 24.9787 21.5681 23.3453 23.2015C21.7715 24.7828 19.2133 25.0289 17.3486 23.7759C15.5511 22.575 14.7083 20.1286 15.484 18.2864C15.9912 18.8532 16.6177 19.1292 17.371 19.0546C17.8707 19.0024 18.3033 18.7861 18.6539 18.4356C19.5116 17.5704 19.4669 16.5113 18.5196 15.2657Z" fill="#009FDF" />
                              </g>
                              <defs>
                                <clipPath id="clip0_206_4320">
                                  <rect width={40} height="19.5786" fill="white" transform="translate(0 10)" />
                                </clipPath>
                              </defs>
                            </svg></span>Vision</a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link strategy_tab" id="contact-tab" data-toggle="tab" href="#contact" role="tab" aria-controls="contact" aria-selected="false"><span><svg xmlns="http://www.w3.org/2000/svg" width={37} height={32} viewBox="0 0 37 32" fill="none">
                              <g clipPath="url(#clip0_206_4327)">
                                <path className="iconHvr" d="M18.504 31.9092C18.1113 31.934 17.8823 31.6863 17.6614 31.4138C16.1562 29.548 14.651 27.6821 13.1458 25.8163C8.86746 20.5243 4.59729 15.2405 0.327114 9.9484C-0.0900868 9.42828 -0.114628 9.08978 0.269851 8.54489C2.18407 5.86171 4.0901 3.18679 5.99614 0.503612C6.24155 0.165119 6.53605 0 6.96143 0C14.651 0.00825593 22.3324 0.00825593 30.022 0C30.4392 0 30.7419 0.148607 30.9873 0.503612C32.8852 3.17853 34.7912 5.83695 36.689 8.50361C37.1144 9.10629 37.1062 9.39525 36.64 9.97317C31.7317 16.0495 26.8316 22.1259 21.9234 28.2023C21.0563 29.2755 20.1973 30.3653 19.3138 31.4303C19.1175 31.6615 18.823 31.8184 18.5776 32.0083C18.5449 31.967 18.5203 31.934 18.504 31.9092ZM18.3976 27.5913C20.7127 21.7461 23.0114 15.9505 25.3101 10.1383C20.7454 10.1383 16.2135 10.1383 11.6161 10.1383C13.8821 15.967 16.1317 21.7626 18.3976 27.5913ZM11.9106 8.29721C16.3362 8.29721 20.68 8.29721 25.0483 8.29721C25.0074 8.19814 24.9829 8.14035 24.9502 8.08256C23.7149 6.05985 22.4879 4.0289 21.2362 2.01445C21.1626 1.89061 20.9336 1.79154 20.7781 1.79154C19.2648 1.77503 17.7514 1.79154 16.238 1.77503C15.9681 1.77503 15.8208 1.86584 15.6899 2.08875C14.9455 3.3354 14.1847 4.57379 13.424 5.81218C12.9249 6.62951 12.4341 7.4386 11.9106 8.29721ZM34.2104 10.1548C34.0959 10.13 34.0631 10.1135 34.0222 10.1135C31.8708 10.1135 29.7112 10.1218 27.5597 10.1053C27.2816 10.1053 27.2161 10.2539 27.1343 10.452C25.0238 15.7688 22.905 21.0857 20.7863 26.4025C20.7291 26.5428 20.6882 26.6832 20.6391 26.8235C20.6636 26.8318 20.6882 26.8483 20.7209 26.8566C25.2037 21.3003 29.6866 15.7441 34.2104 10.1548ZM15.9353 26.4438C15.9599 26.4272 15.9844 26.4107 16.009 26.3942C15.9762 26.2951 15.9435 26.1878 15.9108 26.0887C13.8902 20.8875 11.8697 15.678 9.85729 10.4685C9.74277 10.1796 9.59552 10.0887 9.28466 10.0887C7.23956 10.1053 5.19446 10.097 3.14936 10.097C3.04301 10.097 2.94485 10.1053 2.7567 10.1218C7.1823 15.6037 11.5588 21.0196 15.9353 26.4438ZM2.65853 8.26419C2.73215 8.29721 2.7567 8.32198 2.77306 8.32198C5.04721 8.32198 7.32137 8.33024 9.59552 8.32198C9.71823 8.32198 9.89001 8.18989 9.95546 8.0743C11.1662 6.10113 12.3687 4.11971 13.5794 2.14654C13.6366 2.04747 13.6857 1.94014 13.7512 1.79979C11.6161 1.79979 9.53008 1.79979 7.44407 1.80805C7.32955 1.80805 7.1823 1.93189 7.10049 2.03096C6.70783 2.55934 6.33154 3.09597 5.95524 3.63261C4.86724 5.15996 3.77107 6.69556 2.65853 8.26419ZM34.3167 8.30547C34.2922 8.23942 34.2922 8.19814 34.2676 8.16512C32.8033 6.11765 31.3472 4.06192 29.8748 2.0227C29.7848 1.89886 29.5721 1.79154 29.4085 1.79154C27.4779 1.77503 25.5391 1.78328 23.6086 1.78328C23.494 1.78328 23.3795 1.80805 23.2323 1.81631C23.2895 1.92363 23.3141 1.98968 23.355 2.04747C24.5657 4.04541 25.7927 6.04334 26.9953 8.04953C27.1425 8.29721 27.3143 8.33024 27.5597 8.33024C29.6702 8.32198 31.7808 8.33024 33.8913 8.33024C34.0304 8.33024 34.1613 8.31372 34.3167 8.30547Z" fill="#009FDF" />
                              </g>
                              <defs>
                                <clipPath id="clip0_206_4327">
                                  <rect width={37} height={32} fill="white" />
                                </clipPath>
                              </defs>
                            </svg></span>Values</a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link strategy_tab" id="srategy-tab" data-toggle="tab" href="#srategy" role="tab" aria-controls="srategy" aria-selected="false"><span><svg xmlns="http://www.w3.org/2000/svg" width={34} height={34} viewBox="0 0 34 34" fill="none">
                              <g clipPath="url(#clip0_206_4330)">
                                <path className="iconHvr" d="M15.2171 15.3091C15.2195 14.7905 15.3912 14.287 15.7061 13.875C16.1304 13.3289 16.6144 12.8318 17.1491 12.393C17.6315 11.9782 18.0738 11.5188 18.4701 11.021C18.7193 10.6714 18.8484 10.2503 18.8381 9.82101C18.844 9.55818 18.7969 9.29686 18.6996 9.05264C18.6022 8.80843 18.4567 8.58632 18.2716 8.39963C18.0865 8.21294 17.8656 8.06551 17.6222 7.96609C17.3789 7.86668 17.1179 7.81732 16.8551 7.82101C16.3304 7.81591 15.8233 8.00998 15.4361 8.36404C14.985 8.79869 14.656 9.34421 14.4821 9.94601L12.3301 9.00705C12.6038 7.95918 13.2084 7.02764 14.0541 6.35104C14.8885 5.72368 15.9105 5.39698 16.9541 5.42404C17.7479 5.41578 18.5321 5.59787 19.2411 5.95505C19.9168 6.29439 20.4875 6.81117 20.8921 7.45004C21.3022 8.10056 21.5148 8.85609 21.5041 9.62503C21.5128 10.3176 21.3264 10.9986 20.9661 11.5901C20.5106 12.2861 19.9588 12.914 19.3271 13.455C18.8448 13.8642 18.3911 14.3059 17.9691 14.777C17.727 15.0542 17.5925 15.409 17.5901 15.777C17.5969 16.0025 17.6305 16.2264 17.6901 16.444H15.4901C15.3185 16.0897 15.2254 15.7026 15.2171 15.3091ZM16.6841 22.277C16.4329 22.2833 16.183 22.2385 15.9497 22.1452C15.7164 22.0518 15.5046 21.9119 15.3271 21.734C15.1465 21.5577 15.0044 21.346 14.9096 21.1121C14.8148 20.8782 14.7693 20.6273 14.7761 20.375C14.7701 20.1209 14.8159 19.8683 14.9106 19.6324C15.0053 19.3966 15.147 19.1824 15.3271 19.003C15.5029 18.822 15.7141 18.6793 15.9476 18.5836C16.1811 18.4879 16.4318 18.4414 16.6841 18.4471C16.9379 18.4416 17.1901 18.4879 17.4254 18.5832C17.6607 18.6784 17.8742 18.8205 18.0528 19.0009C18.2314 19.1813 18.3714 19.3961 18.4643 19.6324C18.5572 19.8686 18.601 20.1213 18.5931 20.375C18.5998 20.6272 18.5544 20.8781 18.4598 21.1119C18.3651 21.3457 18.2233 21.5575 18.0431 21.734C17.8651 21.9119 17.6529 22.0517 17.4193 22.1451C17.1857 22.2384 16.9356 22.2833 16.6841 22.277Z" fill="#009FDF" />
                                <path className="iconHvr" d="M1.47402 33.717C1.25761 33.7168 1.04389 33.6691 0.848022 33.577C0.593612 33.4597 0.378357 33.2716 0.227981 33.0352C0.0776055 32.7988 -0.00153095 32.5242 2.24369e-05 32.244V3.57202C0.00108116 2.62499 0.377758 1.71701 1.04741 1.04736C1.71706 0.377713 2.62499 0.00105872 3.57202 0H30.262C31.2091 0.00105872 32.117 0.377713 32.7866 1.04736C33.4563 1.71701 33.833 2.62499 33.834 3.57202V23.988C33.8327 24.9348 33.4559 25.8425 32.7863 26.512C32.1167 27.1814 31.2089 27.558 30.262 27.559H10.29C9.69164 27.5592 9.1123 27.7694 8.65302 28.153L2.41302 33.373C2.14997 33.5941 1.81765 33.7158 1.47402 33.717ZM3.57202 2C3.15526 2.00053 2.75573 2.16631 2.46104 2.461C2.16634 2.75569 2.00055 3.15526 2.00002 3.57202V31.11L7.37002 26.619C8.18933 25.9349 9.22264 25.5598 10.29 25.559H30.262C30.6787 25.5588 31.0782 25.3932 31.3729 25.0986C31.6677 24.8041 31.8335 24.4046 31.834 23.988V3.57202C31.8335 3.15526 31.6677 2.75569 31.373 2.461C31.0783 2.16631 30.6788 2.00053 30.262 2H3.57202Z" fill="#009FDF" />
                              </g>
                              <defs>
                                <clipPath id="clip0_206_4330">
                                  <rect width="33.834" height="33.717" fill="white" />
                                </clipPath>
                              </defs>
                            </svg></span>Srategy Questions</a>
                      </li>
                    </ul>
                    <div className="tab-content" id="myTabContent">
                      <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                        <div className="container_strategye">
                          <div className="row ">
                            <div className="col-md-8">
                              <div className="strategye_content_wrp">
                                <h2>Mission</h2>
                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                              </div>
                            </div>
                            <div className="col-md-4">
                              <div className="strategye_mission_wrp">
                                <img src="img/strategye_mission.png" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                        <div className="container_strategye">
                          <div className="row ">
                            <div className="col-md-8">
                              <div className="strategye_content_wrp">
                                <h2>vision</h2>
                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                              </div>
                            </div>
                            <div className="col-md-4">
                              <div className="strategye_mission_wrp">
                                <img src="img/strategye_vision.png" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">  
                        <div className="container_strategye">
                          <div className="row ">
                            <div className="col-md-8">
                              <div className="strategye_content_wrp">
                                <h2>Values</h2>
                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                              </div>
                            </div>
                            <div className="col-md-4">
                              <div className="strategye_mission_wrp">
                                <img src="img/strategye_values.png" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="tab-pane fade" id="srategy" role="tabpanel" aria-labelledby="srategy-tab">
                        <div className="container_strategye">
                          <div className="row ">
                            <div className="col-md-8">
                              <div className="strategye_content_wrp">
                                <h2>strategy questions</h2>
                                <div className="mygoals_accordion">
                                  <div className="accordion" id="faq">
                                  
                                  {questionsList.map((x, i) => {  
                                  var ids = "faqhead"+i;
                                  var targetId = "#faq"+i;
                                  var expendedId = "faq"+i;
                                  
            
                                  return (
                                    <div className="mygoalscheck">
                                      <div className="card strategy_card">
                                        <div className="card-header" id={ids}>
                                          <a href="#" className={(i==0 ? 'btn btn-header-link' : 'btn btn-header-link collapsed')} data-toggle="collapse" data-target={targetId} aria-expanded="true" aria-controls={expendedId}>
                                            <div className="innermygoalscheck">{i+1}. {x.question}</div>
                                          </a>
                                        </div>
                                        <div id={expendedId} className={(i==0 ? 'collapse show' : 'collapse')} aria-labelledby={ids} data-parent="#faq">
                                          <div className="card-body strategy_body">
                                            Answer {i+1}- {x.answer}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    )})
                                  } 


                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col-md-4">
                              <div className="strategye_mission_wrp">
                                <img src="img/strategye__que.png" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>  
		</div>
        </div>
	)
}