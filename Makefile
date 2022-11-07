#################################################
# Development commands
#########################################

# start
start:
	docker-compose run interface

# stop 
stop: 
	docker-compose stop

# run test
.PHONY: test
test:
	docker-compose run --no-deps --rm server npm run test

# run test coverage
.PHONY: coverage
coverage:
	docker-compose run --no-deps --rm server npm run test:cov

# run test
lint:
	docker-compose run --no-deps --rm server npm run lint

# install dependencies
install:
	docker-compose run --no-deps --rm server npm install
	docker-compose run --no-deps --rm interface npm install