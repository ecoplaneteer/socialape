import React from "react"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"

// Redux
import { useSelector } from "react-redux"

// Components
import MyButton from "../../util/MyButton"
import DeleteScream from "./DeleteScream"
import ScreamDialog from "./ScreamDialog"
import LikeButton from "./LikeButton"

// MUI stuff
import { makeStyles } from "@material-ui/core/styles"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import CardMedia from "@material-ui/core/CardMedia"
import Typography from "@material-ui/core/Typography"

// Icons
import ChatIcon from "@material-ui/icons/Chat"

import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"

// Styles
const useStyles = makeStyles(theme => ({
  card: {
    position: "relative",
    display: "flex",
    marginBottom: 20
  },
  image: {
    minWidth: 200,
    objectFit: "cover"
  },
  content: {
    padding: 25
  }
}))

const Scream = ({ scream, openDialog }) => {
  const {
    authenticated,
    credentials: { handle }
  } = useSelector(state => state.user)
  const classes = useStyles()

  dayjs.extend(relativeTime)

  const deleteButton =
    authenticated && scream.userHandle === handle ? (
      <DeleteScream screamId={scream.screamId} />
    ) : null

  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.image}
        image={scream.userImage}
        title="Profile image"
      />
      <CardContent className={classes.content}>
        <Typography
          variant="h5"
          component={Link}
          to={`/users/${scream.userHandle}`}
          color="primary"
        >
          {scream.userHandle}
        </Typography>
        {deleteButton}
        <Typography variant="body2" color="textSecondary">
          {dayjs(scream.createdAt).fromNow()}
        </Typography>
        <Typography variant="body1">{scream.body}</Typography>
        <LikeButton screamId={scream.screamId} />
        <span>{scream.likeCount} Likes</span>
        <MyButton tip="comments">
          <ChatIcon color="primary" />
        </MyButton>
        <span>{scream.commentCount} comments</span>
        <ScreamDialog
          screamId={scream.screamId}
          userHandle={scream.userHandle}
          openDialog={openDialog}
        />
      </CardContent>
    </Card>
  )
}

Scream.propTypes = {
  scream: PropTypes.object.isRequired,
  openDialog: PropTypes.bool
}

export default Scream
