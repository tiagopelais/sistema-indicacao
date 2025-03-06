'use client'

import { User, Mail, ArrowRight } from 'lucide-react'
import { Button } from '../components/button'
import { InputRoot, InputIcon, InputField } from '../components/input'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { postSubscriptions } from '@/http/api'
import { useRouter, useSearchParams } from 'next/navigation'

const SubscriptionSchema = z.object({
  name: z.string().min(2, 'Digite seu nome completo'),
  email: z.string().email('Digite um email válido'),
})

type SubscriptionSchemaType = z.infer<typeof SubscriptionSchema>

export function SubscriptionsForm() {
  
  const { push } = useRouter()

  const searchParams = useSearchParams()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SubscriptionSchemaType>({
    resolver: zodResolver(SubscriptionSchema),
  })

  async function onSubscribe({ name, email } : SubscriptionSchemaType) {

    const referrer = searchParams.get('referrer')

    const { subscriberId}  = await postSubscriptions({ name, email, referrer })

    push(`/invite/${subscriberId}`)
  }

  return (
    <form
      className="bg-gray-700 border border-gray-600 rounded-2xl p-8 space-y-6 w-full md:max-w-[440px]"
      onSubmit={handleSubmit(onSubscribe)}
    >
      <h2 className="font-heading font-semibold text-gray-200 text-xl">
        Inscrição
      </h2>
      <div className="space-y-3">
        <div className="space-y-2">
          <InputRoot>
            <InputIcon>
              <User />
            </InputIcon>
            <InputField
              type="text"
              placeholder="Nome Completo"
              {...register('name')}
            />
          </InputRoot>
          { errors.name && <p className='text-danger text-xs font-semibold'> {errors.name.message }</p>}
        </div>

        <div className="space-y-2">
          <InputRoot>
            <InputIcon>
              <Mail />
            </InputIcon>
            <InputField
              type="email"
              placeholder="Email"
              {...register('email')}
            />
          </InputRoot>

          { errors.email && <p className='text-danger text-xs font-semibold'> {errors.email.message }</p>}
        </div>
      </div>
      <Button type="submit">
        Confirmar
        <ArrowRight />
      </Button>
    </form>
  )
}
