import React from "react"
import { Link } from "react-router-dom"

// Redux
import { useSelector } from "react-redux"

// Component
import MyButton from "../../util/MyButton"
import PostScream from "../scream/PostScream"
import Notifications from "./Notifications"

// MUI stuff
import { makeStyles } from "@material-ui/core/styles"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Button from "@material-ui/core/Button"

// Icons
import HomeIcon from "@material-ui/icons/Home"
// Styles

const useStyles = makeStyles(theme => ({
  navContainer: {
    margin: "auto",
    "& svg": {
      color: "#fff"
    }
  }
}))

export default () => {
  const authenticated = useSelector(state => state.user.authenticated)
  const classes = useStyles()

  return (
    <AppBar>
      <Toolbar className={classes.navContainer}>
        {authenticated ? (
          <>
            <PostScream />
            <Link to="/">
              <MyButton tip="Home">
                <HomeIcon />
              </MyButton>
            </Link>
            <Notifications />
          </>
        ) : (
          <>
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
            <Button color="inherit" component={Link} to="/">
              Home
            </Button>
            <Button color="inherit" component={Link} to="/signup">
              Signup
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  )
}
