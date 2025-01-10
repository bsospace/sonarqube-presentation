# SonarQube Defect Demo Project

This project demonstrates various types of software defects analyzed by SonarQube. It is built using React (Vite.js) and intentionally contains code smells, bugs, vulnerabilities, and other issues to simulate real-world scenarios.

## Features

The project is designed to cover the following defect categories:

1. **Code Smells**: Examples of bad practices such as overly complex functions, duplicate code, and long methods.
2. **Bugs**: Issues like array out-of-bounds access and null reference errors.
3. **Vulnerabilities**: Security flaws like SQL injection and the use of `eval`.
4. **Code Duplication**: Demonstrates repeated blocks of logic.
5. **Unused Code**: Includes unused variables and functions.
6. **Technical Debt**: Temporary solutions that increase technical debt.

## Technologies Used

- **React (Vite.js)**: Frontend framework for building the project.
- **SonarQube**: Static code analysis tool for detecting defects.
- **Jenkins**: CI/CD pipeline to automate testing and SonarQube analysis.

## Project Structure

```
project-root/
├── src/
│   ├── App.jsx           # Main application entry point
│   ├── CodeSmells.jsx    # Code smells examples
│   ├── Bugs.jsx          # Bug examples
│   ├── Vulnerabilities.jsx  # Security issues
│   ├── DuplicateCode.jsx    # Duplicate code examples
│   ├── UnusedCode.jsx    # Unused code examples
│   ├── TechnicalDebt.jsx # Technical debt simulation
├── public/
├── package.json          # Project dependencies
├── Jenkinsfile           # CI/CD pipeline configuration
└── README.md             # Project documentation
```

## Setup Instructions

### Prerequisites

- **Node.js** (v16 or later)
- **npm** (or yarn)
- A running instance of **SonarQube** (configured with a token)
- **Jenkins** for CI/CD pipeline

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd demo-defects
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Access the app in your browser at `http://localhost:5173`.

## Running the Jenkins Pipeline

1. Ensure Jenkins is installed and configured with the following plugins:
   - SonarQube Scanner
   - Pipeline

2. Configure SonarQube in Jenkins:
   - Add your SonarQube server URL and authentication token under `Manage Jenkins > Configure System > SonarQube Servers`.

3. Create a new pipeline job in Jenkins and link it to this repository.

4. Run the pipeline to analyze the code with SonarQube.

## Examples of Defects

### Code Smells
- Functions with too many parameters
- Duplicate logic in multiple places
- Long and overly complex methods

### Bugs
- Array out-of-bounds access
- Null reference errors

### Vulnerabilities
- SQL injection via user input
- Usage of `eval` for dynamic execution

### Unused Code
- Variables and functions declared but never used

### Technical Debt
- Temporary fixes instead of proper solutions

## Screenshots

- Example dashboard in SonarQube (after analysis):
  ![SonarQube Dashboard](path/to/screenshot.png)

## License

This project is for educational purposes only and is licensed under the MIT License.

## Contribution

Contributions are welcome! Please open an issue or submit a pull request for any improvements or additional defects you wish to demonstrate.

## Acknowledgments

- [SonarQube Documentation](https://docs.sonarqube.org/)
- [Vite.js](https://vitejs.dev/)
- [React](https://reactjs.org/)
