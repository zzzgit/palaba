# Copilot Instructions

This project is a React Admin Dashboard using Chakra UI.

## Table of Contents
1. [Project Details](#project-details)
2. [Coding Standards](#coding-standards)
4. [JSX & Conditional Rendering](#jsx--conditional-rendering)
5. [Project Structure](#project-structure)
6. [Platform Specifics & Environment](#platform-specifics--environment)
7. [Best Practices](#best-practices)

## Project Details
- **Framework**: React
- **Language**: Modern JavaScript (ES6+) - NO TypeScript
- **Build Tool**: Vite
- **UI Library**: Chakra UI
- **Styling**: Standard CSS - NO PostCSS, NO Sass/SCSS
- **Data Fetching**: Native fetch API - NO Axios
- **Data Visualization**: Chart.js
- **Architecture**: RESTful API pattern with mock data layer

## Coding Standards

### JavaScript Syntax
- Use modern JavaScript (ECMAScript 2020+) features and syntax.
- Always prefer **arrow functions** (`const myFunc = () => {}`) over traditional `function` declarations.

### Asynchronous Patterns
- Prefer using **Promises** with `.then()` and `.catch()` chains rather than `async/await` syntax.
- For test case files (e.g., files in `spec/` and `*.spec.mjs`), `async/await` may be used as needed.
- Avoid `await` unless specifically required by the context or a library's constraints.

### Variable & Function Naming
- Use descriptive, camelCase names for variables and functions.
- Component names should use PascalCase (e.g., `Dashboard`, `CustomerTable`).
- Private or utility functions should be prefixed with underscore if needed.

## React + Chakra UI Specific Guidelines

### State Management
- Use React's built-in `useState`, `useReducer`, and `useContext` for state management.
- For derived/computed state, use `useMemo()`.
- For side effects, use `useEffect()`.
- Avoid external state management libraries unless absolutely necessary.

### Component Structure
- Components should be **pure functions** that return JSX.
- Keep components focused on a single responsibility.
- Extract reusable logic into separate utility functions or custom hooks.
- Use custom hooks for reusable logic and side effects.

## JSX & Conditional Rendering

### Conditional Rendering

**✅ Use logical operators or ternary expressions in JSX:**
```javascript
{isLoading ? <Loading /> : <Content />}
```

**✅ For multiple conditions:**
```javascript
{status === 'loading' && <Loading />}
{status === 'error' && <Error />}
{status === 'success' && <Content />}
```

### List Rendering
- Always use `.map()` for rendering lists of items in JSX.
- Provide a unique `key` prop for each item in the list.

```javascript
{items.length === 0 ? <p>No items</p> : items.map(item => (
  <Item key={item.id} item={item} />
))}
```

## Project Structure

- **src/components/**: Reusable UI components (Banner, Header, Sidebar, MainLayout, Chakra UI wrappers)
- **src/components/charts/**: Data visualization components using Chart.js
- **src/pages/**: Page-level components (Dashboard, CustomerManagement, SalesManagement)
- **src/mocks/**: Mock API responses and test data (mockAPI.js, mockData.js)
- **src/styles/**: Global and layout CSS files
- **tests/e2e/**: End-to-end tests using Playwright
- **reports/**: Test reports and documentation

## Platform Specifics & Environment

### Package Management
- When providing terminal commands or setup instructions for `npm install` on **macOS**, always prefix the command with `sudo` to ensure Administrator Privileges (e.g., `sudo npm install <package>`).

### Development
- Run development server with: `npm run dev`
- Run tests with: `npm test`
- Build for production with: `npm run build`

## Best Practices

### Code Organization
- Keep component files focused and under 300 lines when possible.
- Extract helper functions and utilities to separate files.
- Use consistent file naming conventions (PascalCase for components, camelCase for utilities).

### Performance
- Use `useMemo()` to prevent unnecessary re-computations.
- Wrap expensive calculations in memoized functions.
- Avoid creating new functions/objects in render methods.

### API Integration
- Use the mock data layer in `src/mocks/` during development.
- Use native `fetch` API for all HTTP requests.
- Chain promises with `.then()` and `.catch()` for consistent async handling.
- Handle errors gracefully and display user-friendly error messages.

### CSS & Styling
- Use standard CSS only; no preprocessors.
- Import global styles in the main App component.
- Use Chakra UI's style props for most component styling.
- Keep component-specific styles in the same directory as the component or in `global.css`.
- Use meaningful CSS class names and avoid deep nesting.

### Testing
- Write end-to-end tests using Playwright in the `tests/e2e/` directory.
- Test user interactions and page navigation.
- Maintain test reports in the `reports/` directory.