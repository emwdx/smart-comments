import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.css';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


/*

[
  {
    "title": "Spacecraft piloting",
    "levelTexts": [
      [
        "%nn has shown difficulty in spacecraft piloting, struggling with the basics of maneuvering and control.",
        "Despite attempts, %nn is struggling to grasp the basics of spacecraft piloting and needs further practice.",
        "Despite %pp best efforts, %nn's skills in spacecraft piloting need significant improvement."
      ],
      [
        "%nn is proficient in spacecraft piloting, consistently showcasing good command over the controls.",
        "With a clear understanding of maneuvering techniques, %nn has demonstrated a good understanding of spacecraft piloting.",
        "%nn's spacecraft piloting skills are solid and reliable, which reflect %pp dedication."
      ],
      [
        "%nn is exceptional in spacecraft piloting, often outperforming expectations.",
        "Whether it's complex maneuvers or routine tasks, %nn has showcased superior skills in spacecraft piloting.",
        "Going beyond the curriculum, %nn's performance in spacecraft piloting exceeds expectations."
      ]
    ],
    "level": 0
  },
  {
    "title": "Spacecraft Navigation techniques",
    "levelTexts": [
      [
        "Transitioning to spacecraft navigation techniques, %nn seems to be facing similar challenges.",
        "Unfortunately, just like piloting, %nn is finding it difficult to understand the nuances of spacecraft navigation.",
        "Despite persistent efforts, %nn's grasp on spacecraft navigation techniques is limited."
      ],
      [
        "On a brighter note, %nn is showing promise in spacecraft navigation, with a marked improvement over time.",
        "As for spacecraft navigation, %nn has displayed a good understanding of the core techniques.",
        "Complementing %pp piloting skills, %nn's proficiency in spacecraft navigation is commendable."
      ],
      [
        "However, %nn has an advanced understanding of spacecraft navigation techniques that stands out.",
        "In addition to %pp excellent piloting skills, %nn has shown proficiency in spacecraft navigation that exceeds the norm.",
        "Impressively, %nn's ability to understand and apply spacecraft navigation techniques is exceptional."
      ]
    ],
    "level": 1
  },
  {
    "title": "Orbital Mechanics",
    "levelTexts": [
      [
        "In the field of orbital mechanics, %nn seems to be having a hard time as well, struggling with basic concepts.",
        "Despite %pp best efforts, %nn's understanding of orbital mechanics remains limited.",
        "The principles of orbital mechanics are proving to be quite challenging for %nn."
      ],
      [
        "Nevertheless, %nn's understanding of orbital mechanics is improving steadily.",
        "Although %hht struggled initially, %nn is now demonstrating a solid understanding of orbital mechanics.",
        "Despite initial difficulties, %nn's grasp of orbital mechanics principles has been quite encouraging."
      ],
      [
        "On the other hand, %nn's expertise in orbital mechanics is truly impressive, showcasing a depth of understanding that is rare.",
        "In fact, when it comes to orbital mechanics, %nn is nothing short of exceptional.",
        "With a keen eye for detail and a deep understanding of the subject, %nn's proficiency in orbital mechanics is unparalleled."
      ]
    ],
    "level": 2
  }
]


*/