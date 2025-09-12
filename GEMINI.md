# Gemini Rules

To ensure you are always using the latest documentation, please refer to Perplexity AI and Context7 for information.

## Code Style Guidelines

To maintain consistency and leverage modern JavaScript features, please adhere to the following:

- **ES6+ Features:** Utilize ECMAScript 2015 (ES6) and newer features where appropriate (e.g., `const`, `let`, template literals, destructuring, spread/rest operators).
- **Arrow Functions:** Prefer arrow functions (`=>`) for anonymous functions and callbacks, especially in React components, for cleaner syntax and lexical `this` binding.

## How to Interact with Gemini CLI

This document outlines how to effectively interact with the Gemini CLI agent to streamline your development workflow.

### General Commands

- **`/help`**: Displays general help information about available commands and functionalities.

### Task Execution

To request the Gemini CLI to perform a task, clearly state your intention. The agent can assist with:

- **Bug Fixes**: "Fix the bug in `src/App.tsx` where the button doesn't click."
- **Feature Additions**: "Add a new feature to `src/components/Header.tsx` that displays the current date."
- **Refactoring**: "Refactor the `src/utils/markdown.ts` file to improve readability."
- **Code Explanations**: "Explain the purpose of the `generate-blog-data.js` script."

### File System Operations

The Gemini CLI can interact with the file system. Always provide absolute paths for file operations.

- **Search Files/Content**: "Search for all `.tsx` files containing the text 'useState'." or "Find all files named `package.json`."
- **Read File Content**: "Read the content of `/home/jaipkapoor99/jaipkapoor99-blog/README.md`."
- **Write/Modify Files**: "Write 'Hello World' to `/home/jaipkapoor99/jaipkapoor99-blog/test.txt`." or "Replace 'old_text' with 'new_text' in `src/App.tsx`."

### Shell Commands

To execute shell commands, clearly state the command you wish to run. The agent will explain the command's purpose and potential impact before execution.

- **Run a Command**: "Run `npm install`."
- **Background Processes**: "Start the development server with `npm run dev &`."

### Git Operations

The Gemini CLI can assist with Git operations. Always provide clear instructions for commits.

- **Commit Changes**: "Commit all staged changes with the message 'Feat: Add new blog post.'"
- **Check Status**: "Show me the current git status."
- **View Diff**: "Show me the diff of unstaged changes."

### Important Notes

- **Context is Key**: Provide as much context as possible for complex tasks.
- **Confirmation**: The agent will often ask for confirmation before performing critical actions.
- **Error Handling**: If an error occurs, the agent will attempt to provide a clear explanation.
