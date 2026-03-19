import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'profile',
    title: 'Profile',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Name',
            type: 'string',
        }),
        defineField({
            name: 'title',
            title: 'Job Title',
            type: 'string',
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
        }),
        defineField({
            name: 'email',
            title: 'Email',
            type: 'string',
        }),
        defineField({
            name: 'phone',
            title: 'Phone',
            type: 'string',
        }),
        defineField({
            name: 'location',
            title: 'Location (Short)',
            type: 'string',
            description: 'E.g. South Africa',
        }),
        defineField({
            name: 'address',
            title: 'Full Address',
            type: 'string',
            description: 'E.g. The Village Security Estate, Centurion, South Africa',
        }),
        defineField({
            name: 'stats',
            title: 'Stats',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'name', title: 'Name', type: 'string' },
                        { name: 'value', title: 'Value', type: 'number' },
                        { name: 'suffix', title: 'Suffix', type: 'string' },
                        { name: 'iconName', title: 'Icon Name', type: 'string', description: 'Lucide icon name (e.g. Briefcase, FolderGit2, Code2, GitCommit)' },
                    ],
                },
            ],
        }),
        defineField({
            name: 'socials',
            title: 'Social Links',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'platform', title: 'Platform', type: 'string' },
                        { name: 'url', title: 'URL', type: 'url' },
                        { name: 'iconName', title: 'Icon Name', type: 'string', description: 'React Icon name (e.g. FaLinkedinIn, FaGithub)' },
                    ],
                },
            ],
        }),
    ],
})
