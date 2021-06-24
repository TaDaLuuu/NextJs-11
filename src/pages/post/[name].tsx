import axios from "axios";
import get from "lodash.get";
import React from "react";

const PostId = (props: any) => {
  const { post } = props;
  return (
    <div style={{ padding: "20px" }}>
      <h1>{post.name}</h1>
      <h2>{post.height}</h2>
      <h3>{post.location_area_encounters}</h3>
    </div>
  );
};

export async function getStaticPaths() {
  const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/`);
  const posts = await get(res, "data.results", []);

  const paths = posts.map((post: any) => ({
    params: { name: post.name },
  }));

  return { paths, fallback: true };
}

export async function getStaticProps({ params }: { params: any }) {
  const res = await axios.get(
    `https://pokeapi.co/api/v2/pokemon/${params.name}`
  );
  const post = get(res, "data");
  return {
    props: { post },
    revalidate: 10,
  };
}
export default PostId;
