import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from '@/components/ui/button'
import {Form,FormControl,FormField,FormItem,FormLabel,FormMessage,} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { SignupValidation } from "@/lib/validation"

import { Link, useNavigate } from "react-router-dom";
import {  useCreateUserAccount, useSignInAccount} from "@/lib/react-query/queriesAndMutations"
import { useUserContext } from "@/context/AuthContext"
import Loader from "@/components/shared/Loader"



const SignupForm = () => {
  const { toast } = useToast()
  const { checkAuthUser ,isLoading: isUserLoading } = useUserContext()
  const navigate = useNavigate()

  const {mutateAsync: createUserAccount, isPending: isCreatingAccount} = useCreateUserAccount()

  const {mutateAsync: siginAccount, isPending: isSigningInUser} = useSignInAccount()

  // 1. Define your form.
  const form = useForm<z.infer<typeof SignupValidation>>({
    resolver: zodResolver(SignupValidation),
    defaultValues: {
      name: "",
      username: "",
      password: "",
      email: "",
    },
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof SignupValidation>) {
    const newUser = await createUserAccount(values)

    if(!newUser){
      console.log("No new user")
      return toast({
        variant: "destructive",title: "NewUser:Sign up failed. Please try again",
      })
    }

    const session = await siginAccount({
      email: values.email,
      password: values.password
    })
    
    if(!session){
      console.log("No session")
      return toast({
        variant: "destructive",title: "Session:Sign in failed. Please try again",
      })
    }

    const isLoggedIn = await checkAuthUser()

    if(isLoggedIn){
      form.reset()
      console.log("User is logged in ready to navigate to home page")
      navigate('/')
    } else {
      console.log(checkAuthUser())
      return toast({variant: "destructive",title: "Login failed. Please try again.",})
      
    }

  }

  return (
    <Form {...form}>
      <div className="sm-w-420 flex-center flex-col">
        <img src="/assets/images/SayLess_transparent.svg" alt="logo" className="-mb-8"/>
        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12 ">
          Create a new account
        </h2>
        <p className="text-secondary-500 small-medium md:base-regular mt-2">
          To use SayLess,Please enter your details
        </p>
      
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full mt-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name :</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email :</FormLabel>
                <FormControl>
                  <Input type="email" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="shad-button_primary">
            {isCreatingAccount || isSigningInUser || isUserLoading ? (
              <div className="flex-center gap-2">
                <Loader/>Loading ...
              </div>
            ) : "Sign up"}
          </Button>
          <p className="text-small-regular text-light text-center mt-2">
            Already have an account? 
            <Link to="/sign-in" className="text-primary-500 text-small-semibold ml-1"> 
            Log in</Link>
          </p>
        </form>
      </div>
    </Form>
  )
}

export default SignupForm 