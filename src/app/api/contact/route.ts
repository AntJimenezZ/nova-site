import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: NextRequest) {
  try {
    const warnings: string[] = []
    const body = await request.json()
    const {
      name, email, subject, message, turnstileToken
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

    // Configurar el transporter de Nodemailer
    const emailUser = process.env.EMAIL_USER || ''
    const emailPassword = process.env.EMAIL_APP_PASSWORD || process.env.EMAIL_PASSWORD || ''

    if (emailUser && emailPassword) {
      try {
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: emailUser,
            pass: emailPassword,
          },
        })

        // Configurar el email
        const mailOptions = {
          from: emailUser,
          to: emailUser, // Enviar a tu propio email
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
      } catch (mailError) {
        console.error('Error enviando email (Nodemailer):', mailError)
        warnings.push('No se pudo enviar el correo')
      }
    } else {
      console.warn('Omitiendo Nodemailer: Falta EMAIL_USER o EMAIL_APP_PASSWORD/EMAIL_PASSWORD en variables de entorno')
      warnings.push('Email no configurado en el entorno')
    }

    return NextResponse.json(
      {
        message: 'Operación procesada',
        warnings: warnings.length ? warnings : undefined,
      },
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
