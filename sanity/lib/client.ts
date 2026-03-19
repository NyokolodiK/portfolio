import 'server-only'
import { createClient } from 'next-sanity'
import { createImageUrlBuilder } from '@sanity/image-url'

export const client = createClient({
    projectId: process.env.SANITY_PROJECT_ID!,
    dataset: process.env.SANITY_DATASET!,
    apiVersion: '2024-01-01',
    useCdn: false, // set to `false` to bypass the edge cache
})

const builder = createImageUrlBuilder(client)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function urlFor(source: any) {
    return builder.image(source)
}
