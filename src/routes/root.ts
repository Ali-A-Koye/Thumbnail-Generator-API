import { FastifyPluginAsync } from 'fastify'

const root: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get('/', async function () {
    console.log(fastify.config)
    return { root: true }
  })
}

export default root;
