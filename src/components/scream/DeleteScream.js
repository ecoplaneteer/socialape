import React, { useState } from "react"
import PropTypes from "prop-types"

// Redux
import { useDispatch } from "react-redux"
import { deleteScream } from "../../redux/actions/data"

// MUI stuff
import Button from "@material-ui/core/Button"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogTitle from "@material-ui/core/DialogTitle"

// Icons
import DeleteOutline from "@material-ui/icons/DeleteOutline"

import { makeStyles } from "@material-ui/core/styles"
import MyButton from "../../util/MyButton"

const useStyles = makeStyles(theme => ({
  deleteButton: {
    position: "absolute",
    left: "90%",
    top: "10%"
  }
}))

const DeleteScream = ({ screamId }) => {
  const [open, setOpen] = useState(false)
  const dispatch = useDispatch()
  const classes = useStyles()

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleDeleteScream = () => {
    dispatch(deleteScream(screamId))
    setOpen(false)
  }

  return (
    <>
      <MyButton
        tip="Delete Scream"
        onClick={handleOpen}
        btnClassName={classes.deleteButton}
      >
        <DeleteOutline color="secondary" />
      </MyButton>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Are you sure you want to delete this scream?</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteScream} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

DeleteScream.propTypes = {
  screamId: PropTypes.string.isRequired
}

export default DeleteScream
