import React from "react"
import NoImg from "../images/no-img.png"

// MUI stuff
import Paper from "@material-ui/core/Paper"
import Skeleton from "@material-ui/lab/Skeleton"

import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles(theme => ({
  ...theme.common,
  skeleton: {
    marginLeft: "auto",
    marginRight: "auto"
  }
}))

const ProfileSkeleton = () => {
  const classes = useStyles()

  return (
    <Paper className={classes.paper}>
      <div className={classes.profile}>
        <div className="image-wrapper">
          <img className="profile-image" src={NoImg} alt="profile" />
        </div>
        <hr />
        <div className="profile-details">
          <Skeleton className={classes.skeleton} variant="text" width="50%" />
          <hr />
          <Skeleton className={classes.skeleton} variant="text" />
          <hr />
          <Skeleton className={classes.skeleton} variant="text" width="30%"/>
          <Skeleton className={classes.skeleton} variant="text" width="70%"/>
          <Skeleton className={classes.skeleton} variant="text" width="60%" />
        </div>
      </div>
    </Paper>
  )
}

export default ProfileSkeleton
