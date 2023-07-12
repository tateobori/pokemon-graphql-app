FROM golang:1.20.2
ENV ROOT=/go/src/app
RUN mkdir $ROOT

WORKDIR $ROOT

COPY go.mod go.sum ./

RUN go mod download
COPY . .

RUN CGO_ENABLED=0 GOOS=linux go build -o binary

EXPOSE 8080
CMD ["./binary"]