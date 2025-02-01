import { createDirectus, rest, readItems } from '@directus/sdk';

const client = createDirectus('https://api.amarquis.fr').with(rest());

export async function getTechnologieName(id) {
    return await client.request(readItems('Technologies', { 
        filter: { id: { _eq: id } },
        fields: ['*']
    }))
}

export { client };