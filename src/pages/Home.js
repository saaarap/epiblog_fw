import React, { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import AxiosClient from "../client/client";
import PostsCard from "../components/PostsCard";
import AddPostModal from "../components/AddPostModal";
import useSession from "../hooks/useSession";
import { nanoid } from "nanoid";

const client = new AxiosClient();

const Home = () => {
  const [posts, setPosts] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const session = useSession();
  console.log(session);

  const toggleModal = () => setIsModalOpen(!isModalOpen)
  const getPosts = async () => {
    try {
      const response = await client.get("/posts");
      setPosts(response)
    } catch (e) {
      console.log(e)
    }
  };

  useEffect(() => {
    getPosts()
  }, []);

  return (
    <MainLayout>
    {isModalOpen && <AddPostModal close={setIsModalOpen} />}
      <button
        onClick={toggleModal}
        className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
      >
       
        crea post
      </button>
      <div className="w-100 flex gap-3 flex-wrap p-2">
        {posts &&
          posts.posts?.map((post) => {
            return (
              <PostsCard
                key={nanoid()}
                title={post.title}
                price={post.price}
                author={post.author?.firstName}
                category={post.category}
                rate={post.rate}
                cover={post.cover}
              />
            );
          })}
      </div>
       
    </MainLayout>
  );
};

export default Home;
