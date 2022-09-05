import { FastifyPluginAsync } from 'fastify'

const root: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get('/', async function () {
    return "Welcome to Thumbnail generator API"
  })
}

export default root;
