// Card.tsx
const Card = () => {
    return (
      <div className="card bg-amber-50 w-50 shadow-lg text-black">
        <figure>
          <img
            src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
            alt="Shoes"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">Card Title</h2>
          <p className="text-gray-600">
            A card component has a figure, a body part, and inside body there are
            title and actions parts
          </p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Expand</button>
          </div>
        </div>
      </div>
    );
  };
  
  export default Card;
  