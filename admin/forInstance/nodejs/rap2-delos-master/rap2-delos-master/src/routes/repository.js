// TODO 2.1 大数据测试，含有大量模块、接口、属性的仓库
const router = require('./router')
const _ = require('underscore')
const Pagination = require('./utils/pagination')
const { User, Organization, Repository, Module, Interface, Property, QueryInclude, Logger } = require('../models')
const Tree = require('./utils/tree')
const { initRepository, initModule } = require('./utils/helper')

router.get('/app/get', async (ctx, next) => {
  let data = {}
  let query = ctx.query
  let hooks = {
    repository: Repository,
    module: Module,
    interface: Interface,
    property: Property
  }
  for (let name in hooks) {
    if (!query[name]) continue
    data[name] = await hooks[name].findById(query[name])
  }
  ctx.body = {
    data: Object.assign({}, ctx.body && ctx.body.data, data)
  }

  return next()
})

router.get('/repository/count', async(ctx, next) => {
  ctx.body = {
    data: await Repository.count()
  }
})

router.get('/repository/list', async(ctx, next) => {
  let where = {}
  let { name, user, organization } = ctx.query
  if (user) Object.assign(where, { ownerId: user, organizationId: null })
  if (organization) Object.assign(where, { organizationId: organization })
  if (name) {
    Object.assign(where, {
      $or: [
        { name: { $like: `%${name}%` } },
        { id: name } // name => id
      ]
    })
  }
  let total = await Repository.count({
    where,
    include: [
      QueryInclude.Creator,
      QueryInclude.Owner,
      QueryInclude.Locker
    ]
  })
  let pagination = new Pagination(total, ctx.query.cursor || 1, ctx.query.limit || 100)
  let repositories = await Repository.findAll({
    where,
    attributes: { exclude: [] },
    include: [
      QueryInclude.Creator,
      QueryInclude.Owner,
      QueryInclude.Locker,
      QueryInclude.Members,
      QueryInclude.Organization,
      QueryInclude.Collaborators
    ],
    offset: pagination.start,
    limit: pagination.limit,
    order: [['updatedAt', 'DESC']]
  })
  ctx.body = {
    data: repositories,
    pagination: pagination
  }
})
router.get('/repository/owned', async(ctx, next) => {
  let where = {} // { organizationId: null } // 彻底废弃个人仓库&团队仓库概念，一个仓库必须属于某个用户，可选属于某个团队
  let { name } = ctx.query
  if (name) {
    Object.assign(where, {
      $or: [
        { name: { $like: `%${name}%` } },
        { id: name } // name => id
      ]
    })
  }

  let auth = await User.findById(ctx.query.user || ctx.session.id)
  // let total = await auth.countOwnedRepositories({ where })
  // let pagination = new Pagination(total, ctx.query.cursor || 1, ctx.query.limit || 100)
  let repositories = await auth.getOwnedRepositories({
    where,
    attributes: { exclude: [] },
    include: [
      QueryInclude.Creator,
      QueryInclude.Owner,
      QueryInclude.Locker,
      QueryInclude.Members,
      QueryInclude.Organization,
      QueryInclude.Collaborators
    ],
    // offset: pagination.start,
    // limit: pagination.limit,
    order: [['updatedAt', 'DESC']]
  })
  ctx.body = {
    data: repositories,
    pagination: null
  }
})
router.get('/repository/joined', async(ctx, next) => {
  let where = {}
  let { name } = ctx.query
  if (name) {
    Object.assign(where, {
      $or: [
        { name: { $like: `%${name}%` } },
        { id: name } // name => id
      ]
    })
  }

  let auth = await User.findById(ctx.query.user || ctx.session.id)
  // let total = await auth.countJoinedRepositories({ where })
  // let pagination = new Pagination(total, ctx.query.cursor || 1, ctx.query.limit || 100)
  let repositories = await auth.getJoinedRepositories({
    where,
    attributes: { exclude: [] },
    include: [
      QueryInclude.Creator,
      QueryInclude.Owner,
      QueryInclude.Locker,
      QueryInclude.Members,
      QueryInclude.Organization,
      QueryInclude.Collaborators
    ],
    // offset: pagination.start,
    // limit: pagination.limit,
    order: [['updatedAt', 'DESC']]
  })
  ctx.body = {
    data: repositories,
    pagination: null
  }
})
router.get('/repository/get', async(ctx, next) => {
  let repository = await Repository.findById(ctx.query.id, {
    attributes: { exclude: [] },
    include: [
      QueryInclude.Creator,
      QueryInclude.Owner,
      QueryInclude.Locker,
      QueryInclude.Members,
      QueryInclude.Organization,
      QueryInclude.RepositoryHierarchy,
      QueryInclude.Collaborators
    ]
  })
  ctx.body = {
    data: repository
  }
})
router.post('/repository/create', async(ctx, next) => {
  let creatorId = ctx.session.id
  let body = Object.assign({}, ctx.request.body, { creatorId, ownerId: creatorId })
  let created = await Repository.create(body)
  if (body.memberIds) {
    let members = await User.findAll({ where: { id: body.memberIds } })
    await created.setMembers(members)
  }
  if (body.collaboratorIds) {
    let collaborators = await Repository.findAll({ where: { id: body.collaboratorIds } })
    await created.setCollaborators(collaborators)
  }
  await initRepository(created)
  ctx.body = {
    data: await Repository.findById(created.id, {
      attributes: { exclude: [] },
      include: [
        QueryInclude.Creator,
        QueryInclude.Owner,
        QueryInclude.Locker,
        QueryInclude.Members,
        QueryInclude.Organization,
        QueryInclude.RepositoryHierarchy,
        QueryInclude.Collaborators
      ]
    })
  }
  return next()
}, async(ctx, next) => {
  await Logger.create({
    userId: ctx.session.id,
    type: 'create',
    repositoryId: ctx.body.data.id
  })
})
router.post('/repository/update', async(ctx, next) => {
  let body = Object.assign({}, ctx.request.body)
  delete body.creatorId
  // DONE 2.2 支持转移仓库
  // delete body.ownerId
  delete body.organizationId
  let result = await Repository.update(body, { where: { id: body.id } })
  if (body.memberIds) {
    let reloaded = await Repository.findById(body.id)
    let members = await User.findAll({ where: { id: body.memberIds } })
    ctx.prevAssociations = await reloaded.getMembers()
    await reloaded.setMembers(members)
    ctx.nextAssociations = await reloaded.getMembers()
  }
  if (body.collaboratorIds) {
    let reloaded = await Repository.findById(body.id)
    let collaborators = await Repository.findAll({ where: { id: body.collaboratorIds } })
    await reloaded.setCollaborators(collaborators)
  }
  ctx.body = {
    data: result[0]
  }
  return next()
}, async(ctx, next) => {
  let { id } = ctx.request.body
  await Logger.create({
    userId: ctx.session.id,
    type: 'update',
    repositoryId: id
  })
  // 加入 & 退出
  if (!ctx.prevAssociations || !ctx.nextAssociations) return
  let prevIds = ctx.prevAssociations.map(item => item.id)
  let nextIds = ctx.nextAssociations.map(item => item.id)
  let joined = _.difference(nextIds, prevIds)
  let exited = _.difference(prevIds, nextIds)
  let creatorId = ctx.session.id
  for (let userId of joined) {
    await Logger.create({ creatorId, userId, type: 'join', repositoryId: id })
  }
  for (let userId of exited) {
    await Logger.create({ creatorId, userId, type: 'exit', repositoryId: id })
  }
})
router.post('/repository/transfer', async(ctx, next) => {
  let { id, ownerId, organizationId } = ctx.request.body
  let body = {}
  if (ownerId) body.ownerId = ownerId // 转移给其他用户
  if (organizationId) {
    body.organizationId = organizationId // 转移给其他团队，同时转移给该团队拥有者
    body.ownerId = (await Organization.findById(organizationId)).ownerId
  }
  let result = await Repository.update(body, { where: { id } })
  ctx.body = {
    data: result[0]
  }
})
router.get('/repository/remove', async(ctx, next) => {
  let { id } = ctx.query
  let result = await Repository.destroy({ where: { id } })
  await Module.destroy({ where: { repositoryId: id } })
  await Interface.destroy({ where: { repositoryId: id } })
  await Property.destroy({ where: { repositoryId: id } })
  ctx.body = {
    data: result
  }
  return next()
}, async(ctx, next) => {
  if (ctx.body.data === 0) return
  let { id } = ctx.query
  await Logger.create({
    userId: ctx.session.id,
    type: 'delete',
    repositoryId: id
  })
})

// TOEO 锁定/解锁仓库 待测试
router.post('/repository/lock', async (ctx, next) => {
  let user = ctx.session.id
  if (!user) {
    ctx.body = { data: 0 }
    return
  }
  let { id } = ctx.request.body
  let result = await Repository.update({ lockerId: user }, {
    where: { id }
  })
  ctx.body = { data: result[0] }
})
router.post('/repository/unlock', async (ctx, next) => {
  if (!ctx.session.id) {
    ctx.body = { data: 0 }
    return
  }
  let { id } = ctx.request.body
  let result = await Repository.update({ lockerId: null }, {
    where: { id }
  })
  ctx.body = { data: result[0] }
})

// 模块
router.get('/module/count', async (ctx, next) => {
  ctx.body = {
    data: await Module.count()
  }
})
router.get('/module/list', async (ctx, next) => {
  let where = {}
  let { repositoryId, name } = ctx.query
  if (repositoryId) where.repositoryId = repositoryId
  if (name) where.name = { $like: `%${name}%` }
  ctx.body = {
    data: await Module.findAll({
      attributes: { exclude: [] },
      where
    })
  }
})
router.get('/module/get', async (ctx, next) => {
  ctx.body = {
    data: await Module.findById(ctx.query.id, {
      attributes: { exclude: [] }
    })
  }
})
router.post('/module/create', async (ctx, next) => {
  let creatorId = ctx.session.id
  let body = Object.assign(ctx.request.body, { creatorId })
  body.priority = (await Module.count()) + 1
  let created = await Module.create(body)
  await initModule(created)
  ctx.body = {
    data: await Module.findById(created.id)
  }
  return next()
}, async(ctx, next) => {
  let mod = ctx.body.data
  await Logger.create({
    userId: ctx.session.id,
    type: 'create',
    repositoryId: mod.repositoryId,
    moduleId: mod.id
  })
})
router.post('/module/update', async (ctx, next) => {
  let body = ctx.request.body
  let result = await Module.update(body, {
    where: { id: body.id }
  })
  ctx.body = {
    data: result[0]
  }
  return next()
}, async(ctx, next) => {
  if (ctx.body.data === 0) return
  let mod = ctx.request.body
  await Logger.create({
    userId: ctx.session.id,
    type: 'update',
    repositoryId: mod.repositoryId,
    moduleId: mod.id
  })
})
router.get('/module/remove', async (ctx, next) => {
  let { id } = ctx.query
  let result = await Module.destroy({ where: { id } })
  await Interface.destroy({ where: { moduleId: id } })
  await Property.destroy({ where: { moduleId: id } })
  ctx.body = {
    data: result
  }
  return next()
}, async(ctx, next) => {
  if (ctx.body.data === 0) return
  let { id } = ctx.query
  let mod = await Module.findById(id, { paranoid: false })
  await Logger.create({
    userId: ctx.session.id,
    type: 'delete',
    repositoryId: mod.repositoryId,
    moduleId: mod.id
  })
})
router.post('/module/sort', async (ctx, next) => {
  let { ids } = ctx.request.body
  for (let index = 0; index < ids.length; index++) {
    await Module.update({ priority: index + 1 }, {
      where: { id: ids[index] }
    })
  }
  ctx.body = {
    data: ids.length
  }
})

//
router.get('/interface/count', async (ctx, next) => {
  ctx.body = {
    data: await Interface.count()
  }
})
router.get('/interface/list', async (ctx, next) => {
  let where = {}
  let { repositoryId, moduleId, name } = ctx.query
  if (repositoryId) where.repositoryId = repositoryId
  if (moduleId) where.moduleId = moduleId
  if (name) where.name = { $like: `%${name}%` }
  ctx.body = {
    data: await Interface.findAll({
      attributes: { exclude: [] },
      where
    })
  }
})
router.get('/interface/get', async (ctx, next) => {
  let { id, repositoryId, method, url } = ctx.query

  let itf
  if (id) {
    itf = await Interface.findById(id, {
      attributes: { exclude: [] }
    })
  } else if (repositoryId && method && url) {
    // 同 /app/mock/:repository/:method/:url
    let urlWithoutPrefixSlash = /(\/)?(.*)/.exec(url)[2]
    let repository = await Repository.findById(repositoryId)
    let collaborators = await repository.getCollaborators()

    itf = await Interface.findOne({
      attributes: { exclude: [] },
      where: {
        repositoryId: [repositoryId, ...collaborators.map(item => item.id)],
        method,
        url: [urlWithoutPrefixSlash, '/' + urlWithoutPrefixSlash]
      }
    })
  }
  itf = itf.toJSON()

  let scopes = ['request', 'response']
  for (let i = 0; i < scopes.length; i++) {
    let properties = await Property.findAll({
      attributes: { exclude: [] },
      where: { interfaceId: itf.id, scope: scopes[i] }
    })
    properties = properties.map(item => item.toJSON())
    itf[scopes[i] + 'Properties'] = Tree.ArrayToTree(properties).children
  }

  ctx.type = 'json'
  ctx.body = Tree.stringifyWithFunctonAndRegExp({
    data: itf
  })
})
router.post('/interface/create', async (ctx, next) => {
  let creatorId = ctx.session.id
  let body = Object.assign(ctx.request.body, { creatorId })
  body.priority = (await Interface.count()) + 1
  let created = await Interface.create(body)
  // await initInterface(created)
  ctx.body = {
    data: await Interface.findById(created.id)
  }
  return next()
}, async(ctx, next) => {
  let itf = ctx.body.data
  await Logger.create({
    userId: ctx.session.id,
    type: 'create',
    repositoryId: itf.repositoryId,
    moduleId: itf.moduleId,
    interfaceId: itf.id
  })
})
router.post('/interface/update', async (ctx, next) => {
  let body = ctx.request.body
  let result = await Interface.update(body, {
    where: { id: body.id }
  })
  ctx.body = {
    data: result[0]
  }
  return next()
}, async(ctx, next) => {
  if (ctx.body.data === 0) return
  let itf = ctx.request.body
  await Logger.create({
    userId: ctx.session.id,
    type: 'update',
    repositoryId: itf.repositoryId,
    moduleId: itf.moduleId,
    interfaceId: itf.id
  })
})
router.get('/interface/remove', async (ctx, next) => {
  let { id } = ctx.query
  let result = await Interface.destroy({ where: { id } })
  await Property.destroy({ where: { interfaceId: id } })
  ctx.body = {
    data: result
  }
  return next()
}, async(ctx, next) => {
  if (ctx.body.data === 0) return
  let { id } = ctx.query
  let itf = await Interface.findById(id, { paranoid: false })
  await Logger.create({
    userId: ctx.session.id,
    type: 'delete',
    repositoryId: itf.repositoryId,
    moduleId: itf.moduleId,
    interfaceId: itf.id
  })
})
router.post('/interface/lock', async (ctx, next) => {
  if (!ctx.session.id) {
    ctx.body = { data: 0 }
    return
  }

  let { id } = ctx.request.body
  let itf = await Interface.findById(id)
  if (itf.lockerId) { // DONE 2.3 BUG 接口可能被不同的人重复锁定。如果已经被锁定，则忽略。
    ctx.body = {
      data: 0
    }
    return
  }

  let result = await Interface.update({ lockerId: ctx.session.id }, {
    where: { id }
  })
  ctx.body = {
    data: result[0]
  }
  return next()
})
router.post('/interface/unlock', async (ctx, next) => {
  if (!ctx.session.id) {
    ctx.body = { data: 0 }
    return
  }

  let { id } = ctx.request.body
  let itf = await Interface.findById(id)
  if (itf.lockerId !== ctx.session.id) { // DONE 2.3 BUG 接口可能被其他人解锁。如果不是同一个用户，则忽略。
    ctx.body = { data: 0 }
    return
  }

  let result = await Interface.update({ lockerId: null }, {
    where: { id }
  })
  ctx.body = {
    data: result[0]
  }
  return next()
})
router.post('/interface/sort', async (ctx, next) => {
  let { ids } = ctx.request.body
  for (let index = 0; index < ids.length; index++) {
    await Interface.update({ priority: index + 1 }, {
      where: { id: ids[index] }
    })
  }
  ctx.body = {
    data: ids.length
  }
})

//
router.get('/property/count', async (ctx, next) => {
  ctx.body = {
    data: await Property.count()
  }
})
router.get('/property/list', async (ctx, next) => {
  let where = {}
  let { repositoryId, moduleId, interfaceId, name } = ctx.query
  if (repositoryId) where.repositoryId = repositoryId
  if (moduleId) where.moduleId = moduleId
  if (interfaceId) where.interfaceId = interfaceId
  if (name) where.name = { $like: `%${name}%` }
  ctx.body = {
    data: await Property.findAll({ where })
  }
})
router.get('/property/get', async (ctx, next) => {
  let { id } = ctx.query
  ctx.body = {
    data: await Property.findById(id, {
      attributes: { exclude: [] }
    })
  }
})
router.post('/property/create', async (ctx, next) => {
  let creatorId = ctx.session.id
  let body = Object.assign(ctx.request.body, { creatorId })
  let created = await Property.create(body)
  ctx.body = {
    data: await Property.findById(created.id, {
      attributes: { exclude: [] }
    })
  }
})
router.post('/property/update', async (ctx, next) => {
  let properties = ctx.request.body // JSON.parse(ctx.request.body)
  properties = Array.isArray(properties) ? properties : [properties]
  let result = 0
  for (let item of properties) {
    let property = _.pick(item, Object.keys(Property.attributes))
    let affected = await Property.update(property, {
      where: { id: property.id }
    })
    result += affected[0]
  }
  ctx.body = {
    data: result
  }
})
router.post('/properties/update', async (ctx, next) => {
  let { itf } = ctx.query
  let properties = ctx.request.body // JSON.parse(ctx.request.body)
  properties = Array.isArray(properties) ? properties : [properties]

  // 删除不在更新列表中的属性
  // DONE 2.2 清除幽灵属性：子属性的父属性不存在（原因：前端删除父属性后，没有一并删除后代属性，依然传给了后端）
  // SELECT * FROM properties WHERE parentId!=-1 AND parentId NOT IN (SELECT id FROM properties)
  /* 查找和删除脚本
    SELECT * FROM properties
      WHERE
        deletedAt is NULL AND
        parentId != - 1 AND
        parentId NOT IN (
          SELECT * FROM (
            SELECT id FROM properties WHERE deletedAt IS NULL
          ) as p
        )
  */
  let existingProperties = properties.filter(item => !item.memory)
  let result = await Property.destroy({
    where: {
      id: { $notIn: existingProperties.map(item => item.id) },
      interfaceId: itf
    }
  })
  // 更新已存在的属性
  for (let item of existingProperties) {
    let affected = await Property.update(item, {
      where: { id: item.id }
    })
    result += affected[0]
  }
  // 插入新增加的属性
  let newProperties = properties.filter(item => item.memory)
  let memoryIdsMap = {}
  for (let item of newProperties) {
    let created = await Property.create(Object.assign({}, item, {
      id: null,
      parentId: -1,
      priority: item.priority || ((await Property.count()) + 1)
    }))
    memoryIdsMap[item.id] = created.id
    item.id = created.id
    result += 1
  }
  // 同步 parentId
  for (let item of newProperties) {
    let parentId = memoryIdsMap[item.parentId] || item.parentId
    await Property.update({ parentId }, {
      where: { id: item.id }
    })
  }
  ctx.body = {
    data: result
  }
  return next()
}, async(ctx, next) => {
  if (ctx.body.data === 0) return
  let itf = await Interface.findById(ctx.query.itf, {
    attributes: { exclude: [] }
  })
  await Logger.create({
    userId: ctx.session.id,
    type: 'update',
    repositoryId: itf.repositoryId,
    moduleId: itf.moduleId,
    interfaceId: itf.id
  })
})
router.get('/property/remove', async (ctx, next) => {
  let { id } = ctx.query
  ctx.body = {
    data: await Property.destroy({
      where: { id }
    })
  }
})

module.exports = router
