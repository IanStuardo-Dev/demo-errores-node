# product-api-clean-broken

Prueba técnica para postulantes Semi Senior Node.js.

Este proyecto contiene una API REST de productos construida con Node.js, Express y JavaScript. La persistencia se realiza sobre un archivo JSON simple, sin base de datos real.

El objetivo es levantar el proyecto, revisar el código existente, corregir los errores necesarios y dejar el CRUD funcionando con los tests pasando.

## Requisitos

- Node.js 18 o superior
- npm

## Instalación

```bash
npm install
```

## Ejecutar el proyecto

```bash
npm run dev
```

También existe un script `start`, pero puede requerir revisión como parte de la prueba.

## Ejecutar tests

```bash
npm test
```

Los tests están escritos con Jest y Supertest. Representan el comportamiento esperado de la API.

## Endpoints esperados

```txt
GET    /products
GET    /products/:id
POST   /products
PATCH  /products/:id
DELETE /products/:id
```

## Modelo Product

```json
{
  "id": 1,
  "name": "Keyboard",
  "price": 25000,
  "stock": 10,
  "category": "accessories"
}
```

## Estructura del proyecto

El proyecto está organizado en capas simples:

- `domain`: entidades y contratos.
- `application`: casos de uso.
- `infrastructure`: persistencia en JSON.
- `presentation`: rutas, controllers, validadores y middleware HTTP.
- `shared`: errores reutilizables.

## Qué se espera

Debes corregir los problemas existentes para que:

- La aplicación pueda ejecutarse correctamente.
- Todos los endpoints respondan según lo esperado.
- Las validaciones de productos sean consistentes.
- Los errores HTTP sean apropiados.
- Las operaciones de creación, actualización y eliminación funcionen correctamente.
- Todos los tests pasen.

No reescribas todo el proyecto desde cero. La idea es trabajar sobre la estructura existente, identificar los problemas y aplicar correcciones puntuales.

Al finalizar, deja una breve explicación de:

- Problemas encontrados.
- Soluciones aplicadas.
- Cualquier decisión técnica relevante.
