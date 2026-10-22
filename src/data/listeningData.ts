import { ListeningSection } from '../types';

// High-quality sample MP3 audio streams (royalty free audio / IELTS style podcasts)
const SAMPLE_AUDIO_1 = 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112191.mp3';
const SAMPLE_AUDIO_2 = 'https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3?filename=smooth-waters-115977.mp3';

export const ieltsListeningSections: ListeningSection[] = [
  {
    partNumber: 1,
    title: "Part 1: Travel Agency Consultation",
    questionRange: "Questions 1–10",
    audioUrl: SAMPLE_AUDIO_1,
    audioDuration: "5:04",
    transcript: `
[Agent]: Good morning, Global Trek Tours. How can I help you today?
[Customer]: Hello, I'm calling to inquire about custom holiday packages for small groups.
[Agent]: Certainly! We specialize in tailored itineraries. May I have your name, please?
[Customer]: Yes, it's David Miller. That's M-I-L-L-E-R.
[Agent]: Thank you, Mr. Miller. Where are you planning to travel?
[Customer]: We are looking at visiting Nepal and mountain regions in South Asia.
[Agent]: Wonderful choice! What is your approximate travel budget?
[Customer]: Our budget limit is $1500 per person.
[Agent]: That is very manageable. How many days are you planning for the trip?
[Customer]: We have two weeks off, so around 12 days of actual travel.
[Agent]: Great. Any dietary restrictions or preferences?
[Customer]: Please ensure vegetarian meals are provided throughout.
[Agent]: Noted. Now, regarding our company services...
[Agent]: Our specialty is nature holidays and outdoor trekking.
[Agent]: Furthermore, our overseas consultants deal mostly with Asia.
[Customer]: That sounds ideal. When can we come in to finalize desert and canyon routes?
[Agent]: For deserts and gorges, customers should come in the afternoon.
[Agent]: Also, please note that full medical emergency coverage is included standard.
[Agent]: And if you book soon, next month our big promotion will be on mountain trekking.
    `.trim(),
    questionGroups: [
      {
        id: "lg1",
        title: "Questions 1–5",
        instructions: "Complete the notes below. Write NO MORE THAN TWO WORDS AND/OR A NUMBER for each answer.",
        type: "text_input",
        questions: [
          {
            id: "lq1",
            number: 1,
            text: "Customer name: David ",
            prefixText: "Customer name: David ",
            suffixText: "",
            type: "text_input",
            correctAnswer: "Miller",
            explanation: "The customer spells out his surname: M-I-L-L-E-R.",
            paragraphLetter: "1",
            referenceQuote: "That's M-I-L-L-E-R.",
            audioTimestamp: 18
          },
          {
            id: "lq2",
            number: 2,
            text: "Preferred travel destination: ",
            prefixText: "Preferred travel destination: ",
            suffixText: "",
            type: "text_input",
            correctAnswer: "Nepal",
            explanation: "The customer mentions looking at visiting Nepal.",
            paragraphLetter: "1",
            referenceQuote: "We are looking at visiting Nepal and mountain regions",
            audioTimestamp: 32
          },
          {
            id: "lq3",
            number: 3,
            text: "Maximum budget per person: $",
            prefixText: "Maximum budget per person: $",
            suffixText: "",
            type: "text_input",
            correctAnswer: "1500",
            explanation: "The customer specifies $1500 as their upper limit.",
            paragraphLetter: "1",
            referenceQuote: "Our budget limit is $1500 per person.",
            audioTimestamp: 48
          },
          {
            id: "lq4",
            number: 4,
            text: "Length of holiday: ",
            prefixText: "Length of holiday: ",
            suffixText: " days",
            type: "text_input",
            correctAnswer: "12",
            explanation: "The customer confirms they want a 12-day trip.",
            paragraphLetter: "1",
            referenceQuote: "around 12 days of actual travel.",
            audioTimestamp: 65
          },
          {
            id: "lq5",
            number: 5,
            text: "Special request: Vegetarian ",
            prefixText: "Special request: Vegetarian ",
            suffixText: "",
            type: "text_input",
            correctAnswer: "meals",
            explanation: "The customer requests vegetarian meals during mountain stays.",
            paragraphLetter: "1",
            referenceQuote: "Please ensure vegetarian meals are provided throughout.",
            audioTimestamp: 82
          }
        ]
      },
      {
        id: "lg2",
        title: "Questions 6–10",
        instructions: "Choose the correct letter, A, B, or C.",
        type: "multiple_choice",
        questions: [
          {
            id: "lq6",
            number: 6,
            text: "The tour company specializes primarily in:",
            type: "multiple_choice",
            options: ["A. Big cities", "B. Nature holidays", "C. Cruise journeys"],
            correctAnswer: "B. Nature holidays",
            explanation: "The speaker highlights nature holidays and outdoor trekking as their core focus.",
            paragraphLetter: "1",
            referenceQuote: "Our specialty is nature holidays and outdoor trekking.",
            audioTimestamp: 105
          },
          {
            id: "lq7",
            number: 7,
            text: "The overseas consultants deal mostly with:",
            type: "multiple_choice",
            options: ["A. Asia", "B. North America", "C. Europe"],
            correctAnswer: "A. Asia",
            explanation: "The agent explains overseas consultants handle Asian destinations.",
            paragraphLetter: "1",
            referenceQuote: "our overseas consultants deal mostly with Asia.",
            audioTimestamp: 128
          },
          {
            id: "lq8",
            number: 8,
            text: "For deserts and gorges, customers should come in the:",
            type: "multiple_choice",
            options: ["A. Morning", "B. Afternoon", "C. Evening"],
            correctAnswer: "B. Afternoon",
            explanation: "The consultant recommends booking desert trips in the afternoon.",
            paragraphLetter: "1",
            referenceQuote: "For deserts and gorges, customers should come in the afternoon.",
            audioTimestamp: 150
          },
          {
            id: "lq9",
            number: 9,
            text: "Insurance coverage is included for:",
            type: "multiple_choice",
            options: ["A. Medical emergencies", "B. Flight cancellations", "C. Lost baggage"],
            correctAnswer: "A. Medical emergencies",
            explanation: "Standard packages automatically include medical emergency coverage.",
            paragraphLetter: "1",
            referenceQuote: "full medical emergency coverage is included standard.",
            audioTimestamp: 172
          },
          {
            id: "lq10",
            number: 10,
            text: "Next month, the special tour promotion will focus on:",
            type: "multiple_choice",
            options: ["A. Wildlife safari", "B. Cultural heritage", "C. Mountain trekking"],
            correctAnswer: "C. Mountain trekking",
            explanation: "The agent confirms next month's promotion is centered on mountain trekking.",
            paragraphLetter: "1",
            referenceQuote: "next month our big promotion will be on mountain trekking.",
            audioTimestamp: 195
          }
        ]
      }
    ]
  },
  {
    partNumber: 2,
    title: "Part 2: Community Recreation Center Orientation",
    questionRange: "Questions 11–20",
    audioUrl: SAMPLE_AUDIO_2,
    audioDuration: "6:15",
    transcript: `
[Guide]: Welcome everyone to the Oakridge Community Recreation Center!
[Guide]: Today I'll give you a brief overview of our newly renovated facilities and weekly activity schedule.
[Guide]: First of all, regarding our aquatic center: The brand new heated pool opens this Saturday weekend.
[Guide]: For those interested in fitness memberships, full-time students enjoy a 25% reduction on monthly pass fees.
[Guide]: If you are taking group fitness classes, please note that all morning yoga sessions meet in Studio A.
[Guide]: For visitors arriving by car, show your member card at reception for up to 3 hours free parking.
[Guide]: When grabbing a lunch bite at the center cafe, our cafe menu uses 100% organic local produce.
[Guide]: Now turning to general safety and member guidelines:
[Guide]: Pick up your locker key from the main reception desk before heading into the changing rooms.
[Guide]: Please remember that children under 12 require adult supervision at all times.
[Guide]: If you wish to play tennis on our outdoor courts, reservations for tennis courts require advance booking.
[Guide]: Need internet access? Check the noticeboard in the main lobby for the guest Wi-Fi code.
[Guide]: Finally, as a special welcoming gift, every annual member receives a complimentary sports towel.
    `.trim(),
    questionGroups: [
      {
        id: "lg3",
        title: "Questions 11–15",
        instructions: "Choose the correct letter, A, B, or C.",
        type: "multiple_choice",
        questions: [
          {
            id: "lq11",
            number: 11,
            text: "The new swimming pool will officially open on:",
            type: "multiple_choice",
            options: ["A. Monday morning", "B. Wednesday afternoon", "C. Saturday weekend"],
            correctAnswer: "C. Saturday weekend",
            explanation: "The guide announces the pool opening takes place on Saturday weekend.",
            paragraphLetter: "2",
            referenceQuote: "The brand new heated pool opens this Saturday weekend.",
            audioTimestamp: 25
          },
          {
            id: "lq12",
            number: 12,
            text: "Gym memberships for students receive a discount of:",
            type: "multiple_choice",
            options: ["A. 15%", "B. 25%", "C. 30%"],
            correctAnswer: "B. 25%",
            explanation: "Students with valid ID cards get a 25% discount.",
            paragraphLetter: "2",
            referenceQuote: "full-time students enjoy a 25% reduction on monthly pass fees.",
            audioTimestamp: 50
          },
          {
            id: "lq13",
            number: 13,
            text: "Yoga classes take place in:",
            type: "multiple_choice",
            options: ["A. Studio A", "B. Studio B", "C. Main Hall"],
            correctAnswer: "A. Studio A",
            explanation: "Yoga classes are held in Studio A.",
            paragraphLetter: "2",
            referenceQuote: "all morning yoga sessions meet in Studio A.",
            audioTimestamp: 75
          },
          {
            id: "lq14",
            number: 14,
            text: "Parking for members is free for up to:",
            type: "multiple_choice",
            options: ["A. 1 hour", "B. 2 hours", "C. 3 hours"],
            correctAnswer: "C. 3 hours",
            explanation: "Validation provides 3 free hours of parking.",
            paragraphLetter: "2",
            referenceQuote: "show your member card at reception for up to 3 hours free parking.",
            audioTimestamp: 100
          },
          {
            id: "lq15",
            number: 15,
            text: "The cafeteria menu emphasizes:",
            type: "multiple_choice",
            options: ["A. Organic local produce", "B. Fast food snacks", "C. High-protein shakes"],
            correctAnswer: "A. Organic local produce",
            explanation: "The cafe focuses on organic, locally sourced meals.",
            paragraphLetter: "2",
            referenceQuote: "our cafe menu uses 100% organic local produce.",
            audioTimestamp: 125
          }
        ]
      },
      {
        id: "lg4",
        title: "Questions 16–20",
        instructions: "Complete the sentences below. Write ONE WORD ONLY for each answer.",
        type: "text_input",
        questions: [
          {
            id: "lq16",
            number: 16,
            text: "Locker keys can be retrieved from the ",
            prefixText: "Locker keys can be retrieved from the ",
            suffixText: " desk.",
            type: "text_input",
            correctAnswer: "reception",
            explanation: "The speaker directs members to collect locker keys at the main reception desk.",
            paragraphLetter: "2",
            referenceQuote: "Pick up your locker key from the main reception desk",
            audioTimestamp: 152
          },
          {
            id: "lq17",
            number: 17,
            text: "Children under 12 must be accompanied by an ",
            prefixText: "Children under 12 must be accompanied by an ",
            suffixText: ".",
            type: "text_input",
            correctAnswer: "adult",
            explanation: "Safety rules mandate adult supervision for young children.",
            paragraphLetter: "2",
            referenceQuote: "children under 12 require adult supervision at all times.",
            audioTimestamp: 178
          },
          {
            id: "lq18",
            number: 18,
            text: "The outdoor tennis court requires prior ",
            prefixText: "The outdoor tennis court requires prior ",
            suffixText: ".",
            type: "text_input",
            correctAnswer: "booking",
            explanation: "Members must make an advance booking to reserve tennis courts.",
            paragraphLetter: "2",
            referenceQuote: "reservations for tennis courts require advance booking.",
            audioTimestamp: 205
          },
          {
            id: "lq19",
            number: 19,
            text: "Free Wi-Fi password is available on the center ",
            prefixText: "Free Wi-Fi password is available on the center ",
            suffixText: ".",
            type: "text_input",
            correctAnswer: "noticeboard",
            explanation: "The Wi-Fi code is posted on the noticeboard in the main lobby.",
            paragraphLetter: "2",
            referenceQuote: "Check the noticeboard in the main lobby for the guest Wi-Fi code.",
            audioTimestamp: 230
          },
          {
            id: "lq20",
            number: 20,
            text: "Annual members receive a complimentary ",
            prefixText: "Annual members receive a complimentary ",
            suffixText: ".",
            type: "text_input",
            correctAnswer: "towel",
            explanation: "Annual membership includes a free sports towel.",
            paragraphLetter: "2",
            referenceQuote: "every annual member receives a complimentary sports towel.",
            audioTimestamp: 255
          }
        ]
      }
    ]
  },
  {
    partNumber: 3,
    title: "Part 3: University Research Project Discussion",
    questionRange: "Questions 21–30",
    audioUrl: SAMPLE_AUDIO_1,
    audioDuration: "6:40",
    transcript: `
[Professor]: Welcome Sarah and Mark. Let's review your research draft on urban renewable energy integration.
[Sarah]: Thank you Professor. We've compiled the survey data from 500 local households.
[Sarah]: Surprisingly, upfront cost wasn't the biggest obstacle; lack of information was.
[Professor]: That is a key finding. Now regarding your draft organization:
[Professor]: I suggest you condense and streamline your methodology section.
[Mark]: That makes sense. Also, regarding our storage case study...
[Mark]: Adding comparison data from Germany and Denmark will really bolster our case.
[Professor]: Excellent idea. Don't forget your timeline limits.
[Professor]: Remember, the absolute deadline for submission is November 1st.
[Sarah]: Understood. And for the upcoming departmental symposium presentation...
[Sarah]: An interactive slide deck will work best for the Q&A session.
    `.trim(),
    questionGroups: [
      {
        id: "lg5",
        title: "Questions 21–25",
        instructions: "Choose the correct letter, A, B, or C.",
        type: "multiple_choice",
        questions: [
          {
            id: "lq21",
            number: 21,
            text: "What surprise element did Sarah find in the household survey?",
            type: "multiple_choice",
            options: [
              "A. High initial cost was not the main deterrent",
              "B. Solar panel adoption was lower than expected",
              "C. Elderly residents were very supportive of smart meters"
            ],
            correctAnswer: "A. High initial cost was not the main deterrent",
            explanation: "Sarah notes that lack of clear information, rather than upfront cost, was the primary barrier.",
            paragraphLetter: "3",
            referenceQuote: "Surprisingly, upfront cost wasn't the biggest obstacle; lack of information was.",
            audioTimestamp: 30
          },
          {
            id: "lq22",
            number: 22,
            text: "What does Professor James advise them to focus on next?",
            type: "multiple_choice",
            options: [
              "A. Collecting more survey samples",
              "B. Analyzing energy grid tariff rates",
              "C. Streamlining the statistical methodology section"
            ],
            correctAnswer: "C. Streamlining the statistical methodology section",
            explanation: "The professor suggests making the methodology section more concise.",
            paragraphLetter: "3",
            referenceQuote: "I suggest you condense and streamline your methodology section.",
            audioTimestamp: 65
          },
          {
            id: "lq23",
            number: 23,
            text: "Mark agrees that their case study on battery storage should be:",
            type: "multiple_choice",
            options: [
              "A. Moved to the appendix",
              "B. Expanded with international comparisons",
              "C. Removed completely"
            ],
            correctAnswer: "B. Expanded with international comparisons",
            explanation: "Mark agrees adding European data will strengthen their arguments.",
            paragraphLetter: "3",
            referenceQuote: "Adding comparison data from Germany and Denmark will really bolster our case.",
            audioTimestamp: 100
          },
          {
            id: "lq24",
            number: 24,
            text: "When is the final thesis submission deadline?",
            type: "multiple_choice",
            options: [
              "A. October 15th",
              "B. November 1st",
              "C. November 20th"
            ],
            correctAnswer: "B. November 1st",
            explanation: "The deadline is confirmed as November 1st at midnight.",
            paragraphLetter: "3",
            referenceQuote: "Remember, the absolute deadline for submission is November 1st.",
            audioTimestamp: 135
          },
          {
            id: "lq25",
            number: 25,
            text: "Which presentation tool will they use for the departmental symposium?",
            type: "multiple_choice",
            options: [
              "A. Interactive slide deck",
              "B. Printed poster display",
              "C. Video documentary"
            ],
            correctAnswer: "A. Interactive slide deck",
            explanation: "They decide to prepare an interactive slide deck.",
            paragraphLetter: "3",
            referenceQuote: "An interactive slide deck will work best for the Q&A session.",
            audioTimestamp: 170
          }
        ]
      }
    ]
  },
  {
    partNumber: 4,
    title: "Part 4: Lecture on Deep Sea Bioluminescence",
    questionRange: "Questions 31–40",
    audioUrl: SAMPLE_AUDIO_2,
    audioDuration: "7:10",
    transcript: `
[Lecturer]: Good afternoon, students. Today's oceanography lecture focuses on bioluminescence—the chemical production of light by marine organisms in the abyssal zone.
[Lecturer]: Biochemically, Luciferin reacts with oxygen in the presence of an enzyme catalyst.
[Lecturer]: In ecological functions, The majority of organisms utilize light pulses primarily for defense.
[Lecturer]: Consider the deep-sea anglerfish: The illicium, or glowing appendage, extends directly from the fish's head.
[Lecturer]: From a thermodynamic perspective, Nearly 100% of energy is converted to light, producing virtually no thermal heat.
[Lecturer]: In modern medicine, glowing markers help scientists monitor living cancer cells.
[Lecturer]: Defensive adaptations abound: Dwellers in the bathypelagic zone squirt glowing mucus into the water.
[Lecturer]: Counterillumination is equally clever: Matching downwelling light from above conceals silhouette shadows.
[Lecturer]: On an enzymatic level, The reaction is catalyzed by the specific enzyme luciferase.
[Lecturer]: In coastal waters, Physical disturbance or wave movement triggers rapid dinoflagellate flashes.
[Lecturer]: Spectral analysis reveals that Most marine bioluminescence emits in the blue-green spectrum.
    `.trim(),
    questionGroups: [
      {
        id: "lg6",
        title: "Questions 31–40",
        instructions: "Complete the notes below. Write ONE WORD ONLY for each answer.",
        type: "text_input",
        questions: [
          {
            id: "lq31",
            number: 31,
            text: "Bioluminescence occurs when a chemical called luciferin reacts with ",
            prefixText: "Bioluminescence occurs when a chemical called luciferin reacts with ",
            suffixText: ".",
            type: "text_input",
            correctAnswer: "oxygen",
            explanation: "The lecturer explains luciferin oxidation produces biological light.",
            paragraphLetter: "4",
            referenceQuote: "Luciferin reacts with oxygen in the presence of an enzyme catalyst.",
            audioTimestamp: 35
          },
          {
            id: "lq32",
            number: 32,
            text: "In the deep ocean, over 80% of species produce light mainly for ",
            prefixText: "In the deep ocean, over 80% of species produce light mainly for ",
            suffixText: ".",
            type: "text_input",
            correctAnswer: "defense",
            explanation: "Light production primarily serves as a defense mechanism against predators.",
            paragraphLetter: "4",
            referenceQuote: "The majority of organisms utilize light pulses primarily for defense.",
            audioTimestamp: 70
          },
          {
            id: "lq33",
            number: 33,
            text: "Some anglerfish use a glowing lure attached to their ",
            prefixText: "Some anglerfish use a glowing lure attached to their ",
            suffixText: " to attract prey.",
            type: "text_input",
            correctAnswer: "head",
            explanation: "Anglerfish possess a bioluminescent lure protruding from their head.",
            paragraphLetter: "4",
            referenceQuote: "glowing appendage, extends directly from the fish's head.",
            audioTimestamp: 105
          },
          {
            id: "lq34",
            number: 34,
            text: "Unlike sunlight, bioluminescent light emits almost no ",
            prefixText: "Unlike sunlight, bioluminescent light emits almost no ",
            suffixText: ".",
            type: "text_input",
            correctAnswer: "heat",
            explanation: "Bioluminescence is termed 'cold light' because minimal heat is lost.",
            paragraphLetter: "4",
            referenceQuote: "producing virtually no thermal heat.",
            audioTimestamp: 140
          },
          {
            id: "lq35",
            number: 35,
            text: "Medical researchers use bioluminescent enzymes to track cancer ",
            prefixText: "Medical researchers use bioluminescent enzymes to track cancer ",
            suffixText: ".",
            type: "text_input",
            correctAnswer: "cells",
            explanation: "Luciferase is employed in oncology to track malignant cells.",
            paragraphLetter: "4",
            referenceQuote: "glowing markers help scientists monitor living cancer cells.",
            audioTimestamp: 175
          },
          {
            id: "lq36",
            number: 36,
            text: "Deep-sea squid release bioluminescent clouds of glowing ",
            prefixText: "Deep-sea squid release bioluminescent clouds of glowing ",
            suffixText: " to confuse attackers.",
            type: "text_input",
            correctAnswer: "mucus",
            explanation: "Squid expel glowing mucus as a distraction.",
            paragraphLetter: "4",
            referenceQuote: "Dwellers in the bathypelagic zone squirt glowing mucus into the water.",
            audioTimestamp: 210
          },
          {
            id: "lq37",
            number: 37,
            text: "Counterillumination allows fish to camouflage against ambient light from ",
            prefixText: "Counterillumination allows fish to camouflage against ambient light from ",
            suffixText: ".",
            type: "text_input",
            correctAnswer: "above",
            explanation: "Ventral photophores match light coming from the surface above.",
            paragraphLetter: "4",
            referenceQuote: "Matching downwelling light from above conceals silhouette shadows.",
            audioTimestamp: 245
          },
          {
            id: "lq38",
            number: 38,
            text: "The enzyme that catalyzes luciferin oxidation is named ",
            prefixText: "The enzyme that catalyzes luciferin oxidation is named ",
            suffixText: ".",
            type: "text_input",
            correctAnswer: "luciferase",
            explanation: "The enzymatic catalyst is luciferase.",
            paragraphLetter: "4",
            referenceQuote: "The reaction is catalyzed by the specific enzyme luciferase.",
            audioTimestamp: 280
          },
          {
            id: "lq39",
            number: 39,
            text: "Dinoflagellate plankton emit light when triggered by physical ",
            prefixText: "Dinoflagellate plankton emit light when triggered by physical ",
            suffixText: ".",
            type: "text_input",
            correctAnswer: "movement",
            explanation: "Mechanical agitation triggers plankton glow.",
            paragraphLetter: "4",
            referenceQuote: "Physical disturbance or wave movement triggers rapid dinoflagellate flashes.",
            audioTimestamp: 315
          },
          {
            id: "lq40",
            number: 40,
            text: "The wavelength color of most abyssal light emission is ",
            prefixText: "The wavelength color of most abyssal light emission is ",
            suffixText: ".",
            type: "text_input",
            correctAnswer: "blue",
            explanation: "Blue-green wavelengths travel farthest in seawater.",
            paragraphLetter: "4",
            referenceQuote: "Most marine bioluminescence emits in the blue-green spectrum.",
            audioTimestamp: 350
          }
        ]
      }
    ]
  },
  {
    partNumber: 5,
    title: "Part 5: Environmental Science Seminar on Renewable Microgrids",
    questionRange: "Questions 41–50",
    audioUrl: SAMPLE_AUDIO_1,
    audioDuration: "6:50",
    transcript: `
[Speaker]: Welcome to today's seminar on decentralized microgrids and urban energy resilience.
[Speaker]: The foundational benefit is security: Microgrids can island themselves during major central grid failure.
[Speaker]: To optimize distribution efficiency: Integrating automated smart meters balances peak consumption demand.
[Speaker]: Regarding novel long-term energy storage technologies: Green hydrogen electrolysis offers high capacity long-duration energy storage.
[Speaker]: From a regulatory standpoint: The policy objective is accelerating carbon emission reductions.
[Speaker]: Empirical evidence from northern Europe shows: The trial island network recorded an impressive 82% annual self-sufficiency rate.
[Speaker]: Automation plays a crucial safety role: Controllers disconnect the system safely during extreme weather disturbances.
[Speaker]: During midday solar peaks: Surplus power charges chemical battery banks.
[Speaker]: Looking at future mobility integration: Vehicle-to-grid technology injects energy back into the distribution grid.
[Speaker]: Community benefits are financial too: Peer-to-peer trading reduces household electricity bills.
[Speaker]: Despite the operational benefits: The predominant barrier remains substantial initial capital expenditure.
    `.trim(),
    questionGroups: [
      {
        id: "lg7",
        title: "Questions 41–45",
        instructions: "Choose the correct letter, A, B, or C.",
        type: "multiple_choice",
        questions: [
          {
            id: "lq41",
            number: 41,
            text: "Primary advantage of localized microgrids is:",
            type: "multiple_choice",
            options: ["A. Lower installation cost", "B. Protection during central grid blackouts", "C. Eliminating battery storage"],
            correctAnswer: "B. Protection during central grid blackouts",
            explanation: "The speaker highlights resilience during wide-area power outages.",
            paragraphLetter: "5",
            referenceQuote: "Microgrids can island themselves during major central grid failure.",
            audioTimestamp: 30
          },
          {
            id: "lq42",
            number: 42,
            text: "Community solar energy projects operate best when combined with:",
            type: "multiple_choice",
            options: ["A. Diesel backup generators", "B. Smart metering software", "C. Nuclear power plants"],
            correctAnswer: "B. Smart metering software",
            explanation: "Smart meters optimize power distribution across households.",
            paragraphLetter: "5",
            referenceQuote: "Integrating automated smart meters balances peak consumption demand.",
            audioTimestamp: 65
          },
          {
            id: "lq43",
            number: 43,
            text: "The main energy storage chemical analyzed in the study is:",
            type: "multiple_choice",
            options: ["A. Green hydrogen", "B. Methane gas", "C. Lithium-sulfur"],
            correctAnswer: "A. Green hydrogen",
            explanation: "Green hydrogen electrolysis is evaluated for long-duration storage.",
            paragraphLetter: "5",
            referenceQuote: "Green hydrogen electrolysis offers high capacity long-duration energy storage.",
            audioTimestamp: 100
          },
          {
            id: "lq44",
            number: 44,
            text: "Governments subsidize clean microgrid projects primarily to reduce:",
            type: "multiple_choice",
            options: ["A. Carbon emissions", "B. Water consumption", "C. Noise pollution"],
            correctAnswer: "A. Carbon emissions",
            explanation: "Subsidies focus on decarbonizing municipal infrastructure.",
            paragraphLetter: "5",
            referenceQuote: "The policy objective is accelerating carbon emission reductions.",
            audioTimestamp: 135
          },
          {
            id: "lq45",
            number: 45,
            text: "The trial microgrid project in Denmark achieved energy self-sufficiency of:",
            type: "multiple_choice",
            options: ["A. 65%", "B. 82%", "C. 98%"],
            correctAnswer: "B. 82%",
            explanation: "The Danish pilot program sustained an 82% self-sufficiency rating annually.",
            paragraphLetter: "5",
            referenceQuote: "The trial island network recorded an impressive 82% annual self-sufficiency rate.",
            audioTimestamp: 170
          }
        ]
      },
      {
        id: "lg8",
        title: "Questions 46–50",
        instructions: "Complete the sentences below. Write ONE WORD ONLY for each answer.",
        type: "text_input",
        questions: [
          {
            id: "lq46",
            number: 46,
            text: "Microgrid controllers automatically disconnect from the main grid during extreme ",
            prefixText: "Microgrid controllers automatically disconnect from the main grid during extreme ",
            suffixText: ".",
            type: "text_input",
            correctAnswer: "weather",
            explanation: "Automatic islanding occurs during extreme weather events.",
            paragraphLetter: "5",
            referenceQuote: "Controllers disconnect the system safely during extreme weather disturbances.",
            audioTimestamp: 205
          },
          {
            id: "lq47",
            number: 47,
            text: "Excess solar power generated at noon is routed into lithium-ion ",
            prefixText: "Excess solar power generated at noon is routed into lithium-ion ",
            suffixText: ".",
            type: "text_input",
            correctAnswer: "batteries",
            explanation: "Midday surplus charges battery reserves.",
            paragraphLetter: "5",
            referenceQuote: "Surplus power charges chemical battery banks.",
            audioTimestamp: 240
          },
          {
            id: "lq48",
            number: 48,
            text: "Bidirectional charging enables electric vehicles to return power to the ",
            prefixText: "Bidirectional charging enables electric vehicles to return power to the ",
            suffixText: ".",
            type: "text_input",
            correctAnswer: "grid",
            explanation: "Vehicle-to-grid (V2G) feeds back into the local network.",
            paragraphLetter: "5",
            referenceQuote: "Vehicle-to-grid technology injects energy back into the distribution grid.",
            audioTimestamp: 275
          },
          {
            id: "lq49",
            number: 49,
            text: "Neighborhood energy sharing lowers average monthly electrical ",
            prefixText: "Neighborhood energy sharing lowers average monthly electrical ",
            suffixText: ".",
            type: "text_input",
            correctAnswer: "bills",
            explanation: "Local trading decreases consumer expenditure.",
            paragraphLetter: "5",
            referenceQuote: "Peer-to-peer trading reduces household electricity bills.",
            audioTimestamp: 310
          },
          {
            id: "lq50",
            number: 50,
            text: "The primary challenge for remote microgrid adoption is high initial ",
            prefixText: "The primary challenge for remote microgrid adoption is high initial ",
            suffixText: ".",
            type: "text_input",
            correctAnswer: "capital",
            explanation: "High upfront capital investment is the key barrier.",
            paragraphLetter: "5",
            referenceQuote: "The predominant barrier remains substantial initial capital expenditure.",
            audioTimestamp: 345
          }
        ]
      }
    ]
  }
];
