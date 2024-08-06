import "./AboutUs.css";
import { assets } from "../../../assets/assets";

const AboutUs = () => {
  return (
    <div className="flex flex-col gap-24">
      <div className="flex flex-col items-center mx-5 my-7">
        <h1 className="text-5xl mb-14">About Us</h1>
        <p className="text-center pt-3 text-lg max-w-4xl min-w-60">
          Welcome to <span className="span-color">Estato</span>, Varna's top
          real estate destination. Our expert team is here to help you buy,
          sell, or invest in the perfect property. Trust us to make your real
          estate dreams come true in this beautiful coastal city.
        </p>
        <div className="flex flex-col md:flex-row mt-7 gap-3 items-center">
          <div>
            <img className="w-96 rounded-3xl" src={assets.public_home} alt="" />
          </div>
          <div className="max-w-96">
            <p className="font-sans text-center min-w-60">
              At Estato, we are more than just a real estate agency, we're your
              trusted partner in finding the perfect place to call home. Our
              story is one of passion, dedication, and a commitment to helping
              you achieve your real estate dreams.
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-center flex-col md:flex-row justify-center gap-12 mb-5">
        <div className="flex flex-col gap-6 h-80">
          <h1 className="text-4xl">Why Chose Us?</h1>
          <img className="w-96 rounded-3xl" src={assets.public_team} alt="team" />
        </div>
        <div>
          <div className="flex flex-col gap-7 p-4 public_home_bot md:h-80">
            <h2><i className="fa-solid fa-key fa-lg pr-5"></i>Unmatched Expertise</h2>
            <h2><i className="fa-solid fa-heart-circle-check fa-lg pr-5"></i>Personalized Service</h2>
            <p className="max-w-80">We believe in tailoring our service to your unique needs. Whether you're a first-time home buyer, a seasoned investor, or selling your property, we provide individualized solutions for every client</p>
            <h2><i className="fa-solid fa-book-open fa-lg pr-5"></i>Crystal Clear Transparency</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
