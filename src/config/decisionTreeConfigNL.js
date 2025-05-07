// src/config/decisionTreeConfigNL.js

const decisionTreeConfigNL = {
    question: "Wat voor soort fiets heb je?",
    options: {
      "Stadsfiets": {
        question: "Waar heb je hulp bij nodig?",
        options: {
          "Band": {
            question: "Welke band?",
            options: {
              "Voor": {
                question: "Wat moet er gerepareerd worden?",
                options: {
                  "Binnenband": { summary: "summary", time: 30 },
                  "Buitenband": { summary: "summary", time: 30 }
                }
              },
              "Achter": {
                question: "Wat moet er gerepareerd worden?",
                options: {
                  "Binnenband": { summary: "summary", time: 40 },
                  "Buitenband": { summary: "summary", time: 40 }
                }
              }
            }
          },
          "Ketting": {
            question: "Wat moet er met de ketting gebeuren?",
            options: {
              "Ketting spannen": { summary: "summary", time: 25 },
              "Ketting vervangen": { summary: "summary", time: 35 }
            }
          },
          "Versnellingen": {
            question: "Welk type versnellingssysteem heeft je fiets?",
            options: {
              "Naaf": { summary: "summary", time: 50 },
              "Derailleur": { summary: "summary", time: 40 }
            }
          },
          "Remmen": {
            question: "Kies remtype",
            options: {
              "Velgrem": { summary: "summary", time: 30 },
              "Schijfrem": { summary: "summary", time: 45 },
              "Trommel-/Terugtraprem": { summary: "summary", time: 30 }
            }
          },
          "Wiel richten": { summary: "summary", time: 60 },
          "Anders": {
            question: "Beschrijf je probleem",
            input: true,
            next: { summary: "summary", time: 45 }
          }
        }
      },
      "Racefiets/MTB/Andere fiets": {
        question: "Waar heb je hulp bij nodig?",
        options: {
          "Band": {
            question: "Welke band?",
            options: {
              "Voor": {
                question: "Wat moet er gerepareerd worden?",
                options: {
                  "Binnenband": { summary: "summary", time: 25 },
                  "Buitenband": { summary: "summary", time: 35 }
                }
              },
              "Achter": {
                question: "Wat moet er gerepareerd worden?",
                options: {
                  "Binnenband": { summary: "summary", time: 35 },
                  "Buitenband": { summary: "summary", time: 35 }
                }
              }
            }
          },
          "Ketting": {
            question: "Wat moet er met de ketting gebeuren?",
            options: {
              "Ketting spannen": { summary: "summary", time: 25 },
              "Ketting vervangen": { summary: "summary", time: 40 }
            }
          },
          "Versnellingen": {
            question: "Welk type versnellingssysteem heeft je fiets?",
            options: {
              "Naaf": { summary: "summary", time: 55 },
              "Derailleur": { summary: "summary", time: 40 }
            }
          },
          "Remmen": {
            question: "Kies remtype",
            options: {
              "Velgrem": { summary: "summary", time: 30 },
              "Schijfrem": { summary: "summary", time: 45 },
              "Trommel-/Terugtraprem": { summary: "summary", time: 30 }
            }
          },
          "Wiel richten": { summary: "summary", time: 60 },
          "Anders": {
            question: "Beschrijf je probleem",
            input: true,
            next: { summary: "summary", time: 45 }
          }
        }
      }
    }
  };
  
  export default decisionTreeConfigNL;