const clarifai = require('clarifai');

const handleApiCall = (req, res) => {
  const requestOptions = returnClarifaiRequestOptions(req.body.input);

  fetch(
    "https://api.clarifai.com/v2/models/" +
    'face-detection' +
    "/outputs",
    requestOptions
  )
    .then(res => res.json())
    .then(data => {
      res.json(data);
    })
    .catch(err => res.status(400).json('unable to work with api'));
}


const returnClarifaiRequestOptions = (imgUrl) => {
  const { CLARIFAI_PAT, CLARIFAI_USER_ID, CLARIFAI_APP_ID } = process.env;


  const PAT = CLARIFAI_PAT;
  const USER_ID = CLARIFAI_USER_ID;
  const APP_ID = CLARIFAI_APP_ID;
  // const MODEL_ID = 'face-detection';
  const IMAGE_URL = imgUrl;

  const raw = JSON.stringify({
    "user_app_id": {
      "user_id": USER_ID,
      "app_id": APP_ID
    },
    "inputs": [
      {
        "data": {
          "image": {
            "url": IMAGE_URL
          }
        }
      }
    ]
  });

  return {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Authorization': 'Key ' + PAT
    },
    body: raw
  };
}


const handleImage = (db) => (req, res) => {
  const { id } = req.body;
  db('users')
    .where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
      if (entries.length) {
        res.json(entries[0].entries);
      } else {
        res.status(404).json('unable to get entries');
      }
    })
    .catch(err => res.status(400).json('unable to get entries'));
}

module.exports = {
  handleImage,
  handleApiCall
};
