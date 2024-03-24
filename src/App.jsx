import { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux';
import Card from './components/Card';
import GameOver from './components/GameOver';
import ProgressBar from './components/ProgressBar';
import './App.scss'

function App() {
  console.log('render');
  const events = useSelector((state) => state.events.events.events);
  const characters = useSelector((state) => state.characters.characters.characters);
  const profile = useSelector((state) => state.user.profile);
  const eventsIndexArray = [...Array(events.length).keys()];
  const availableEventsRef = useRef(null);
  const [currentEvent, setCurrentEvent] = useState('');
  const [currentIndex, setCurrentIndex] = useState('');
  const [availableEvents, setAvailableEvents] = useState([]);
  availableEventsRef.current = availableEvents;

  useEffect(() => {

    setAvailableEvents(eventsIndexArray);
  }, []);

  const handleEvent = (e) => {
      const randomIndex = availableEventsRef.current[Math.floor(Math.random() * availableEventsRef.current.length)];
      setCurrentIndex(randomIndex);
      setCurrentEvent(events[randomIndex]);
  }

  useEffect(() => {
    if (availableEvents.length === 1) {

      setAvailableEvents(eventsIndexArray.filter((index) => index !== currentIndex));
    }else{
      setAvailableEvents((prevIndices) => prevIndices.filter((index) => index !== currentIndex));
    }
  }, [currentEvent])

  const [gameOver, setGameOver] = useState(false);
  const [gameTriggers, setGameTriggers] = useState(null);
  const [progressBars, setProgressBars] = useState([
    { name: 'religion', value: 50, icon: 'church' },
    { name: 'people', value: 50, icon: 'person' },
    { name: 'army', value: 50, icon: 'army' },
    { name: 'economy', value: 50, icon: 'euro' },
  ])

  function updateScore(direction) {
    if(currentEvent !== ''){
      setProgressBars(prevProgressBars => {
        return prevProgressBars.map(bar => {
          const scoreChange = currentEvent[direction].modifier[bar.name];
          if (scoreChange !== undefined) {
            const updatedValue = bar.value + scoreChange;
            if (updatedValue <= 0 || updatedValue >= 100) {
              setGameOver(true);
              setGameTriggers({ name: bar.name, value: updatedValue });
            }
            return { ...bar, value: updatedValue };
          }
          return bar;
        });
      });
    } 
  }

  const [animating, setAnimating] = useState(false);
  const [cardsCounter, setCardsCounter] = useState(0);
  const numOfCards = characters.length;
  const decisionVal = 80;
  let pullDeltaX = 0;
  let deg = 0;
  let $card, $cardReject, $cardLike;

  const pullChange = () => {
    setAnimating(true);
    deg = pullDeltaX / 10;
    $card.style.transform = `translateX(${pullDeltaX}px) rotate(${deg}deg)`;
    const opacity = pullDeltaX / 100;
    const rejectOpacity = opacity >= 0 ? 0 : Math.abs(opacity);
    const likeOpacity = opacity <= 0 ? 0 : opacity;
    $cardReject.style.opacity = rejectOpacity;
    $cardLike.style.opacity = likeOpacity;
  };

  const release = () => {
    if (pullDeltaX >= decisionVal) {
      $card.classList.add("to-right");
      updateScore('right');
      handleEvent(availableEvents);
    } else if (pullDeltaX <= -decisionVal) {
      $card.classList.add("to-left");
      updateScore('left');
      handleEvent(availableEvents);
    }

    if (Math.abs(pullDeltaX) >= decisionVal) {
      $card.classList.add("inactive");

      setTimeout(() => {
        $card.classList.add("below");
        $card.classList.remove("inactive", "to-left", "to-right");
        setCardsCounter((prevCounter) => (prevCounter + 1) % numOfCards);

        if (cardsCounter === numOfCards - 1) {
          setCardsCounter(0);
          document.querySelectorAll(".demo__card").forEach((card) => {
            card.classList.remove("below");
          });
        }
      }, 300);
    }

    if (Math.abs(pullDeltaX) < decisionVal) {
      $card.classList.add("reset");
    }

    setTimeout(() => {
      $card.removeAttribute("style");
      $card.classList.remove("reset");
      $card
        .querySelector(".demo__card__choice.m--reject")
        .removeAttribute("style");
      $card
        .querySelector(".demo__card__choice.m--like")
        .removeAttribute("style");

      pullDeltaX = 0;
      setAnimating(false);
    }, 300);
  };

  const handleSwipeStart = (e) => {
    if (animating) return;
    $card = e.currentTarget;
    $cardReject = $card.querySelector(".demo__card__choice.m--reject");
    $cardLike = $card.querySelector(".demo__card__choice.m--like");
    const startX = e.pageX || e.touches[0].pageX;

    const handleSwipeMove = (e) => {
      const x = e.pageX || e.touches[0].pageX;
      pullDeltaX = x - startX;
      if (!pullDeltaX) return;
      pullChange();
    };

    const handleSwipeEnd = () => {
      document.removeEventListener("mousemove", handleSwipeMove);
      document.removeEventListener("touchmove", handleSwipeMove);
      document.removeEventListener("mouseup", handleSwipeEnd);
      document.removeEventListener("touchend", handleSwipeEnd);

      if (!pullDeltaX) return; // prevents from rapid click events
      release();
    };

    document.addEventListener("mousemove", handleSwipeMove);
    document.addEventListener("touchmove", handleSwipeMove);
    document.addEventListener("mouseup", handleSwipeEnd);
    document.addEventListener("touchend", handleSwipeEnd);
  };

  return ( 
    <div className="demo">
      <header className="demo__header">
          {progressBars.map((progress, index) => (
            <ProgressBar key={index} value={progress.value} icon={progress.icon} />
          ))}
      </header>
      <div className="demo__content">
        <div className="demo__card-cont">
          {
            gameOver ? (
              <GameOver gameTriggers={gameTriggers}/>
            ) : (
              characters.map((character, index) => (
                <Card 
                  key={character.id}
                  profile={character}
                  event={currentEvent}
                  onMouseDown={handleSwipeStart} 
                  onTouchStart={handleSwipeStart}
                />
              ))
            )
          }
        </div>
        { !gameOver && (
          <p className="demo__tip">
            { currentEvent !== '' ? (profile.length === 0 ? currentEvent.content : currentEvent.content.replace("joueur", profile.pseudo)) : 'Commencer' }
          </p>
        )}
        

      </div>
    </div>
  )
}

export default App