export default {
    widgets: [
      {
        name: 'document-list',
          options: {
            title: 'Most recent episodes',
            order: 'episodeNumber desc',
            types: ['episode'],
            createButtonText: 'Post a new episode',
       },
       layout: {
          width: 'small',
          height: 'small'
        }
       },
        {
          name: 'document-list',
            options: {
              title: 'Latest comments',
              order: '_updatedAt desc',
              types: ['comment', null],
         },
         layout: {
            width: 'small',
            height: 'small'
          }
      },
      {
        name: 'document-list',
          options: {
            title: 'Last edited Blog Post',
            order: '_updatedAt desc',
            types: ['post'],
            createButtonText: 'Create a new Blog Post',
       },
       layout: {
          width: 'small',
          height: 'small'
        }
    },
  {
    name: 'minesweeper',
    layout: {
      width: 'small',
      height: 'small'
    }
  },
      {
        name: 'project-info',
        layout: {
            width: 'medium',
            height: 'small'
          }
      },
      {
        name: 'project-users',
        layout: {
            width: 'small',
            height: 'small'
          }
      }
    ]
  }