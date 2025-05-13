export default async (req, context) => {
    const api = Netlify.env.get('API_ROUTE');

    const res = await fetch(api, {
        redirect: 'follow'
    });
    const { data } = await res.json();

    return new Response(JSON.stringify(data));
};