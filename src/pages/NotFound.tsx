import { useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";

const NotFound = () => {
  const location = useLocation();
  const torchRef = useRef(null);

  // Log 404 error
  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  // Handle torch effect with vanilla JavaScript
  useEffect(() => {
    const handleMouseMove = (event) => {
      if (torchRef.current) {
        torchRef.current.style.top = `${event.pageY}px`;
        torchRef.current.style.left = `${event.pageX}px`;
      }
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <>
      <style>
        {`
          html {
            height: 100%;
          }
          body {
            height: 100%;
            background: url("https://wallpapercave.com/wp/6SLzBEY.jpg") no-repeat left top;
            background-size: cover;
            overflow: hidden;
            display: flex;
            flex-flow: column wrap;
            justify-content: center;
            align-items: center;
          }
          .text h1 {
            color: #011718;
            margin-top: -200px;
            font-size: 15em;
            text-align: center;
            text-shadow: -5px 5px 0px rgba(0, 0, 0, 0.7), -10px 10px 0px rgba(0, 0, 0, 0.4), -15px 15px 0px rgba(0, 0, 0, 0.2);
            font-family: monospace;
            font-weight: bold;
          }
          .text h2 {
            color: black;
            font-size: 5em;
            text-shadow: -5px 5px 0px rgba(0, 0, 0, 0.7);
            text-align: center;
            margin-top: -150px;
            font-family: monospace;
            font-weight: bold;
          }
          .text h3 {
            color: white;
            margin-left: 30px;
            font-size: 2em;
            text-shadow: -5px 5px 0px rgba(0, 0, 0, 0.7);
            margin-top: -40px;
            font-family: monospace;
            font-weight: bold;
          }
          .torch {
            margin: -150px 0 0 -150px;
            width: 200px;
            height: 200px;
            box-shadow: 0 0 0 9999em #000000f7;
            opacity: 1;
            border-radius: 50%;
            position: fixed;
            background: rgba(0, 0, 0, 0.3);
          }
          .torch:after {
            content: "";
            display: block;
            border-radius: 50%;
            width: 100%;
            height: 100%;
            top: 0px;
            left: 0px;
            box-shadow: inset 0 0 40px 2px #000, 0 0 20px 4px rgba(13, 13, 10, 0.2);
          }
          .return-home {
            color: #3b82f6;
            text-decoration: underline;
            font-size: 1.5em;
            margin-top: 20px;
            display: inline-block;
            font-family: monospace;
          }
          .return-home:hover {
            color: #1d4ed8;
          }
        `}
      </style>
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text">
            <h1>404</h1>
            <h2>Oops!</h2>
            <h3>Sorry we can't find what you are looking for 'cuz it's so dark in here</h3>
            <a href="/" className="return-home">
              Return to Home
            </a>
          </div>
          <div className="torch" ref={torchRef}></div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
