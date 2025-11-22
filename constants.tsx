import React from 'react';
import { ChapterContent } from './types';
import { CodeBlock, MaturityTable, Admonition, Badge, MermaidDiagram } from './components/UIComponents';

const maturityLevels = [
  { level: 1, name: 'AI-Aware', description: 'Ad-hoc use of AI tools.', criteria: ['Faculty uses ChatGPT for basic drafting.', 'Students use AI for homework assistance (often unguided).', 'No formal policy.'] },
  { level: 2, name: 'AI-Assisted', description: 'AI integrated into workflows.', criteria: ['Faculty uses structured prompts.', 'Assignments designed with AI in mind.', 'Basic RAG used for course search.'] },
  { level: 3, name: 'AI-Native', description: 'Curriculum redesigned for AI.', criteria: ['Live Books with embedded agents.', 'Personalized learning paths.', 'Evaluation via AI simulation.'] },
  { level: 4, name: 'AI-Symbiotic', description: 'Co-evolution of human/AI.', criteria: ['Recursive self-improvement of course material.', 'Autonomous student agents.', 'Global knowledge mesh integration.'] }
];

export const BOOK_CONTENT: ChapterContent[] = [
  {
    id: 'preface',
    title: 'Preface',
    path: '/docs/preface',
    description: 'Welcome to AI-Driven Education',
    content: (
      <div>
        <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-6">
          Education is undergoing a phase transition. This book is not just text; it is an executable specification for the future of learning.
        </p>
        <Admonition type="info" title="Live Book">
          This document is a "Live Book". It is generated from an executable specification (Spec-Kit Plus) and includes embedded RAG agents to assist your learning journey.
        </Admonition>
        <h2 id="mission">Mission</h2>
        <p>
          Panaversity aims to transition global education from a scarcity-based factory model to an abundance-based AI-native model. We provide the architectural blueprints for this transition.
        </p>
      </div>
    ),
    toc: [{ id: 'mission', text: 'Mission', level: 2 }]
  },
  {
    id: 'ch1',
    title: '1. The Future of AI-Driven Faculty Work',
    path: '/docs/future-faculty',
    description: 'Redefining the role of educators in the age of intelligence.',
    content: (
      <div>
        <p>Faculty roles are shifting from <strong>Knowledge Dispensers</strong> to <strong>Learning Architects</strong>.</p>
        <h2 id="objectives">Learning Objectives</h2>
        <ul className="list-disc list-inside mb-6">
            <li>Identify the three phases of faculty evolution.</li>
            <li>Understand the "Human-in-the-Loop" necessity.</li>
            <li>Draft a personal transition plan.</li>
        </ul>
        
        <h2 id="maturity">Faculty AI Maturity Model</h2>
        <MaturityTable levels={maturityLevels} />

        <h2 id="automation">The Automation Paradox</h2>
        <p>As AI automates content generation, the value of <em>curation</em> and <em>mentorship</em> skyrockets. We use Python agents to handle the drudgery.</p>
        
        <CodeBlock snippet={{
          language: 'python',
          filename: 'faculty_agent.py',
          code: `class FacultyAssistant:
    def __init__(self, vector_store):
        self.knowledge_base = vector_store
        
    def draft_syllabus(self, topic: str, level: str) -> str:
        """Generates a spec-driven syllabus draft."""
        context = self.knowledge_base.query(f"Standard curriculum for {topic}")
        return f"Generated Syllabus for {topic} ({level}) based on {len(context)} sources."`
        }} />
      </div>
    ),
    toc: [
      { id: 'objectives', text: 'Learning Objectives', level: 2 },
      { id: 'maturity', text: 'Maturity Model', level: 2 },
      { id: 'automation', text: 'The Automation Paradox', level: 2 }
    ]
  },
  {
    id: 'ch2',
    title: '2. From AI-Assisted to AI-Native Education',
    path: '/docs/ai-native-edu',
    description: 'Moving beyond assistance to fundamental redesign.',
    content: (
      <div>
        <p>AI-Native education isn't about adding chatbots to LMS. It's about rebuilding the LMS as an agentic platform.</p>
        
        <h2 id="shift">The Paradigm Shift</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
            <div className="p-4 border rounded bg-red-50 dark:bg-red-900/10 border-red-200">
                <h3 className="font-bold text-red-700 dark:text-red-400">Legacy (Factory Model)</h3>
                <ul className="text-sm mt-2 space-y-1">
                    <li>Standardized Curriculum</li>
                    <li>Batch Processing</li>
                    <li>Summative Exams</li>
                </ul>
            </div>
            <div className="p-4 border rounded bg-green-50 dark:bg-green-900/10 border-green-200">
                <h3 className="font-bold text-green-700 dark:text-green-400">AI-Native (Personalized)</h3>
                <ul className="text-sm mt-2 space-y-1">
                    <li>Adaptive Pathways</li>
                    <li>Individual Tutoring</li>
                    <li>Continuous Formative Feedback</li>
                </ul>
            </div>
        </div>

        <h2 id="spec">Spec-Kit Plus Integration</h2>
        <p>We use <strong>Spec-Kit Plus</strong> to define educational outcomes as code.</p>
        <CodeBlock snippet={{
          language: 'typescript',
          filename: 'course-spec.ts',
          code: `interface CourseModule {
  id: string;
  objectives: LearningObjective[];
  rag_context_ids: string[]; // Links to vector DB
  assessment_agent_config: AgentConfig;
}

const aiCourse: CourseModule = {
  id: "gen-ai-101",
  objectives: [{ action: "Build", target: "RAG Pipeline" }],
  rag_context_ids: ["doc_882", "doc_991"],
  assessment_agent_config: {
    model: "gemini-1.5-pro",
    temperature: 0.2
  }
};`
        }} />
      </div>
    ),
    toc: [
      { id: 'shift', text: 'The Paradigm Shift', level: 2 },
      { id: 'spec', text: 'Spec-Kit Plus Integration', level: 2 }
    ]
  },
  {
    id: 'ch3',
    title: '3. Spec-Driven Development with Spec-Kit Plus',
    path: '/docs/spec-driven',
    description: 'Writing educational content as executable specifications.',
    content: (
      <div>
        <p>Spec-Kit Plus is the Panaversity standard for defining project requirements that both humans and AI agents can understand.</p>
        
        <h2 id="syntax">Syntax Guide</h2>
        <p>A Spec-Kit Plus file is a markdown file with enhanced metadata headers.</p>
        
        <CodeBlock snippet={{
          language: 'markdown',
          filename: 'PROJECT_SPEC.md',
          code: `---
project_name: "rag-edu-bot"
stack: ["docusaurus", "langchain", "pinecone"]
complexity: "intermediate"
agent_instructions: "Focus on modularity and type safety."
---

# Functional Requirements
1. User inputs query via iframe.
2. System retrieves top-k chunks.
3. LLM synthesizes answer with citations.`
        }} />
        
        <Admonition type="tip" title="Best Practice">
            Always version control your specs. They are the source of truth for your AI agents.
        </Admonition>
      </div>
    ),
    toc: [{ id: 'syntax', text: 'Syntax Guide', level: 2 }]
  },
  {
    id: 'ch4',
    title: '4. Building Live Books with Docusaurus',
    path: '/docs/live-books',
    description: 'Creating static sites that breathe.',
    content: (
      <div>
        <p>Docusaurus 3 provides the perfect React-based hydration engine for interactive content.</p>
        <h2 id="setup">Quick Setup</h2>
        <CodeBlock snippet={{
            language: 'bash',
            code: `npx create-docusaurus@latest my-live-book classic --typescript
cd my-live-book
npm start`
        }} />
        
        <h2 id="interactive">Adding Interactivity</h2>
        <p>Because Docusaurus is React, we can embed complex components directly in MDX.</p>
        <CodeBlock snippet={{
            language: 'tsx',
            filename: 'src/components/Quiz.tsx',
            code: `export default function Quiz({ question, answer }) {
  const [show, setShow] = useState(false);
  return (
    <div className="quiz-box">
      <h3>{question}</h3>
      <button onClick={() => setShow(!show)}>Reveal</button>
      {show && <p>{answer}</p>}
    </div>
  );
}`
        }} />
      </div>
    ),
    toc: [
        { id: 'setup', text: 'Quick Setup', level: 2 },
        { id: 'interactive', text: 'Adding Interactivity', level: 2 }
    ]
  },
  {
    id: 'ch5',
    title: '5. Retrieval-Augmented Generation for Education',
    path: '/docs/rag-edu',
    description: 'Grounding AI answers in verified curriculum.',
    content: (
      <div>
        <p>Hallucinations are fatal in education. RAG solves this by grounding generation in a curated vector store.</p>
        <h2 id="architecture">RAG Architecture</h2>
        <MermaidDiagram definition={`graph LR
    A[Student Query] --> B[Embedding Model]
    B --> C[Vector Database]
    C -->|Retrieve Chunks| D[Context Window]
    D --> E[LLM]
    E --> F[Answer]`} caption="Standard Educational RAG Pipeline" />
        
        <h2 id="embeddings">Embedding Strategy</h2>
        <p>For technical textbooks, we recommend using <strong>text-embedding-3-small</strong> or <strong>Gemini Embeddings</strong> with a chunk size of 512 tokens.</p>
      </div>
    ),
    toc: [
        { id: 'architecture', text: 'Architecture', level: 2 },
        { id: 'embeddings', text: 'Embedding Strategy', level: 2 }
    ]
  },
  {
    id: 'ch6',
    title: '6. Embedding Reusable RAG Agents',
    path: '/docs/embedded-agents',
    description: 'Full architecture for the chatbot sidebar.',
    content: (
      <div>
        <p>A "Live Book" listens. It answers questions about itself.</p>
        <h2 id="component">The Chat Component</h2>
        <CodeBlock snippet={{
            language: 'tsx',
            filename: 'src/theme/Layout.tsx',
            code: `// Swizzled Layout to inject Chatbot
import React from 'react';
import Layout from '@theme-original/Layout';

export default function LayoutWrapper(props) {
  return (
    <>
      <Layout {...props} />
      <div className="fixed bottom-5 right-5 z-50">
        <iframe src="/ask" className="w-96 h-[500px] rounded-xl shadow-2xl" />
      </div>
    </>
  );
}`
        }} />
        <h2 id="flow">Data Flow</h2>
        <MermaidDiagram definition={`sequenceDiagram
    participant User
    participant UI as LiveBook UI
    participant API as Next.js API
    participant VDB as Pinecone
    
    User->>UI: "Explain Spec-Kit?"
    UI->>API: POST /api/chat
    API->>VDB: Query(embedding)
    VDB-->>API: Top 3 chunks
    API->>API: Generate(prompt + chunks)
    API-->>UI: Stream Response
    UI-->>User: Display Answer`} />
      </div>
    ),
    toc: [
        { id: 'component', text: 'Chat Component', level: 2 },
        { id: 'flow', text: 'Data Flow', level: 2 }
    ]
  },
  {
    id: 'ch7',
    title: '7. Reusable Sub-Agents & Skills',
    path: '/docs/sub-agents',
    description: 'Using Claude Code and tools.',
    content: (
      <div>
        <p>Monolithic agents are brittle. We build swarms of specialized sub-agents.</p>
        <h2 id="skills">Defining Skills</h2>
        <p>A skill is a TypeScript function exposed to the LLM via tool calling.</p>
        <CodeBlock snippet={{
            language: 'typescript',
            filename: 'skills/gradeCode.ts',
            code: `import { Tool } from '@langchain/core/tools';

export class GradeCode extends Tool {
  name = "grade_python_code";
  description = "Checks python code for PEP8 and logic errors.";
  
  async _call(code: string) {
    // Implementation of static analysis
    return JSON.stringify({ score: 85, errors: [] });
  }
}`
        }} />
      </div>
    ),
    toc: [{ id: 'skills', text: 'Defining Skills', level: 2 }]
  },
  {
    id: 'ch8',
    title: '8. Co-Learning: The Human–AI Reflection Loop',
    path: '/docs/co-learning',
    description: 'The final frontier of pedagogy.',
    content: (
      <div>
        <p>In Co-Learning, the student teaches the AI, and the AI refines the student's understanding.</p>
        <Admonition type="note" title="Philosophy">
            "To teach is to learn twice." — Joseph Joubert. <br/>
            "To teach an AI is to learn deeply." — Panaversity.
        </Admonition>
        <h2 id="future">The Road Ahead</h2>
        <p>We are building a world where every textbook has a voice, and every student has a personalized tutor.</p>
      </div>
    ),
    toc: [{ id: 'future', text: 'The Road Ahead', level: 2 }]
  },
  {
    id: 'appendix-hackathon',
    title: 'Appendix: Hackathon Implementation Details',
    path: '/docs/hackathon',
    description: 'Technical documentation for the embedded RAG system.',
    content: (
      <div>
        <p>This section documents the system architecture used to power this very book's chatbot.</p>
        <h2 id="spec">Spec-Kit Plus: RAG Agent</h2>
        <p>The following specification defines the behavior of the Ingestion, Query, and Reflection agents.</p>
        <CodeBlock snippet={{
            language: 'yaml',
            filename: 'specs/rag-agent-spec.yaml',
            code: `project: "panaversity-rag-agent"
stack:
  backend: "FastAPI"
  vector_db: "Qdrant Cloud"
  llm: "OpenAI GPT-4o"

agents:
  - name: IngestionAgent
    skill: education-embedding-skill
    config: { chunk_size: 1000, overlap: 200 }
  
  - name: QueryAgent
    instructions: "Prioritize selected context. Cite chapters."
  
  - name: ReflectionAgent
    trigger: "post-response"
    criteria: "Grounding Score > 0.7"`
        }} />
        
        <h2 id="backend">FastAPI Backend</h2>
        <p>We use a lightweight FastAPI wrapper to orchestrate the agents. View <code>backend/main.py</code> in the repository for full source.</p>
        
        <h2 id="frontend">React Widget</h2>
        <p>The floating widget detects <code>window.getSelection()</code> events to enable context-aware queries.</p>
      </div>
    ),
    toc: [
        { id: 'spec', text: 'Spec-Kit Plus', level: 2 },
        { id: 'backend', text: 'Backend Architecture', level: 2 }
    ]
  }
];

export const SIDEBAR_ITEMS: { label: string; path?: string; items?: any[] }[] = [
    { label: 'Introduction', items: [{ label: 'Preface', path: '/docs/preface' }] },
    { label: 'Foundations', items: [
        { label: '1. Future of Faculty', path: '/docs/future-faculty' },
        { label: '2. AI-Native Edu', path: '/docs/ai-native-edu' },
        { label: '3. Spec-Driven Dev', path: '/docs/spec-driven' },
    ]},
    { label: 'Implementation', items: [
        { label: '4. Live Books', path: '/docs/live-books' },
        { label: '5. RAG Architecture', path: '/docs/rag-edu' },
        { label: '6. Embedded Agents', path: '/docs/embedded-agents' },
        { label: '7. Sub-Agents', path: '/docs/sub-agents' },
    ]},
    { label: 'Conclusion', items: [
        { label: '8. Co-Learning', path: '/docs/co-learning' },
    ]},
    { label: 'Appendices', items: [
        { label: 'Hackathon Details', path: '/docs/hackathon' }
    ]},
    { label: 'Chat', path: '/ask' }
];
