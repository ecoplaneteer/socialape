import React from "react"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"

// Redux
import { useDispatch, useSelector } from "react-redux"
import { likeScream, unlikeScream } from "../../redux/actions/data"

// Components
import MyButton from "../../util/MyButton"

// Icons
import FavoriteIcon from "@material-ui/icons/Favorite"
import FavoriteBorder from "@material-ui/icons/FavoriteBorder"

const LikeButton = ({ screamId }) => {
  const dispatch = useDispatch()
  const { authenticated, likes } = useSelector(state => state.user)

  const likedScream = () => {
    if (likes && likes.find(like => like.screamId === screamId)) {
      return true
    }
    return false
  }

  const handleLikeScream = () => {
    dispatch(likeScream(screamId))
  }

  const handleUnlikeScream = () => {
    dispatch(unlikeScream(screamId))
  }

  return !authenticated ? (
    <Link to="/login">
      <MyButton tip="like">
        <FavoriteBorder color="primary" />
      </MyButton>
    </Link>
  ) : likedScream() ? (
    <MyButton tip="Undo like" onClick={handleUnlikeScream}>
      <FavoriteIcon color="primary" />
    </MyButton>
  ) : (
    <MyButton tip="Like" onClick={handleLikeScream}>
      <FavoriteBorder color="primary" />
    </MyButton>
  )
}

LikeButton.propTypes = {
  screamId: PropTypes.string.isRequired
}

export default LikeButton
