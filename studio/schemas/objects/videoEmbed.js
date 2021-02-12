export default {
    name: 'videoEmbed',
    type: 'object',
    title: 'Video Embed',
    fields: [
        {
            name: 'url',
            type: 'url',
            title: 'URL'
        }
    ],
    preview: {
        select: {
            url: 'url'
        }
    }
}