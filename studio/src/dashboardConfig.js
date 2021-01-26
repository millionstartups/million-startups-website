export default {
    widgets: [
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
        name: 'project-info',
        layout: {
            width: 'small',
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