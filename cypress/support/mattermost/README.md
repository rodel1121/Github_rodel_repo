# Compile

## Windows x86_64

```sh
GOOS=windows GOARCH=amd64 go build -o mattermost.exe
```

## Linux x86_64

```sh
GOOS=linux GOARCH=amd64 go build -o mattermost.linux
```

## MacOS x86_64

```sh 
GOOS=darwin GOARCH=amd64 go build -o mattermost
```

## MacOS apple M1/M2 CPU

```sh
GOOS=darwin GOARCH=arm64 go build -o mattermost.macarm
```