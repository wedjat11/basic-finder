import React from "react";
import Skeleton from "./Skeleton";

const Card = ({ picture, title, desc, index, loading }) => {
  return loading ? (
    <Skeleton />
  ) : (
    <div className="card bg-base-100 w-96 shadow-sm h-[600px] flex flex-col border border-gray-100/10">
      <figure className="h-[60%]">
        <img
          src={picture}
          alt={title || "Card image"}
          className="object-cover h-full w-full"
        />
      </figure>
      <div className="card-body h-[40%]">
        <h2 className="card-title">
          {title || "No title"}
          <div className="badge badge-secondary">{index}</div>
        </h2>
        <p>{desc || "Beautiful Image"}</p>
      </div>
    </div>
  );
};

export default Card;
