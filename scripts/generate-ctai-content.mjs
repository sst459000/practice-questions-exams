import { mkdir, writeFile } from "node:fs/promises";

// These are original practice concepts mapped to the examinable CT-AI v2.0 topics.
// The generator creates varied question wording while keeping one auditable answer
// and three distractors per concept. It does not reproduce official sample questions.
const sections = [
  ["ai-foundations", "1. Introduction to Artificial Intelligence", "AI concepts, generative AI, ML hardware, frameworks, and regulation.", [
    ["AI-based systems", "AI systems can infer behavior from data and may produce probabilistic outputs.", "Behavior can be learned or inferred from data.", ["It can only execute pre-written rules.", "It never changes after deployment.", "It always produces the same output for equivalent inputs."]],
    ["narrow, general, and super AI", "Narrow AI is designed for a limited domain, while general and super AI describe broader hypothetical capabilities.", "Narrow AI is focused on a limited task or domain.", ["Narrow AI can perform every intellectual task.", "General AI is limited to one fixed classification.", "Super AI is the current standard production technology."]],
    ["generative AI", "Generative AI creates new content based on patterns learned from data.", "It can generate content such as text, images, audio, or code.", ["It only classifies inputs into fixed labels.", "It requires no data or training.", "It guarantees factual correctness."]],
    ["ML hardware", "Hardware choices affect training and inference speed, cost, energy use, and deployment constraints.", "Hardware should be selected against workload, performance, cost, and deployment constraints.", ["The most expensive hardware is always best.", "Hardware has no effect on inference.", "Only a desktop CPU can run an ML model."]],
    ["regulation and standards", "Regulations and standards can define obligations for risk management, transparency, and data use.", "They can shape requirements for risk management, transparency, and data handling.", ["They remove the need for testing.", "They guarantee that every model is accurate.", "They apply only after the system is retired."]]
  ]],
  ["ai-quality", "2. Quality Characteristics for AI-Based Systems", "AI quality characteristics, safety, and acceptance criteria.", [
    ["probabilistic behavior", "Probabilistic behavior may require ranges, thresholds, or statistical evidence instead of one exact output.", "Expected behavior may be described with probabilities or tolerances.", ["One execution is always sufficient.", "The system cannot be tested.", "Only source-code syntax needs testing."]],
    ["AI quality characteristics", "AI systems require quality evaluation that considers context, data, model behavior, and operation.", "Quality evaluation should consider the intended context and AI-specific risks.", ["Quality means only execution speed.", "Quality is determined only by model size.", "Quality cannot be evaluated before production."]],
    ["acceptance criteria", "Acceptance criteria should be measurable, contextual, and connected to business and risk needs.", "A defined false-negative rate on representative evaluation data is measurable.", ["The model should be intelligent.", "The system should never make a mistake.", "The model should be as complex as possible."]],
    ["safety-related AI", "Safety-related AI requires controls and evidence that reduce the likelihood and impact of hazardous behavior.", "Errors can cause unacceptable harm to people or the environment.", ["Safety is unrelated to intended use.", "Safety systems do not need monitoring.", "Only interface color needs testing."]],
    ["human oversight", "Human oversight can provide intervention, review, escalation, and accountability for high-risk AI decisions.", "Oversight should be designed around meaningful intervention and escalation needs.", ["Human oversight means accepting every model output.", "Oversight removes the need for system testing.", "Oversight is useful only during coding."]]
  ]],
  ["machine-learning", "3. Machine Learning", "ML forms, data preparation, datasets, metrics, and neural networks.", [
    ["supervised learning", "Supervised learning uses labeled examples to learn a mapping to expected outcomes.", "Supervised learning uses labeled training data.", ["It never uses data.", "It always finds groups without labels.", "It is identical to unsupervised learning."]],
    ["unsupervised learning", "Unsupervised learning seeks structure or patterns in data without predefined target labels.", "It can identify groups or structure in unlabeled data.", ["It always predicts a known class.", "It requires a correct label for every input.", "It is only used for software deployment."]],
    ["reinforcement learning", "Reinforcement learning learns by using feedback such as rewards or penalties for actions.", "An agent learns from feedback associated with actions in an environment.", ["It uses only fixed business rules.", "It requires no interaction or feedback.", "It can only process static labels."]],
    ["data preparation", "Data preparation can include cleaning, transformation, feature handling, and appropriate splitting.", "Data preparation makes data suitable and consistent for model development.", ["It guarantees a fair model automatically.", "It replaces model testing.", "It means deleting all unusual observations."]],
    ["training, validation, and test datasets", "Training fits a model, validation supports development decisions, and test data provides a final evaluation.", "Validation data supports tuning while test data remains separate for final evaluation.", ["All three datasets must contain identical rows.", "Test data is used for every tuning decision.", "Training data is used only after deployment."]]
  ]],
  ["testing-ai", "4. Testing AI-Based Systems", "Testability, statistical testing, oracles, GenAI, red teaming, and test levels.", [
    ["statistical testing", "Repeated observations and distributions can provide meaningful evidence for variable AI behavior.", "A statistical approach evaluates behavior across representative repeated observations.", ["Statistics eliminate test design.", "Statistics apply only to user interfaces.", "AI systems always produce random outputs."]],
    ["testability of locked and adaptive systems", "Adaptive systems can change through data or retraining, affecting reproducibility and regression testing.", "Adaptive behavior requires controls for change, repeatability, and regression evidence.", ["Adaptive systems never need regression testing.", "Locked systems always learn after release.", "Testability is unrelated to system change."]],
    ["test oracles", "AI oracles may use reference data, human judgment, properties, or thresholds rather than one exact value.", "Expected behavior may be a range or quality threshold instead of one exact result.", ["Every AI output is automatically correct.", "An oracle is never needed for AI.", "Only code coverage can be an oracle."]],
    ["generative AI testing", "Generative AI testing can assess correctness, relevance, safety, robustness, bias, and harmful output.", "Testing should evaluate output quality and risks relevant to the intended use.", ["Only syntax needs testing.", "Generated output is always factual.", "Prompt testing replaces system testing."]],
    ["red teaming", "Red teaming actively probes a system for harmful, unsafe, insecure, or policy-violating behavior.", "It explores adversarial or harmful behaviors using planned attack scenarios.", ["It measures only response time.", "It replaces all other testing.", "It generates training labels automatically."]]
  ]],
  ["input-data", "5. Input Data Testing for Machine Learning Systems", "Bias, data pipelines, representativeness, constraints, and labels.", [
    ["data bias", "Bias in data can produce systematically different treatment or performance for groups or conditions.", "Bias testing looks for systematic differences relevant to groups, contexts, or outcomes.", ["Bias is always caused by the user interface.", "Bias cannot affect model output.", "A larger dataset automatically removes bias."]],
    ["data representativeness", "Representativeness testing checks whether data reflects relevant populations and operating conditions.", "The dataset should reflect relevant populations and expected operating conditions.", ["It increases model parameters.", "It proves every label is correct.", "It removes the need for production monitoring."]],
    ["data pipeline testing", "Data pipeline testing checks movement, transformation, quality, and failure handling between data stages.", "Pipeline tests verify that data is transferred and transformed as intended.", ["Pipeline testing is only model accuracy testing.", "Pipelines cannot fail after deployment.", "Pipeline testing removes the need for data checks."]],
    ["dataset constraints", "Constraint tests check expected properties such as types, ranges, uniqueness, and required fields.", "Checking that an age field is within its permitted range is constraint testing.", ["Checking hidden-layer count is a data constraint.", "Checking screen color is a data constraint.", "Checking final accuracy validates all input constraints."]],
    ["label correctness", "Incorrect labels can teach a supervised model the wrong relationship and distort evaluation.", "Label correctness matters because labels drive supervised learning and evaluation.", ["Labels affect only the interface.", "Labels are never needed for supervised learning.", "Label testing guarantees every fairness property."]]
  ]],
  ["model-testing", "6. Model Testing for Machine Learning Systems", "Model risk, documentation, performance, adversarial, metamorphic, drift, and fit.", [
    ["ML model documentation", "Reviewing model documentation supports understanding of purpose, data, limits, assumptions, and risks.", "Documentation review checks whether intended use, limitations, and relevant evidence are clear.", ["Documentation makes testing unnecessary.", "Documentation is only a deployment log.", "Documentation should hide known limitations."]],
    ["ML functional performance testing", "Functional performance testing evaluates model behavior using suitable metrics, data, and acceptance thresholds.", "Performance testing should use relevant metrics and representative evaluation data.", ["Training accuracy is always sufficient.", "Metrics are unrelated to risk.", "One arbitrary input proves performance."]],
    ["adversarial testing", "Adversarial testing evaluates behavior under deliberately challenging or manipulated inputs.", "It probes whether crafted inputs can cause unacceptable model behavior.", ["It checks only installation scripts.", "It uses only random production traffic.", "It guarantees security after one test."]],
    ["metamorphic testing", "Metamorphic testing checks relations between outputs for related input transformations.", "It verifies expected relationships between outputs for transformed inputs.", ["It calculates model parameter count.", "It replaces data validation.", "It guarantees identical outputs for every input."]],
    ["drift testing", "Drift testing investigates changes in operational data or relationships that may degrade model performance.", "It checks whether production conditions have changed from development conditions.", ["It checks programming language preference.", "It proves there are no false positives.", "It checks whether training ran only once."]]
  ]],
  ["ml-development", "7. Machine Learning Development Testing", "ML tools, algorithms, hyperparameters, pipelines, and deployment testing.", [
    ["ML development tools", "Tool qualification, framework review, reproducibility, and pipeline checks reduce development risk.", "Reviewing tool behavior and reproducibility can reduce development risk.", ["Established tools cannot contain defects.", "Only the final interface needs testing.", "Version control should be removed from the pipeline."]],
    ["algorithm suitability", "An algorithm should fit the problem, data, constraints, risks, and required quality.", "Suitability review checks whether the algorithm fits the intended problem and context.", ["The most complex algorithm is always best.", "Suitability review replaces performance testing.", "Suitability guarantees fairness in every context."]],
    ["hyperparameter selection", "Hyperparameters influence learning behavior and should be selected and evaluated with appropriate evidence.", "Hyperparameter choices should be evaluated against model objectives and risks.", ["Hyperparameters never affect behavior.", "The largest value is always best.", "Hyperparameters are set only after deployment."]],
    ["ML pipeline testing", "Pipeline testing verifies repeatable execution, correct data/model artifacts, dependencies, and failure handling.", "Pipeline tests check that stages execute in the right order with the right artifacts.", ["Pipeline tests only check screen layout.", "Pipelines need no versioning.", "Pipeline success proves model quality completely."]],
    ["ML deployment testing", "Deployment testing can cover installation, configuration, compatibility, APIs, and target environments.", "Deployment tests include installation, configuration, compatibility, interface, and environment checks.", ["Only retraining is deployment testing.", "Only training accuracy matters after deployment.", "Deployment testing is only requirements review."]]
  ]]
];

const wording = [
  (topic) => `Which statement is most accurate about ${topic}?`,
  (topic) => `When testing ${topic}, what should a tester expect?`,
  (topic) => `A team is evaluating ${topic}. Which approach is most appropriate?`,
  (topic) => `Why is ${topic} important when testing an AI-based system?`,
  (topic) => `Which example best illustrates ${topic}?`,
  (topic) => `Which test evidence would provide useful information about ${topic}?`,
  (topic) => `During a review of ${topic}, which conclusion is sound?`,
  (topic) => `Which risk is most closely associated with ${topic}?`,
  (topic) => `How should a tester apply ${topic} in practice?`,
  (topic) => `Which claim about ${topic} should a tester challenge?`
];

function rotate(items, amount) {
  const offset = amount % items.length;
  return [...items.slice(offset), ...items.slice(0, offset)];
}

const bank = sections.map(([id, title, subtitle, concepts]) => ({
  id,
  title,
  subtitle,
  questions: concepts.flatMap(([topic, explanation, correct, distractors], conceptIndex) =>
    wording.map((makeQuestion, variant) => {
      const options = rotate([{ text: correct, correct: true, reason: explanation }, ...distractors.map((text) => ({ text, correct: false, reason: "This does not best address the stated syllabus concept." }))], (conceptIndex + variant) % 4)
        .map((option, index) => ({ ...option, letter: String.fromCharCode(65 + index) }));
      return {
        id: `ctai-${id}-${conceptIndex + 1}-${variant + 1}`,
        text: makeQuestion(topic),
        topic,
        takeaway: explanation,
        options
      };
    })
  )
}));

const allQuestions = bank.flatMap((section) => section.questions);
const examQuestions = uniqueBy(allQuestions, (question) => normalizeKey(question.text)).map((question) => ({
  id: question.id,
  sourceId: question.id,
  text: question.text,
  topic: question.topic,
  takeaway: question.takeaway,
  options: question.options.map(({ letter, text, reason }) => ({ letter, text, reason })),
  correct: question.options.find((option) => option.correct).letter
}));

const examSets = {
  "ctai-set-1": { id: "ctai-set-1", title: "CT-AI Practice Exam 1", questions: examQuestions.slice(0, 40) },
  "ctai-set-2": { id: "ctai-set-2", title: "CT-AI Practice Exam 2", questions: examQuestions.slice(40, 80) },
  "ctai-set-3": { id: "ctai-set-3", title: "CT-AI Practice Exam 3", questions: examQuestions.slice(80, 120) },
  "ctai-set-4": { id: "ctai-set-4", title: "CT-AI Practice Exam 4", questions: examQuestions.slice(120, 160) }
};

await mkdir("public/data/ctai", { recursive: true });
await writeFile("public/data/ctai/bank.json", JSON.stringify(bank, null, 2));
await writeFile("public/data/ctai/exams.json", JSON.stringify(examSets, null, 2));

function uniqueBy(items, selector) {
  const seen = new Set();
  return items.filter((item) => {
    const key = selector(item);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function normalizeKey(value) {
  return String(value).trim().replace(/\s+/g, " ").toLowerCase();
}
