import { ROLES } from "../../../server/config/constants";
import { useAuth } from "../hooks/useAuth";
const Unauthorized = () => {
  const { role } = useAuth();

  return (
    <div>
      {role === ROLES.STUDENT && (
        <div>
          You are logged in as a student, you do not have access on this page
        </div>
      )}
      {role === ROLES.PROFESSOR && (
        <div>
          You are logged in as a professor, you do not have access on this page
        </div>
      )}
    </div>
  );
};

export default Unauthorized;
