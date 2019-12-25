import { makeStyles } from "@material-ui/core/styles"

export default makeStyles(theme => ({
  ...theme.common,
  customError: {
    color: "red",
    fontSize: "0.8rem",
    marginTop: 10
  }
}))
