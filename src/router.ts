import { Router } from 'express'

const router = Router()

router.post('/', async ({ body }, res, next) => {
  try {
    const { payload } = body

    const response = payload
      .filter(({ episodeCount, drm }) => drm === true && episodeCount > 0)
      .map(({ image: { showImage }, slug, title }) => ({ image: showImage, slug, title }))

    res.status(200).json({ response })
  } catch (e) {
    next(e)
  }
})

export default router
