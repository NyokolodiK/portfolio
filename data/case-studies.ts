import { ReactNode } from "react";

export interface CaseStudy {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    content: string;
    problem: string;
    solution: string;
    outcomes: string[];
    techStack: string[];
    category: "Architecture" | "Migration" | "AI" | "Engineering";
    date: string;
    impact: string;
    metrics?: {
        label: string;
        value: string;
    }[];
}

export const caseStudies: CaseStudy[] = [
    {
        id: "agent-assistant-deep-dive",
        title: "Engineering the Future of Safari Planning: A Deep Dive into the Agent Assistant",
        subtitle: "Orchestrating AI, MCP, and Preact for a high-performance travel assistant",
        description: "How we solved the non-deterministic nature of LLMs by combining structured UI wizards with real-time data orchestration.",
        content: `
Safari planning is a high-stakes, multi-variable optimization problem. Travelers care about seasonal migrations, specific lodge vibes, dietary requirements, and budget constraints—all while navigating the complex geography of Southern Africa. 

In the **Agent Assistant** project, we moved beyond the "simple chat" paradigm. The challenge wasn't just getting an LLM to talk like a travel agent; it was getting it to act like one. This meant providing it with real-time access to our product catalog, ensuring it didn't hallucinate lodge IDs, and creating a reliable way to capture structured traveler intent before the "creative" AI took over.

### The Architectural Shift: Hybrid Intelligence
We settled on a hybrid architecture. Instead of a free-form chat being the primary entry point, we introduced a **Trip Wizard**. Built with Preact and powered by highly reactive **Preact Signals**, this wizard captures the "hard facts"—dates, budget ranges, and guest counts. 

This structured preamble does two things:
1. It reduces the token load on the LLM by narrowing the problem space.
2. It provides a deterministic context that we inject into the AI's system instructions, making the output significantly more reliable.

### Real-time Data with MCP (Model Context Protocol)
The Model Context Protocol (MCP) was our secret weapon. By implementing an MCP server that sits between the OpenAI Assistant and our internal product databases, we enabled the AI to perform live lookups. 

When a user asks about "lodges in the Okavango Delta," the AI doesn't rely on its training data; it calls our MCP server, which returns:
- Valid product IDs (e.g., \`lodge_123\`)
- Current seasonal pricing tiers
- Live availability markers
- High-resolution image URLs for UI cards

### Deep Technical Implementation

#### 1. FastAPI Backend & Pydantic Validation
The backend is built with **FastAPI**, leveraging its asynchronous capabilities for real-time streaming. We used **Pydantic** models to strictly define the contract between the AI's structured output and our internal services.

\`\`\`python
class ItineraryItem(BaseModel):
    day: int
    activity: str
    lodge_id: str
    location: str
\`\`\`

#### 2. Streaming Response Pipeline
To achieve a "typing" effect that feels snappy, we implemented a custom streaming pipeline. We wrap the OpenAI stream in a FastAPI \`StreamingResponse\`, allowing us to perform real-time content analysis (like intercepting JSON blocks for the UI) without blocking the user's view of the text.

#### 3. Security: JWT Bearer Token Authentication
The widget is designed to be embeddable across various Group properties. We implemented a robust **JWT Bearer Token** system. Our backend validates the signature, issuer, and audience before any message is processed.

#### 4. Preact Signals for Frontend State
In the UI, we swapped standard React state for **Preact Signals**. This allowed us to manage complex wizard states with zero unnecessary re-renders, keeping the chat interface fluid even on lower-end mobile devices.

### Key Technical Challenges
One major challenge was the **Itinerary Parsing**. AI output is inherently non-deterministic. We built a robust regex-based extraction layer that identifies JSON blocks within the markdown stream, validates them against our schema, and transforms them into interactive UI components in real-time.

### Conclusion
The Agent Assistant proves that with the right orchestration—combining deterministic UI tools with non-deterministic LLMs—we can build AI systems that are both creative and reliably accurate for complex industry use cases.
    `,
        category: "AI",
        date: "Jan 23, 2026",
        impact: "Reduced booking turnaround time by 40% and improved data accuracy by 95%.",
        problem: "Safari planning is inherently non-deterministic. Traditional LLM-only approaches struggled with accurate product IDs, real-time availability, and gathering consistent traveler requirements through free-form text. The lack of structured data led to 'garbage-in, garbage-out' scenarios where the AI suggested non-existent properties.",
        solution: "We implemented a hybrid architecture: a FastAPI backend following Clean Architecture principles and a Preact frontend using Feature-Sliced Design. The core solution involves a deterministic 'Trip Wizard' for data intake, combined with the Model Context Protocol (MCP) for real-time, tool-based product lookups. We also implemented a custom markdown parser to extract valid JSON itineraries from AI responses.",
        outcomes: [
            "Implemented Model Context Protocol (MCP) for real-time, cross-service data orchestration.",
            "Developed a 'Trip Wizard' feature using Preact Signals to capture structured booking intent.",
            "Built a secure, JWT-based embeddable widget architecture compatible with multiple legacy platforms.",
            "Implemented an automated 'Itinerary Draft' parser that transforms AI suggestions into valid booking payloads.",
            "Achieved 99.2% test coverage using a Bulletproof React testing strategy."
        ],
        techStack: ["FastAPI", "Preact", "Signals", "OpenAI Assistant API", "MCP", "TypeScript", "Tailwind CSS"],
        metrics: [
            { label: "Data Accuracy", value: "95%" },
            { label: "User Satisfaction", value: "4.8/5" },
            { label: "Dev Velocity", value: "+60%" }
        ]
    },
    {
        id: "bazaruto-date-lib-migration",
        title: "Bazaruto: Optimizing Performance via Library Migration",
        subtitle: "A seamless transition from Moment.js to Day.js",
        description: "Future-proofing a complex safari booking platform by migrating from the deprecated Moment.js to a modern, lightweight alternative.",
        content: `
As web applications grow, the cost of dependencies becomes a significant factor in performance and long-term maintainability. For **Bazaruto**, we faced a dual challenge: our primary date library, **Moment.js**, was contributing significantly to our JavaScript bundle size and, more critically, had been officially deprecated (moving into maintenance mode) by its maintainers.

### The Challenge: Legacy Risk & Performance
Bazaruto's booking engine relies heavily on complex date calculations: seasonal pricing, availability checks, and multi-timezone itinerary drafts. Using a deprecated library meant we were accumulating technical debt and missing out on modern optimizations like tree-shaking.

### The Solution: Selecting Day.js
We chose **Day.js** as the replacement. Day.js shares a nearly identical API with Moment.js but is a fraction of the weight (2kB vs 70kB+). To bridge the gap in specialized functionality, we implemented a custom \`date-utils.ts\` wrapper that extended Day.js with several essential plugins:
- \`UTC\` and \`AdvancedFormat\` for global traveler coordination.
- \`IsSameOrBefore\`, \`IsSameOrAfter\`, and \`IsBetween\` for precise availability logic.
- \`Duration\` and \`RelativeTime\` for user-friendly itinerary displays.

### The Strategy: Incremental Strangling
We didn't perform a "big bang" replacement. Instead:
1. **Centralized Wrapper**: We created a centralized \`date-utils.ts\` that abstracted all date operations.
2. **Dual-Dependency Phase**: For a short period, both libraries co-existed. New features used the Day.js wrapper, while legacy components were moved over function-by-function.
3. **Exhaustive Testing**: We mirrored our Moment.js unit tests for the new Day.js implementation to ensure parity in obscure edge cases (e.g., leap years, DST transitions).

### Results
The migration was a resounding success. We reduced our total JavaScript bundle size by **45kB (gzip)** and improved the initial page load time on mobile devices. Most importantly, we removed a major piece of legacy risk by moving to a modern, actively maintained foundation.
        `,
        category: "Engineering",
        date: "Oct 12, 2024",
        impact: "Future-proofed the codebase by removing deprecated dependencies and reduced JS bundle size by 45kB.",
        problem: "Moment.js was officially deprecated and entered maintenance mode, creating a long-term maintenance risk. Additionally, its monolithic size was bloating the Bazaruto bundle and slowing down mobile page loads.",
        solution: "Implemented an incremental migration strategy to replace the deprecated Moment.js with Day.js. Developed a specialized `date-utils.ts` utility layer to maintain API parity and ensure zero regressions across complex booking logic.",
        outcomes: [
            "Eliminated legacy risk by migrating away from a deprecated library.",
            "Successfully replaced Moment.js with Day.js across 100+ components.",
            "Reduced bundle size by 45kB gzip, significantly improving Time to Interactive (TTI).",
            "Established a standardized, plugin-oriented date utility library with full TypeScript support.",
            "Maintained 100% logic parity verified through a comprehensive parallel test suite."
        ],
        techStack: ["React", "TypeScript", "Day.js", "Moment.js", "Jest"],
        metrics: [
            { label: "Bundle Size", value: "-45kB" },
            { label: "TTI Improvement", value: "15%" },
            { label: "Risk Mitigation", value: "High" }
        ]
    }
];
