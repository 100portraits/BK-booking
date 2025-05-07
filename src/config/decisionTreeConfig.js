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
                  "Inner Tube": { summary: "summary", time: 40 },
                  "Outer Tire": { summary: "summary", time: 40 }
                }
              }
            }
          },
          "Chain": {
            question: "What do you need to do with the chain?",
            options: {
              "Tightening Chain": { summary: "summary", time: 25 },
              "Replacing Chain": { summary: "summary", time: 35 }
            }
          },
          "Gears": {
            question: "What type of gear system does your bike have?",
            options: {
              "Hub": { summary: "summary", time: 50 },
              "Derailleur": { summary: "summary", time: 40 }
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
                  "Inner Tube": { summary: "summary", time: 25 },
                  "Outer Tire": { summary: "summary", time: 35 }
                }
              },
              "Back": {
                question: "What do you need to repair?",
                options: {
                  "Inner Tube": { summary: "summary", time: 35 },
                  "Outer Tire": { summary: "summary", time: 35 }
                }
              }
            }
          },
          "Chain": {
            question: "What do you need to do with the chain?",
            options: {
              "Tightening Chain": { summary: "summary", time: 25 },
              "Replacing Chain": { summary: "summary", time: 40 }
            }
          },
          "Gears": {
            question: "What type of gear system does your bike have?",
            options: {
              "Hub": { summary: "summary", time: 55 },
              "Derailleur": { summary: "summary", time: 40 }
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