import { FastifyPluginAsync } from 'fastify'

const thumbnail: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.post('/thumbnail', async function () {
    return "thumbnail"
  })
}

export default thumbnail;
