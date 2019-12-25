import {
  SET_SCREAMS,
  LIKE_SCREAM,
  UNLIKE_SCREAM,
  LOADING_DATA,
  DELETE_SCREAM,
  POST_SCREAM,
  SET_SCREAM,
  SUBMIT_COMMENT
} from "../types"

const initialState = {
  screams: [],
  scream: {
    screamId: null,
    comments: []
  },
  loading: false
}

export default (state = initialState, action) => {
  let index
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true
      }

    case SET_SCREAMS:
      return {
        ...state,
        screams: action.payload,
        loading: false
      }

    case SET_SCREAM:
      return {
        ...state,
        scream: action.payload
      }

    case POST_SCREAM:
      return {
        ...state,
        screams: [action.payload, ...state.screams]
      }

    case LIKE_SCREAM:
    case UNLIKE_SCREAM:
      index = state.screams.findIndex(
        scream => scream.screamId === action.payload.screamId
      )
      state.screams[index] = action.payload
      if (state.scream.screamId === action.payload.screamId) {
        state.scream = {
          ...action.payload,
          comments: []
        }
      }
      return {
        ...state
      }

    case DELETE_SCREAM:
      index = state.screams.findIndex(
        scream => scream.screamId === action.payload
      )
      state.screams.splice(index, 1)
      return { ...state }

    case SUBMIT_COMMENT:
      index = state.screams.findIndex(
        scream => scream.screamId === action.payload.screamId
      )
      state.screams[index].commentCount++
      return {
        ...state,
        scream: {
          ...state.scream,
          commentCount: state.scream.commentCount + 1,
          comments: [action.payload, ...state.scream.comments]
        }
      }

    default:
      return state
  }
}
