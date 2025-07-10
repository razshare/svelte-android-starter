########################
###### Composites ######
########################
test: build
#	Todo

run: build
	bunx --bun cap run android

build: check
	bunx --bun vite build

########################
###### Primitives ######
########################
configure:
	which bun || curl -fsSL https://bun.sh/install | bash
	bun --bun i && \
	bunx --bun cap add android && \

sync:
	bunx --bun cap run android -l

open:
	bunx --bun cap open android

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