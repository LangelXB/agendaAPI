# AgendaAPI 🗓️

API para el proyecto de agendas de SOAP🧼

Las tecnologias implementadas en el proyecto son:

- Express
- TypeScript
- TypeOrm
- Swagger
- Jest

## Instalacion 💻

Para la instalacion se recomienda tener la version 18.16 de node

```bash
git clone https://github.com/LangelXB/agendaAPI.git
cd agendaAPI
npm install
```

## Configuracion ⚙️

Antes de ejecutar es necesario crear un archivo .env con las siguientes variables de entorno.

```env
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=root
DB_NAME=agenda
```

## Levantar API 🚀

```bash
# Modo desarrollo
npm run dev

# Produccion
npm run build
npm start
```

## Documentación 📖

La documentacion de cada uno de los endpoints se puede consumir en la direcion local, con el puerto asignado:

```
http://localhost:$port/documentation
```

## Pautas para mantener el orden del proyecto

- Instalar la extension de prettier y eslint en vscode (sirve para formatear el codigo y se vea bonito)
- Seguir las siguiente convenciones para nombrar:

  - Archivos: El nombre debe de estar en camelCase y con el sufijo del nombre de la carpeta superior, ejemplo: un archivo dentro de la carpeta router `agenda.routes.ts`

  - Clases (PascalCase): La primera letra de cada palabra, incluyendo la primera, se capitaliza. Por ejemplo: `class MiClase`.
  - Variables y funciones(camelCase): la primera letra de cada palabra, excepto la primera, se capitaliza. Por ejemplo: `const miVariable`, `function miFuncion`.

- Crearse una rama con su nombre para ir desarrollando nuevas funciones y cada para cada cambio se debera hacer un _PR_ (Pull Request).
