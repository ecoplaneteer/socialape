import React, { useState, useEffect } from "react"

// Redux
import { useSelector, useDispatch } from "react-redux"
import { postScream, clearErrors } from "../../redux/actions/data"

// Components
import MyButton from "../../util/MyButton"

// MUI stuff
import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"
import Dialog from "@material-ui/core/Dialog"
import DialogTitle from "@material-ui/core/DialogTitle"
import DialogContent from "@material-ui/core/DialogContent"
import CircularProgress from "@material-ui/core/CircularProgress"

// Icons
import AddIcon from "@material-ui/icons/Add"
import CloseIcon from "@material-ui/icons/Close"

// Styles
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles(theme => ({
  ...theme.common,
  submitButton: {
    position: "relative",
    float: "right",
    marginTop: 10
  },
  closeButton: {
    position: "absolute",
    left: "91%",
    top: "6%"
  }
}))

const PostScream = () => {
  const [open, setOpen] = useState(false)
  const [body, setBody] = useState("")

  const dispatch = useDispatch()
  const { loading, errors } = useSelector(state => state.UI)

  const classes = useStyles()

  useEffect(() => {
    if (open && !loading && Object.keys(errors).length === 0) {
      setBody("")
      setOpen(false)
    }
    // eslint-disable-next-line
  }, [loading, errors])

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    dispatch(clearErrors())
    setBody("")
    setOpen(false)
  }

  const handleChange = event => {
    setBody(event.target.value)
  }

  const handleSubmit = event => {
    event.preventDefault()
    dispatch(postScream({ body }))
  }

  return (
    <>
      <MyButton tip="Post a Scream!" onClick={handleOpen}>
        <AddIcon />
      </MyButton>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <MyButton
          tip="Close"
          onClick={handleClose}
          tipClassName={classes.closeButton}
        >
          <CloseIcon />
        </MyButton>
        <DialogTitle>Post a new scream</DialogTitle>
        <DialogContent>
          <form>
            <TextField
              className={classes.textField}
              name="body"
              label="SCREAM!"
              multiline
              rows="3"
              placeholder="Scream at your fellow apes"
              value={body}
              onChange={handleChange}
              error={errors.body ? true : false}
              helperText={errors.body}
              fullWidth
            />
            <Button
              className={classes.submitButton}
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              disabled={loading}
            >
              Submit
              {loading && (
                <CircularProgress className={classes.progress} size={20} />
              )}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default PostScream
