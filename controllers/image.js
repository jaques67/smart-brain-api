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
    handleImage
};
