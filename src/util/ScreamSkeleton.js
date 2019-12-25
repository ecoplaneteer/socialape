import React from "react"
import NoImg from "../images/no-img.png"

// MUI stuff
import Card from "@material-ui/core/Card"
import CardMedia from "@material-ui/core/CardMedia"
import CardContent from "@material-ui/core/CardContent"
import Skeleton from "@material-ui/lab/Skeleton"

import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles(theme => ({
  ...theme.common,
  card: {
    display: "flex",
    marginBottom: 20
  },
  cardContent: {
    width: "100%",
    flexDirection: "column",
    padding: 25
  },
  cover: {
    minWidth: 200,
    objectFit: "cover"
  }
}))

const ScreamSkeleton = () => {
  const classes = useStyles()

  const content = Array.from({ length: 5 }).map((item, index) => (
    <Card className={classes.card} key={index}>
      <CardMedia className={classes.cover} image={NoImg} />
      <CardContent className={classes.cardContent}>
        <Skeleton variant="text" width={60} height={18} />
        <Skeleton variant="text" width={100} height={14} />
        <Skeleton variant="text" width={"90%"} height={15} />
        <Skeleton variant="text" width={"90%"} height={15} />
        <Skeleton variant="text" width={"50%"} height={15} />
      </CardContent>
    </Card>
  ))
  return <>{content}</>
}

export default ScreamSkeleton
