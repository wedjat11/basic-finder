"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Card from "./Card";

export default function Home() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const key = process.env.NEXT_PUBLIC_API_KEY;
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    async function getData() {
      setLoading(true);
      const response = await fetch(
        `${baseUrl}search/photos?per_page=20&query=${data.search}`,
        {
          method: "get",
          headers: {
            Authorization: `Client-ID ${key}`,
          },
        }
      );
      const result = await response.json();
      setImages(result.results);
      setLoading(false);
    }
    getData();
  };

  function mapImages(images) {
    if (images.length === 0) return;
    return images.map((image, index) => {
      return (
        <div key={index}>
          <Card
            picture={image.urls.regular}
            title={image.slug}
            desc={image.description}
            index={index}
            loading={loading}
          />
        </div>
      );
    });
  }

  return (
    <>
      <div className="navbar bg-base-100 shadow-sm">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">FinderProyect</a>
        </div>
        <div className="flex gap-2">
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              id="search"
              type="text"
              placeholder="Search"
              className="input input-bordered w-24 md:w-auto"
              defaultValue="test"
              {...register("search")}
            />
          </form>
        </div>
      </div>
      <main className="pt-10 flex flex-wrap items-center justify-center gap-5 bg-base-100">
        {mapImages(images)}
      </main>
    </>
  );
}
