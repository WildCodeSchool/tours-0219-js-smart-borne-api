
# build
FROM node:10.15.3 AS builder
WORKDIR /workdir
COPY . /workdir
RUN yarn install
RUN yarn build

# run
FROM node:10.15.3
WORKDIR /workdir
ENV NODE_ENV production
COPY --from=builder /workdir/dist /workdir
COPY --from=builder /workdir/package.json /workdir
COPY --from=builder /workdir/yarn.lock /workdir
RUN yarn install --prod
CMD ["node", "main.js"]
