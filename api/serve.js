const api = require('./api');
const port = 3000

api.listen(port, () => console.log(`POS api listening on port ${port}!`))
