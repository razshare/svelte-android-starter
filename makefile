########################
###### Composites ######
########################
test: package
#	Todo

build: check touch copy
	npx vite build
	npx cap build android \
	--keystorepath dev.keystore \
	--keystorepass 123456 \
	--keystorealias dev \
	--keystorealiaspass 123456 \
	--androidreleasetype APK

package: check
	npx vite build
	
run: touch copy
	npx cap run android

sync: touch copy
	npx cap run android -l --port 5173
	
########################
###### Primitives ######
########################
keystore:
	rm android/dev.keystore -fr
	keytool -genkey -v -keystore android/dev.keystore -alias dev -keyalg RSA -keysize 2048 -validity 10000


configure:
	npm i && \
	test -d android || npx cap add android

open:
	npx cap open android

copy:
	npx cap copy
	npx cap sync

touch:
	mkdir dist -p
	touch dist/index.html

dev:
	npx vite & \
	npx svelte-check --tsconfig ./tsconfig.json --watch --preserveWatchOutput & \
	wait

check:
	npx eslint . && \
	npx svelte-check --tsconfig ./tsconfig.json

clean:
	go clean
	rm dist -fr
	rm .vite -fr
	rm node_modules -fr

format:
	npx prettier --write .

install:
	npm install

update:
	npm update

hooks:
	printf "#!/usr/bin/env bash\n" > .git/hooks/pre-commit
	printf "make test" >> .git/hooks/pre-commit
	chmod +x .git/hooks/pre-commit
