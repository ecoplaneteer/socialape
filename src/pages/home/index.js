import React, { useEffect } from "react"
import Grid from "@material-ui/core/Grid"

// Component
import Scream from "../../components/scream/Scream"
import Profile from "../../components/profile/Profile"
import ScreamSkeleton from "../../util/ScreamSkeleton"

// Redux
import { useSelector, useDispatch } from "react-redux"
import { getScreams } from "../../redux/actions/data"

export default () => {
  const dispatch = useDispatch()
  const { loading, screams } = useSelector(state => state.data)
  useEffect(() => {
    dispatch(getScreams())
    // eslint-disable-next-line
  }, [])

  let recentScreamsMarkup = !loading ? (
    screams.map(scream => <Scream key={scream.screamId} scream={scream} />)
  ) : (
    <ScreamSkeleton />
  )

  return (
    <Grid container spacing={2}>
      <Grid item sm={8} xs={12}>
        {recentScreamsMarkup}
      </Grid>
      <Grid item sm={4} xs={12}>
        <Profile />
      </Grid>
    </Grid>
  )
}
