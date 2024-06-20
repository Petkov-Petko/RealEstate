import "./NavBarPublic.css";

const NavBarPublic = () => {
  return (
    <div className="flex justify-between">
      <div>
        <img
          src="your-image-url"
          alt="description"
          style={{ width: "100px", height: "100px" }}
        />
      </div>
      <div>
        <ul className="flex flex-row gap-10">
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/about">About</a>
          </li>
            <li>
                <a href="/contact">Contact Us</a>
            </li>
          <li>
            <a href="/login">Login</a>
          </li>
          <li>
            <a href="/register">Sing Up</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavBarPublic;
