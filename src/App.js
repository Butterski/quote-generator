import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [quote, setQuote] = useState();
  const [quotes, setQuotes] = useState();
  const [isLoaded, setIsLoaded] = useState(false);
  const [clicke, setClicke] = useState(0);
  const [expandList, setExpandList] = useState(false);

  useEffect(() => {
    fetch("https://quote-garden.herokuapp.com/api/v3/quotes/random")
      .then((res) => res.json())
      .then(
        (result) => {
          setQuote(result["data"][0]);
          setIsLoaded(true);
          setExpandList(false);
        },
        (error) => {
          console.warn("SAVE HARAMBE");
        }
      );
  }, [clicke]);

  useEffect(() => {
    if (isLoaded) {
      const params = quote;
      fetch(
        `https://quote-garden.herokuapp.com/api/v3/quotes?author=${params["quoteAuthor"]}&limit=5`
      )
        .then((res) => res.json())
        .then(
          (result) => {
            setQuotes(result["data"]);
          },
          (error) => {
            console.warn("SAVE HARAMBE");
          }
        );
    }
  }, [quote]);

  const expand = () => {
    setExpandList(true);
  };

  const QuoteText = (text) => {
    return (
      <div className="quote-container">
        <div className="yellow-bar"></div>
        {isLoaded && '"' + text['text'] + '"'}
      </div>
    );
  };

  return (
    <div className="App">
      <div className={"random-button-container"}>
        <span className="random-button" onClick={() => setClicke(clicke + 1)}>
          {"random"}
          <span className="material-symbols-outlined">autorenew</span>
        </span>
      </div>
      {expandList && <p className="top-name">{isLoaded && quote["quoteAuthor"]}</p>}
      <div className="quote-author-container">
        <div className="quote-container">
          <div className="yellow-bar"></div>
          {isLoaded && '"' + quote["quoteText"] + '"'}
        </div>
        {expandList &&
          Object.values(quotes).map((value) => 
            <QuoteText key={value["quoteText"].length} text={value["quoteText"]} />
          )}
       {!expandList && <span className="quote-author-button" onClick={expand}>
          <div className="author-category">
            <div className="quote-author">
              {isLoaded && quote["quoteAuthor"]}
            </div>
            <div className="quote-category">
              {isLoaded && quote["quoteGenre"]}
            </div>
          </div>
          <div className="quote-author-arrow">
            <span className="material-symbols-outlined">trending_flat</span>
          </div>
        </span>}
      </div>
    </div>
  );
}

export default App;
