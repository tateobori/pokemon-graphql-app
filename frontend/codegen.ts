import { CodegenConfig } from '@graphql-codegen/cli'
 
const config: CodegenConfig = {
  schema: 'schema.graphql',
  documents: ['graphql/**/*.graphql'],
  ignoreNoDocuments: true, // for better experience with the watcher
  generates: {
    './lib/gql/': {
      preset: 'client'
    }
  }
}
 
export default config