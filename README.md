## Prerequisites

- [Docker](https://www.docker.com/products/docker-desktop)
- You should be able to run the `make` command from your terminal

If you are using Docker for Desktop, you might need to add this project to the list of shareable folders at Docker for Desktop settings.

## First time setup

```bash
% make install
```

## Start the project

```bash
% make start
```

The previous command will start the following applications

- [server](http://0.0.0.0:3000) available at 0.0.0.0:3000
- [server docs](http://0.0.0.0:3000/api/docs/) available at 0.0.0.0:3000/api/docs/
- [interface] available at the terminal, CLI tool 

## Commands

- `make test` runs the test
- `make coverage` run the coverage test
- `make lint` cheks the lint
