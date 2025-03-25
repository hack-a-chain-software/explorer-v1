# [Kadscan](https://www.kadscan.io/)

==========

## Guidelines
* Use the present tense ("Add feature" not "Added feature") and the imperative mood ("Move class to..." not "Moves class to...") on commits and use the name issue on pull requests.
* Pull requests must be reviewed before merged.
* Done is better than perfect. Does it work as expected? Ship now, iterate later.
* All contributions must have tests. Remember to verify the [Github Actions CI status](https://github.com/hack-a-chain-software/indexer-kadena/actions/workflows/CI.yaml).
* Every commit is checked using [Github Actions](https://github.com/hack-a-chain-software/indexer-kadena/actions).
* If the CI status are not passing, the deploy will not work.

## Coding Style

- CSS: https://github.com/airbnb/css
- Javascript: https://github.com/airbnb/javascript
- Vue: https://vuejs.org/style-guide/

## Task Management
* GitHub Issues is used to track all tasks that needed to be done.
* Kadscan board is used to get a decent look on what's going on wright now.
* Every two weeks all done tasks are put together in a Milestone and the current Sprint is closed.

## Directory Structure
Here's a brief overview of the structure:

```bash
.
├── components        # Global reusable components
├── composables       # Composables for reactive logic
├── config            # Configuration files specific to Nuxt
├── layouts           # Layout templates for different parts of the application
├── plugins           # Plugins extending Nuxt's core functionality
├── pages             # Vue components that define each page of the application
├── app.config.ts     # Central application configuration
```

## Features
- [Nuxt 3](https://v3.nuxtjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)

## Installation
Kadscan is powered by [**Nuxt**](https://nuxt.com/).

If you have any problems configuring your enviroment, remember to read the [Nuxt Documentation](https://nuxt.com/docs).

-----------------

#### Steps
1) Clone the repository:
```bash
$ gh repo clone hack-a-chain-software/indexer-kadena
$ cd indexer-kadena
```

2) Check all packages and copy the .env.example file and edit it with your environment config:
```bash
$ cp ./front/.env.example ./front/.env
```

3) Install frontend dependencies via PNPM
```bash
$ pnpm install
```

When working on frontend, run `pnpm web dev`. Files will be compiled, concatenated and the browser will auto update.
