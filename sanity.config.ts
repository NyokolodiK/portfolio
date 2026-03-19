import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { markdownSchema } from 'sanity-plugin-markdown'
import { schemaTypes } from './sanity/schemas'

export default defineConfig({
    name: 'default',
    title: 'Portfolio Studio',

    projectId: process.env.SANITY_PROJECT_ID || '',
    dataset: process.env.SANITY_DATASET || 'production',

    basePath: '/studio',

    plugins: [structureTool(), visionTool(), markdownSchema()],

    schema: {
        types: schemaTypes,
    },
})
