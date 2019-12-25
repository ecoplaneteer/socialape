import React, { useState, useEffect } from "react"

// Redux stuff
import { useSelector, useDispatch } from "react-redux"
import { editUserDetails } from "../../redux/actions/user"

// MUI stuff
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogTitle from "@material-ui/core/DialogTitle"

// Icons
import EditIcon from "@material-ui/icons/Edit"

import { makeStyles } from "@material-ui/core/styles"
import MyButton from "../../util/MyButton"

const useStyles = makeStyles(theme => ({
  ...theme.common,
  button: {
    float: "right"
  }
}))

const EditDetails = () => {
  const [open, setOpen] = useState(false)
  const [newCredentials, setNewCredentials] = useState({
    bio: "",
    website: "",
    location: ""
  })
  const dispatch = useDispatch()
  const credentials = useSelector(state => state.user.credentials)
  const classes = useStyles()

  useEffect(() => {
    mapUserDetailsToState()
    // eslint-disable-next-line
  }, [])

  const mapUserDetailsToState = () => {
    setNewCredentials({
      bio: credentials.bio || "",
      website: credentials.website || "",
      location: credentials.location || ""
    })
  }
  const handleOpen = () => {
    setOpen(true)
    mapUserDetailsToState()
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleChange = event => {
    const newCredential = { [event.target.name]: event.target.value }
    setNewCredentials(prev => ({
      ...prev,
      ...newCredential
    }))
  }

  const handleSubmit = () => {
    dispatch(editUserDetails(newCredentials))
    handleClose()
  }

  return (
    <>
      <MyButton
        tip="Edit details"
        onClick={handleOpen}
        btnClassName={classes.button}
      >
        <EditIcon color="primary" />
      </MyButton>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Edit your details</DialogTitle>
        <DialogContent>
          <form>
            <TextField
              className={classes.textField}
              name="bio"
              label="Bio"
              multiline
              rows="3"
              placeholder="A short bio about yourself"
              value={newCredentials.bio}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              className={classes.textField}
              name="website"
              label="Website"
              placeholder="Your personal/professional website"
              value={newCredentials.website}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              className={classes.textField}
              name="location"
              label="Location"
              placeholder="Where you live"
              value={newCredentials.location}
              onChange={handleChange}
              fullWidth
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default EditDetails
