import { Passage } from '../types';

export const ieltsPassages: Passage[] = [
  {
    id: 1,
    title: "The Development of Modern Telegraphy",
    subtitle: "How the electric telegraph transformed world communications in the 19th century",
    questionRange: "Read the text and answer questions 1-13",
    paragraphs: [
      {
        letter: "A",
        text: "Before the advent of the electric telegraph in the 1830s, long-distance communication relied on optical systems such as smoke signals, signal lamps, or mechanical semaphores. While these visual systems were revolutionary for their time, they suffered from severe limitations: weather conditions like dense fog or heavy rain rendered them useless, and they could only operate during daylight hours."
      },
      {
        letter: "B",
        text: "The breakthrough came when Samuel Morse, alongside Alfred Vail, developed an practical electromagnetic telegraph. Morse devised a simple code consisting of short dots and long dashes representing letters and numbers. By sending pulses of electric current along iron wires, messages could be transmitted almost instantaneously over vast geographic distances."
      },
      {
        letter: "C",
        text: "The financial impact of telegraphy was immediate and profound. Stock prices, commodity valuations, and news that previously took weeks to travel across continents via steamship could now be updated hourly. Commercial markets rapidly synchronized, reducing trade volatility and laying the foundation for modern global finance."
      },
      {
        letter: "D",
        text: "Laying submarine cables across oceans proved to be one of the greatest engineering feats of the Victorian era. The first transatlantic telegraph cable, completed in 1858 after multiple failed attempts, initially worked for only three weeks before deteriorating. However, by 1866, durable copper cables insulated with gutta-percha permanently linked North America and Europe."
      },
      {
        letter: "E",
        text: "Governments quickly recognized the strategic military value of real-time communication. During the Crimean War and the American Civil War, military commanders used telegraph lines to direct troops, request reinforcements, and report battle outcomes to wartime leaders in capital cities."
      },
      {
        letter: "F",
        text: "Beyond trade and defense, the telegraph fundamentally altered journalism. News organizations like Reuters and the Associated Press emerged to gather and distribute concise dispatches globally. This birthed the 'inverted pyramid' style of news writing, prioritizing essential facts in case wire transmissions were abruptly cut."
      }
    ],
    questionGroups: [
      {
        id: "q1-6",
        title: "Questions 1-6",
        passageRange: "Reading Passage 1 has six paragraphs, A-F",
        instructions: "Do the following statements agree with the information given in Reading Passage 1? Write TRUE, FALSE, or NOT GIVEN.",
        type: "true_false",
        questions: [
          {
            id: "q1",
            number: 1,
            text: "Optical telegraph systems were capable of functioning effectively during nighttime hours.",
            type: "true_false",
            options: ["TRUE", "FALSE", "NOT GIVEN"],
            correctAnswer: "FALSE",
            explanation: "Paragraph A states optical systems could only operate during daylight hours.",
            paragraphLetter: "A",
            referenceQuote: "... weather conditions like dense fog or heavy rain rendered them useless, and they could only operate during daylight hours."
          },
          {
            id: "q2",
            number: 2,
            text: "Samuel Morse collaborated with Alfred Vail to create the practical electromagnetic telegraph.",
            type: "true_false",
            options: ["TRUE", "FALSE", "NOT GIVEN"],
            correctAnswer: "TRUE",
            explanation: "Paragraph B explicitly mentions Samuel Morse developed the telegraph alongside Alfred Vail.",
            paragraphLetter: "B",
            referenceQuote: "... Samuel Morse, alongside Alfred Vail, developed an practical electromagnetic telegraph."
          },
          {
            id: "q3",
            number: 3,
            text: "The first transatlantic cable in 1858 operated reliably for over ten years.",
            type: "true_false",
            options: ["TRUE", "FALSE", "NOT GIVEN"],
            correctAnswer: "FALSE",
            explanation: "Paragraph D notes the 1858 cable initially worked for only three weeks before deteriorating.",
            paragraphLetter: "D",
            referenceQuote: "The first transatlantic telegraph cable, completed in 1858 after multiple failed attempts, initially worked for only three weeks before deteriorating."
          },
          {
            id: "q4",
            number: 4,
            text: "Gutta-percha was a synthetic material invented specifically for ocean cable insulation.",
            type: "true_false",
            options: ["TRUE", "FALSE", "NOT GIVEN"],
            correctAnswer: "NOT GIVEN",
            explanation: "Paragraph D mentions gutta-percha was used as insulation, but does not state if it was a synthetic material invented specifically for ocean cable insulation.",
            paragraphLetter: "D",
            referenceQuote: "However, by 1866, durable copper cables insulated with gutta-percha permanently linked North America and Europe."
          },
          {
            id: "q5",
            number: 5,
            text: "Telegraph lines were utilized by military leaders during the Crimean War.",
            type: "true_false",
            options: ["TRUE", "FALSE", "NOT GIVEN"],
            correctAnswer: "TRUE",
            explanation: "Paragraph E states commanders used telegraph lines during the Crimean War.",
            paragraphLetter: "E",
            referenceQuote: "During the Crimean War and the American Civil War, military commanders used telegraph lines to direct troops..."
          },
          {
            id: "q6",
            number: 6,
            text: "The inverted pyramid journalism structure was developed because wire signals could be interrupted.",
            type: "true_false",
            options: ["TRUE", "FALSE", "NOT GIVEN"],
            correctAnswer: "TRUE",
            explanation: "Paragraph F explains journalists prioritized essential facts in case wire transmissions were abruptly cut.",
            paragraphLetter: "F",
            referenceQuote: "This birthed the 'inverted pyramid' style of news writing, prioritizing essential facts in case wire transmissions were abruptly cut."
          }
        ]
      },
      {
        id: "q7-13",
        title: "Questions 7-13",
        passageRange: "Complete the summary below.",
        instructions: "Choose NO MORE THAN TWO WORDS from the passage for each answer.",
        wordLimitNotice: "Choose NO MORE THAN TWO WORDS from the passage for each answer.",
        type: "text_input",
        questions: [
          {
            id: "q7",
            number: 7,
            text: "Early visual transmission tools like smoke signals were heavily restricted by bad weather such as",
            prefixText: "Early visual transmission tools like smoke signals were heavily restricted by bad weather such as ",
            suffixText: " or rain.",
            type: "text_input",
            correctAnswer: "dense fog",
            explanation: "Paragraph A states weather conditions like 'dense fog' or heavy rain rendered optical systems useless.",
            paragraphLetter: "A",
            referenceQuote: "... weather conditions like dense fog or heavy rain rendered them useless, and they could only operate during daylight hours."
          },
          {
            id: "q8",
            number: 8,
            text: "Morse code relies on combinations of short dots and long",
            prefixText: "Morse code relies on combinations of short dots and long ",
            suffixText: " to represent characters.",
            type: "text_input",
            correctAnswer: "dashes",
            explanation: "Paragraph B states Morse devised a code of short dots and long dashes.",
            paragraphLetter: "B",
            referenceQuote: "Morse devised a simple code consisting of short dots and long dashes representing letters and numbers."
          },
          {
            id: "q9",
            number: 9,
            text: "Rapid telegraph communication led to less",
            prefixText: "Rapid telegraph communication led to less ",
            suffixText: " in global trade markets.",
            type: "text_input",
            correctAnswer: "trade volatility",
            explanation: "Paragraph C notes commercial markets synchronized, reducing trade volatility.",
            paragraphLetter: "C",
            referenceQuote: "Commercial markets rapidly synchronized, reducing trade volatility and laying the foundation for modern global finance."
          },
          {
            id: "q10",
            number: 10,
            text: "The cables laid across ocean beds were shielded with a natural substance named",
            prefixText: "The cables laid across ocean beds were shielded with a natural substance named ",
            suffixText: ".",
            type: "text_input",
            correctAnswer: "gutta-percha",
            explanation: "Paragraph D states cables were insulated with gutta-percha.",
            paragraphLetter: "D",
            referenceQuote: "... durable copper cables insulated with gutta-percha permanently linked North America and Europe."
          },
          {
            id: "q11",
            number: 11,
            text: "Commander dispatches during wartime informed central leaders in major",
            prefixText: "Commander dispatches during wartime informed central leaders in major ",
            suffixText: ".",
            type: "text_input",
            correctAnswer: "capital cities",
            explanation: "Paragraph E describes reporting battle outcomes to wartime leaders in capital cities.",
            paragraphLetter: "E",
            referenceQuote: "... report battle outcomes to wartime leaders in capital cities."
          },
          {
            id: "q12",
            number: 12,
            text: "Global news agencies such as Reuters distributed brief news",
            prefixText: "Global news agencies such as Reuters distributed brief news ",
            suffixText: " to newspapers.",
            type: "text_input",
            correctAnswer: "dispatches",
            explanation: "Paragraph F states agencies emerged to gather and distribute concise dispatches globally.",
            paragraphLetter: "F",
            referenceQuote: "News organizations like Reuters and the Associated Press emerged to gather and distribute concise dispatches globally."
          },
          {
            id: "q13",
            number: 13,
            text: "The practical style of journalistic writing placing key facts first became known as the inverted",
            prefixText: "The practical style of journalistic writing placing key facts first became known as the inverted ",
            suffixText: ".",
            type: "text_input",
            correctAnswer: "pyramid",
            explanation: "Paragraph F refers to the 'inverted pyramid' style of news writing.",
            paragraphLetter: "F",
            referenceQuote: "This birthed the 'inverted pyramid' style of news writing, prioritizing essential facts..."
          }
        ]
      }
    ]
  },
  {
    id: 2,
    title: "[COM] The Purpose of Facial Expressions",
    subtitle: "Do facial expressions reflect inner feelings? Or are they social devices for influencing others?",
    questionRange: "Read the text and answer questions 14-26",
    introParagraphs: [
      "Do facial expressions reflect inner feelings?",
      "Or are they social devices for influencing others?"
    ],
    paragraphs: [
      {
        letter: "A",
        text: "The use of facial expressions for measuring people's emotions has dominated psychology since the late 1960s. This was when Paul Ekman of the University of California pioneered the idea that, by carefully measuring facial expression, he could evaluate people's true emotions. Ekman carried out experiments in which people were asked to label photos of basic facial expressions - such as a smile, frown or scowl - with words for emotions. He found,"
      },
      {
        letter: "B",
        text: "However, in recent years, this 'emotions-first' view has been challenged by researchers like Alan Fridlund. Fridlund argues that facial expressions are not involuntary leaks of internal feelings, but rather intentional social signals. According to this behavioral ecology view, a smile is not necessarily a sign of happiness, but a signal of readiness to engage in social interaction or an invitation for others to approach."
      },
      {
        letter: "C",
        text: "This perspective suggests that we use our faces to manipulate the behavior of others. For instance, a look of anger might be a threat intended to make an opponent back down, rather than a simple reflection of internal rage. This explains why people often produce more intense facial expressions when they are in the presence of others than when they are alone, even if their internal emotional state remains the same."
      },
      {
        letter: "D",
        text: "Furthermore, Fridlund's research indicates that even when we are alone, we often 'socialize' our environment. We might smile while reading a funny book because we are imagining a social audience. In this view, the face acts as a tool for social influence, helping us to navigate complex interpersonal relationships by signaling our intentions and expectations to those around us."
      },
      {
        letter: "E",
        text: "This behavioral ecology model also sheds light on primate communication. Primatologist Jane Goodall noted that chimpanzees rarely produce facial displays when alone, but frequently do so during encounters with troop members. Similar patterns are observed in human infants, who smile significantly more when making eye contact with a caregiver than when looking at a favorite toy in isolation."
      },
      {
        letter: "F",
        text: "Critics of Fridlund's view point out that certain emotional expressions appear to be universal and involuntary. For instance, blind children born without the opportunity to observe others still smile when happy and scowl when frustrated. This suggests a biological connection between internal emotional states and facial muscle movements that precedes social learning."
      },
      {
        letter: "G",
        text: "Ultimately, contemporary researchers increasingly advocate for a synthesized model. Facial expressions likely originated as physiological responses and involuntary emotional displays, but evolved into sophisticated social tools. Understanding both the emotional origin and the communicative function of facial expressions provides a far richer picture of human non-verbal interaction."
      }
    ],
    questionGroups: [
      {
        id: "q14-18",
        title: "Questions 14-18",
        passageRange: "Reading Passage 2 has seven paragraphs, A-G",
        instructions: "Which paragraph contains the following information?",
        type: "radio_table",
        columns: ["A", "B", "C", "D", "E", "F", "G"],
        questions: [
          {
            id: "q14",
            number: 14,
            text: "a recognition that facial expressions do not always provide a true guide to feelings",
            type: "radio_table",
            options: ["A", "B", "C", "D", "E", "F", "G"],
            correctAnswer: "B",
            explanation: "Paragraph B states that a smile is not necessarily a sign of happiness, challenging the view that expressions reliably reflect internal feelings."
          },
          {
            id: "q15",
            number: 15,
            text: "examples of ways that a person's facial expression can affect someone else's actions",
            type: "radio_table",
            options: ["A", "B", "C", "D", "E", "F", "G"],
            correctAnswer: "C",
            explanation: "Paragraph C gives the example of an angry look acting as a threat to make an opponent back down."
          },
          {
            id: "q16",
            number: 16,
            text: "scientific studies based on the theory that emotions are linked to physical reactions",
            type: "radio_table",
            options: ["A", "B", "C", "D", "E", "F", "G"],
            correctAnswer: "A",
            explanation: "Paragraph A details Paul Ekman's pioneer experiments linking facial measurements to emotions."
          },
          {
            id: "q17",
            number: 17,
            text: "a description of how solitary individuals express social intentions",
            type: "radio_table",
            options: ["A", "B", "C", "D", "E", "F", "G"],
            correctAnswer: "D",
            explanation: "Paragraph D explains how individuals alone still smile while reading because they imagine a social audience."
          },
          {
            id: "q18",
            number: 18,
            text: "a comparison of non-verbal behavior between humans and other primates",
            type: "radio_table",
            options: ["A", "B", "C", "D", "E", "F", "G"],
            correctAnswer: "E",
            explanation: "Paragraph E compares chimpanzee facial displays observed by Jane Goodall to patterns in human infants."
          }
        ]
      },
      {
        id: "q19-23",
        title: "Questions 19-23",
        passageRange: "Reading Passage 2",
        instructions: "Choose the correct letter, A, B, C or D.",
        type: "multiple_choice",
        questions: [
          {
            id: "q19",
            number: 19,
            text: "What was Paul Ekman's main method in his 1960s pioneering experiments?",
            type: "multiple_choice",
            options: [
              "A) Asking participants to label photos of basic facial expressions with emotion terms",
              "B) Measuring muscle impulses of sleeping infants",
              "C) Recording wild chimpanzee troop interactions in Africa",
              "D) Monitoring heart rate changes during heated arguments"
            ],
            correctAnswer: "A) Asking participants to label photos of basic facial expressions with emotion terms",
            explanation: "Paragraph A notes Ekman asked people to label photos of basic facial expressions with emotion words."
          },
          {
            id: "q20",
            number: 20,
            text: "According to Alan Fridlund's behavioral ecology view, a smile is primarily:",
            type: "multiple_choice",
            options: [
              "A) An involuntary muscle spasm caused by high dopamine levels",
              "B) An intentional social signal inviting interaction or approach",
              "C) A subconscious defense mechanism against social anxiety",
              "D) An inherited trait unique to human adults"
            ],
            correctAnswer: "B) An intentional social signal inviting interaction or approach",
            explanation: "Paragraph B explains a smile is a signal of readiness to engage in social interaction or an invitation to approach."
          },
          {
            id: "q21",
            number: 21,
            text: "Why do people show more intense facial expressions when in the presence of others?",
            type: "multiple_choice",
            options: [
              "A) Their underlying feelings become stronger around people",
              "B) Facial muscles tighten automatically in public spaces",
              "C) They use facial expressions as tools for social influence and manipulation",
              "D) They are imitating the facial movements of those around them"
            ],
            correctAnswer: "C) They use facial expressions as tools for social influence and manipulation",
            explanation: "Paragraph C explains people produce more intense expressions in public because faces are used to manipulate others' behavior."
          },
          {
            id: "q22",
            number: 22,
            text: "What finding regarding human infants supports Fridlund's social model?",
            type: "multiple_choice",
            options: [
              "A) Infants smile more when making eye contact with caregivers than looking at toys alone",
              "B) Infants scowl whenever they feel hungry or cold",
              "C) Infants laugh continuously during sleep",
              "D) Infants imitate adult facial expressions within minutes of birth"
            ],
            correctAnswer: "A) Infants smile more when making eye contact with caregivers than looking at toys alone",
            explanation: "Paragraph E states infants smile significantly more when making eye contact with a caregiver than when looking at a toy in isolation."
          },
          {
            id: "q23",
            number: 23,
            text: "What evidence is presented by critics to show facial expressions may be biological?",
            type: "multiple_choice",
            options: [
              "A) Blind children born without visual learning still smile and scowl in appropriate situations",
              "B) Primates learn facial expressions from observing human handlers",
              "C) Actors can fake facial expressions convincingly in movies",
              "D) Brain scans reveal identical neural activity during all emotions"
            ],
            correctAnswer: "A) Blind children born without visual learning still smile and scowl in appropriate situations",
            explanation: "Paragraph F points out that blind children born without visual observation opportunities still smile when happy and scowl when frustrated."
          }
        ]
      },
      {
        id: "q24-26",
        title: "Questions 24-26",
        passageRange: "Complete the sentences below.",
        instructions: "Choose ONE WORD ONLY from the passage for each answer.",
        wordLimitNotice: "Choose ONE WORD ONLY from the passage for each answer.",
        type: "text_input",
        questions: [
          {
            id: "q24",
            number: 24,
            text: "In Fridlund's view, a _____ on someone's face may be intended as an invitation to come nearer.",
            prefixText: "In Fridlund's view, a ",
            suffixText: " on someone's face may be intended as an invitation to come nearer.",
            type: "text_input",
            correctAnswer: "smile",
            explanation: "Paragraph B states 'a smile is not necessarily a sign of happiness, but... an invitation for others to approach.'"
          },
          {
            id: "q25",
            number: 25,
            text: "According to Fridlund, when we are by ourselves we still use facial expressions because we are imagining a social _____ in our minds.",
            prefixText: "According to Fridlund, when we are by ourselves we still use facial expressions because we are imagining a social ",
            suffixText: " in our minds.",
            type: "text_input",
            correctAnswer: "audience",
            explanation: "Paragraph D states 'We might smile while reading a funny book because we are imagining a social audience.'"
          },
          {
            id: "q26",
            number: 26,
            text: "Fridlund considers facial expressions to be social _____ that can affect our contact with other people.",
            prefixText: "Fridlund considers facial expressions to be ",
            suffixText: " that can affect our contact with other people.",
            type: "text_input",
            correctAnswer: "signals",
            explanation: "Paragraph B refers to expressions as 'intentional social signals'."
          }
        ]
      }
    ]
  },
  {
    id: 3,
    title: "The Neurobiology of Human Memory",
    subtitle: "Understanding how brain structures consolidate short-term experiences into long-term memories",
    questionRange: "Read the text and answer questions 27-40",
    paragraphs: [
      {
        letter: "A",
        text: "Human memory is not a single entity housed in a isolated compartment of the brain; rather, it is a complex distributed network involving multiple interconnected anatomical structures. The hippocampus, a sea-horse shaped structure located within the medial temporal lobe, plays a central role in converting transient short-term impressions into durable long-term memories—a process known as memory consolidation."
      },
      {
        letter: "B",
        text: "The famous clinical case of patient H.M. (Henry Molaison) in the 1950s provided groundbreaking insights into neurobiology. Following surgical removal of his bilateral hippocampi to treat epilepsy, H.M. lost the ability to form new declarative memories (facts and events), while retaining his memories prior to surgery as well as his procedural memory (motor skills like mirror-drawing)."
      },
      {
        letter: "C",
        text: "During slow-wave sleep, the hippocampus replays neural firing patterns recorded during waking hours, transferring information to the neocortex where long-term memories are permanently stored. This nocturnal dialogue between subcortical and cortical networks is vital for learning and cognitive retention."
      },
      {
        letter: "D",
        text: "The amygdala, situated adjacent to the hippocampus, adds emotional weight to memories. When an event triggers fear or excitement, the amygdala releases stress hormones like adrenaline, which strengthen synaptic connections in the hippocampus, ensuring emotionally charged events are remembered with vivid clarity."
      },
      {
        letter: "E",
        text: "As humans age, the brain undergoes structural changes. Synaptic density in the prefrontal cortex declines, which may lead to slower recall speeds or episodic memory glitches. However, neuroscientists have discovered that neurogenesis—the birth of new neurons—continues in the dentate gyrus region of the hippocampus throughout adult life."
      },
      {
        letter: "F",
        text: "Lifestyle factors significantly influence memory health. Aerobic exercise stimulates the release of brain-derived neurotrophic factor (BDNF), a protein that fosters neuronal growth and synaptic plasticity. Conversely, chronic elevated cortisol from psychological stress degrades hippocampal dendrites, impairing retrieval capability."
      }
    ],
    questionGroups: [
      {
        id: "q27-32",
        title: "Questions 27-32",
        passageRange: "Reading Passage 3 has six paragraphs, A-F",
        instructions: "Which paragraph contains the following information?",
        type: "radio_table",
        columns: ["A", "B", "C", "D", "E", "F"],
        questions: [
          {
            id: "q27",
            number: 27,
            text: "a description of the process where short-term memories transition to permanent storage",
            type: "radio_table",
            options: ["A", "B", "C", "D", "E", "F"],
            correctAnswer: "A",
            explanation: "Paragraph A describes memory consolidation as converting transient impressions into long-term memories."
          },
          {
            id: "q28",
            number: 28,
            text: "reference to a medical procedure that revealed the distinction between declarative and motor skills memory",
            type: "radio_table",
            options: ["A", "B", "C", "D", "E", "F"],
            correctAnswer: "B",
            explanation: "Paragraph B describes patient H.M.'s surgical operation and subsequent memory effects."
          },
          {
            id: "q29",
            number: 29,
            text: "the crucial role of sleep stages in transferring neural information to the neocortex",
            type: "radio_table",
            options: ["A", "B", "C", "D", "E", "F"],
            correctAnswer: "C",
            explanation: "Paragraph C outlines how slow-wave sleep enables hippocampal replay to neocortex."
          },
          {
            id: "q30",
            number: 30,
            text: "an explanation of how stress chemicals impact the strength of emotional memories",
            type: "radio_table",
            options: ["A", "B", "C", "D", "E", "F"],
            correctAnswer: "D",
            explanation: "Paragraph D explains how stress hormones like adrenaline released by the amygdala strengthen emotional memory."
          },
          {
            id: "q31",
            number: 31,
            text: "evidence that new brain cells continue to form in adulthood",
            type: "radio_table",
            options: ["A", "B", "C", "D", "E", "F"],
            correctAnswer: "E",
            explanation: "Paragraph E details neurogenesis in the dentate gyrus continuing through adult life."
          },
          {
            id: "q32",
            number: 32,
            text: "the negative consequence of prolonged stress hormone exposure on brain structures",
            type: "radio_table",
            options: ["A", "B", "C", "D", "E", "F"],
            correctAnswer: "F",
            explanation: "Paragraph F explains chronic cortisol from stress degrades hippocampal dendrites."
          }
        ]
      },
      {
        id: "q33-40",
        title: "Questions 33-40",
        passageRange: "Complete the sentences below.",
        instructions: "Choose ONE WORD ONLY from the passage for each answer.",
        wordLimitNotice: "Choose ONE WORD ONLY from the passage for each answer.",
        type: "text_input",
        questions: [
          {
            id: "q33",
            number: 33,
            text: "Memory consolidation converts short-term impressions into durable _____ memories.",
            prefixText: "Memory consolidation converts short-term impressions into durable ",
            suffixText: " memories.",
            type: "text_input",
            correctAnswer: "long-term",
            explanation: "Paragraph A refers to durable long-term memories."
          },
          {
            id: "q34",
            number: 34,
            text: "Patient H.M. lost his ability to form new _____ memories after surgery.",
            prefixText: "Patient H.M. lost his ability to form new ",
            suffixText: " memories after surgery.",
            type: "text_input",
            correctAnswer: "declarative",
            explanation: "Paragraph B states H.M. lost the ability to form new declarative memories."
          },
          {
            id: "q35",
            number: 35,
            text: "Motor skills like mirror-drawing are classified as _____ memory.",
            prefixText: "Motor skills like mirror-drawing are classified as ",
            suffixText: " memory.",
            type: "text_input",
            correctAnswer: "procedural",
            explanation: "Paragraph B refers to procedural memory (motor skills like mirror-drawing)."
          },
          {
            id: "q36",
            number: 36,
            text: "During sleep, neural information is transferred to the outer region called the _____.",
            prefixText: "During sleep, neural information is transferred to the outer region called the ",
            suffixText: ".",
            type: "text_input",
            correctAnswer: "neocortex",
            explanation: "Paragraph C explains transferring information to the neocortex."
          },
          {
            id: "q37",
            number: 37,
            text: "The brain structure that adds emotional intensity to memories is the _____.",
            prefixText: "The brain structure that adds emotional intensity to memories is the ",
            suffixText: ".",
            type: "text_input",
            correctAnswer: "amygdala",
            explanation: "Paragraph D states the amygdala adds emotional weight to memories."
          },
          {
            id: "q38",
            number: 38,
            text: "The process of generating new adult brain cells is called _____.",
            prefixText: "The process of generating new adult brain cells is called ",
            suffixText: ".",
            type: "text_input",
            correctAnswer: "neurogenesis",
            explanation: "Paragraph E refers to neurogenesis as the birth of new neurons."
          },
          {
            id: "q39",
            number: 39,
            text: "Aerobic exercise promotes synaptic plasticity by stimulating the protein known as _____.",
            prefixText: "Aerobic exercise promotes synaptic plasticity by stimulating the protein known as ",
            suffixText: ".",
            type: "text_input",
            correctAnswer: "BDNF",
            explanation: "Paragraph F states exercise stimulates brain-derived neurotrophic factor (BDNF)."
          },
          {
            id: "q40",
            number: 40,
            text: "High levels of the stress hormone _____ can cause damage to hippocampal dendrites.",
            prefixText: "High levels of the stress hormone ",
            suffixText: " can cause damage to hippocampal dendrites.",
            type: "text_input",
            correctAnswer: "cortisol",
            explanation: "Paragraph F notes chronic elevated cortisol degrades hippocampal dendrites."
          }
        ]
      }
    ]
  },
  {
    id: 4,
    title: "Roman Aqueducts: Engineering Marvels of Antiquity",
    subtitle: "How ancient hydraulic systems transformed Mediterranean urban sanitation and architecture",
    questionRange: "Read the text and answer questions 41-53",
    paragraphs: [
      {
        letter: "A",
        text: "The monumental aqueducts built across the Roman Empire stand as enduring testament to ancient civil engineering. Designed to transport freshwater from distant mountain springs into bustling urban centers, these conduits supplied public baths, fountains, latrines, and private villas. The city of Rome alone was served by eleven distinct aqueduct systems constructed over a span of five centuries."
      },
      {
        letter: "B",
        text: "Crucial to the success of Roman aqueducts was the precise calculation of gradient. Engineers relied exclusively on gravity to drive water flow over distances exceeding sixty kilometers. Using instrument tools such as the chorobates—a long wooden level filled with water—surveyors maintained a remarkably gentle descent, often as slight as one meter for every kilometer travelled."
      },
      {
        letter: "C",
        text: "Contrary to popular belief, the vast majority of Roman aqueduct networks ran underground in covered stone channels or masonry tunnels rather than raised arcade arches. Subterranean conduits protected water from contamination, reduced evaporation during hot Mediterranean summers, and minimized structural vulnerability to enemy sabotage during wartime."
      },
      {
        letter: "D",
        text: "When valleys or depressions presented impassable barriers, engineers deployed spectacular stone arcades or pressurized inverted siphons. Heavy lead or terracotta pipes conveyed water down one side of a valley and built up kinetic pressure to push the water up the opposing hillside into distribution basins called castella."
      },
      {
        letter: "E",
        text: "Maintaining these hydrological arterial systems required dedicated workforces overseen by a curator aquarum. Mineral encrustations, sediment deposits, and subterranean leaks necessitated frequent inspections and lime descaling. The legacy of Roman hydraulic mastery laid architectural precedents for municipal water engineering across Western civilization."
      }
    ],
    questionGroups: [
      {
        id: "q41-45",
        title: "Questions 41-45",
        passageRange: "Reading Passage 4 has five paragraphs, A-E",
        instructions: "Do the following statements agree with the information given in Reading Passage 4? Write TRUE, FALSE, or NOT GIVEN.",
        type: "true_false",
        questions: [
          {
            id: "q41",
            number: 41,
            text: "Ancient Rome was supplied with water by eleven separate aqueduct systems.",
            type: "true_false",
            options: ["TRUE", "FALSE", "NOT GIVEN"],
            correctAnswer: "TRUE",
            explanation: "Paragraph A states Rome was served by eleven distinct aqueduct systems.",
            paragraphLetter: "A",
            referenceQuote: "The city of Rome alone was served by eleven distinct aqueduct systems..."
          },
          {
            id: "q42",
            number: 42,
            text: "Roman engineers used powered pumps to transport water uphill.",
            type: "true_false",
            options: ["TRUE", "FALSE", "NOT GIVEN"],
            correctAnswer: "FALSE",
            explanation: "Paragraph B explains engineers relied exclusively on gravity to drive water flow.",
            paragraphLetter: "B",
            referenceQuote: "Engineers relied exclusively on gravity to drive water flow..."
          },
          {
            id: "q43",
            number: 43,
            text: "Most of the total length of Roman aqueduct routes consisted of raised bridge arches.",
            type: "true_false",
            options: ["TRUE", "FALSE", "NOT GIVEN"],
            correctAnswer: "FALSE",
            explanation: "Paragraph C notes the vast majority of networks ran underground in stone channels.",
            paragraphLetter: "C",
            referenceQuote: "...the vast majority of Roman aqueduct networks ran underground in covered stone channels..."
          },
          {
            id: "q44",
            number: 44,
            text: "Underground pipes completely prevented all mineral buildup inside channels.",
            type: "true_false",
            options: ["TRUE", "FALSE", "NOT GIVEN"],
            correctAnswer: "FALSE",
            explanation: "Paragraph E mentions mineral encrustations required frequent maintenance and lime descaling.",
            paragraphLetter: "E",
            referenceQuote: "Mineral encrustations, sediment deposits... necessitated frequent inspections..."
          },
          {
            id: "q45",
            number: 45,
            text: "The official responsible for managing Roman water networks was called the curator aquarum.",
            type: "true_false",
            options: ["TRUE", "FALSE", "NOT GIVEN"],
            correctAnswer: "TRUE",
            explanation: "Paragraph E explicitly states workforces were overseen by a curator aquarum.",
            paragraphLetter: "E",
            referenceQuote: "...overseen by a curator aquarum."
          }
        ]
      },
      {
        id: "q46-49",
        title: "Questions 46-49",
        passageRange: "Which paragraph contains the following information?",
        instructions: "Choose the correct letter, A-E, for each question.",
        type: "radio_table",
        questions: [
          {
            id: "q46",
            number: 46,
            text: "mention of the ancient instrument used to calculate the gradient of water conduits",
            type: "radio_table",
            options: ["A", "B", "C", "D", "E"],
            correctAnswer: "B",
            explanation: "Paragraph B describes the chorobates, a long wooden level instrument.",
            paragraphLetter: "B",
            referenceQuote: "Using instrument tools such as the chorobates..."
          },
          {
            id: "q47",
            number: 47,
            text: "reasons why subterranean conduits were preferred over surface structures",
            type: "radio_table",
            options: ["A", "B", "C", "D", "E"],
            correctAnswer: "C",
            explanation: "Paragraph C explains underground conduits reduced evaporation, contamination, and sabotage risks.",
            paragraphLetter: "C",
            referenceQuote: "Subterranean conduits protected water from contamination..."
          },
          {
            id: "q48",
            number: 48,
            text: "an explanation of how water pressure was harnessed to cross valley obstacles",
            type: "radio_table",
            options: ["A", "B", "C", "D", "E"],
            correctAnswer: "D",
            explanation: "Paragraph D explains pressurized inverted siphons with lead or terracotta pipes.",
            paragraphLetter: "D",
            referenceQuote: "...pressurized inverted siphons... built up kinetic pressure to push the water up..."
          },
          {
            id: "q49",
            number: 49,
            text: "the wide range of public facilities supplied by Roman aqueducts",
            type: "radio_table",
            options: ["A", "B", "C", "D", "E"],
            correctAnswer: "A",
            explanation: "Paragraph A lists public baths, fountains, latrines, and private villas.",
            paragraphLetter: "A",
            referenceQuote: "...these conduits supplied public baths, fountains, latrines, and private villas."
          }
        ]
      },
      {
        id: "q50-53",
        title: "Questions 50-53",
        passageRange: "Complete the summary below.",
        instructions: "Choose ONE WORD ONLY from the passage for each answer.",
        wordLimitNotice: "Choose ONE WORD ONLY from the passage for each answer.",
        type: "text_input",
        questions: [
          {
            id: "q50",
            number: 50,
            text: "Water gradient was kept gentle using an ancient wooden level called a _____.",
            prefixText: "Water gradient was kept gentle using an ancient wooden level called a ",
            suffixText: ".",
            type: "text_input",
            correctAnswer: "chorobates",
            explanation: "Paragraph B states engineers used the chorobates level instrument.",
            paragraphLetter: "B",
            referenceQuote: "...instrument tools such as the chorobates..."
          },
          {
            id: "q51",
            number: 51,
            text: "Underground channels protected freshwater from summer _____.",
            prefixText: "Underground channels protected freshwater from summer ",
            suffixText: ".",
            type: "text_input",
            correctAnswer: "evaporation",
            explanation: "Paragraph C notes subterranean conduits reduced evaporation.",
            paragraphLetter: "C",
            referenceQuote: "...reduced evaporation during hot Mediterranean summers..."
          },
          {
            id: "q52",
            number: 52,
            text: "Water was distributed to city zones from central basins known as _____.",
            prefixText: "Water was distributed to city zones from central basins known as ",
            suffixText: ".",
            type: "text_input",
            correctAnswer: "castella",
            explanation: "Paragraph D mentions distribution basins called castella.",
            paragraphLetter: "D",
            referenceQuote: "...into distribution basins called castella."
          },
          {
            id: "q53",
            number: 53,
            text: "Regular maintenance included lime descaling to clear mineral _____.",
            prefixText: "Regular maintenance included lime descaling to clear mineral ",
            suffixText: ".",
            type: "text_input",
            correctAnswer: "encrustations",
            explanation: "Paragraph E refers to mineral encrustations requiring removal.",
            paragraphLetter: "E",
            referenceQuote: "Mineral encrustations, sediment deposits... necessitated frequent inspections..."
          }
        ]
      }
    ]
  },
  {
    id: 5,
    title: "Artificial Intelligence in Wildlife Conservation",
    subtitle: "How machine learning models and bioacoustic sensors safeguard endangered biodiversity",
    questionRange: "Read the text and answer questions 54-66",
    paragraphs: [
      {
        letter: "A",
        text: "The global biodiversity crisis demands rapid monitoring tools far beyond traditional manual field survey methods. In rainforests, savannas, and oceans, biologists are deploying artificial intelligence models trained to process millions of camera trap images, satellite radar feeds, and underwater hydrophone audio logs in real time."
      },
      {
        letter: "B",
        text: "Automated computer vision software has transformed land mammal tracking. Rather than requiring human researchers to manually review hundreds of thousands of photo triggers, deep neural networks instantly filter out wind-blown vegetation and categorize species with over 95% accuracy, even distinguishing individual tigers or snow leopards by unique coat stripe and spot patterns."
      },
      {
        letter: "C",
        text: "Bioacoustic monitoring is proving equally revolutionary for avian and marine ecology. Autonomous audio recorders stationed in dense jungle canopies capture round-the-clock soundscapes. Machine learning algorithms trained on spectrographic audio waveforms instantly identify elusive nocturnal bird calls or detect illegal chainsaw logging and gunshot blasts within minutes, alerting rangers."
      },
      {
        letter: "D",
        text: "Predictive algorithms are also preventing human-wildlife conflict along agricultural frontiers. By analyzing historical GPS collar movements of elephant herds alongside seasonal crop ripening calendars, AI tools forecast high-risk migration corridors and trigger early-warning SMS alerts to rural farming cooperatives."
      },
      {
        letter: "E",
        text: "Despite these technological advances, obstacles remain regarding hardware durability, solar power stability in dense rainforest canopies, and algorithm bias toward well-photographed charismatic species. Combining local indigenous ecological knowledge with AI monitoring offers the most resilient framework for future species preservation."
      }
    ],
    questionGroups: [
      {
        id: "q54-58",
        title: "Questions 54-58",
        passageRange: "Reading Passage 5 has five paragraphs, A-E",
        instructions: "Complete the sentences below. Write ONE WORD ONLY for each answer.",
        type: "text_input",
        questions: [
          {
            id: "q54",
            number: 54,
            text: "Computer vision models can identify species with over 95% _____.",
            prefixText: "Computer vision models can identify species with over 95% ",
            suffixText: ".",
            type: "text_input",
            correctAnswer: "accuracy",
            explanation: "Paragraph B states neural networks categorize species with over 95% accuracy.",
            paragraphLetter: "B",
            referenceQuote: "...categorize species with over 95% accuracy..."
          },
          {
            id: "q55",
            number: 55,
            text: "Snow leopards and tigers can be distinguished by unique coat _____.",
            prefixText: "Snow leopards and tigers can be distinguished by unique coat ",
            suffixText: ".",
            type: "text_input",
            correctAnswer: "patterns",
            explanation: "Paragraph B mentions distinguishing individuals by unique stripe and spot patterns.",
            paragraphLetter: "B",
            referenceQuote: "...distinguishing individual tigers or snow leopards by unique coat stripe and spot patterns."
          },
          {
            id: "q56",
            number: 56,
            text: "Bioacoustic monitoring uses algorithms trained on spectrographic audio _____.",
            prefixText: "Bioacoustic monitoring uses algorithms trained on spectrographic audio ",
            suffixText: ".",
            type: "text_input",
            correctAnswer: "waveforms",
            explanation: "Paragraph C describes training algorithms on spectrographic audio waveforms.",
            paragraphLetter: "C",
            referenceQuote: "...algorithms trained on spectrographic audio waveforms..."
          },
          {
            id: "q57",
            number: 57,
            text: "Predictive tools analyze GPS collar movements to forecast migration _____.",
            prefixText: "Predictive tools analyze GPS collar movements to forecast migration ",
            suffixText: ".",
            type: "text_input",
            correctAnswer: "corridors",
            explanation: "Paragraph D notes forecasting high-risk migration corridors.",
            paragraphLetter: "D",
            referenceQuote: "...AI tools forecast high-risk migration corridors..."
          },
          {
            id: "q58",
            number: 58,
            text: "A remaining challenge is algorithm bias toward charismatic _____.",
            prefixText: "A remaining challenge is algorithm bias toward charismatic ",
            suffixText: ".",
            type: "text_input",
            correctAnswer: "species",
            explanation: "Paragraph E highlights algorithm bias toward well-photographed charismatic species.",
            paragraphLetter: "E",
            referenceQuote: "...algorithm bias toward well-photographed charismatic species."
          }
        ]
      },
      {
        id: "q59-62",
        title: "Questions 59-62",
        passageRange: "Reading Passage 5 has five paragraphs, A-E",
        instructions: "Do the following statements agree with the information given in Reading Passage 5? Write TRUE, FALSE, or NOT GIVEN.",
        type: "true_false",
        questions: [
          {
            id: "q59",
            number: 59,
            text: "AI models can process audio recordings captured underwater by hydrophones.",
            type: "true_false",
            options: ["TRUE", "FALSE", "NOT GIVEN"],
            correctAnswer: "TRUE",
            explanation: "Paragraph A states AI models process underwater hydrophone audio logs.",
            paragraphLetter: "A",
            referenceQuote: "...underwater hydrophone audio logs in real time."
          },
          {
            id: "q60",
            number: 60,
            text: "Machine learning software requires human verification for every camera photo trigger.",
            type: "true_false",
            options: ["TRUE", "FALSE", "NOT GIVEN"],
            correctAnswer: "FALSE",
            explanation: "Paragraph B explains automated software filters out vegetation and categorizes species automatically.",
            paragraphLetter: "B",
            referenceQuote: "Rather than requiring human researchers to manually review hundreds of thousands of photo triggers..."
          },
          {
            id: "q61",
            number: 61,
            text: "Bioacoustic audio devices can send real-time alerts about illegal logging activity.",
            type: "true_false",
            options: ["TRUE", "FALSE", "NOT GIVEN"],
            correctAnswer: "TRUE",
            explanation: "Paragraph C states algorithms detect illegal chainsaw logging and alert rangers.",
            paragraphLetter: "C",
            referenceQuote: "...detect illegal chainsaw logging and gunshot blasts within minutes, alerting rangers."
          },
          {
            id: "q62",
            number: 62,
            text: "Indigenous ecological knowledge is no longer relevant due to AI surveillance systems.",
            type: "true_false",
            options: ["TRUE", "FALSE", "NOT GIVEN"],
            correctAnswer: "FALSE",
            explanation: "Paragraph E concludes that combining indigenous knowledge with AI offers the most resilient framework.",
            paragraphLetter: "E",
            referenceQuote: "Combining local indigenous ecological knowledge with AI monitoring offers the most resilient framework..."
          }
        ]
      },
      {
        id: "q63-66",
        title: "Questions 63-66",
        passageRange: "Which paragraph contains the following information?",
        instructions: "Choose the correct letter, A-E, for each question.",
        type: "radio_table",
        questions: [
          {
            id: "q63",
            number: 63,
            text: "details on using historical animal movement data to protect agricultural crops",
            type: "radio_table",
            options: ["A", "B", "C", "D", "E"],
            correctAnswer: "D",
            explanation: "Paragraph D describes analyzing GPS collar movements of elephant herds.",
            paragraphLetter: "D",
            referenceQuote: "By analyzing historical GPS collar movements of elephant herds..."
          },
          {
            id: "q64",
            number: 64,
            text: "an explanation of photo identification techniques for individual land mammals",
            type: "radio_table",
            options: ["A", "B", "C", "D", "E"],
            correctAnswer: "B",
            explanation: "Paragraph B describes distinguishing tigers and snow leopards by coat stripe and spot patterns.",
            paragraphLetter: "B",
            referenceQuote: "...distinguishing individual tigers or snow leopards by unique coat stripe and spot patterns."
          },
          {
            id: "q65",
            number: 65,
            text: "a discussion of technical limitations including battery and power stability issues",
            type: "radio_table",
            options: ["A", "B", "C", "D", "E"],
            correctAnswer: "E",
            explanation: "Paragraph E lists obstacles regarding hardware durability and solar power stability.",
            paragraphLetter: "E",
            referenceQuote: "obstacles remain regarding hardware durability, solar power stability..."
          },
          {
            id: "q66",
            number: 66,
            text: "an overview of the global biodiversity crisis necessitating automated surveillance",
            type: "radio_table",
            options: ["A", "B", "C", "D", "E"],
            correctAnswer: "A",
            explanation: "Paragraph A introduces the biodiversity crisis and multi-sensor AI deployment.",
            paragraphLetter: "A",
            referenceQuote: "The global biodiversity crisis demands rapid monitoring tools..."
          }
        ]
      }
    ]
  }
];

export function calculateIELTSBandScore(correctCount: number, totalCount: number = 40): number {
  const scaledCorrect = totalCount > 0 && totalCount !== 40 ? Math.round((correctCount / totalCount) * 40) : correctCount;
  if (scaledCorrect >= 39) return 9.0;
  if (scaledCorrect >= 37) return 8.5;
  if (scaledCorrect >= 35) return 8.0;
  if (scaledCorrect >= 33) return 7.5;
  if (scaledCorrect >= 30) return 7.0;
  if (scaledCorrect >= 27) return 6.5;
  if (scaledCorrect >= 23) return 6.0;
  if (scaledCorrect >= 19) return 5.5;
  if (scaledCorrect >= 15) return 5.0;
  if (scaledCorrect >= 12) return 4.5;
  if (scaledCorrect >= 9) return 4.0;
  if (scaledCorrect >= 6) return 3.5;
  if (scaledCorrect >= 4) return 3.0;
  return 2.5;
}
