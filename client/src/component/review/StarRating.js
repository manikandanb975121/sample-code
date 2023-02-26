import React from "react";

function StarRating({ value, onChange }) {
  const stars = Array.from({ length: 5 }, (_, index) => index + 1);


  return (<>
    <div>{value}</div>
    <div>{stars}</div>
    <div className="star-rating" >
      {stars.map((star) => (
        <>{value == star?"yes":"no"}
        <label key={star}>
          <input
            type="radio"
            name="rating"
            value={star}
            checked={value===star}
            onClick={(event)=>{console.log(event.target.value)
            onChange(event.target.value)
            }}
          />
          <span className="star">{star}</span>
        </label>
      </>))}
    </div></>
  );
}

export default StarRating;
