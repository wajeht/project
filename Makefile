commit:
	# npm run test
	# npm run format
	# npm run lint
	git add -A
	./commit.sh
	git push --no-verify

test:
	npm run test

lint:
	npm run lint

format:
	npm run format
