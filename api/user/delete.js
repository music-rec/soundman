const User = require('./schema')
const UserError = require('./error')
const mongofilter = require('../helpers/mongo_filter')

module.exports = async (params) => {
  let found

  if (!params.hasOwnProperty('id')) {
    throw new UserError({
      status: 'error',
      message: 'id does not exists!'
    }, 400)
  }

  try {
    found = await User.findOneAndRemove({ _id: { $eq: params.id } }).exec()
  } catch (e) {
    throw new UserError({
      status: 'error',
      message: 'User not found!'
    }, 404)
  }

  return mongofilter(found.toObject())
}
