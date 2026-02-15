import { useState, useEffect, useRef } from "react";
import { jwtDecode } from "jwt-decode";
import { UserContext } from "./Context/userContext.js";
import Header from "./Components/Header.jsx";
import Episode from "./Components/Episode.jsx";

function App() {
  const [user, setUser] = useState({});
  const [loggedIn, setloggedIn] = useState(false);
  const signinButton = useRef(null);
  const [data, setData] = useState([]);

  const contextValue = {
    user,
    setUser,
    loggedIn,
    setloggedIn,
    signinButton,
  };

  const handleCallBack = (res) => {
    console.log("Encoded Token: " + res.credential);

    try {
      const user = jwtDecode(res.credential);
      setUser(user);
      setloggedIn(true);
      console.log("Decoded user: ", user);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id:
        "1262104251-3f1v91uvg3ptm6f18hr3afci2d866i3t.apps.googleusercontent.com",
      callback: handleCallBack,
    });

    google.accounts.id.renderButton(signinButton.current, {
      theme: "outline",
      size: "large",
    });
  }, [loggedIn]);

  const rssFeed = "https://cdn.atp.fm/rss/public?m2swoudx";

  useEffect(() => {
    fetch(rssFeed)
      .then((res) => res.text())
      .then((str) => {
        const parser = new DOMParser();
        const data = parser.parseFromString(str, "text/xml"); //converts xml string to DOM structure for querying
        const itemList = data.querySelectorAll("item");
        const items = [];
        itemList.forEach((el) => {
          const enclosure = el.querySelector("enclosure");
          items.push({
            title: el.querySelector("title").innerHTML,
            pubDate: new Date(
              el.querySelector("pubDate").innerHTML
            ).toLocaleDateString("en-US", {
              day: "numeric",
              month: "long",
              year: "numeric",
            }),
            link: el.querySelector("link").innerHTML,
            description: el.querySelector("description").innerHTML,
            mp3: enclosure ? enclosure.getAttribute("url") : null,
          });
        });
        console.log(items);
        setData(items);
      });
  }, [rssFeed]);

  return (
    <UserContext.Provider value={contextValue}>
      <div className="background_image min-h-screen">
        <Header loggedIn={loggedIn} setloggedIn={setloggedIn} />
        {loggedIn ? (
          <main className="max-w-4xl mx-auto px-4 pb-16">
            <h1 className="mt-8 mb-10 text-center text-2xl font-bold text-amber-400 tracking-wide uppercase">
              Accidental Tech Podcast
            </h1>
            <ul className="space-y-6">
              {data.map((ep, i) => (
                <Episode
                  key={i}
                  title={ep.title}
                  pubDate={ep.pubDate}
                  link={ep.link}
                  description={ep.description}
                  mp3={ep.mp3}
                />
              ))}
            </ul>
          </main>
        ) : null}
      </div>
    </UserContext.Provider>
  );
}

export default App;
