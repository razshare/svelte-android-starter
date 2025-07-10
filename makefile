########################
###### Composites ######
########################
test: build
#	Todo

run: build
	bunx --bun cap run android

build: check touch copy
	bunx --bun vite build

sync: touch copy
	bunx --bun cap run android -l --port 5173

	
########################
###### Primitives ######
########################
configure:
	which bun || curl -fsSL https://bun.sh/install | bash
	bun --bun i && \
	test -d android || bunx --bun cap add android

open:
	bunx --bun cap open android

copy:
	bunx cap copy

touch:
	mkdir dist -p
	touch dist/index.html

dev:
	bunx --bun vite & \
	bunx --bun svelte-check --tsconfig ./tsconfig.json --watch --preserveWatchOutput & \
	wait

check:
	bunx --bun eslint . && \
	bunx --bun svelte-check --tsconfig ./tsconfig.json

clean:
	go clean
	rm dist -fr
	rm .vite -fr
	rm node_modules -fr

format:
	bunx --bun prettier --write .

install:
	bun install

update:
	bun update

hooks:
	printf "#!/usr/bin/env bash\n" > .git/hooks/pre-commit
	printf "make test" >> .git/hooks/pre-commit
	chmod +x .git/hooks/pre-commit