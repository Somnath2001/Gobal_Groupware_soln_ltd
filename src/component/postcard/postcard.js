import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentRounded";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import IMG from "../../assets/img1.jpg";
import axios from "axios";
import { Box, Menu, MenuItem } from "@mui/material";
import Badge from "@mui/material/Badge";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const PostCard = ({ post }) => {
  const [temp, setTemp] = useState("");

  console.log(temp);

  const [expanded, setExpanded] = useState(false);
  const [commentExpand, setCommentExpand] = useState(false);
  const [commentsData, setCommentsData] = useState([]);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  console.log(commentsData);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleCommentExpandClick = () => {
    setCommentExpand(!commentExpand);
    axios
      .get(`https://jsonplaceholder.typicode.com/posts/${post.id}/comments`)
      .then((response) => {
        setCommentsData(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    axios
      .get(`https://jsonplaceholder.typicode.com/users/${post.userId}`)
      .then((response) => {
        setTemp(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [post]);

  return (
    <Card sx={{ maxWidth: 800, marginBottom: "20px" }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {temp.id}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon onClick={handleOpenUserMenu} />
          </IconButton>
        }
        title={temp.name}
        subheader={temp.username}
      />
      <CardMedia component="img" height="194" image={IMG} alt="Paella dish" />
      <CardContent
        sx={{
          // height: 150,
          // backgroundColor: "red",
          overflow: "hidden",
          textOverflow: "ellipsis",
          // whiteSpace: "normal",
          // display: "-webkit-box !important",
          // "-webkit-line-clamp": "last",
          // "-webkit-box-orient": "vertical",
        }}
      >
        <Typography variant="body1"> {post.title}</Typography>
        <Typography variant="subtitle2" color="text.secondary">
          {post.body}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <IconButton aria-label="comment">
          <Badge badgeContent={5 || commentsData.length} color="error">
            <ModeCommentOutlinedIcon
              expand={commentExpand}
              onClick={handleCommentExpandClick}
              aria-expanded={commentExpand}
              aria-label="comment"
            />
          </Badge>
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
        <Typography variant="body2"> Author Details</Typography>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography variant="body2">
            {temp !== "" ? (
              <>
                <Box>Email : {temp.email}</Box>
                <Box>Location : {temp.address.city}</Box>
                <Box>Phone : {temp.phone}</Box>
                <Box>Website : {temp.website}</Box>
                <Box>Company : {temp.company.name}</Box>
                <Box>Bussiness : {temp.company.bs}</Box>
              </>
            ) : (
              "no author detail found"
            )}
          </Typography>
        </CardContent>
      </Collapse>
      <Collapse in={commentExpand} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography>comments</Typography>
          <Typography>
            {commentsData.map((comment, id) => {
              return (
                <>
                  <Card>
                    <CardHeader
                      avatar={
                        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                          C
                        </Avatar>
                      }
                      title={comment.name}
                      subheader={comment.body}
                    />
                  </Card>
                </>
              );
            })}
          </Typography>
        </CardContent>
      </Collapse>
      <Box sx={{ flexGrow: 0 }}>
        <Menu
          sx={{ mt: "45px" }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          <MenuItem onClick={handleCloseUserMenu}>
            <Typography textAlign="center" sx={{ width: "100px" }}>
              Profile
            </Typography>
          </MenuItem>
          <MenuItem onClick={handleCloseUserMenu}>
            <Typography textAlign="center" sx={{ width: "100px" }}>
              Message
            </Typography>
          </MenuItem>
          <MenuItem onClick={handleCloseUserMenu}>
            <Typography textAlign="center" sx={{ width: "100px" }}>
              Share
            </Typography>
          </MenuItem>
          <MenuItem onClick={handleCloseUserMenu}>
            <Typography textAlign="center" sx={{ width: "100px" }}>
              Setting
            </Typography>
          </MenuItem>
        </Menu>
      </Box>
    </Card>
  );
};

export default PostCard;
