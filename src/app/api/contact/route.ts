import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import { supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      name, email, subject, message,
      company, projectType, description,
      teamMembers, budget, timeline, turnstileToken
    } = body

    // Validación básica
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Todos los campos obligatorios son requeridos' },
        { status: 400 }
      )
    }

    const secretKey = process.env.TURNSTILE_SECRET_KEY || ''

    if (secretKey && !turnstileToken) {
      return NextResponse.json(
        { error: 'Por favor, completa el captcha' },
        { status: 400 }
      )
    }

    // Verificar Captcha
    const verifyUrl = 'https://challenges.cloudflare.com/turnstile/v0/siteverify'

    // Only verify if token is present (useful if frontend bypassed due to keys issues)
    if (secretKey && turnstileToken) {
      const verifyRes = await fetch(verifyUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `secret=${secretKey}&response=${turnstileToken}`,
      })

      const verifyData = await verifyRes.json()

      if (!verifyData.success) {
        return NextResponse.json({ error: 'Captcha inválido o expirado' }, { status: 400 })
      }
    } else {
      console.warn("Falta TURNSTILE_SECRET_KEY en las variables de entorno. Evitando validación para desarrollo local o configuración pendiente.")
    }

    // Validación de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Email inválido' },
        { status: 400 }
      )
    }

    // Guardar en Supabase - Opcional, permitiendo seguir si falla para enviar el email
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
    if (supabaseUrl !== 'https://placeholder.supabase.co') {
      try {
        const { error: dbError } = await supabase.from('contact_messages').insert([{
          name,
          email,
          company: company || null,
          project_type: projectType || subject || 'Otro', // El subject funciona como project_type para el formulario corto
          description: description || message || 'Sin mensaje', // El message funciona como descripción para el formulario corto
          team_members: teamMembers || null,
          budget: budget || null,
          timeline: timeline || null
        }])

        if (dbError) {
          console.error('Error al insertar en Supabase:', dbError)
        }
      } catch (e) {
        console.error('Excepción al insertar en Supabase:', e)
      }
    } else {
      console.warn('Omitiendo Supabase: NEXT_PUBLIC_SUPABASE_URL no configurado.');
    }

    // Configurar el transporter de Nodemailer
    if (process.env.EMAIL_USER && process.env.EMAIL_PASSWORD) {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD,
        },
      })

      // Configurar el email
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER, // Enviar a tu propio email
        subject: `Contacto Web: ${subject}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #2563eb; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">
              Nuevo mensaje de contacto desde NovaSite
            </h2>
            
            <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #374151; margin-top: 0;">Información del contacto:</h3>
              <p><strong>Nombre:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Asunto:</strong> ${subject}</p>
            </div>
            
            <div style="background-color: #ffffff; padding: 20px; border-left: 4px solid #2563eb; margin: 20px 0;">
              <h3 style="color: #374151; margin-top: 0;">Mensaje:</h3>
              <p style="line-height: 1.6; color: #4b5563;">${message.replace(/\n/g, '<br>')}</p>
            </div>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; text-align: center; color: #6b7280; font-size: 14px;">
              <p>Este mensaje fue enviado desde el formulario de contacto de NovaSite</p>
              <p>Para responder, envía un email directamente a: <strong>${email}</strong></p>
            </div>
          </div>
        `,
        // También enviar una copia en texto plano
        text: `
          Nuevo mensaje de contacto desde NovaSite
          
          Nombre: ${name}
          Email: ${email}
          Asunto: ${subject}
          
          Mensaje:
          ${message}
          
          ---
          Para responder, envía un email directamente a: ${email}
        `,
      }

      // Enviar el email
      await transporter.sendMail(mailOptions)
    } else {
      console.warn('Omitiendo Nodemailer: Falta EMAIL_USER o EMAIL_PASSWORD en .env.local')
    }

    return NextResponse.json(
      { message: 'Operación procesada exitosamente (Comprueba logs de consola)' },
      { status: 200 }
    )

  } catch (error) {
    console.error('Error enviando email:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}
