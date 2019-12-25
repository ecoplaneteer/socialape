import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"

// Redux
import { markNotificationsRead } from "../../redux/actions/user"

// MUI stuff
import Menu from "@material-ui/core/Menu"
import MenuItem from "@material-ui/core/MenuItem"
import IconButton from "@material-ui/core/IconButton"
import Tooltip from "@material-ui/core/Tooltip"
import Typography from "@material-ui/core/Typography"
import Badge from "@material-ui/core/Badge"

// Icons
import NotificationsIcon from "@material-ui/icons/Notifications"
import FavoriteIcon from "@material-ui/icons/Favorite"
import ChatIcon from "@material-ui/icons/Chat"

import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"

const Notifications = () => {
  const [anchorEl, setAnchorEl] = useState(null)
  const dispatch = useDispatch()
  const notifications = useSelector(state => state.user.notifications)
  let notificationIcon

  dayjs.extend(relativeTime)

  const handleOpen = event => {
    setAnchorEl(event.target)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleMenuOpened = () => {
    let unreadNotificationsIds = notifications
      .filter(not => !not.read)
      .map(not => not.notificationId)

    dispatch(markNotificationsRead(unreadNotificationsIds))
  }

  if (notifications && notifications.length > 0) {
    let unReadNotifications = notifications.filter(
      notification => notification.read === false
    )
    notificationIcon =
      unReadNotifications.length > 0 ? (
        <Badge badgeContent={unReadNotifications.length} color="secondary">
          <NotificationsIcon />
        </Badge>
      ) : (
        <NotificationsIcon />
      )
  } else {
    notificationIcon = <NotificationsIcon />
  }

  let notificationsMarkup =
    notifications && notifications.length > 0 ? (
      notifications.map(notification => {
        const verb = notification.type === "like" ? "liked" : "commented on"
        const time = dayjs(notification.createdAt).fromNow()
        const iconColor = notification.read ? "primary" : "secondary"
        const icon =
          notification.type === "like" ? (
            <FavoriteIcon color={iconColor} style={{ marginRight: 10 }} />
          ) : (
            <ChatIcon color={iconColor} style={{ marginRight: 10 }} />
          )
        return (
          <MenuItem key={notification.createdAt} onClick={handleClose}>
            {icon}
            <Typography
              component={Link}
              color="default"
              variant="body1"
              to={`/users/${notification.recipient}/scream/${notification.screamId}`}
            >
              {notification.sender} {verb} your scream {time}
            </Typography>
          </MenuItem>
        )
      })
    ) : (
      <MenuItem onClick={handleClose}>You have no notifications yet</MenuItem>
    )
  return (
    <>
      <Tooltip placement="top" title="Notifications">
        <IconButton
          aria-owns={anchorEl ? "simple-menu" : undefined}
          aria-haspopup="true"
          onClick={handleOpen}
        >
          {notificationIcon}
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        onEntered={handleMenuOpened}
      >
        {notificationsMarkup}
      </Menu>
    </>
  )
}

export default Notifications
