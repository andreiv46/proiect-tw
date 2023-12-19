import { useNavigate } from "react-router-dom";
const Profile = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/test");
  };

  return (
    <div>
      <h1>Profile</h1>
      <p>Welcome to your profile page!</p>
      <button type="button" onClick={handleSubmit}>
        dab
      </button>
    </div>
  );
};

export default Profile;
