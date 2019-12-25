import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"

// Components
import Scream from "../../components/scream/Scream"
import StaticProfile from "../../components/profile/StaticProfile"
import ScreamSkeleton from "../../util/ScreamSkeleton"
import ProfileSkeleton from "../../util/ProfileSkeleton"

// Redux
import { useSelector, useDispatch } from "react-redux"
import { getUserData } from "../../redux/actions/data"

// MUI stuff
import Grid from "@material-ui/core/Grid"

import axios from "axios"

export default () => {
  const [profile, setProfile] = useState({})
  const [screamIdParam, setScreamIdParam] = useState(null)

  const dispatch = useDispatch()
  const { handle, screamId } = useParams()
  const { loading, screams } = useSelector(state => state.data)

  useEffect(() => {
    if (screamId) {
      setScreamIdParam(screamId)
    }

    dispatch(getUserData(handle))
    axios
      .get(`/user/${handle}`)
      .then(res => {
        setProfile(res.data.user)
      })
      .catch(err => console.error(err))
    // eslint-disable-next-line
  }, [])

  let recentScreamsMarkup = loading ? (
    <ScreamSkeleton />
  ) : screams === null ? (
    <p>No screams from this user</p>
  ) : !screamIdParam ? (
    screams.map(scream => <Scream key={scream.screamId} scream={scream} />)
  ) : (
    screams.map(scream => {
      if (scream.screamId !== screamIdParam) {
        return <Scream key={scream.screamId} scream={scream} />
      } else {
        return <Scream key={scream.screamId} scream={scream} openDialog />
      }
    })
  )

  return (
    <Grid container spacing={2}>
      <Grid item sm={8} xs={12}>
        {recentScreamsMarkup}
      </Grid>
      <Grid item sm={4} xs={12}>
        {profile === null ? (
          <ProfileSkeleton />
        ) : (
          <StaticProfile profile={profile} />
        )}
      </Grid>
    </Grid>
  )
}
