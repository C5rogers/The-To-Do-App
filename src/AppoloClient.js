import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client/core";

const httpLink = createHttpLink({
    uri: 'https://needed-bulldog-19.hasura.app/v1/graphql',
    fetch,
    headers: {
        "x-hasura-admin-secret": "V4RtkeZOJ49Ewk6yqfWBbqUbRiryQ1SxZMEVvn40fgHunM3Rb9TI61V22z4DYdkE"
    }
})

const cache = new InMemoryCache()

const apolloClient = new ApolloClient({
    link: httpLink,
    cache
})

export default apolloClient