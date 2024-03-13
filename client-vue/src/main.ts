import { createApp, h, provide } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import "./index.css"

import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core'
import { DefaultApolloClient } from '@vue/apollo-composable'

const httpLink = createHttpLink({
    uri: "http://localhost:8000/graphql",
  })
  
  const cache = new InMemoryCache()
  
  const apolloClient = new ApolloClient({
    link: httpLink,
    cache,
  })

createApp({
    setup () {
      provide(DefaultApolloClient, apolloClient)
    },
    render: () => h(App),
  }).use(router).use(createPinia()).mount('#app')
