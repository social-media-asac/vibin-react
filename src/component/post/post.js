import React from 'react';
import { Link } from 'react-router-dom';
const Post= (props) =>{
        return (
            <>
              <h4>Post here</h4>
              <textarea placeholder = "post something in your mind"></textarea>
            <Link to='/home'>  <button type="submit">Share</button></Link>
            </>
        )
}
export default Post;