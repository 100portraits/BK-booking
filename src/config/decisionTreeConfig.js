// src/config/decisionTreeConfig.js

const decisionTreeConfig = {
    question: "What type of bike do you have?",
    options: {
      "City Bike": {
        question: "What do you need help with?",
        options: {
          "Tire": {
            question: "Which tire?",
            options: {
              "Front": {
                question: "What do you need to repair?",
                options: {
                  "Inner Tube": { summary: "summary", time: 30 },
                  "Outer Tire": { summary: "summary", time: 30 }
                }
              },
              "Back": {
                question: "What do you need to repair?",
                options: {
                  "Inner Tube": {
                    question: "Does your bike have a chainguard?",
                    options: {
                      "Chainguard": { summary: "summary", time: 45 },
                      "No Chainguard": { summary: "summary", time: 35 }
                    }
                  },
                  "Outer Tire": {
                    question: "Does your bike have a chainguard?",
                    options: {
                      "Chainguard": { summary: "summary", time: 45 },
                      "No Chainguard": { summary: "summary", time: 35 }
                    }
                  }
                }
              }
            }
          },
          "Chain": {
            question: "What do you need to do with the chain?",
            options: {
              "Tightening Chain": {
                question: "Does your bike have a chainguard?",
                options: {
                  "Chainguard": { summary: "summary", time: 30 },
                  "No Chainguard": { summary: "summary", time: 20 }
                }
              },
              "Replacing Chain": {
                question: "Does your bike have a chainguard?",
                options: {
                  "Chainguard": { summary: "summary", time: 40 },
                  "No Chainguard": { summary: "summary", time: 30 }
                }
              }
            }
          },
          "Gears": {
            question: "What type of gear system does your bike have?",
            options: {
              "Hub": {
                question: "What type of hub gear does your bike have?",
                input: true,
                placeholder: "e.g., Nexus 7, Nexus 3 (leave empty if unsure)",
                options: {
                  "Chainguard": { summary: "summary", time: 55 },
                  "No Chainguard": { summary: "summary", time: 45 }
                }
              },
              "Derailleur": { summary: "summary", time: 40 },
            }
          },
          "Brakes": {
            question: "Select Brake Type",
            options: {
              "Rim": { summary: "summary", time: 30 },
              "Disc": { summary: "summary", time: 45 },
              "Drum/Coaster": { summary: "summary", time: 30 }
            }
          },
          "Truing Wheel": { summary: "summary", time: 60 },
          "Other": {
            question: "Please describe your issue",
            input: true,
            next: { summary: "summary", time: 45 }
          }
        }
      },
      "Road/MTB/Other Bike": {
        question: "What do you need help with?",
        options: {
          "Tire": {
            question: "Which tire?",
            options: {
              "Front": {
                question: "What do you need to repair?",
                options: {
                  "Inner Tube (please bring your own)": { summary: "summary", time: 25 },
                  "Outer Tire": { summary: "summary", time: 35 }
                }
              },
              "Back": {
                question: "What do you need to repair?",
                options: {
                  "Inner Tube": {
                    question: "Does your bike have a chainguard?",
                    options: {
                      "Chainguard": { summary: "summary", time: 40 },
                      "No Chainguard": { summary: "summary", time: 30 }
                    }
                  },
                  "Outer Tire": {
                    question: "Does your bike have a chainguard?",
                    options: {
                      "Chainguard": { summary: "summary", time: 40 },
                      "No Chainguard": { summary: "summary", time: 30 }
                    }
                  }
                }
              }
            }
          },
          "Chain": {
            question: "What do you need to do with the chain?",
            options: {
              "Tightening Chain": {
                question: "Does your bike have a chainguard?",
                options: {
                  "Chainguard": { summary: "summary", time: 30 },
                  "No Chainguard": { summary: "summary", time: 20 }
                }
              },
              "Replacing Chain": {
                question: "Does your bike have a chainguard?",
                options: {
                  "Chainguard": { summary: "summary", time: 45 },
                  "No Chainguard": { summary: "summary", time: 35 }
                }
              }
            }
          },
          "Gears": {
            question: "What type of gear system does your bike have?",
            options: {
              "Hub": {
                question: "What type of hub gear does your bike have?",
                input: true,
                placeholder: "e.g., Nexus 7, Nexus 3 (leave empty if unsure)",
                options: {
                  "Chainguard": { summary: "summary", time: 60 },
                  "No Chainguard": { summary: "summary", time: 50 }
                }
              },
              "Derailleur": { summary: "summary", time: 40 },
            }
          },
          "Brakes": {
            question: "Select Brake Type",
            options: {
              "Rim": { summary: "summary", time: 30 },
              "Disc": { summary: "summary", time: 45 },
              "Drum/Coaster": { summary: "summary", time: 30 }
            }
          },
          "Truing Wheel": { summary: "summary", time: 60 },
          "Other": {
            question: "Please describe your issue",
            input: true,
            next: { summary: "summary", time: 45 }
          }
        }
      }
    }
  };
  
  export default decisionTreeConfig;