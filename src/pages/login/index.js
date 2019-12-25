import React, { useState } from "react"
import { Link, useHistory } from "react-router-dom"
import AppIcon from "../../images/icon.png"

// Redux stuff
import { useDispatch, useSelector } from "react-redux"
import { loginUser } from "../../redux/actions/user"

// MUI stuff
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import CircularProgress from "@material-ui/core/CircularProgress"

import useStyles from "./styles"

const Login = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { loading, errors } = useSelector(state => state.UI)

  const [credentials, setCredentials] = useState({
    email: "",
    password: ""
  })
  const classes = useStyles()

  const handleSubmit = event => {
    event.preventDefault()
    dispatch(loginUser(credentials, history))
  }

  const handleChange = event => {
    const newCredential = { [event.target.name]: event.target.value }

    setCredentials(prev => ({
      ...prev,
      ...newCredential
    }))
  }

  return (
    <Grid container className={classes.form}>
      <Grid item sm />
      <Grid item sm>
        <img className={classes.image} src={AppIcon} alt="monkey" />
        <Typography className={classes.pageTitle} variant="h2">
          Login
        </Typography>
        <form noValidate onSubmit={handleSubmit}>
          <TextField
            className={classes.textField}
            id="email"
            name="email"
            type="email"
            label="email"
            value={credentials.email}
            helperText={errors.email}
            error={errors.email ? true : false}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            className={classes.textField}
            id="password"
            name="password"
            type="password"
            label="password"
            value={credentials.password}
            helperText={errors.password}
            error={errors.password ? true : false}
            onChange={handleChange}
            fullWidth
          />
          {errors.general && (
            <Typography className={classes.customError} variant="body2">
              {errors.general}
            </Typography>
          )}
          <Button
            className={classes.button}
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading}
          >
            Login
            {loading && (
              <CircularProgress className={classes.progress} size={20} />
            )}
          </Button>
          <br />
          <small>
            don't have an account? sign up <Link to="/signup">here</Link>
          </small>
        </form>
      </Grid>
      <Grid item sm />
    </Grid>
  )
}

export default Login
