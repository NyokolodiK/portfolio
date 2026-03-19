import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'project',
    title: 'Project',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
        }),
        defineField({
            name: 'techStack',
            title: 'Tech Stack',
            type: 'array',
            of: [{ type: 'string' }],
        }),
        defineField({
            name: 'category',
            title: 'Category',
            type: 'string',
            options: {
                list: [
                    { title: 'Architecture', value: 'Architecture' },
                    { title: 'Migration', value: 'Migration' },
                    { title: 'AI', value: 'AI' },
                    { title: 'Engineering', value: 'Engineering' },
                ],
            },
        }),
        defineField({
            name: 'image',
            title: 'Project Image',
            type: 'image',
            options: {
                hotspot: true, // Allows crop/focal point selection in Studio
            },
        }),
        defineField({
            name: 'live',
            title: 'Live URL',
            type: 'url',
        }),
        defineField({
            name: 'github',
            title: 'GitHub URL',
            type: 'url',
        }),
        defineField({
            name: 'metrics',
            title: 'Project Metrics',
            type: 'object',
            fields: [
                { name: 'complexity', title: 'Complexity', type: 'string' },
                { name: 'teamSize', title: 'Team Size', type: 'number' },
                { name: 'duration', title: 'Duration', type: 'string' },
            ],
        }),
    ],
})
