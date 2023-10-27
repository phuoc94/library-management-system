import type z from 'zod'
import { type booksSchema } from '../schemas/bookSchema'

type BookDTO = z.infer<typeof booksSchema>

export type Book = BookDTO
