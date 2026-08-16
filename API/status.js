

const fetch = require('node-fetch');


export default async function handler(req, res) {

if (req.method !== 'GET') {

return res.status(405).json({ error: 'Method Not Allowed' });

}


const { jobId } = req.query;

if (!jobId) {

return res.status(400).json({ error: 'Missing jobId' });

}


try {

const FAL_KEY = process.env.FAL_KEY;

const response = await fetch(`https://fal.run/fal-ai/veed/fabric/talking-head/status/${jobId}`, {

headers: { 'Authorization': `Key ${FAL_KEY}` }

});


if (!response.ok) {

const err = await response.text();

return res.status(500).json({ error: err });

}


const data = await response.json();

return res.status(200).json(data);

} catch (err) {

return res.status(500).json({ error: err.message });

}

}


