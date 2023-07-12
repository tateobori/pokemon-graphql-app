// lib/apollo-provider.js
"use client";

import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  SuspenseCache,
} from "@apollo/client";
import {
  ApolloNextAppProvider,
  NextSSRInMemoryCache,
  SSRMultipartLink,
  NextSSRApolloClient
} from "@apollo/experimental-nextjs-app-support/ssr";

// 起動しなおすとEC2インスタンスのIPアドレスが毎回変わるので注意
const GRAPHQL_ENDPOINT = process.env.GRAPHQL_ENDPOINT || "http://43.207.154.217:8000/query" //"http://localhost:8000/query"

function makeClient() {
  const httpLink = new HttpLink({
      uri: GRAPHQL_ENDPOINT,
      credentials: 'same-origin',
  });

  return new NextSSRApolloClient({
    cache: new NextSSRInMemoryCache(),
    link:
      typeof window === "undefined"
        ? ApolloLink.from([
            new SSRMultipartLink({
              stripDefer: true,
            }),
            httpLink,
          ])
        : httpLink,
  });
}

function makeSuspenseCache() {
  return new SuspenseCache();
}

export function ApolloWrapper({ children }: React.PropsWithChildren) {
  return (
    <ApolloNextAppProvider
      makeClient={makeClient}
      makeSuspenseCache={makeSuspenseCache}
    >
      {children}
    </ApolloNextAppProvider>
  );
}