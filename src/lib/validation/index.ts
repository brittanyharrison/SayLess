import * as z  from "zod"

export const SignupValidation = z.object({
    name: z.string().min(2, {message:"Too short"}),
    username: z.string().min(2).max(50, {message:"Too long"}),
    password: z.string().min(8,{message: "Password must be at least 8 characters"}).max(50),
    email: z.string().email(),

  })

export const SigninValidation = z.object({
  password: z.string().min(8,{message: "Password must be at least 8 characters"}).max(50),
  email: z.string().email(),

})

export const PostValidation = z.object({
  caption: z.string().min(5).max(2200),
  file: z.custom<File[]>(),
  location: z.string().min(2).max(50),
  tags: z.string(),
})

export const ProfileValidation = z.object({
  file: z.custom<File[]>(),
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  username: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email(),
  bio: z.string(),
});