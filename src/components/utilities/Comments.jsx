import "./Comments.css";
const COMMENTSDATA = [
  {
    id: 1,
    comment: "Good ,recently purchased a this from the online.",
    user: "Steve",
    date: new Date("2023-07-14T01:00:00+01:00"),
  },
  {
    id: 2,
    comment: "Nice product, It has quality and the product arrived on time. ",
    user: "Jalpa",
    date: new Date("2024-05-02T01:00:00+01:00"),
  },
];

const DateFormatter = (date) => {
  const isoDate = new Date(date);
  const formattedDate = `${isoDate.getDay()}-${isoDate.getMonth()}-${isoDate.getFullYear()}`;
  return formattedDate;
};

const Comments = ({ rating }) => {
  const content = COMMENTSDATA.map((comment) => (
    <div key={comment.id} className="comment">
      <p className="c_date">
        <b>{DateFormatter(comment.date)}</b>
      </p>
      <h2 className="c_user">{comment.user}</h2>
      <p className="c_body">{comment.comment}</p>
      <button className="c_like">
        <img
          className="like_img"
          src="https://i.ibb.co/5WF1qLQ/thumbs-up.png"
          alt="thumbs-up"
          border="0"
        />
      </button>
    </div>
  ));

  return (
    <div>
      <h1>Reviews</h1>
      <div className="c_rating">
        <p className="sp_rating">
          <b>{rating}</b>
          <img
            src="https://i.ibb.co/b1Xgj7W/star.png"
            alt="star"
            className="pc_star"
            style={{ width: "20px", height: "20px", marginLeft: "10px" }}
          />
        </p>
      </div>
      <h2>Comments</h2>
      <div className="comments">{content}</div>
    </div>
  );
};

export default Comments;
