# Política de seguridad

## Versiones con soporte

_SansaNews_ da soporte solo a la versión publicada actualmente en <https://sansanews.github.io>, ya que el sitio se reconstruye y se publica de forma continua.

## Reportar una vulnerabilidad

Para reportar una vulnerabilidad, sigue estos pasos.

1. Ve a la pestaña **Security** del [repositorio](https://github.com/SansaNews/sansanews.github.io).
2. Haz clic en **Report a vulnerability**.
3. Completa el formulario con la información que se indica abajo.

No abras un _issue_ público para reportar una vulnerabilidad, ya que cualquier persona podría verlo antes de que se corrija.

Incluye esta información en el reporte.

- Una descripción del problema.
- Los pasos para reproducirlo.
- El impacto que imaginas.

## Alcance

La política cubre el código del sitio y los scripts de `backend/`.

La política no cubre el contenido de Instagram ni las vulnerabilidades de las dependencias de terceros. Reporta estas últimas al proyecto que las mantiene.

## Secretos expuestos

El `ACCESS_TOKEN` de la API de Instagram es un secreto del proyecto. Si encuentras un _token_ expuesto, repórtalo de forma privada con el procedimiento anterior y no lo publiques.
