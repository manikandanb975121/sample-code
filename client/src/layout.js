import React, { useState } from 'react';
import { Form, Modal, Spinner, Tab, Tabs } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {
	Row,
	Col,
	Container,
	Button,
	Image,
	Fade,
	Badge,
	Navbar,
	Nav,
	NavDropdown,
	Offcanvas,
} from 'react-bootstrap';
import {
	faTicketAlt,
	faCaretRight,
	faCaretLeft,
	faCog,
	faHome,
	faUsers,
	faUserCog,
	faUserLock,
	faChartLine,
	faBell,
	faChess,
	faHandsHelping,
	faBuilding,
} from '@fortawesome/free-solid-svg-icons';
import styles from './assets/css/GeneralNavigation.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import projectLogo from './assets/images/QS_Logo_-_Globe_Transparent.png';
import { ChevronRight } from 'react-feather';
import Avatar from './assets/images/avatar.png';
import './assets/css/topbar.css';
import './icons';
// import Popover from '@mui/material/Popover';
// import Typography from '@mui/material/Typography';

const GeneralNavigationToolbarMenu = ({ children }) => {
	const [anchorEl, setAnchorEl] = React.useState(null);
    const [menuHandler, setMenuHandler] = useState(false)

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};
	const [imageHeaderWidth, setImageHeaderWidth] = useState(2);
	const [topnavbarWidth, setTopNavbarWidth] = useState(10);
	const [sidebarWidth, setSidebarWidth] = useState(10);
	const [menuWidth, setMenuWidth] = useState(2);
	const buttonVariant = 'outline-primary';
	const [showEnterpriseModal, setShowEnterpriseModal] = useState(false);
	const [enterpriseData, setEnterpriseData] = useState(null);
	const [seledtedEnterprise, setSeledtedEnterprise] = useState(null);

	const logoutClick = () => {
		localStorage.clear();
		window.location = window.location.origin;
		handleClose();
	};

	const handleUpdateProfileClick = () => {
		handleClose();
	};

	let avatar;
	try {
		avatar = Avatar;
	} catch (error) {
		avatar = Avatar; // if image can't be loaded, load the default avatar instead
	}

	/**
	 * @param height The Minimum Height then just add 1, 2, 3 to calculate medium, large, xl
	 */
	// toggled = starts false so larger number, when true smaller number
	const setHeights = () => {
			setSidebarWidth(10);
			setMenuWidth(2);
			setImageHeaderWidth(2);
			setTopNavbarWidth(10);
	};


	return (
		<>
			<Modal show={showEnterpriseModal}>
				<Modal.Header>
					<Modal.Title>Select an Enterprise</Modal.Title>
				</Modal.Header>
				{enterpriseData ? (
					<>
						<Modal.Body>
							<Form.Select
								aria-label="enterprise-select"
								onChange={(e) => {
									const enterprise = JSON.parse(
										e.target.value,
									);
									setSeledtedEnterprise(enterprise);
								}}
							>
								<option value={null}>
									Select an Enterprise
								</option>
								{enterpriseData.map((enterprise) => (
									<option
										key={enterprise.id}
										value={JSON.stringify(enterprise)}
									>
										{enterprise.name}
									</option>
								))}
							</Form.Select>
						</Modal.Body>
						<Modal.Footer>
							{/* <Button
								onClick={() =>
									setShowEnterpriseModal(false)
								}
								variant="outline-danger"
							>
								Cancel Selection
							</Button> */}
							<Button
								onClick={()=>{console.log()}}
								disabled={!seledtedEnterprise}
								variant={
									!seledtedEnterprise
										? 'outline-primary'
										: 'primary'
								}
							>
								Confirm Selection
							</Button>
						</Modal.Footer>
					</>
				) : (
					<div className="">
						<div className="text-center mt-2 fw-bold">
							Loading Enterprises...
						</div>
						<div className="text-center my-3">
							<Spinner animation="border" role="status" />
						</div>
					</div>
				)}
			</Modal>

			<Container fluid className="d-none d-lg-block">
				<Row className={`${styles.bootstrap_edits}`}>
					<Col>
						<Row
							style={{
								minHeight: '5vh',
								width: '100vw',
							}}
						>
							<Col
								style={{
									textAlign: 'center',
									transition: '1s ease-out',
								}}
								className={`pt-2 ${styles.quantum_background}`}
								xs={imageHeaderWidth}
								xl={
									menuHandler ? imageHeaderWidth - 2 : imageHeaderWidth -1
								}
							>
								<Image
									src={projectLogo}
									rounded
									className="test-image image-anim"
									style={{
										height: '5rem',
										width: '5rem',
										zIndex: 1,
									}}
								/>
								{/* <Fade
									in={true}
									timeout={1000}
									style={{
										height: true ? '4vh' : '0px',
										fontSize: true ? '1vw' : '0px',
										color:'white',
										fontWeight:'bold',
										marginTop:'5px',
										transition: `${
											true ? '3' : '.3'
										}s ease-out`,
									}}
								>
									<div>Quantum Strategies</div>
								</Fade>
								<Fade
									in={!true}
									timeout={1000}
									style={{
										height: true ? '0px' : '4vh',
										color:'white',
										fontWeight:'bold',
										marginTop:'5px',
										fontSize: true ? '0px' : '1vw',
										transition: '1s ease in',
									}}
								>
									<div>QS</div>
								</Fade> */}
							</Col>
							{/* reason for change: having nested styles can potentially conflict with current stylesheet, rather then have 100+ lines of css, use the built-in bootstrap formatting
                    to do the job. Also instead of css-styling the counter into the image, use fontawesome's built in stacking functionality.
                    */}
					{/* added class for the col */}
							<Col className="pl-0 pr-1 app-header app-header--shadow app-header--opacity-bg w-100">
								{/* added class in the navbar */}
								<Navbar
									className="h-100 w-100"
									bg="light"
									expand="md"
                                    style={{justifyContent:'space-between'}}
								>
									<Navbar.Toggle
										aria-controls="basic-navbar-nav"
										className="float-right ml-auto"
									/>
									<div>
										<button
										className="hamburger hamburger--elastic" 
										onClick={() => {
											setHeights();
                                            setMenuHandler(!menuHandler)
										}}>
											<span className="hamburger-box">
												<span className="hamburger-inner"></span>
											</span>
										</button>
									</div>
									{/* <Navbar.Collapse
										id="basic-navbar-nav"
										className="justify-content-end h-100"
									>
										<Navbar.Offcanvas
											id="offcanvasNavbar"
											aria-labelledby="offcanvasNavbarLabel"
											placement="end"
										>
											<Offcanvas.Header closeButton>
												<Offcanvas.Title id="offcanvasNavbarLabel">
													User Options
												</Offcanvas.Title>
											</Offcanvas.Header>
											<Offcanvas.Body>
												<Nav
													className="justify-content-end"
													flex-grow-1
													pe-3
												>
													
													<Nav.Link href="#notifications">
														Notifications
													</Nav.Link>
													<Nav.Link href="#settings">
														Settings
													</Nav.Link>
													<NavDropdown
														title="Profile"
														id="navbar-profile-dropdown"
													>
														<NavDropdown.Item>
															Settings
														</NavDropdown.Item>
													</NavDropdown>
												</Nav>
											</Offcanvas.Body>
										</Navbar.Offcanvas>
									</Navbar.Collapse> */}

									{/* Header navigation */}
									<Nav className="justify-content-end d-none d-flex h-100" style={{alignItems:'center'}}>
										<button className=' btn-transition-none bg-neutral-success text-success font-size-lg p-0 d-inline-block shadow-none border-0 text-center d-44 rounded position-relative btn btn-neutral-success mx-2'>
											<span className="fa-layers fa-fw mr-2 ml-2 mt-1">
												<FontAwesomeIcon
													icon={faBell}
													size="lg"
												/>
												{/* <span className="fa-layers-counter">
													1419
												</span> */}
											</span>
										</button>
										<button className='bg-neutral-first text-first font-size-lg p-0 d-inline-block shadow-none border-0 text-center d-44 rounded btn-transition-none btn btn-neutral-first mx-2'>
										<FontAwesomeIcon
											icon={faCog}
											size="lg"
											className="fa-spin ml-2 mr-2 mt-1"
											title="Profile Update"
											onClick={handleUpdateProfileClick}
											style={{ cursor: 'pointer' }}
										/>
										</button>

										<button className='btn-transition-none bg-neutral-danger text-danger font-size-lg p-0 d-inline-block shadow-none border-0 text-center d-44 rounded position-relative btn btn-neutral-danger mx-2'>
										<FontAwesomeIcon
											icon="fa-solid fa-arrow-right-from-bracket"
											size="lg"
											style={{
												cursor: 'pointer',
												paddingRight: '0rem',
											}}
											title="Logout"
											onClick={logoutClick}
										/>
										</button>

										<Link to= "/userprofile" >
										<img
											onClick={handleClick}
											src={avatar}
											alt="Profile"
											className={`rounded-circle ${styles.profile_picture} ml-2 mr-2`}
											title="Profile"
											style={{ cursor: 'pointer' }}
										/>
										</Link>
										
										{/* <Popover
											open={Boolean(anchorEl)}
											anchorEl={anchorEl}
											onClose={handleClose}
											anchorOrigin={{
												vertical: 'bottom',
												horizontal: 'left',
											}}
										>
											<Typography
												sx={{
													p: 1,
													'&:hover': {
														backgroundColor: '#ececec',
														cursor: 'pointer',
													},
												}}
												onClick={handleUpdateProfileClick}
											>
												Update profile
											</Typography>
											<Typography
												sx={{
													p: 1,
													'&:hover': {
														backgroundColor: '#ececec',
														cursor: 'pointer',
													},
												}}
												onClick={logoutClick}
											>
												Logout
											</Typography>
										</Popover> */}
									</Nav>
								</Navbar>
							</Col>
						</Row>

							{/* code for home page body section */}
						<Row style={{ minHeight: '95vh' }}>
							<Col
								style={{ transition: '1s ease-out' }}
								xs={menuWidth}
								sm={menuWidth}
								md={menuWidth}
								lg={menuWidth}
								xl={
									menuHandler ? menuWidth-2 : menuWidth - 1
								}
								className={`${styles.quantum_background}`}
							>
								{/* <div
									className={`ml-auto mr-auto mt-4 mb-3 align-content-center ${styles.menu_header}`}
									style={{color:'white'}}
								>
									Menu
								</div> */}
								<hr />
								{/* <div className="ml-2 mb-3 mt-4">
									<Button
										size="sm"
										id="expand-sidebar-button"
										className='border-white'
										variant={`${buttonVariant}`}
										onClick={() => {
											setHeights();
											dispatch({
												type: 'toggleSidebar',
												payload: { ...state },
											});
										}}
									>
										<FontAwesomeIcon
											icon={
												true
													? faCaretLeft
													: faCaretRight
											}
											size="lg"
											style={{
												color: 'white',
												width: '1.05vw',
											}}
										/>
									</Button>
									<Fade
										in={true}
										timeout={10000}
										style={{
											minHeight: true
												? '3vh'
												: '0vh',
											height: true
												? '3vh'
												: '0vh',
											transition: `${
												true ? '3' : '0.15'
											}s ease-in`,
										}}
									>
										<div
											className={`float-right mt-1 ${styles.nav_link} text-white`}
											onClick={() => {
												setHeights();
												dispatch({
													type: 'toggleSidebar',
													payload: { ...state },
												});
											}}
										>
											Collapse <ChevronRight />
										</div>
									</Fade>
								</div> */}
								<div
									className={`ml-2 mb-3 mt-4 d-flex ${styles.row_link}`}
                                    style={{justifyContent:'space-between'}}
									onClick={() => {
										
									}}
								>
									<a href='/dashboard'>
									<Button
										size="sm"
										id="expand-sidebar-button"
										className='border-white'
										variant={`${buttonVariant}`}
									>
										<FontAwesomeIcon
											icon={faHome}
											size="lg"
											style={{
												color: 'white',
												width: '1.05vw',
											}}
										/>
									</Button>
									</a>
									<Fade
										in={menuHandler}
										timeout={10000}
										style={{
											minHeight: menuHandler
												? '3vh'
												: '0vh',
											height: menuHandler
												? '3vh'
												: '0vh',
											transition: `${
												menuHandler ? '3' : '0.15'
											}s ease-in`,
										}}
									>
										
										<a href='/dashboard'>
										<div
											className={`float-right mt-1 ${styles.nav_link} text-white`}
										>
											{/* <a href='/dashboard'>Home</a> <ChevronRight /> */}
											Home <ChevronRight />
										</div>
										</a>
										
									</Fade>
								</div>
								{true ? (
									<>
										{/* Home slide bar Goals*/}
										<div
											className={`ml-2 mb-3 mt-4 d-flex ${styles.row_link}`}
                                            style={{justifyContent:'space-between'}}
											onClick={() => {
											}}
										>
											<a href='/goals'>
											<Button
												size="sm"
												className='border-white'
												variant={`${buttonVariant}`}
											>
												<FontAwesomeIcon
													icon={faTicketAlt}
													size="lg"
													style={{
														color: 'white',
														width: '1.05vw',
													}}
												/>
											</Button>
											</a>
											<Fade
												in={menuHandler}
												timeout={10000}
												style={{
													minHeight: menuHandler
														? '3vh'
														: '0vh',
													height: menuHandler
														? '3vh'
														: '0vh',
													transition: `${
														menuHandler
															? '3'
															: '0.15'
													}s ease-in`,
												}}
											>
												{/* <div
													className={`float-right mt-1 text-white`}
												>
													<Badge pill bg="danger">
														Goals
													</Badge>{' '}
													<ChevronRight />
												</div> */}
												<a href='/goals'>
												<div
													className={`float-right mt-1 ${styles.nav_link} text-white`}
												>
													Goals <ChevronRight />
												</div>
												</a>
											</Fade>
										</div>

										{/* Home slide bar Predictions*/}
										<div
											className="ml-2 mb-4 mt-4 d-flex"
                                            style={{justifyContent:'space-between'}}
											onClick={() => {
											}}
										>
											<Button
												size="sm"
												id="expand-sidebar-button"
												className='border-white'
												variant={`${buttonVariant}`}
											>
												<FontAwesomeIcon
													icon={faUsers}
													size="lg"
													style={{
														color: 'white',
														width: '1.05vw',
													}}
												/>
											</Button>
											<Fade
												in={menuHandler}
												timeout={10000}
												style={{
													minHeight: menuHandler
														? '3vh'
														: '0vh',
													height: menuHandler
														? '3vh'
														: '0vh',
													transition: `${
														menuHandler
															? '3'
															: '0.15'
													}s ease-in`,
												}}
												onClick={() => {
												}}
											>
												<div
													className={`float-right mt-1 ${styles.nav_link} text-white`}
												>
													Predictions <ChevronRight />
												</div>
											</Fade>
										</div>

										{/* Home slide bar Organization*/}
										<div
											className="ml-2 mb-4 mt-4 d-flex"
                                            style={{justifyContent:'space-between'}}
											onClick={() => {
											}}
										>
											<a href='/organization'>
											<Button
												size="sm"
												id="expand-sidebar-button"
												className='border-white'
												variant={`${buttonVariant}`}
											>
												
												<FontAwesomeIcon
													icon={faBuilding}
													size="lg"
													style={{
														color: 'white',
														width: '1.05vw',
													}}
												/>
												
												
											</Button>
											</a>
											<Fade
												in={menuHandler}
												timeout={10000}
												style={{
													minHeight: menuHandler
														? '3vh'
														: '0vh',
													height: menuHandler
														? '3vh'
														: '0vh',
													transition: `${
														menuHandler
															? '3'
															: '0.15'
													}s ease-in`,
												}}
												onClick={() => {
												}}
											>
												<a href="/organization">
												<div
													className={`float-right mt-1 ${styles.nav_link} text-white`}
												>
													Organization <ChevronRight />
												</div>
												</a>
											</Fade>
										</div>

										{/* Home slide bar Strategy*/}
										<div
											className="ml-2 mb-4 mt-4 d-flex"
                                            style={{justifyContent:'space-between'}}
											onClick={() => {
											}}
										>
											<a href='/strategy'>
											<Button
												size="sm"
												id="expand-sidebar-button"
												className='border-white'
												variant={`${buttonVariant}`}
											>
												<FontAwesomeIcon
													icon={faChess}
													size="lg"
													style={{
														color: 'white',
														width: '1.05vw',
													}}
												/>
											</Button>
											</a>

											<Fade
												in={menuHandler}
												timeout={10000}
												style={{
													minHeight: menuHandler
														? '3vh'
														: '0vh',
													height: menuHandler
														? '3vh'
														: '0vh',
													transition: `${
														menuHandler
															? '3'
															: '0.15'
													}s ease-in`,
												}}
												onClick={() => {
												}}
											>
												<a href='/strategy
'>
												<div
													className={`float-right mt-1 ${styles.nav_link} text-white`}
												>
													Strategy <ChevronRight />
												</div>
												</a>
											</Fade>
										</div>

										{/* Home slide bar Talent*/}
										<div
											className="ml-2 mb-4 mt-4 d-flex"
                                            style={{justifyContent:'space-between'}}
											onClick={() => {
											}}
										>
											<Button
												size="sm"
												id="expand-sidebar-button"
												className='border-white'
												variant={`${buttonVariant}`}
											>
												<FontAwesomeIcon
													icon={faUsers}
													size="lg"
													style={{
														color: 'white',
														width: '1.05vw',
													}}
												/>
											</Button>

											<Fade
												in={menuHandler}
												timeout={10000}
												style={{
													minHeight: menuHandler
														? '3vh'
														: '0vh',
													height: menuHandler
														? '3vh'
														: '0vh',
													transition: `${
														menuHandler
															? '3'
															: '0.15'
													}s ease-in`,
												}}
												onClick={() => {
												}}
											>
												<div
													className={`float-right mt-1 ${styles.nav_link} text-white`}
												>
													Talent <ChevronRight />
												</div>
											</Fade>
										</div>

										{/* Home slide bar Help*/}
										<div
											className="ml-2 mb-4 mt-4 d-flex"
                                            style={{justifyContent:'space-between'}}
											onClick={() => {
											}}
										>
											<Button
												size="sm"
												id="expand-sidebar-button"
												className='border-white'
												variant={`${buttonVariant}`}
											>
												<FontAwesomeIcon
													icon={faHandsHelping}
													size="lg"
													style={{
														color: 'white',
														width: '1.05vw',
													}}
												/>
											</Button>

											<Fade
												in={menuHandler}
												timeout={10000}
												style={{
													minHeight: menuHandler
														? '3vh'
														: '0vh',
													height: menuHandler
														? '3vh'
														: '0vh',
													transition: `${
														menuHandler
															? '3'
															: '0.15'
													}s ease-in`,
												}}
												onClick={() => {
												}}
											>
												<div
													className={`float-right mt-1 ${styles.nav_link} text-white`}
												>
													Help <ChevronRight />
												</div>
											</Fade>
										</div>

										{false ? (
											<div
												className="ml-2 mb-4 mt-4"
												onClick={() => {
												}}
											>
												<Button
													size="sm"
													id="expand-sidebar-button"
													className='border-white'
													variant={`${buttonVariant}`}
												>
													<FontAwesomeIcon
														icon={[
															'fas',
															'user-lock',
														]}
														size="lg"
														style={{
															color: 'white',
															width: '1.05vw',
														}}
													/>
												</Button>
												<Fade
													in={menuHandler}
													timeout={10000}
													style={{
														minHeight: menuHandler
															? '3vh'
															: '0vh',
														height: menuHandler
															? '3vh'
															: '0vh',
														transition: `${
															menuHandler
																? '3'
																: '0.15'
														}s ease-in`,
													}}
													onClick={() => {
													}}
												>
													<div
														className={`float-right mt-1 ${styles.nav_link} text-white`}
													>
														Super Admin{' '}
														<ChevronRight />
													</div>
												</Fade>
											</div>
										) : (
											''
										)}
									</>
								) : null}
							</Col>
							<Col
								className={menuHandler?"pt-0 pl-2 pr-2 mb-4 mt-0 col-10":"pt-0 pl-2 pr-2 mb-4 mt-0 col-11"}
								style={{
									textAlign: 'center',
									paddingTop: '0vh',
									transition: '1s ease-out',
                                    minHeight:'80vh'
									// ,
                                    // overflowY:'auto'
								}}
							>
								{children}
							</Col>
						</Row>
					</Col>
				</Row>
			</Container>
			{window.innerWidth < 992 && (
				<Container
					fluid
					className="d-flex flex-column justify-content-between d-lg-none"
				>
					<Row style={{ height: '20vh', width: '100vw' }}>
						<Navbar bg="light" fixed="top">
							<Container fluid>
								<Navbar.Toggle aria-controls="navbarScroll" />
								<Navbar.Collapse
									id="navbarScroll"
									className="justify-content-between"
								>
									<div>
										<Image
											src={projectLogo}
											rounded
											className="test-image"
											style={{
												height: '25px',
												width: '25px',
											}}
										/>{' '}
										QS Ticketing
									</div>
									<div>
										<Button>
											<FontAwesomeIcon
												icon={faBell}
												size="lg"
											/>
										</Button>
										<Button>
											<FontAwesomeIcon
												icon={faCog}
												size="lg"
												className="fa-spin"
											/>
										</Button>
										<img
											src={avatar}
											alt="Profile"
											className={`rounded-circle ${styles.profile_picture} `}
										/>
									</div>
								</Navbar.Collapse>
							</Container>
						</Navbar>
					</Row>
					<Row style={{ height: '65vh' }}>{children}</Row>
					<Row style={{ height: '15vh', width: '100vw' }}>
						{' '}
						<Navbar bg="light" fixed="bottom">
							<Container fluid>
								<Navbar.Toggle aria-controls="navbarScroll" />
								<Navbar.Collapse
									id="navbarScroll"
									className="justify-content-around"
								>
									<Nav navbarScroll>
										<div>
											<Button
												onClick={() => {
												}}
											>
												{' '}
												<FontAwesomeIcon
													icon={faHome}
												/>
											</Button>
											<Button
												onClick={() => {
												}}
											>
												{' '}
												<FontAwesomeIcon
													icon={faTicketAlt}
												/>
											</Button>
											{true ? (
												<>
													<Button
														onClick={() => {
														}}
													>
														{' '}
														<FontAwesomeIcon
															icon={faUsers}
														/>
													</Button>

													<Button
														onClick={() => {
														}}
													>
														{' '}
														<FontAwesomeIcon
															icon={faChartLine}
														/>
													</Button>
													<Button
														onClick={() => {
														}}
													>
														{' '}
														<FontAwesomeIcon
															icon={faUserCog}
														/>
													</Button>
													{true ? (
														<Button
															onClick={() => {
															}}
														>
															{' '}
															<FontAwesomeIcon
																icon={
																	faUserLock
																}
															/>
														</Button>
													) : (
														''
													)}
													<div className="ml-2 mb-4 mt-4">
														{/*<Button
															size="sm"
															id="expand-sidebar-button"
															variant={`${buttonVariant}`}
														>
															<FontAwesomeIcon
																icon={faUserCog}
																size="lg"
																style={{
																	color: 'white',
																	width: '1.05vw',
																}}
															/>
														</Button>

														<Fade
															in={true}
															timeout={10000}
															style={{
																minHeight:
																	true
																		? '3vh'
																		: '0vh',
																height: true
																	? '3vh'
																	: '0vh',
																transition: `${
																	true
																		? '3'
																		: '0.15'
																}s ease-in`,
															}}
															onClick={() => {
																adminTabClick(); //Required for enterprise selection modal
																navigate(
																	'/mainpage/admin',
																);
															}}
														>
															<div
																className={`float-right mt-1 ${styles.nav_link}`}
															>
																Admin{' '}
																<ChevronRight />
															</div>
														</Fade>*/}
													</div>
												</>
											) : null}
										</div>
									</Nav>
								</Navbar.Collapse>
							</Container>
						</Navbar>
					</Row>
				</Container>
			)}
		</>
	);
};

export default GeneralNavigationToolbarMenu;
