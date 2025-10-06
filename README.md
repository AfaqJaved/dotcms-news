# Dotcms News Listing

## Project Overview

The goal of this assignment was to fetch and display `.CMS` blogs dynamically using the official `.CMS` client and render them in a structured, user-friendly format on front-end.

The project is live and deployed at [https://task.afaqjaved.com](https://task.afaqjaved.com) connected with myself hosted dotcms instance running at https://dotcms.afaqjaved.com

# Important Note
I have created a user for dotcms team to login to my personal self hosted dotcms instance in case if they need. Will mail the login details to HR.

---

## Table of Contents

1. [Project Approach](#project-approach)
2. [Code Structure](#code-structure)
3. [Getting Started](#getting-started)
4. [Running the Project](#running-the-project)
5. [Future Enhancements](#future-enhancements)

---

## Project Approach

To successfully integrate `.CMS` blocks into Frontend, the following approach was taken:

1. **Understanding the `.CMS` API and Client**

- Explored the `.CMS` client library and documentation.
- Identified the API methods to fetch blogs and images.

2. **Creating a Service in Angular**

- Built a dedicated Angular service (`CmsService`) to handle all communication with the `.CMS` platform.
- This service encapsulates fetching all blogs.

3. **Dynamic Block Rendering**

- Used Angular's directives to dynamically render blogs.
- Ensured that various types of content (text, images, videos, lists, cards) are displayed correctly.

4. **Reusable Components**

- Created reusable components for common block types (e.g., `BlockHeading`, `BlockParagraph`, `BlockList`) for better maintainability.

5. **Responsive Design & Styling**

- Implemented modern and responsive styling using SCSS.
- Ensured cross-device compatibility with flexible layouts.

6. **Testing & Verification**

- Verified the rendered blocks against `.CMS` platform content to ensure accuracy.
- Tested the application in multiple browsers.

---

## Code Structure

```
angular-cms-integration/
src/
└── app/
    ├── core/
    │   ├── constants/ # Global Constants
    │   ├── helpers/ # Helper Functions
    │   ├── models/ # Reponse Models
    │   ├── services/ # Services for handling api dotcms client etc
    │   └── types/
    ├── pages/
    │   └── news/ # main pages
    ├── shared/
    │   ├── components/ # shared components
    │   ├── directives/ # shared directives
    │   └── pipes/ # shared pipes
    ├── app.config.ts
    ├── app.html
    ├── app.routes.ts
    ├── app.scss
    ├── app.spec.ts
    └── app.ts

```

## Getting Started

To run this project locally:

### Prerequisites

- Node.js >= 22.x
- Angular CLI >= 20.x
- Access to `.CMS` client credentials and place in the environments folder

```.env
DOTCMS_URL=...
DOTCMS_SITE_ID=...
DOTCMS_AUTH_TOKEN=..

```

### Installation

1. Clone the repository:
2. Install the dependencies (npm install)
3. Replace the env variables
4. Run the project (npm run start)


### Future Enhancements

The following changes can be further:

1- Improve the typing for blog data coming from dotcms.
2- Can use any css framework like tailwind and ui library like angular material for better ui and ux.
3- Eslint and Prettier for formatting and linting.
