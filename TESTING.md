# Local Testing Instructions

To test the Docusaurus Live Book locally, follow these steps:

1.  **Navigate to the Docusaurus project directory**:
    ```bash
    cd book
    ```

2.  **Install dependencies (if not already installed)**:
    ```bash
    npm install
    ```

3.  **Start Docusaurus in development mode**:
    ```bash
    npm start
    ```
    This will typically open the Docusaurus site in your browser at `http://localhost:3000`.

4.  **Backend (RAG Agent) Setup**:
    For the RAG agent functionality (the "Ask" button) to work, you need to have the backend running separately. Refer to the `Quick Start` guide in the book for instructions on how to set up and run the backend.

5.  **Test Book Flow**:
    *   Navigate through the chapters of the book.
    *   Highlight some text within a chapter.
    *   Verify that a floating "Ask" button appears.
    *   Click the "Ask" button and observe the agent's response. This simulates the "Panaversity" experience with embedded agents.

    **Note:** Ensure your backend is configured with the necessary API keys (e.g., `OPENAI_API_KEY`) and Qdrant URL as described in the backend setup instructions.