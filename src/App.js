import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Edit from "./pages/Edit";
import "./style.scss";
import "./style.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext, createContext, useState } from "react";
import { AuthContext } from "./context/AuthContext";
import ReactSwitch from "react-switch";

//Light and Dark mode Context

export const ThemeContext = createContext(null);

function App() {

  const { currentUser } = useContext(AuthContext);

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }

    return children;
  };

  //Light and Dark Mode
  const [theme, setTheme] = useState("light");
  const toggleTheme = () => {
    setTheme((curr) => (curr === "light" ? "dark" : "light"));
  };
  // *******************

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div id={theme}>
        <div className="switch">
          <ReactSwitch 
          onChange={toggleTheme} 
          checked={theme === "dark"}
          checkedIcon={false}
          uncheckedIcon={false}
          onColor={"#272c36"}
          offColor={"#9fa3ac"}
          />
        </div>
        <BrowserRouter>
          <Routes>
            <Route path="/">
              <Route
                index
                element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                }
              />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="edit" element={<Edit />} />
            </Route>
          </Routes>
        </BrowserRouter>
        </div>
    </ThemeContext.Provider>
  );
}

export default App;
