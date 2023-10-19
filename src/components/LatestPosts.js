import React, { useEffect, useState } from "react";
import ResponsivePagination from "react-responsive-pagination";
import "react-responsive-pagination/themes/classic.css";
import axios from "axios";
//import AxiosClient from "../client/client";
//const client = new AxiosClient();

const LatestPosts = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [posts, setPosts] = useState([]);

  const getPosts = async () => {
    try {
      /* 1 const response = await fetch (`${process.env.REACT_APP_SERVER_BASE_URL}/posts?page=${currentPage}`)

            const data = await response.json()
            setPosts(data)*/
      // con axios diventa

const response = await axios.get(`${process.env.REACT_APP_SERVER_BASE_URL}/posts?page=${currentPage}`)

      // ci toglie il fastidio di aggiungere method e json
      //3 aggiornamento
      //const response = await client.get(`/posts?page=${currentPage}`);

      setPosts(response.data);
    } catch (error) {}
  };

  const handlePagination = (value) => {
    setCurrentPage(value);
  };

  /* const handleNextPage = () => {
        setCurrentPage((prev) => prev + 1)
    }
    const handlePreviusPage = () => {
        setCurrentPage((prev) => prev - 1)
    }*/

  useEffect(() => {
    getPosts();
  }, [currentPage]);

  return (
    <div>
      {posts &&
        posts.posts?.map((post, i) => {
          return <li key={i}>{post.title}</li>;
        })}
      <div>
        <ResponsivePagination
          current={currentPage}
          total={posts && posts.totalPages}
          onPageChange={handlePagination}
        />
      </div>
    </div>
  );
};

export default LatestPosts;
