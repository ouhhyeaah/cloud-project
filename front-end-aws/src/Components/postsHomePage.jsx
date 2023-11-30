import React, {useEffect, useState} from "react";
import '../css/Home.css'
import {BsPersonFill} from "react-icons/bs";

const PostsHomePage = ({posts}) => {


    return (
        <div className={"main-container"} >
            <div className={"wrap-container"}>
                <div className={"posts-container"}>
                    {posts.map( (key)=>(
                        <div className={"post-container"}>
                            <div className={"user-container"}>
                                <p>De {key.email}</p>
                                <BsPersonFill size={24} />
                            </div>

                            <h2>{key.title}</h2>
                            <p>{key.description}</p>
                        </div>
                        )
                     )
                    }
            </div>



            </div>

        </div>
    )
}
export default PostsHomePage