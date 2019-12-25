import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { Link, useHistory } from "react-router-dom"
// Redux
import { useSelector, useDispatch } from "react-redux"
import { getScream, clearErrors } from "../../redux/actions/data"

// Components
import MyButton from "../../util/MyButton"
import LikeButton from "./LikeButton"
import Comments from "./Comments"
import CommentForm from "./CommentForm"

// MUI stuff
import Dialog from "@material-ui/core/Dialog"
import DialogContent from "@material-ui/core/DialogContent"
import CircularProgress from "@material-ui/core/CircularProgress"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"

// Icons
import CloseIcon from "@material-ui/icons/Close"
import UnFoldMoreIcon from "@material-ui/icons/UnfoldMore"
import ChatIcon from "@material-ui/icons/Chat"

// Styles
import { makeStyles } from "@material-ui/core/styles"

import dayjs from "dayjs"

const useStyles = makeStyles(theme => ({
  ...theme.common,
  profileImage: {
    maxWidth: 200,
    height: 200,
    borderRadius: "50%",
    objectFit: "cover"
  },
  dialogContent: {
    padding: 20
  },
  closeButton: {
    position: "absolute",
    left: "90%"
  },
  expandButton: {
    position: "absolute",
    left: "90%"
  },
  spinnerDiv: {
    textAlign: "center",
    marginTop: 50,
    marginBottom: 50
  }
}))

const ScreamDialog = ({ screamId, userHandle, openDialog }) => {
  const [open, setOpen] = useState(false)
  const [oldPath, setOldPath] = useState("")
  const [newPath, setNewPath] = useState("")

  const dispatch = useDispatch()
  const scream = useSelector(state => state.data.scream)
  const loading = useSelector(state => state.UI.loading)

  const classes = useStyles()

  useEffect(() => {
    if (openDialog) {
      handleOpen()
    }
    // eslint-disable-next-line
  }, [])

  const handleOpen = () => {
    let _oldPath = window.location.pathname
    let _newPath = `/users/${userHandle}/scream/${screamId}`

    if (_oldPath === _newPath) {
      _oldPath = `/users/${userHandle}`
    }

    window.history.pushState(null, null, _newPath)
    setOldPath(_oldPath)
    setNewPath(_newPath)
    setOpen(true)
    dispatch(getScream(screamId))
  }

  const handleClose = () => {
    window.history.pushState(null, null, oldPath)
    setOpen(false)
    dispatch(clearErrors())
  }

  const dialogMarkup = loading ? (
    <div className={classes.spinnerDiv}>
      <CircularProgress size={200} thickness={2} />
    </div>
  ) : (
    <Grid container spacing={1}>
      <Grid item sm={5}>
        <img
          src={scream.userImage}
          alt="Profile"
          className={classes.profileImage}
        />
      </Grid>
      <Grid item sm={7}>
        <Typography
          component={Link}
          color="primary"
          variant="h5"
          to={`/users/${scream.userHandle}`}
        >
          @{userHandle}
        </Typography>
        <hr className={classes.invisibleSeparator} />
        <Typography variant="body2" color="textSecondary">
          {dayjs(scream.createdAt).format("h:mm a, MMMM DD YYYY")}
        </Typography>
        <hr className={classes.invisibleSeparator} />
        <Typography variant="body1">{scream.body}</Typography>
        <LikeButton screamId={screamId} />
        <span>{scream.likeCount} likes</span>
        <MyButton tip="comments">
          <ChatIcon color="primary" />
        </MyButton>
        <span>{scream.commentCount} comments</span>
      </Grid>
      <hr className={classes.visibleSeparator} />
      <CommentForm screamId={screamId} />
      <Comments comments={scream.comments} />
    </Grid>
  )

  return (
    <>
      <MyButton
        tip="Expand scream"
        onClick={handleOpen}
        tipClassName={classes.expandButton}
      >
        <UnFoldMoreIcon color="primary" />
      </MyButton>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <MyButton
          tip="Close"
          onClick={handleClose}
          tipClassName={classes.closeButton}
        >
          <CloseIcon />
        </MyButton>
        <DialogContent className={classes.dialogContent}>
          {dialogMarkup}
        </DialogContent>
      </Dialog>
    </>
  )
}

ScreamDialog.propTypes = {
  screamId: PropTypes.string.isRequired,
  userHandle: PropTypes.string.isRequired,
  openDialog: PropTypes.bool
}

export default ScreamDialog
