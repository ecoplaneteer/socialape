import React from "react"
import { Link } from "react-router-dom"
import dayjs from "dayjs"

// Component
import EditDetails from "./EditDetails"

// Redux
import { useSelector, useDispatch } from "react-redux"
import { logoutUser, uploadImage } from "../../redux/actions/user"

// Component
import MyButton from "../../util/MyButton"
import ProfileSkeleton from "../../util/ProfileSkeleton"

// MUI stuff
import { makeStyles } from "@material-ui/core/styles"
import Button from "@material-ui/core/Button"
import MuiLink from "@material-ui/core/Link"
import Typography from "@material-ui/core/Typography"
import Paper from "@material-ui/core/Paper"

// Icons
import LocationOn from "@material-ui/icons/LocationOn"
import LinkIcon from "@material-ui/icons/Link"
import CalendarToday from "@material-ui/icons/CalendarToday"
import EditIcon from "@material-ui/icons/Edit"
import KeyboardReturn from "@material-ui/icons/KeyboardReturn"
// Styles

const useStyles = makeStyles(theme => ({
  ...theme.common
}))

const Profile = () => {
  const dispatch = useDispatch()
  const classes = useStyles()

  const {
    authenticated,
    loading,
    credentials: { handle, createdAt, imageUrl, bio, website, location }
  } = useSelector(state => state.user)

  const handleImageChange = event => {
    const image = event.target.files[0]
    // send to server
    const formData = new FormData()
    formData.append("image", image, image.name)

    dispatch(uploadImage(formData))
  }

  const handleEditPicture = () => {
    const fileInput = document.getElementById("imageInput")
    fileInput.click()
  }

  const handleLogout = () => {
    dispatch(logoutUser())
  }

  let profileMarkup = !loading ? (
    authenticated ? (
      <Paper className={classes.paper}>
        <div className={classes.profile}>
          <div className="image-wrapper">
            <img className="profile-image" src={imageUrl} alt="profile" />
            <input
              type="file"
              id="imageInput"
              hidden="hidden"
              onChange={handleImageChange}
            />
            <MyButton
              tip="Edit profile picture"
              onClick={handleEditPicture}
              btnClassName={classes.button}
            >
              <EditIcon color="primary" />
            </MyButton>
          </div>
          <hr />
          <div className="profile-details">
            <MuiLink
              component={Link}
              to={`/users/${handle}`}
              color="primary"
              variant="h5"
            >
              @{handle}
            </MuiLink>
            <hr />
            {bio && <Typography variant="body2">{bio}</Typography>}
            <hr />
            {location && (
              <>
                <LocationOn color="primary" /> <span>{location}</span>
                <hr />
              </>
            )}
            {website && (
              <>
                <LinkIcon color="primary" />
                <a href={website} target="_blank" rel="noopener noreferrer">
                  {" "}
                  {website}
                </a>
                <hr />
              </>
            )}
            <CalendarToday color="primary" />
            <span>Joined {dayjs(createdAt).format("MMM YYYY")}</span>
          </div>
          <MyButton tip="Logout" onClick={handleLogout}>
            <KeyboardReturn color="primary" />
          </MyButton>
          <EditDetails />
        </div>
      </Paper>
    ) : (
      <Paper className={classes.paper}>
        <Typography variant="body2" align="center">
          No profile found, please login again
        </Typography>
        <div className={classes.buttons}>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/login"
          >
            Login
          </Button>
          <Button
            variant="contained"
            color="secondary"
            component={Link}
            to="/signup"
          >
            Signup
          </Button>
        </div>
      </Paper>
    )
  ) : (
    <ProfileSkeleton />
  )
  return profileMarkup
}

export default Profile
