import "./Contacts.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";
import NavBar from "../../components/NavBar/NavBar";
import NavBarPublic from "../../components/PublicPage/NavBarPublic/NavBarPublic";

const Contacts = () => {
  const auth = getAuth();
  const [user] = useAuthState(auth);
  return (
    <div>
      {user ? <NavBar /> : <NavBarPublic />}
      <div className="contacts">
        <div className="contacts_left_side">
          <div className="flex flex-col gap-6">
            <h1 className="text-6xl">Contact Us</h1>
            <p className="max-w-xs">
              Email, call or complete the form and we will answer you.
            </p>
            <p>Estato@gmail.com</p>
            <p>+359 893 426 595</p>
          </div>

          <div className="contacts_options">
            <div className="contacts_option">
              <h3>Customer Support</h3>
              <p>
                Our support team is available around the clock to address any
                concerns or queries you may have.
              </p>
            </div>
            <div className="contacts_option">
              <h3>Feedback and Suggestions</h3>
              <p>
                We value your feedback and are continuously working to improve
                Estato. Your input is crucial in shaping the future of Estato
              </p>
            </div>
            <div className="contacts_option">
              <h3>Media Inquiries</h3>
              <p>
                For media-related questions or press inquiries, please contact
                us at media@estato.com
              </p>
            </div>
          </div>
        </div>
        <div className="contacts_right_side">
          <form
            className="form_contacts"
            action="https://api.web3forms.com/submit"
            method="POST"
          >
            <input
              type="hidden"
              name="access_key"
              value={import.meta.env.VITE_WEB3_KEY}
            ></input>
            <div className="flex">
              <label>
                <input required type="text" className="input" name="name" />
                <span>first name</span>
              </label>

              <label>
                <input
                  required
                  type="text"
                  className="input"
                  name="second name"
                />
                <span>last name</span>
              </label>
            </div>

            <label>
              <input required type="email" className="input" name="email" />
              <span>email</span>
            </label>

            <label>
              <input required type="tel" className="input" name="number" />
              <span>contact number</span>
            </label>
            <label>
              <textarea required className="input01" name="message"></textarea>
              <span>message</span>
            </label>

            <button className="fancy">
              <span className="top-key"></span>
              <span className="text">submit</span>
              <span className="bottom-key-1"></span>
              <span className="bottom-key-2"></span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contacts;
