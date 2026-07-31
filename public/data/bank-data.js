(function () {
  const sectionDefinitions = [
    {
      id: "fundamentals",
      title: "1. Fundamentals of Testing",
      subtitle: "Objectives, principles, process, testware, roles, and tester skills.",
      concepts: [
        {
          topic: "Test objectives",
          term: "test objective",
          definition: "A reason for testing, such as evaluating quality, reducing risk, finding defects, or supporting decisions.",
          scenario: "A product owner asks for evidence that release risks are acceptable before go-live.",
          accurate: "Testing provides information for decisions; it does not prove perfection.",
          misconception: "Testing proves that no defects remain.",
          misconceptionReason: "Testing can show failures and increase confidence, but it cannot prove that defects are absent."
        },
        {
          topic: "Testing and debugging",
          term: "testing and debugging distinction",
          definition: "Testing detects failures or exposes defects; debugging finds, analyzes, and removes the cause.",
          scenario: "A tester reports a payment failure, and a developer traces it to a wrong condition in the code.",
          accurate: "Testing and debugging are related activities, but they have different objectives.",
          misconception: "Testing and debugging are the same activity.",
          misconceptionReason: "Testing reveals a problem; debugging investigates and fixes the underlying cause."
        },
        {
          topic: "Error, defect, failure, root cause",
          term: "error-defect-failure chain",
          definition: "A human error can introduce a defect, and that defect may cause a failure when executed.",
          scenario: "A developer misunderstands a tax rule, implements the wrong formula, and customers see incorrect totals.",
          accurate: "A visible failure may have an underlying defect and a deeper root cause.",
          misconception: "A failure and a defect are always the same thing.",
          misconceptionReason: "A failure is observed behavior; a defect is the flaw that may cause it."
        },
        {
          topic: "Quality assurance and testing",
          term: "quality assurance versus testing",
          definition: "Quality assurance is process-oriented, while testing is product-oriented quality control.",
          scenario: "An audit checks whether the team follows its review process, while testers execute cases on a build.",
          accurate: "Testing contributes to quality control, while quality assurance focuses on improving processes.",
          misconception: "Quality assurance is just another name for executing test cases.",
          misconceptionReason: "Executing tests is product evaluation; quality assurance focuses on processes that support quality."
        },
        {
          topic: "Testing shows presence",
          term: "testing shows presence, not absence",
          definition: "Testing can show that defects are present, but cannot prove that no defects remain.",
          scenario: "A team passes a regression suite but still treats the result as evidence, not proof of perfection.",
          accurate: "Passing tests reduce uncertainty but do not eliminate all product risk.",
          misconception: "If all planned tests pass, the product has no defects.",
          misconceptionReason: "The tests only cover selected conditions; untested conditions may still contain defects."
        },
        {
          topic: "Exhaustive testing",
          term: "exhaustive testing is impossible",
          definition: "Testing all combinations of inputs, preconditions, and paths is usually impractical.",
          scenario: "A form has many fields, roles, browsers, and data states, so the team samples based on risk.",
          accurate: "Teams use prioritization and techniques because complete testing is rarely feasible.",
          misconception: "A professional test team should test every possible combination.",
          misconceptionReason: "For most systems, the number of combinations is too large for complete testing."
        },
        {
          topic: "Defect clustering",
          term: "defect clustering",
          definition: "A small number of modules, features, or areas often contain many of the defects.",
          scenario: "Most production incidents in the last quarter came from the billing calculation module.",
          accurate: "Defect history can guide where to focus additional test effort.",
          misconception: "Defects are usually spread evenly across the whole system.",
          misconceptionReason: "Defects often cluster in complex, changed, or historically problematic areas."
        },
        {
          topic: "Pesticide paradox",
          term: "pesticide paradox",
          definition: "Repeatedly running the same tests eventually finds fewer new defects unless the tests are refreshed.",
          scenario: "A regression suite has run unchanged for months and rarely reveals new issues in changed workflows.",
          accurate: "Test cases should be reviewed and varied as the product and risks evolve.",
          misconception: "The same fixed tests will keep finding the same number of new defects forever.",
          misconceptionReason: "Once defects covered by those tests are fixed, unchanged tests become less effective at finding new defects."
        },
        {
          topic: "Absence-of-errors fallacy",
          term: "absence-of-errors fallacy",
          definition: "Finding and fixing defects is not enough if the product does not meet user needs.",
          scenario: "The system matches the written requirements but cannot support the actual customer workflow.",
          accurate: "A low defect count does not guarantee business value or fitness for use.",
          misconception: "A defect-free implementation of the specification is automatically useful to users.",
          misconceptionReason: "The specification itself may be wrong, incomplete, or misaligned with user needs."
        },
        {
          topic: "Test activities",
          term: "test process activities",
          definition: "Activities such as planning, monitoring, analysis, design, implementation, execution, and completion.",
          scenario: "The team identifies test conditions, designs tests, creates data, runs tests, and reports completion.",
          accurate: "Testing is a process with related activities, not only test execution.",
          misconception: "Testing starts only when test cases are executed.",
          misconceptionReason: "Analysis, design, planning, and implementation are testing activities that happen before execution."
        },
        {
          topic: "Testware and traceability",
          term: "testware traceability",
          definition: "Linking testware such as test cases, data, and results to the test basis to assess coverage and change impact.",
          scenario: "When a requirement changes, the team identifies affected test cases and updates expected results.",
          accurate: "Traceability helps explain coverage, gaps, and the effect of requirement changes.",
          misconception: "Traceability matters only after testing is finished.",
          misconceptionReason: "Traceability supports analysis, design, monitoring, impact analysis, and reporting throughout testing."
        }
      ]
    },
    {
      id: "sdlc",
      title: "2. Testing Throughout the SDLC",
      subtitle: "Lifecycle context, test levels, test types, confirmation, regression, and maintenance testing.",
      concepts: [
        {
          topic: "SDLC context",
          term: "SDLC impact on testing",
          definition: "The chosen lifecycle affects test timing, scope, documentation, automation, and collaboration.",
          scenario: "A sequential project plans formal system testing late, while an Agile team tests in every iteration.",
          accurate: "The test approach should fit the lifecycle model and project context.",
          misconception: "The same testing timeline works equally well for every lifecycle.",
          misconceptionReason: "Lifecycle models differ in feedback loops, delivery cadence, and available work products."
        },
        {
          topic: "Good SDLC testing practices",
          term: "lifecycle-independent testing practices",
          definition: "Practices such as testing early, using appropriate test basis, and aligning tests with objectives apply across lifecycles.",
          scenario: "A team reviews requirements early and keeps traceability, even though delivery is iterative.",
          accurate: "Some good testing practices apply regardless of the development model.",
          misconception: "Good testing practices only apply in sequential development.",
          misconceptionReason: "Principles such as early testing and traceability are useful in Agile, DevOps, and sequential models."
        },
        {
          topic: "Test-first approaches",
          term: "test-first development",
          definition: "Approaches such as TDD, ATDD, and BDD define tests or examples before implementation.",
          scenario: "Before coding, the team agrees on examples of successful and failed account transfers.",
          accurate: "Test-first approaches clarify expected behavior before code is written.",
          misconception: "Test-first means testers wait until developers finish coding.",
          misconceptionReason: "Test-first moves test thinking before implementation, often through examples or executable checks."
        },
        {
          topic: "DevOps",
          term: "DevOps impact on testing",
          definition: "DevOps increases the need for fast feedback, automation, environment control, and monitoring.",
          scenario: "A build pipeline runs unit, API, and smoke tests whenever a change is merged.",
          accurate: "DevOps encourages continuous testing and rapid feedback across delivery stages.",
          misconception: "DevOps removes the need for testers and test design.",
          misconceptionReason: "DevOps changes how testing is integrated, but skilled test analysis and risk thinking remain necessary."
        },
        {
          topic: "Shift left",
          term: "shift-left testing",
          definition: "Moving test activities earlier so defects and risks are addressed sooner.",
          scenario: "Testers review user stories and acceptance criteria before implementation begins.",
          accurate: "Shift left can reduce rework by finding problems earlier.",
          misconception: "Shift left means all testing must be completed before coding.",
          misconceptionReason: "Shift left moves some activities earlier; it does not eliminate later dynamic testing."
        },
        {
          topic: "Retrospectives",
          term: "retrospective-driven improvement",
          definition: "Using reflection after an iteration or milestone to improve the test process and collaboration.",
          scenario: "After a release, the team identifies that test data delays caused blocked tests and agrees on fixes.",
          accurate: "Retrospectives can improve testing by turning lessons learned into actions.",
          misconception: "Retrospectives are only for assigning blame after failures.",
          misconceptionReason: "A retrospective is intended for learning and process improvement, not blame."
        },
        {
          topic: "Component testing",
          term: "component testing",
          definition: "Testing individual components or units, often in isolation with stubs, drivers, or mocks.",
          scenario: "A developer tests a date calculation function before integrating it with the booking service.",
          accurate: "Component testing focuses on small test objects and can be highly automated.",
          misconception: "Component testing is the same as business acceptance testing.",
          misconceptionReason: "Acceptance testing focuses on business needs; component testing focuses on individual components."
        },
        {
          topic: "Integration testing",
          term: "integration testing",
          definition: "Testing interfaces and interactions between components, systems, or services.",
          scenario: "The payment service is tested with the order service to verify request and response handling.",
          accurate: "Integration testing targets communication and interaction defects.",
          misconception: "Integration testing checks only a single component in isolation.",
          misconceptionReason: "Integration testing is about interactions between parts, not isolated component behavior."
        },
        {
          topic: "System testing",
          term: "system testing",
          definition: "Testing a complete system against system requirements and overall expected behavior.",
          scenario: "The full booking application is tested end to end against system requirements before release.",
          accurate: "System testing evaluates the integrated product as a whole.",
          misconception: "System testing is limited to private functions inside one class.",
          misconceptionReason: "Private functions are usually component-level concerns, not complete-system behavior."
        },
        {
          topic: "Acceptance testing",
          term: "acceptance testing",
          definition: "Testing to establish confidence that the system meets business needs or acceptance criteria.",
          scenario: "Business users validate that a claim workflow supports the agreed operational process.",
          accurate: "Acceptance testing focuses on fitness for use from a stakeholder or business perspective.",
          misconception: "Acceptance testing is only about finding code syntax errors.",
          misconceptionReason: "Syntax errors are development defects; acceptance testing evaluates business acceptability."
        },
        {
          topic: "Functional and non-functional testing",
          term: "test type distinction",
          definition: "Functional testing checks what the system does; non-functional testing checks quality characteristics such as performance or usability.",
          scenario: "One test verifies password reset behavior, while another measures page response time under load.",
          accurate: "Test types describe test objectives and can be applied at multiple test levels.",
          misconception: "Non-functional testing is unrelated to user satisfaction.",
          misconceptionReason: "Quality characteristics such as performance, usability, and reliability strongly affect user satisfaction."
        },
        {
          topic: "Confirmation and regression testing",
          term: "confirmation versus regression testing",
          definition: "Confirmation testing checks a specific fix; regression testing checks for unintended side effects.",
          scenario: "After a login defect is fixed, the team retests login and also checks nearby account features.",
          accurate: "A change may require both confirmation testing and regression testing.",
          misconception: "Confirmation testing and regression testing always mean the same thing.",
          misconceptionReason: "Confirmation targets the fix; regression targets unchanged behavior that might have been affected."
        },
        {
          topic: "Maintenance testing",
          term: "maintenance testing",
          definition: "Testing changes to an operational system, including fixes, enhancements, migrations, or retirement.",
          scenario: "A tax rule update in a live payroll system triggers impact analysis and regression testing.",
          accurate: "Maintenance testing is driven by changes to existing operational software.",
          misconception: "Maintenance testing is needed only for brand-new products.",
          misconceptionReason: "Maintenance testing is specifically about existing systems that are changed or affected."
        }
      ]
    },
    {
      id: "static",
      title: "3. Static Testing",
      subtitle: "Static testing basics, feedback, review process, roles, review types, and success factors.",
      concepts: [
        {
          topic: "Static testing basics",
          term: "static testing",
          definition: "Examining work products without executing the software under test.",
          scenario: "A tester reviews a user story for ambiguity before any code is written.",
          accurate: "Static testing can be applied to requirements, designs, code, testware, and other work products.",
          misconception: "Static testing requires running the application.",
          misconceptionReason: "Static testing examines work products without executing the software."
        },
        {
          topic: "Dynamic testing comparison",
          term: "static versus dynamic testing",
          definition: "Static testing checks work products without execution; dynamic testing executes software to observe behavior.",
          scenario: "One activity reviews code for unreachable statements; another runs the code to check outputs.",
          accurate: "Static and dynamic testing are complementary and find different kinds of problems.",
          misconception: "Static and dynamic testing always find exactly the same defects.",
          misconceptionReason: "Reviews may find ambiguity or missing logic; execution may reveal runtime failures."
        },
        {
          topic: "Static testing value",
          term: "early static testing value",
          definition: "Finding defects early in documents or code can reduce later rework and failure cost.",
          scenario: "A review detects a missing business rule before developers implement the feature.",
          accurate: "Static testing can prevent defects from being built into later work products.",
          misconception: "Reviews are useful only after the system has been released.",
          misconceptionReason: "The value of reviews is often highest before downstream work depends on the flawed artifact."
        },
        {
          topic: "Stakeholder feedback",
          term: "early stakeholder feedback",
          definition: "Frequent feedback helps confirm needs, reveal misunderstandings, and improve work product quality.",
          scenario: "Operations staff review deployment requirements and identify a missing rollback condition.",
          accurate: "Stakeholder feedback can expose gaps that the delivery team may not see alone.",
          misconception: "Stakeholder feedback should be delayed until final acceptance testing.",
          misconceptionReason: "Late feedback increases the chance of expensive rework and missed expectations."
        },
        {
          topic: "Review planning",
          term: "review planning",
          definition: "Defining review scope, objectives, roles, work products, entry criteria, and schedule.",
          scenario: "Before a design review, the moderator selects reviewers and defines the review focus.",
          accurate: "Planning gives the review a clear purpose and practical boundaries.",
          misconception: "Formal reviews do not need preparation.",
          misconceptionReason: "Without preparation, reviewers may miss important issues or use inconsistent expectations."
        },
        {
          topic: "Individual review",
          term: "individual review",
          definition: "Reviewers examine the work product independently and record potential defects or questions.",
          scenario: "Each reviewer studies the API specification and notes inconsistencies before the review meeting.",
          accurate: "Individual preparation improves the quality and depth of review findings.",
          misconception: "Reviewers should first see the work product during the meeting.",
          misconceptionReason: "Many review types rely on individual review before group discussion."
        },
        {
          topic: "Communication and analysis",
          term: "review communication and analysis",
          definition: "Sharing, discussing, classifying, and deciding on review findings.",
          scenario: "Reviewers discuss whether a requirement issue is a true defect, a question, or an enhancement.",
          accurate: "Analysis helps turn raw comments into useful findings and decisions.",
          misconception: "Every review comment should be ignored unless it is a failed test case.",
          misconceptionReason: "Reviews produce findings on work products; they are not limited to dynamic test failures."
        },
        {
          topic: "Review roles",
          term: "review roles",
          definition: "Typical roles include author, moderator, scribe, reviewer, and manager, each with distinct responsibilities.",
          scenario: "The moderator facilitates the session while the scribe records issues and decisions.",
          accurate: "Clear roles help reviews run consistently and effectively.",
          misconception: "The author should always decide alone whether review findings are valid.",
          misconceptionReason: "Review decisions are normally made through the agreed review process, not by unilateral author control."
        },
        {
          topic: "Review types",
          term: "review type formality",
          definition: "Review types vary in formality, from informal reviews to walkthroughs, technical reviews, and inspections.",
          scenario: "A safety-related design is reviewed using defined roles, entry criteria, metrics, and follow-up.",
          accurate: "The required formality should match the objectives, risks, and context.",
          misconception: "All reviews must have the same level of formality.",
          misconceptionReason: "Different review types exist because contexts and risk levels vary."
        },
        {
          topic: "Inspection",
          term: "inspection",
          definition: "A highly formal review type with defined process, roles, criteria, and documented outcomes.",
          scenario: "A critical specification undergoes a structured review with a moderator, scribe, checklists, and metrics.",
          accurate: "Inspections are among the most formal review types.",
          misconception: "An inspection is an informal hallway conversation.",
          misconceptionReason: "Inspections use structure and discipline beyond an informal review."
        },
        {
          topic: "Successful reviews",
          term: "successful review factors",
          definition: "Success factors include clear objectives, suitable participants, preparation, constructive communication, and follow-up.",
          scenario: "A review meeting stays focused on defects, records decisions, and confirms fixes afterward.",
          accurate: "Effective reviews depend on both process discipline and collaborative behavior.",
          misconception: "Reviews work best when participants focus on blaming the author.",
          misconceptionReason: "Blame discourages openness and reduces the chance of useful findings."
        }
      ]
    },
    {
      id: "analysis-design",
      title: "4. Test Analysis and Design",
      subtitle: "Black-box, white-box, experience-based, and collaboration-based test approaches.",
      concepts: [
        {
          topic: "Technique overview",
          term: "test technique selection",
          definition: "Choosing test techniques based on the test basis, risk, objectives, knowledge, and available information.",
          scenario: "A tester uses a decision table for business rules and boundary analysis for numeric ranges.",
          accurate: "Different techniques are useful for different defect types and sources of information.",
          misconception: "One test technique is always best for every situation.",
          misconceptionReason: "Technique usefulness depends on the problem, test basis, and risk."
        },
        {
          topic: "Equivalence partitioning",
          term: "equivalence partitioning",
          definition: "Dividing data into partitions expected to be treated similarly and testing representatives.",
          scenario: "A valid age range of 18 to 65 is split into below 18, 18 to 65, and above 65.",
          accurate: "One representative can provide useful coverage for a partition when values are expected to behave similarly.",
          misconception: "Equivalence partitioning requires testing every value in a partition.",
          misconceptionReason: "The technique reduces tests by using representative values from partitions."
        },
        {
          topic: "Boundary value analysis",
          term: "boundary value analysis",
          definition: "Testing values at and around the edges of partitions where defects are common.",
          scenario: "For a 1 to 100 range, tests include values such as 0, 1, 100, and 101.",
          accurate: "Boundary testing targets edge values because defects often occur there.",
          misconception: "Boundary value analysis ignores invalid values near boundaries.",
          misconceptionReason: "Two-value and three-value boundary analysis commonly include values just outside valid boundaries."
        },
        {
          topic: "Decision table testing",
          term: "decision table testing",
          definition: "Modeling combinations of conditions and resulting actions to test business rules.",
          scenario: "Discount eligibility depends on customer type, order value, and coupon status.",
          accurate: "Decision tables are useful when outcomes depend on combinations of conditions.",
          misconception: "Decision tables are only for numeric boundary ranges.",
          misconceptionReason: "Numeric boundaries are better suited to boundary value analysis; decision tables focus on condition combinations."
        },
        {
          topic: "State transition testing",
          term: "state transition testing",
          definition: "Testing behavior based on states, events, transitions, and sequences.",
          scenario: "An account can move from active to locked after three failed login attempts.",
          accurate: "State transition testing is useful when history affects valid behavior.",
          misconception: "State transition testing is unnecessary when behavior depends on previous events.",
          misconceptionReason: "That is exactly the kind of situation where state transition testing is useful."
        },
        {
          topic: "Use case testing",
          term: "use case testing",
          definition: "Deriving tests from interactions between actors and the system to achieve goals.",
          scenario: "A customer searches, selects, pays for, and receives confirmation for an order.",
          accurate: "Use case testing supports scenario and workflow coverage.",
          misconception: "Use case testing is limited to measuring source code statements.",
          misconceptionReason: "Source code statement measurement is white-box; use cases describe actor-system interactions."
        },
        {
          topic: "Statement testing",
          term: "statement testing",
          definition: "A white-box technique that designs tests to execute executable statements in code.",
          scenario: "A coverage report shows which lines of executable code were run by the test suite.",
          accurate: "Statement coverage measures executed executable statements.",
          misconception: "Statement testing is a black-box technique based only on user stories.",
          misconceptionReason: "Statement testing uses knowledge of code structure, so it is white-box."
        },
        {
          topic: "Branch testing",
          term: "branch testing",
          definition: "A white-box technique that designs tests to execute decision outcomes.",
          scenario: "Tests cover both the true and false outcomes of an authorization condition.",
          accurate: "Branch coverage focuses on decision outcomes and is stronger than statement coverage.",
          misconception: "Branch coverage measures how many requirements were reviewed.",
          misconceptionReason: "Branch coverage measures code decision outcomes, not requirement review status."
        },
        {
          topic: "Error guessing",
          term: "error guessing",
          definition: "Using experience and defect knowledge to anticipate likely defects and design tests.",
          scenario: "A tester adds tests for empty strings, null values, and duplicate IDs because similar bugs occurred before.",
          accurate: "Error guessing complements formal techniques by using practical experience.",
          misconception: "Error guessing means random testing without any basis.",
          misconceptionReason: "Good error guessing uses experience, knowledge of failures, and defect patterns."
        },
        {
          topic: "Exploratory testing",
          term: "exploratory testing",
          definition: "Simultaneously learning, designing tests, executing tests, and interpreting results.",
          scenario: "A tester follows a charter and adapts the next test based on what was just observed.",
          accurate: "Exploratory testing is structured by learning and intent, even if it is not fully scripted.",
          misconception: "Exploratory testing means unplanned clicking with no objective.",
          misconceptionReason: "Exploratory testing can use charters, notes, timeboxes, and clear missions."
        },
        {
          topic: "Checklist-based testing",
          term: "checklist-based testing",
          definition: "Testing guided by a checklist of conditions, quality concerns, or experience-based items.",
          scenario: "A tester uses a release checklist covering installation, permissions, logging, and rollback.",
          accurate: "Checklists help make experience-based testing more systematic.",
          misconception: "Checklist-based testing prevents testers from using judgment.",
          misconceptionReason: "A checklist guides attention; testers still use judgment and context."
        },
        {
          topic: "Collaboration-based approaches",
          term: "acceptance criteria and ATDD",
          definition: "Collaborative practices use examples and acceptance criteria to clarify expected behavior before or during development.",
          scenario: "Business, development, and testing agree on Given-When-Then examples for a user story.",
          accurate: "Shared examples help align stakeholders and create testable expectations.",
          misconception: "Acceptance criteria should be written only after the feature is released.",
          misconceptionReason: "Acceptance criteria are most useful when they guide development and testing before implementation is complete."
        }
      ]
    },
    {
      id: "management",
      title: "5. Managing Test Activities",
      subtitle: "Planning, risk, monitoring, control, completion, configuration, and defects.",
      concepts: [
        {
          topic: "Test plan",
          term: "test planning",
          definition: "Defining test objectives, scope, approach, resources, schedule, risks, and criteria.",
          scenario: "A test lead documents what will be tested, who will do it, and when testing can start and stop.",
          accurate: "Test planning supports alignment, control, and communication.",
          misconception: "A test plan is only a list of defects found during execution.",
          misconceptionReason: "A defect list is not a plan; planning defines how testing will be performed and controlled."
        },
        {
          topic: "Test strategy and approach",
          term: "test strategy versus test approach",
          definition: "A strategy is a high-level testing direction; an approach applies it to a specific project context.",
          scenario: "The organization favors risk-based testing, and a project applies it by testing payment risks first.",
          accurate: "The project approach should be consistent with strategy while fitting local risks and constraints.",
          misconception: "A test strategy and a defect report are the same work product.",
          misconceptionReason: "A strategy guides testing; a defect report communicates a specific problem."
        },
        {
          topic: "Entry criteria",
          term: "entry criteria",
          definition: "Conditions that should be met before a test activity starts.",
          scenario: "System testing starts only after the environment is ready and critical test data is available.",
          accurate: "Entry criteria help avoid starting work before prerequisites are in place.",
          misconception: "Entry criteria define when testing is finished.",
          misconceptionReason: "Exit criteria define completion; entry criteria define readiness to start."
        },
        {
          topic: "Exit criteria",
          term: "exit criteria",
          definition: "Conditions used to decide whether a test activity can be considered complete.",
          scenario: "Testing can close when critical tests pass, target coverage is met, and residual risks are accepted.",
          accurate: "Exit criteria support objective completion decisions.",
          misconception: "Exit criteria require proving that no defects exist.",
          misconceptionReason: "A realistic exit criterion considers coverage, results, and acceptable residual risk."
        },
        {
          topic: "Estimation",
          term: "test estimation",
          definition: "Estimating testing effort using factors such as scope, risk, complexity, people, tools, and historical data.",
          scenario: "A team estimates more effort for a complex migration with many integrations and limited environment access.",
          accurate: "Test estimates should consider both product and project factors.",
          misconception: "Test estimation is based only on the number of testers available.",
          misconceptionReason: "Availability matters, but scope, risk, complexity, and constraints also strongly affect estimates."
        },
        {
          topic: "Product risk",
          term: "product risk",
          definition: "The possibility that the product may fail in a way that harms users, business, or stakeholders.",
          scenario: "A payment workflow may reject valid cards during peak sales.",
          accurate: "Product risks guide what to test more deeply or earlier.",
          misconception: "Product risk is only about the test team schedule.",
          misconceptionReason: "Schedule issues are project risks; product risks concern product quality and failure impact."
        },
        {
          topic: "Project risk",
          term: "project risk",
          definition: "The possibility that project circumstances may threaten successful testing or delivery.",
          scenario: "The test environment may arrive two weeks late, reducing execution time.",
          accurate: "Project risks affect the ability to perform testing or deliver as planned.",
          misconception: "A missing test environment is a product failure experienced by users.",
          misconceptionReason: "A missing environment threatens project execution; it is not a failure of the product under use."
        },
        {
          topic: "Risk level",
          term: "risk likelihood and impact",
          definition: "Risk level is commonly assessed from the likelihood of occurrence and the impact if it occurs.",
          scenario: "A rarely used report has minor impact, while checkout failure is likely and business critical.",
          accurate: "Both likelihood and impact matter when prioritizing risk-based testing.",
          misconception: "Risk priority should be based only on how easy a feature is to test.",
          misconceptionReason: "Risk is about likelihood and impact, not only testing convenience."
        },
        {
          topic: "Monitoring and control",
          term: "test monitoring and control",
          definition: "Monitoring tracks status and progress; control takes corrective actions based on that information.",
          scenario: "After many tests are blocked, the lead reallocates effort and escalates environment issues.",
          accurate: "Control uses monitoring data to adjust testing.",
          misconception: "Monitoring and control both mean passively recording results only.",
          misconceptionReason: "Monitoring observes; control changes plans or actions when needed."
        },
        {
          topic: "Test completion",
          term: "test completion",
          definition: "Finalizing, reporting, archiving testware, closing incidents, and capturing lessons learned.",
          scenario: "After release, the team stores test assets, summarizes residual risks, and records improvement actions.",
          accurate: "Completion activities preserve useful information for stakeholders and future work.",
          misconception: "Testing completion means simply stopping test execution without reporting.",
          misconceptionReason: "Completion includes reporting, closure, archiving, and lessons learned."
        },
        {
          topic: "Configuration management",
          term: "configuration management for testing",
          definition: "Identifying and controlling versions of test items, environments, and testware.",
          scenario: "A failed result is linked to the exact build, test data version, and test script version used.",
          accurate: "Configuration control helps make test results repeatable and understandable.",
          misconception: "Configuration management is unrelated to testing.",
          misconceptionReason: "Testing depends on knowing exactly what was tested with which testware and environment."
        },
        {
          topic: "Defect management",
          term: "defect report quality",
          definition: "A useful defect report includes clear summary, steps, actual result, expected result, environment, and impact.",
          scenario: "A tester reports the browser, build, data, steps, observed error, expected behavior, and screenshots.",
          accurate: "Clear defect reports support reproduction, triage, prioritization, and fixing.",
          misconception: "A defect report only needs to say that something is broken.",
          misconceptionReason: "Without context and reproduction information, investigation and fixing are slower and less reliable."
        }
      ]
    },
    {
      id: "tools",
      title: "6. Test Tools",
      subtitle: "Tool support, automation benefits, risks, pilots, integration, and maintainability.",
      concepts: [
        {
          topic: "Tool support",
          term: "test tool support",
          definition: "Tools support activities such as management, design, execution, reporting, analysis, and environment handling.",
          scenario: "A team uses one tool for test management and another for automated API checks.",
          accurate: "Different tools support different testing activities and information needs.",
          misconception: "A single test tool automatically performs every testing activity well.",
          misconceptionReason: "Tools are specialized and still require suitable process, skills, and maintenance."
        },
        {
          topic: "Test management tools",
          term: "test management tool",
          definition: "A tool that helps plan, organize, track, and report testing activities and testware.",
          scenario: "The team tracks test cases, execution status, assignments, and summary reports in one system.",
          accurate: "Test management tools improve visibility and organization of testing work.",
          misconception: "A test management tool is the same as a compiler.",
          misconceptionReason: "A compiler builds code; a test management tool organizes testing information."
        },
        {
          topic: "Static analysis tools",
          term: "static analysis tool",
          definition: "A tool that checks work products such as code without executing them.",
          scenario: "A scanner flags unreachable code, style violations, and possible null dereferences before execution.",
          accurate: "Static analysis tools can find some defects early and consistently.",
          misconception: "Static analysis tools require users to run the application manually.",
          misconceptionReason: "Static analysis evaluates artifacts without executing the software under test."
        },
        {
          topic: "Test execution tools",
          term: "test execution tool",
          definition: "A tool that runs tests automatically and compares actual and expected results.",
          scenario: "A nightly suite opens the application, performs workflows, and reports failed checks.",
          accurate: "Execution tools are useful for repeatable checks with clear expected results.",
          misconception: "Test execution tools are best for vague tests with no expected outcome.",
          misconceptionReason: "Automation needs reliable steps and expected results to produce meaningful feedback."
        },
        {
          topic: "Performance tools",
          term: "performance testing tool",
          definition: "A tool that simulates load or measures performance characteristics such as response time and throughput.",
          scenario: "The team simulates 1,000 users and measures checkout response time and server utilization.",
          accurate: "Performance tools support measurement under defined workloads.",
          misconception: "Performance tools are mainly for checking spelling in requirements.",
          misconceptionReason: "Spelling checks are static/document concerns; performance tools measure runtime quality characteristics."
        },
        {
          topic: "Automation benefits",
          term: "test automation benefits",
          definition: "Benefits can include faster feedback, repeatability, broader regression checks, and support for CI/CD.",
          scenario: "A smoke suite runs after each merge and quickly detects a broken login flow.",
          accurate: "Automation is strongest for stable, repeatable checks that need frequent execution.",
          misconception: "Automation guarantees that all defects will be found.",
          misconceptionReason: "Automation executes designed checks; it cannot cover unknown conditions or replace judgment."
        },
        {
          topic: "Automation risks",
          term: "test automation risks",
          definition: "Risks include high maintenance, false confidence, fragile scripts, unrealistic expectations, and tool mismatch.",
          scenario: "Many UI scripts fail after a layout change even though the business behavior still works.",
          accurate: "Automated tests require maintenance and careful design to remain valuable.",
          misconception: "Automated tests never need maintenance after they are written.",
          misconceptionReason: "Products, data, environments, and interfaces change, so automated tests must be maintained."
        },
        {
          topic: "Tool selection",
          term: "test tool selection",
          definition: "Selecting tools based on objectives, process fit, skills, integration, cost, and risks.",
          scenario: "A team compares tools against pipeline integration, reporting needs, skills, and licensing constraints.",
          accurate: "Tool choice should be driven by real needs and context, not feature count alone.",
          misconception: "The tool with the longest feature list is always the best choice.",
          misconceptionReason: "A large feature list does not ensure fit with objectives, people, process, or environment."
        },
        {
          topic: "Tool pilot",
          term: "tool pilot",
          definition: "A limited trial used to evaluate feasibility, benefits, risks, integration, and learning needs.",
          scenario: "The team automates a small regression slice before committing to a company-wide rollout.",
          accurate: "A pilot reduces adoption risk by testing the tool in realistic conditions.",
          misconception: "A pilot is unnecessary because every tool works equally well in every organization.",
          misconceptionReason: "Tools vary in fit, integration, usability, maintainability, and cost."
        },
        {
          topic: "Automation maintainability",
          term: "automation maintainability",
          definition: "Designing automated tests so they are clear, stable, modular, and easy to update.",
          scenario: "The suite uses reusable helpers and stable API checks instead of duplicating fragile UI steps.",
          accurate: "Maintainable automation lowers long-term cost and improves trust in results.",
          misconception: "Duplicating long brittle scripts makes automation easier to maintain.",
          misconceptionReason: "Duplication and brittleness increase update effort and false failures."
        },
        {
          topic: "CI/CD integration",
          term: "tool integration in CI/CD",
          definition: "Integrating tools into pipelines to provide quick, reliable feedback after changes.",
          scenario: "Static checks, unit tests, and smoke tests run automatically on every merge request.",
          accurate: "Pipeline integration helps detect problems close to the change that introduced them.",
          misconception: "CI/CD testing tools are useful only after the product is retired.",
          misconceptionReason: "CI/CD tools are intended to support frequent delivery and rapid feedback during active development."
        }
      ]
    }
  ];

  function buildBank() {
    return sectionDefinitions.map((section) => ({
      id: section.id,
      title: section.title,
      subtitle: section.subtitle,
      questions: buildQuestions(section)
    }));
  }

  function buildQuestions(section) {
    const questions = [];
    section.concepts.forEach((concept, index) => {
      questions.push(definitionQuestion(section, concept, index));
      questions.push(termQuestion(section, concept, index));
      questions.push(scenarioQuestion(section, concept, index));
      questions.push(accurateQuestion(section, concept, index));
      questions.push(misconceptionQuestion(section, concept, index));
    });
    return questions.map((question, index) => ({
      id: `${section.id}-${String(index + 1).padStart(2, "0")}`,
      number: index + 1,
      ...question
    }));
  }

  function definitionQuestion(section, concept, index) {
    const distractors = neighbors(section, index, 3);
    return normalizeQuestion({
      topic: concept.topic,
      text: `Which statement best describes ${concept.term}?`,
      takeaway: concept.accurate,
      options: [
        option(concept.definition, true, concept.accurate),
        ...distractors.map((other) =>
          option(other.definition, false, `This describes ${other.term}, not ${concept.term}.`)
        )
      ]
    }, index);
  }

  function termQuestion(section, concept, index) {
    const distractors = neighbors(section, index, 3);
    return normalizeQuestion({
      topic: concept.topic,
      text: `Which term matches this description: ${concept.definition}`,
      takeaway: concept.accurate,
      options: [
        option(titleCase(concept.term), true, `The description matches ${concept.term}.`),
        ...distractors.map((other) =>
          option(titleCase(other.term), false, `${titleCase(other.term)} is related to ${other.topic}, but the description points to ${concept.term}.`)
        )
      ]
    }, index + 1);
  }

  function scenarioQuestion(section, concept, index) {
    const distractors = neighbors(section, index, 3);
    return normalizeQuestion({
      topic: concept.topic,
      text: `Which concept is shown by this scenario? ${concept.scenario}`,
      takeaway: concept.definition,
      options: [
        option(titleCase(concept.term), true, `The scenario is an example of ${concept.term}.`),
        ...distractors.map((other) =>
          option(titleCase(other.term), false, `That concept concerns ${other.topic}; the scenario points to ${concept.term}.`)
        )
      ]
    }, index + 2);
  }

  function accurateQuestion(section, concept, index) {
    const distractors = neighbors(section, index, 3);
    return normalizeQuestion({
      topic: concept.topic,
      text: `Which statement about ${concept.term} is accurate?`,
      takeaway: concept.accurate,
      options: [
        option(concept.accurate, true, `This is accurate: ${concept.definition}`),
        option(concept.misconception, false, concept.misconceptionReason),
        option(distractors[0].misconception, false, `This is a misconception about ${distractors[0].term}, not an accurate statement about ${concept.term}.`),
        option(distractors[1].misconception, false, `This is a misconception about ${distractors[1].term}, not an accurate statement about ${concept.term}.`)
      ]
    }, index + 3);
  }

  function misconceptionQuestion(section, concept, index) {
    const distractors = neighbors(section, index, 3);
    return normalizeQuestion({
      topic: concept.topic,
      text: `Which statement is a common misconception about ${concept.term}?`,
      takeaway: concept.misconceptionReason,
      options: [
        option(concept.misconception, true, concept.misconceptionReason),
        option(concept.accurate, false, "This statement is generally true, so it is not the misconception asked for."),
        option(distractors[0].accurate, false, `This is a generally true statement about ${distractors[0].term}, not the misconception about ${concept.term}.`),
        option(distractors[1].accurate, false, `This is a generally true statement about ${distractors[1].term}, not the misconception about ${concept.term}.`)
      ]
    }, index + 4);
  }

  function option(text, correct, reason) {
    return { text, correct, reason };
  }

  function neighbors(section, index, count) {
    const result = [];
    for (let offset = 1; result.length < count; offset += 1) {
      result.push(section.concepts[(index + offset) % section.concepts.length]);
    }
    return result;
  }

  function normalizeQuestion(question, rotation) {
    const options = rotate(question.options, rotation).map((item, index) => ({
      letter: "ABCD"[index],
      ...item
    }));
    return { ...question, options };
  }

  function rotate(items, rotation) {
    const amount = rotation % items.length;
    return items.slice(amount).concat(items.slice(0, amount));
  }

  function titleCase(value) {
    return value.replace(/\b[a-z]/g, (letter) => letter.toUpperCase());
  }

  window.ISTQB_QUESTION_BANK = buildBank();
})();
