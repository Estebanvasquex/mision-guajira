# Misión Cristiana La Guajira - Sistema de Pedidos

Aplicación web para recoger fondos mediante la venta de cuadros personalizados para apoyar la misión cristiana en La Guajira.

## Stack Tecnológico

- **Frontend**: Next.js 15 (App Router), TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Base de Datos**: PostgreSQL
- **ORM**: Prisma
- **Deploy**: Vercel

## Características

- Formulario multi-paso (5 pasos)
- Información personal y método de entrega
- Selección de 5 estilos de cuadros
- Paleta de 8 colores (selección de 2-3)
- 8 versículos bíblicos predefinidos o mensaje personalizado (máx. 100 caracteres)
- Carga de comprobante de pago
- Diseño mobile-first y responsivo

## Instalación

1. Instalar dependencias:
```bash
npm install
```

2. Configurar variables de entorno:
```bash
cp .env.example .env
```

Edita `.env` con tus credenciales de PostgreSQL.

3. Configurar base de datos:
```bash
npx prisma generate
npx prisma db push
```

4. Ejecutar en desarrollo:
```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:3000`

## Estructura del Proyecto

```
├── app/
│   ├── api/orders/          # API para crear pedidos
│   ├── globals.css          # Estilos globales
│   ├── layout.tsx           # Layout principal
│   └── page.tsx             # Página principal
├── components/
│   ├── OrderForm.tsx        # Componente principal del formulario
│   └── steps/               # Componentes de cada paso
│       ├── PersonalInfoStep.tsx
│       ├── FrameSelectionStep.tsx
│       ├── ColorSelectionStep.tsx
│       ├── MessageStep.tsx
│       └── PaymentStep.tsx
├── lib/
│   ├── constants.ts         # Constantes (colores, versículos, estilos)
│   ├── prisma.ts            # Cliente de Prisma
│   └── types.ts             # Tipos TypeScript
└── prisma/
    └── schema.prisma        # Esquema de base de datos
```

## Próximos Pasos

1. Agregar imágenes reales de los cuadros en `/public/frames/`
2. Configurar almacenamiento de archivos (ej: Cloudinary, AWS S3)
3. Implementar panel de administración para ver pedidos
4. Agregar notificaciones por email/WhatsApp
5. Implementar pasarela de pago (opcional)

## Deploy en Vercel

1. Conecta tu repositorio a Vercel
2. Configura las variables de entorno
3. Vercel detectará automáticamente Next.js y lo desplegará

## Licencia

Proyecto para uso de la Misión Cristiana La Guajira.
