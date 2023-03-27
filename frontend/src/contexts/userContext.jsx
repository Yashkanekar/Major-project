import { useContext, createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const userContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    name:"",
    email:"",
    walletAddress:"",
    _id:"",
    token:"",
    
  });
  const navigate = useNavigate();
  useEffect(() => {
    const userExists = localStorage.getItem("userInfo")
    if(userExists) {
      const userInfo = JSON.parse(userExists);
      setUser(userInfo);

    }
    else {
      navigate("/");
    }
    
  }, [navigate]);

  return (
    <userContext.Provider
      value={{ user }}
    >
      {children}
    </userContext.Provider>
  );
};

export const userState = () => {
  return useContext(userContext);
};

export default UserProvider;
