FROM docker.io/rust:1-slim-bookworm AS build

## cargo package name
ARG pkg=backend

WORKDIR /build

COPY src/backend .

RUN --mount=type=cache,target=/build/target \
    --mount=type=cache,target=/usr/local/cargo/registry \
    --mount=type=cache,target=/usr/local/cargo/git \
    set -eux; \
    cargo build --release; \
    objcopy --compress-debug-sections target/release/$pkg ./main


###################################################################################################

FROM docker.io/debian:bookworm-slim

WORKDIR /app

## Copy main binary
COPY --from=build /build/main ./src/backend/

## COPY Necessary assets
COPY assets ./assets
COPY config ./config
COPY src/frontend ./src/frontend

## Copy runtime assets which may or may not exist
COPY --from=build /build/Rocket.tom[l] ./static
COPY --from=build /build/stati[c] ./static
COPY --from=build /build/template[s] ./templates

## Set listening ports
ENV ROCKET_ADDRESS=0.0.0.0
ENV ROCKET_PORT=8080

EXPOSE 8080

CMD [ "/app/src/backend/main" ]
