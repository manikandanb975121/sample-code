import React, { useEffect, useState } from 'react'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useNavigate, useLocation } from 'react-router-dom'
import { baseUrl } from '../config';
import Loginlogo from '../assets/images/logo.png';
import axios from 'axios';
import Paper from "@material-ui/core/Paper";
import { environment } from '../configs/environment';


const errorMsgStyle = {
    color: 'red',
    textAlign: 'center'
};

const successMsgStyle = {
    color: 'green',
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

export default function ResetPassword() {
    const navigate = useNavigate();
    const classes = useStyles();
    const [password, setPassword] = useState("");
    const [confpassword, setConfirmPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState('')
    const [successMsg, setSuccessMsg] = useState('')
    const [loader, setLoader] = useState(false)
    const search = useLocation().search;
    const LinkString = new URLSearchParams(search).get('_k');
    let LinkStringDecode = atob(LinkString);
    let tempSplit = LinkStringDecode.split('&');
    let userId = tempSplit[0]
    let globalUserId = tempSplit[1];
    let startTime = tempSplit[2];


    useEffect(() => {
        const currentTime = new Date().getTime();
        let diffInMin = Math.round((currentTime - startTime) / 60000);
        if (diffInMin > 300) {
            setErrorMsg('Link Expired')
        }
    }, []);

    const handleResetPassword = () => {


        setSuccessMsg('');
        setErrorMsg('')
        if (password == '') {
            setErrorMsg('Please enter password');
            return false;
        }
        if (password != confpassword) {
            setErrorMsg('Password and Confirm password must match');
            return false;
        }
        setLoader(true);
        axios.post(environment.baseAPIUrl + environment.endpoints.resetPassword,
            {
                password: password,
                userId: userId,
                globalUserId: globalUserId,
                startTime: startTime
            }).then(response => {

                if (response.data.result == true) {
                    setSuccessMsg(response.data.message)
                } else {
                    setErrorMsg(response.data.message);
                }
            }).catch(error => {
                setErrorMsg('Something went wrong');
            });
    }


    return (
        <React.Fragment>
            <Container component="main" maxWidth="xs">
                <CssBaseline />

                <Paper sx={{ boxShadow: "10px 10px 10px hotpink" }}>


                    <div className={classes.paper + " loginform"}>
                        <Avatar className={classes.avatar}>
                            {/* <LockOutlinedIcon /> */}
                            <img src={Loginlogo} alt="Logo" />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Reset Password
                        </Typography>
                        {errorMsg &&
                            <p style={errorMsgStyle}>{errorMsg}</p>
                        }
                        {successMsg &&
                            <p style={successMsgStyle}>{successMsg}</p>
                        }
                        <form className={classes.form} noValidate>
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

                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Confirm Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onChange={e => setConfirmPassword(e.target.value)}
                            />
                            <Button
                                type="button"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                onClick={handleResetPassword}
                            >
                                Send
                            </Button>

                        </form>
                    </div>
                </Paper>
            </Container>

        </React.Fragment>
    )
}