import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'caseStudy',
    title: 'Case Study',
    type: 'document',
    fields: [
        defineField({
            name: 'id',
            title: 'Short ID',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
        }),
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
        }),
        defineField({
            name: 'subtitle',
            title: 'Subtitle',
            type: 'string',
        }),
        defineField({
            name: 'description',
            title: 'Summary',
            type: 'text',
        }),
        defineField({
            name: 'content',
            title: 'Main Content',
            type: 'markdown',
        }),
        defineField({
            name: 'problem',
            title: 'The Problem',
            type: 'text',
        }),
        defineField({
            name: 'solution',
            title: 'The Solution',
            type: 'text',
        }),
        defineField({
            name: 'outcomes',
            title: 'Outcomes',
            type: 'array',
            of: [{ type: 'string' }],
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
            name: 'date',
            title: 'Date',
            type: 'string',
        }),
        defineField({
            name: 'impact',
            title: 'Impact Statement',
            type: 'string',
        }),
        defineField({
            name: 'metrics',
            title: 'Metrics',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'label', type: 'string', title: 'Label' },
                        { name: 'value', type: 'string', title: 'Value' },
                    ],
                },
            ],
        }),
    ],
})
