########################
###### Composites ######
########################
test: package
#	Todo

build: check touch copy
	bunx --bun vite build
	bunx --bun cap build android \
	--keystorepath dev.keystore \
	--keystorepass 123456 \
	--keystorealias dev \
	--keystorealiaspass 123456 \
	--androidreleasetype APK

package: check
	bunx --bun vite build
	
run: touch copy
	bunx --bun cap run android

sync: touch copy
	bunx --bun cap run android -l --port 5173
	
########################
###### Primitives ######
########################
keystore:
	rm android/dev.keystore -fr
	keytool -genkey -v -keystore android/dev.keystore -alias dev -keyalg RSA -keysize 2048 -validity 10000


configure:
	bun --bun i && \
	test -d android || bunx --bun cap add android

open:
	bunx --bun cap open android

copy:
	bunx --bun cap copy
	bunx --bun cap sync

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
	bun --bun install

update:
	bun --bun update

hooks:
	printf "#!/usr/bin/env bash\n" > .git/hooks/pre-commit
	printf "make test" >> .git/hooks/pre-commit
	chmod +x .git/hooks/pre-commit
