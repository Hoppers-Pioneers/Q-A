## Atlier - Fashion E-commerce Site

FEC is a Hack Reactor front-end project that simulates the product page of a typical e-commerce webpage. The user can view the product information, taken from a sample API, and interact with the products styles, images, related products, ratings, reviews, and more.

Given a business document and visual design, we worked as a group of four software engineering students to build out this front-end project.

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white)![Trello](https://img.shields.io/badge/Trello-%23026AA7.svg?style=for-the-badge&logo=Trello&logoColor=white)

## Table of Contents:
  1. Description
  2. Installation
  3. Git Workflow

# Description
  This website features 4 primary components. Please see this demo (https://recordit.co/vJcuuTUKPF) of the prototype for the website and the description below.

  First, an image gallery displays available styles of clothing and information relevant to purchasing each product. The main portion of this component is a large image of the selected product with thumbnail overlays of alternate pictures that can be clicked to update the main image accordingly. In addition, users can select various products to see what they look like, sizes and quantities available, and add them to their cart.
  ![Overview Screenshot](<imgs/Screenshot 2023-07-08 at 9.54.36 AM.png>)

  Second, a related products section built with MUI shows a list of products with features that are similar to the selected product in the image gallery. These related products are interactable and will dynamically update the image gallery and related products when clicked. Similarly, there is a subcomponent that allows users to save multiple products to build an outfit.
  ![Related Products Screenshot](<imgs/Screenshot 2023-07-08 at 9.55.43 AM.png>)

  Third, a questions and answers component allows for the additon of questions that can be answered by buyers or sellers. Moreover, the section is searchable to quickly find potential questions of interest.
  ![Q/A Screenshot](<imgs/Screenshot 2023-07-08 at 9.55.53 AM.png>)

  Fourth, the final component is a ratings and review section. This section includes all reviews, the total number of review per product, and 5 outlined stars that are filled in to the nearest quarter star to represent the average review score for that product. Finally, this section allows users to add reviews that include uploaded images and filter the existing reviews by several metrics like helpfulness.
  ![Ratings and Reviews Screenshot](<imgs/Screenshot 2023-07-08 at 9.56.07 AM.png>)


# Installation Requirements
  This project utilizes Vite, React, and Axios.

  From within the root directory:\

  1. Run the following command in the terminal to install all necessary packages.\
      `$ npm install`

   2. Start server\
      `$ npm run dev`

   3. Add your personal GitHub token

   4. Look at the page on localhost:5173

# Git Workflow

This is our frontend capstone for HackReactor's bootcamp
**Start with the main branch**
**Create a new-branch**
**Update, add, commit, and push changes**

```
git status
git add <some-file>
git commit
```

**Push feature branch to remote**

git push -u origin new-feature


## Setup
Clone to local machine
```sh
git clone git@github.com:TeamPatrickStar/hackReactor-frontend-capstone.git
```


## Git Workflow
https://www.atlassian.com/git/tutorials/comparing-workflows/feature-branch-workflow

Checkout and sync main

```
git checkout main
git fetch origin
git reset --hard origin/main
```
Create a new branch from main for the feature

```
git checkout -b new-feature
```
Once work is complete stage/commit on the feature branch
``` sh
git status
git add <files>
git commit
```
Push the changes to the repo
```
git push -u origin new-feature
```
. Create a pull request to merge feature branch to main
From Git create a pull request to merge the branches


### Example Workflow
* git clone git@github.com:TeamPatrickStar/hackReactor-frontend-capstone.git
* git checkout -b newcomponent
* newcomponent.js << console.log('hello world')
* git add newcomponent.js
* git commit -m "new component created"
* git push -u origin newcomponent
* -- go to Git --
* create new pull request master << newcomponent
* resolve merge conflicts



