import React, { useEffect, useState } from 'react'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Link, useNavigate } from 'react-router-dom'
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

export default function Forgotpassword() {
    const navigate = useNavigate();
    const classes = useStyles();
    const [email, setEmail] = useState("");
    const [errorMsg, setErrorMsg] = useState('')
    const [successMsg, setSuccessMsg] = useState('')
    const [loader, setLoader] = useState(false)

    const handleForgotPassword = () => {

        setSuccessMsg('');
        setErrorMsg('')
        if (email === '') {
            setErrorMsg('Please enter email');
        } else {
            setLoader(true);
            axios.post(environment.baseAPIUrl + environment.endpoints.forgotPassword, { email: email }).then(response => {
                if (response.data.result == true) {
                    setSuccessMsg(response.data.message)
                } else {
                    setErrorMsg(response.data.message);
                }
            }).catch(error => {
                console.log(error)
                setErrorMsg('Something went wrong');

            });
        }

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
                            Forgot Password
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
                                id="email"
                                label="Email"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                onChange={e => setEmail(e.target.value)}
                            />
                            <Button
                                type="button"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                onClick={handleForgotPassword}
                            >
                                Send
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <Link to="/" variant="body2">
                                        Already have an account?
                                    </Link>
                                </Grid>
                            </Grid>
                        </form>
                    </div>
                </Paper>
            </Container>

        </React.Fragment>
    )
}