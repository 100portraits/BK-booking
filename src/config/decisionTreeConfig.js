// src/config/decisionTreeConfig.js

const decisionTreeConfig = {
    question: "Select Bike Type",
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
                  "Inner Tube": "summary",
                  "Outer Tire": "summary"
                }
              },
              "Back": {
                question: "What do you need to repair?",
                options: {
                  "Inner Tube": {
                    question: "Does your bike have a chainguard?",
                    options: {
                      "Chainguard": "summary",
                      "No Chainguard": "summary"
                    }
                  },
                  "Outer Tire": {
                    question: "Does your bike have a chainguard?",
                    options: {
                      "Chainguard": "summary",
                      "No Chainguard": "summary"
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
                  "Chainguard": "summary",
                  "No Chainguard": "summary"
                }
              },
              "Replacing Chain": {
                question: "Does your bike have a chainguard?",
                options: {
                  "Chainguard": "summary",
                  "No Chainguard": "summary"
                }
              },
              "Other Chain Issues": {
                question: "Does your bike have a chainguard?",
                options: {
                  "Chainguard": "summary",
                  "No Chainguard": "summary"
                }
              }
            }
          },
          "Gears": {
            question: "Select Gears Category",
            options: {
              "Hub": {
                question: "What type of hub gear does your bike have?",
                input: true,
                placeholder: "e.g., Nexus 7, Nexus 3 (leave empty if unsure)",
                options: {
                  "Chainguard": "summary",
                  "No Chainguard": "summary"
                }
              },
              "Derailleur": {
                question: "Does your bike have a chainguard?",
                options: {
                  "Chainguard": "summary",
                  "No Chainguard": "summary"
                }
              }
            }
          },
          "Brakes": {
            question: "Select Brake Type",
            options: {
              "Rim": "summary",
              "Disc": "summary",
              "Drum/Coaster": "summary"
            }
          },
          "Truing Wheel": "summary",
          "Other": {
            question: "Please describe your issue",
            input: true, // Indicates that user needs to provide a comment
            next: "summary"
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
                  "Inner Tube": "summary",
                  "Outer Tire": "summary"
                }
              },
              "Back": {
                question: "What do you need to repair?",
                options: {
                  "Inner Tube": "summary",
                  "Outer Tire": "summary"
                }
              }
            }
          },
          "Chain": {
            question: "What do you need to do with the chain?",
            options: {
              "Tightening Chain": {
                question: "Select Chain Type",
                options: {
                  "Singlespeed": {
                    question: "Does your bike have a chainguard?",
                    options: {
                      "Chainguard": "summary",
                      "No Chainguard": "summary"
                    }
                  },
                  "Derailleur": "summary"
                }
              },
              "Replacing Chain": {
                question: "Select Chain Type",
                options: {
                  "Singlespeed": {
                    question: "Does your bike have a chainguard?",
                    options: {
                      "Chainguard": "summary",
                      "No Chainguard": "summary"
                    }
                  },
                  "Derailleur": "summary"
                }
              },
              "Other Chain Issues": {
                question: "Select Chain Type",
                options: {
                  "Singlespeed": {
                    question: "Does your bike have a chainguard?",
                    options: {
                      "Chainguard": "summary",
                      "No Chainguard": "summary"
                    }
                  },
                  "Derailleur": "summary"
                }
              }
            }
          },
          "Gears": {
            question: "Select Gears Category",
            options: {
              "Hub": {
                question: "Does your bike have a chainguard?",
                options: {
                  "Chainguard": "summary",
                  "No Chainguard": "summary"
                }
              },
              "Derailleur": {
                question: "Does your bike have a chainguard?",
                options: {
                  "Chainguard": "summary",
                  "No Chainguard": "summary"
                }
              }
            }
          },
          "Brakes": {
            question: "Select Brake Type",
            options: {
              "Rim": "summary",
              "Disc": "summary",
              "Drum/Coaster": "summary"
            }
          },
          "Truing Wheel": "summary",
          "Other": {
            question: "Please describe your issue",
            input: true,
            next: "summary"
          }
        }
      }
    }
  };
  
  export default decisionTreeConfig;
