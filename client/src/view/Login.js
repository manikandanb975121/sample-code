import React, { useEffect, useState } from 'react'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Link, Redirect, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";

import { LoginPage } from "../action";
import Loginlogo from '../assets/images/logo.png';
import axios from 'axios';
import Paper from "@material-ui/core/Paper";
import Loader from './common/Loader';
import { environment } from '../configs/environment';

const errorMsgStyle = {
    color: 'red',
    textAlign: 'center'
};

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(12),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        height: "86px",
        width: "100px",
        background: "#ffffff"
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
        padding: "0px 30px 30px 30px"
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        backgroundColor: "#009FDF"
    },
}));

export default function Login() {
    const navigate = useNavigate();
    const classes = useStyles();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginMsg, setLoginMsg] = useState('')
    const [loader, setLoader] = useState(false)

    const auth = useSelector(state => state.auth);
    const couponData = useSelector(state => state)
    const dispatch = useDispatch();


    const handleLogin = () => {

        if (email === '' || password === '') {
            setLoginMsg('Please input the valid credentials');
        } else {
            setLoader(true);
            axios.post(environment.baseAPIUrl + environment.endpoints.login,
                {
                    email: email,
                    password: password

                }).then(response => {
                    dispatch(LoginPage(response.data));
                    if (response.data.result !== undefined) {
                        navigate('/dashboard');
                    } else {
                        setLoginMsg(response.data.message);
                    }
                    setLoader(false);

                }).catch(error => {
                    setLoader(false);
                    setLoginMsg(error?.response?.data?.message ?? 'Something went wrong');

                });
        }

    }


    return (
        <React.Fragment>


            <Loader loading={loader} />

            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Paper sx={{ boxShadow: "10px 10px 10px hotpink" }}>
                    <div className={classes.paper + " loginform"}>
                        <Avatar className={classes.avatar}>
                            {/* <LockOutlinedIcon /> */}
                            <img src={Loginlogo} alt="Logo" />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <form className={classes.form} noValidate>
                            <p style={errorMsgStyle}>{loginMsg}</p>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                type="email"
                                onChange={e => setEmail(e.target.value)}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onChange={e => setPassword(e.target.value)}
                            />

                            <Button
                                type="button"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                onClick={handleLogin}
                            >
                                Sign In
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <Link to="forgot-password" variant="body2">
                                        Lost your password?
                                    </Link>
                                </Grid>
                                {/* <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid> */}
                            </Grid>
                        </form>
                    </div>
                </Paper>
            </Container>



            {/* <div className="hold-transition1 login-page">
		
    <div className="ember-view" id="ember3">
   <div className="Auth primary-background-color">
      
      <div className="Auth-container">
         <div className="Auth-paper">
         <p style={errorMsgStyle}>{loginMsg}</p>
            <img className="Auth-logo" src="%PUBLIC_URL%/images/logo.png" alt="Khorus. Align. Engage. Predict." />
            <form id="ember5" className="Auth-form clearfix ember-view">
               <md-input-container id="ember6" className="md-block email md-default-theme md-input-has-value ember-view lablesignin">
                  <label for="input-ember6">Email</label>
                  <input className="md-input   ng-dirty" id="input-ember6" aria-describedby="ember6-char-count ember6-error-messages" type="email"
                  onChange={e => setEmail(e.target.value)} 
                  />
                  <div className="md-errors-spacer" id="ember6-char-count">
                  </div>
               </md-input-container>
               <br>
               </br>
               <br>
               </br>
               
               <md-input-container id="ember7" className="md-block password md-default-theme md-input-has-value ember-view lablesignin">
                  <label for="input-ember7">Password</label>
                  <input className="md-input   ng-dirty" id="input-ember7" aria-describedby="ember7-char-count ember7-error-messages" type="password"
                  onChange={e => setPassword(e.target.value)} 
                  />
                  <div className="md-errors-spacer" id="ember7-char-count">
                  <div className="md-ripple-container">
        
         </div>
                     
                  </div>
               </md-input-container> 

               <button 
          type="button" 
          className=""
          onClick={handleLogin}
          >Login
          </button>
            </form>
            <div className="errors">
            </div>
            <ul className="Auth-links">
               <li>
                  <a href="logins/password/new" title="Lost your passsword?" className="accent-color">Lost your password?</a>
               </li> 
            </ul>
         </div>
      </div>
   </div>
</div>		
</div> */}

        </React.Fragment>
    )
}