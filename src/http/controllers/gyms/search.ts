import { makeSearchGymsUseCase } from '@/use-cases/factories/make-search-gyms-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const searchGymsParamsSchema = z.object({
    query: z.string(),
    page: z.coerce.number().min(1).default(1),
  })

  const { query, page } = searchGymsParamsSchema.parse(request.query)

  const searchGymsUseCase = makeSearchGymsUseCase()

  const { gyms } = await searchGymsUseCase.execute({
    query,
    page,
  })

  return reply.status(200).send({
    gyms,
  })
}
