import React from "react"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"
import dayjs from "dayjs"

// MUI stuff
import { makeStyles } from "@material-ui/core/styles"
import MuiLink from "@material-ui/core/Link"
import Typography from "@material-ui/core/Typography"
import Paper from "@material-ui/core/Paper"

// Icons
import LocationOn from "@material-ui/icons/LocationOn"
import LinkIcon from "@material-ui/icons/Link"
import CalendarToday from "@material-ui/icons/CalendarToday"
// Styles

const useStyles = makeStyles(theme => ({
  ...theme.common
}))

const StaticProfile = ({ profile }) => {
  const classes = useStyles()

  const { handle, createdAt, imageUrl, bio, website, location } = profile

  let profileMarkup = (
    <Paper className={classes.paper}>
      <div className={classes.profile}>
        <div className="image-wrapper">
          <img className="profile-image" src={imageUrl} alt="profile" />
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
      </div>
    </Paper>
  )

  return profileMarkup
}

StaticProfile.propTypes = {
  profile: PropTypes.object.isRequired
}

export default StaticProfile
