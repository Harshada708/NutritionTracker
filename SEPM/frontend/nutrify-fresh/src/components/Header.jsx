import { UserContext } from "../contexts/UserContext";
import { useContext } from "react";
import { useNavigate,Link } from "react-router-dom";
export default function Header()
{

    const loggedData = useContext(UserContext);
    const navigate = useNavigate();

    function logout()
    {
        localStorage.removeItem("nutrify-user");
        loggedData.setLoggedUser(null);
        navigate("/login");

    }

    return (
        <div>
<         ul className="nav">
            <p className="textbg">
            <h1>Welcome to NutriDiary</h1>
            </p>
            <li><Link to="/track">Track</Link></li>
            <li><Link to="/diet">Diet</Link></li>
            <li className="logout" onClick={logout}><a>Logout</a></li>
         </ul>

        </div>
    )
}