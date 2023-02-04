import React, { useState, useEffect } from "react";
import PostCard from "../postcard/postcard";
import "./post.css";
import axios from "axios";

const Post = () => {
  const [postData, setPostData] = useState([]);

  console.log(postData);
  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((response) => {
        setPostData(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="outer_layout">
      {postData.map((data, id) => {
        return (
          <>
            <PostCard post={data} />
          </>
        );
      })}
    </div>
  );
};

export default Post;
