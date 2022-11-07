** CURRENTLY IN DEVELOPMENT ***
# Modulos principales

Tenemos dos módolos que se ejecutan
- Conector python
- Conector node


## simconnect.js

Está en desuso ya que hay que compilar con visual code studio y da errores locos.

# Conector python
Inicializa una api con las variables que les indiquemos en la funcion fcu()
Arrancar en python/src/api.py

Documentación de variables: https://docs.flybywiresim.com/fbw-a32nx/feature-guides/autopilot-fbw/#common .

## Modo desarrollo:
Ejecutar con `flask --app api run --host=0.0.0.0`

## Modo prod
Instalar para servir con waitress `pip install waitress`.

Luego ejecutar `python api`

# Conector node

Arranca un servidor de express en el puerto 3000 de lo que hay en `public/`. Tiene una ventana con iframe a spacedesk y botones del ECAM. Pulsar los botones manda una petición post a `/api` con el `button` que pulsamos. 

## Botones ECAM
Se envían a través de vjoy. Está mapeado en `index.js` los botones que recibimos en el post de  `/api`  y se hace un `vjoy.pushButton(req.body.button);`. La configuración está en `vjoy.js` 

## Configuración vjoy

En `vjoy.js` está mapeado el texto que enviemos en la variable button del api, mediante `const BUTTONS`, y aquí pulsará el 1,2,3,4... Hemos mapeado el ecam con mobiflight.

# Arduino

Está 