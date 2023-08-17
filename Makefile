lint-frontend:
	make -C frontend_test lint

install:
	npm ci

start-frontend_test:
	make -C frontend_test start

start-backend:
	npx start-server

deploy:
	git push heroku main

start:
	make start-backend & make start-frontend_test



