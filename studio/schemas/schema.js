// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator'

// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type'

// We import object schemas
import blockContent from './objects/blockContent'
import videoEmbed from './objects/videoEmbed'

// We import document schemas
import episode from './documents/episode'
import siteConfig from './documents/siteConfig'
import contact from './documents/contact'
import frontpage from './documents/frontpage'
import category from './documents/category'
import post from './documents/post'
import author from './documents/author'
import comment from './documents/comment'

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: 'default',
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    // The following are document types which will appear
    // in the studio.
    siteConfig,
    frontpage,
    contact,
    post,
    author,
    category,
    episode,
    // When added to this list, object types can be used as
    // { type: 'typename' } in other document schemas
    blockContent,
    videoEmbed,
    comment
  ])
})
