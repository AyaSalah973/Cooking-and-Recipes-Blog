import "./Banner.css";

function Banner() {
  return (
    <section className="join-section">
      <div className="overlay top-circle"></div>
      <div className="overlay bottom-circle"></div>

      <p className="Banner-text">SIGN UP</p>

      <h1>
        JOIN THE FUN <br />
        CREATE ACCOUNT NOW!
      </h1>

      <p className="Banner-desc">
        Create an account to save your favorite recipes, share your own
        dishes, and enjoy a personalized cooking experience.
      </p>

      <button className="banner-btn">SIGN UP</button>
    </section>
  );
}

export default Banner;