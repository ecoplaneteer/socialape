import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"

// Redux
import { useDispatch, useSelector } from "react-redux"
import { submitComment } from "../../redux/actions/data"

// MUI stuff
import { makeStyles } from "@material-ui/core/styles"
import Grid from "@material-ui/core/Grid"
import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"

const useStyles = makeStyles(theme => ({
  ...theme.common
}))

const CommentForm = ({ screamId }) => {
  const [body, setBody] = useState("")
  const dispatch = useDispatch()
  const { loading, errors } = useSelector(state => state.UI)
  const authenticated = useSelector(state => state.user.authenticated)
  const classes = useStyles()

  useEffect(() => {
    if (!loading && Object.keys(errors).length === 0) {
      setBody("")
    }
    // eslint-disable-next-line
  }, [loading, errors])

  const handleChange = event => {
    if (event.target.name === "body") {
      setBody(event.target.value)
    }
  }
  const handleSubmit = event => {
    event.preventDefault()
    dispatch(submitComment(screamId, { body }))
  }

  const commentFormMarkup = authenticated ? (
    <Grid item sm={12} style={{ textAlign: "center" }}>
      <form onSubmit={handleSubmit}>
        <TextField
          name="body"
          type="text"
          label="Comment on scream"
          value={body}
          error={errors.comment ? true : false}
          helperText={errors.comment}
          onChange={handleChange}
          fullWidth
          className={classes.textField}
        />
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
      <hr className={classes.visibleSeparator} />
    </Grid>
  ) : null

  return commentFormMarkup
}

CommentForm.propTypes = {
  screamId: PropTypes.string.isRequired
}

export default CommentForm
