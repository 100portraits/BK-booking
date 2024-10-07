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
                  "Binnenband": {
                    question: "Heeft je fiets een kettingkast?",
                    options: {
                      "Kettingkast": { summary: "summary", time: 45 },
                      "Geen kettingkast": { summary: "summary", time: 35 }
                    }
                  },
                  "Buitenband": {
                    question: "Heeft je fiets een kettingkast?",
                    options: {
                      "Kettingkast": { summary: "summary", time: 45 },
                      "Geen kettingkast": { summary: "summary", time: 35 }
                    }
                  }
                }
              }
            }
          },
          "Ketting": {
            question: "Wat moet er met de ketting gebeuren?",
            options: {
              "Ketting spannen": {
                question: "Heeft je fiets een kettingkast?",
                options: {
                  "Kettingkast": { summary: "summary", time: 30 },
                  "Geen kettingkast": { summary: "summary", time: 20 }
                }
              },
              "Ketting vervangen": {
                question: "Heeft je fiets een kettingkast?",
                options: {
                  "Kettingkast": { summary: "summary", time: 40 },
                  "Geen kettingkast": { summary: "summary", time: 30 }
                }
              }
            }
          },
          "Versnellingen": {
            question: "Welk type versnellingssysteem heeft je fiets?",
            options: {
              "Naaf": {
                question: "Welk type naafversnelling heeft je fiets?",
                input: true,
                placeholder: "bijv. Nexus 7, Nexus 3 (laat leeg indien onzeker)",
                options: {
                  "Kettingkast": { summary: "summary", time: 55 },
                  "Geen kettingkast": { summary: "summary", time: 45 }
                }
              },
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
                  "Binnenband (breng je eigen band mee)": { summary: "summary", time: 25 },
                  "Buitenband": { summary: "summary", time: 35 }
                }
              },
              "Achter": {
                question: "Wat moet er gerepareerd worden?",
                options: {
                  "Binnenband": {
                    question: "Heeft je fiets een kettingkast?",
                    options: {
                      "Kettingkast": { summary: "summary", time: 40 },
                      "Geen kettingkast": { summary: "summary", time: 30 }
                    }
                  },
                  "Buitenband": {
                    question: "Heeft je fiets een kettingkast?",
                    options: {
                      "Kettingkast": { summary: "summary", time: 40 },
                      "Geen kettingkast": { summary: "summary", time: 30 }
                    }
                  }
                }
              }
            }
          },
          "Ketting": {
            question: "Wat moet er met de ketting gebeuren?",
            options: {
              "Ketting spannen": {
                question: "Heeft je fiets een kettingkast?",
                options: {
                  "Kettingkast": { summary: "summary", time: 30 },
                  "Geen kettingkast": { summary: "summary", time: 20 }
                }
              },
              "Ketting vervangen": {
                question: "Heeft je fiets een kettingkast?",
                options: {
                  "Kettingkast": { summary: "summary", time: 45 },
                  "Geen kettingkast": { summary: "summary", time: 35 }
                }
              }
            }
          },
          "Versnellingen": {
            question: "Welk type versnellingssysteem heeft je fiets?",
            options: {
              "Naaf": {
                question: "Welk type naafversnelling heeft je fiets?",
                input: true,
                placeholder: "bijv. Nexus 7, Nexus 3 (laat leeg indien onzeker)",
                options: {
                  "Kettingkast": { summary: "summary", time: 60 },
                  "Geen kettingkast": { summary: "summary", time: 50 }
                }
              },
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