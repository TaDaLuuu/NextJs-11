import axios from "axios";
import React from "react";
import get from "lodash.get";
import Link from "next/link";
function PostPage({ posts }: { posts: any }) {
  return (
    <div style={{ marginLeft: "40px" }}>
      <h1>Post Page</h1>
      {posts.map((post: any, index: number) => {
        return (
          <div key={post.name}>
            <Link href={`/post/${post.name}`}>{post.name}</Link>
          </div>
        );
      })}
    </div>
  );
}

export async function getStaticProps() {
  const res = await axios.get(`https://pokeapi.co/api/v2/pokemon`);
  const posts = get(res, "data.results", []);
  return {
    props: { posts },
    revalidate: 10,
  };
}

export default PostPage;
