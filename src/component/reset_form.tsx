import { z } from "zod"
import {useForm, SubmitHandler} from "react-hook-form"
import { resetPasswordSchema } from "../schemas/user_schema"
import {zodResolver} from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import axios, { AxiosError, isAxiosError } from "axios"

const ResetForm = () => {

    type FormFields = z.infer<typeof resetPasswordSchema>

    const {register, setError, handleSubmit, formState: {errors}, reset} = useForm({
        resolver: zodResolver(resetPasswordSchema)
    })

    const passwordReset = async (data: FormFields) => {
        const response = await axios.post("https://task-manager-api-2025.up.railway.app/api/reset-password", data)

        return response
    }

    const { mutate } = useMutation({
        mutationFn: passwordReset,
        onSuccess: () => {
            alert("Password reset successful!")
            reset()
        },
        onError: (error: Error | AxiosError) => {
            if (isAxiosError(error)) {
                const err = error.response?.data.error;

                setError("root", {
                    type: 'server',
                    message: err
                })

                const serverError = []; 
                serverError.push(err)

                const value: any = Object.values(serverError[0])

                const rootError = value[1]._errors[0];



                setError("root", {
                    type: 'server',
                    message: rootError          
                })
            } else {
                setError("root", error)
            }
        } 
    })
            

    const onSubmit: SubmitHandler<FormFields> = (data, e) => {
        e?.preventDefault()
        mutate(data)
    }

    return(
        <form className="" onSubmit={handleSubmit(onSubmit)} >
            <input {...register("password")} name="password" type="password" placeholder="Enter your new password" />
            {errors.password && <span className="">{errors.password.message}</span>}
            <br />

            <input {...register("confirmPassword")} name="confirmPassword" type="password" placeholder="Confirm your new password" />
            {errors.confirmPassword && <span className="">{errors.confirmPassword.message}</span>}
            <br />

            <input type="submit" />
            <br />

            {errors.root && <span className="">{errors.root.message}</span>}
        </form>
        )
}

export default ResetForm
