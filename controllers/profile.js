
const handleProfile = (db) => (req, res) => {
    const { id } = req.params;
  
    db.select('*')
      .from('users')
      .where({ id })
      .then(data => {
        if (data.length) {
          res.json(data[0])
        } else {
          res.status(400).json('Not found');
        }
      })
      .catch(err => {
        res.status(404).json('error getting user');
      });
  }

module.exports = {
    handleProfile: handleProfile
};
