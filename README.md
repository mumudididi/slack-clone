# Slack-Clone

## Introduction

This is a practice project forked from [Ben Award](https://github.com/benawad/slack-clone-server/tree/master). The objective of the project is to get familiar with GraphQL, full-stack app development process as well as deployment process.

Dec 18, 2020

---

#### Backend

- Postgres (database)
- GraphQL (MiddleWare)
- Apollo (server)

#### Frontend

- React

---

### side note

The Original Project was built in 2017. Since then Slack has been changing so as all the technologies used. In my fork, the following has been incorporated:

- Apollo server migration from 1.0 -> 3.0. Adapted with _sequalize_ library and React.
- Adapt code for react Hooks.

### Learning Path

In this session I would want to keep useful resources(other than docs and sorce code) that I referred to during the process of learning.

- Dec 25, 2020

  1. How to setup mobx with React useContext: https://codingislove.com/setup-mobx-react-context/

- Dec 26, 2020
  1. How express app worked with apollo server: https://www.youtube.com/watch?v=camfkdmuR8M
  2. Top level Error handling with Apollo server: https://www.youtube.com/watch?v=dr9I4xPYkdw
  3. How to access header in onError link: https://stackoverflow.com/questions/56086996/how-to-set-token-into-onerror-apolloclient
  4. Apollo Server concat links, order matters: https://stackoverflow.com/questions/51840201/apollo-you-are-calling-concat-on-a-terminating-link-which-will-have-no-effect

-Dec 28, 2020

1.  make useMutation hook to work with higher order components, in this specific case, withFormik().https://codesandbox.io/s/awesome-ishizaka-kuhxi?file=/src/App.js:1782-1788
