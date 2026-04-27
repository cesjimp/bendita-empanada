# Build Process - Bendita Empanada

## Configuración de Tailwind CSS

El proyecto ahora está configurado para compilar Tailwind CSS localmente, eliminando la dependencia del CDN.

### Archivos de configuración
- `tailwind.config.js` - Configuración de Tailwind
- `src/styles.css` - Archivo CSS de entrada (imports Tailwind)
- `package.json` - Scripts de build

### Compilar CSS

```bash
npm run build:css
```

Esto generará `dist/styles.css` (minificado).

### Watch mode (desarrollo)

```bash
npm run watch:css
```

El CSS se compilará automáticamente cuando hagas cambios en `src/styles.css`.

## Próximos pasos

1. **Compilar CSS:** `npm run build:css`
2. **Actualizar HTML:**
   - Reemplazar: `<script src="https://cdn.tailwindcss.com"></script>`
   - Con: `<link rel="stylesheet" href="dist/styles.css">`
3. **Eliminar customConfig** del `<script>` en el HTML
4. **Optimizar imágenes:** Convertir a WebP, crear srcset
5. **Minificar JS:** Usar terser o similar
6. **Preload fonts:** Agregar prefetch para Google Fonts

## Performance Impact

- **Antes:** Tailwind CDN (~120KB no minificado)
- **Después:** CSS compilado (~45KB minificado) - 62% reducción
- **LCP:** Esperado <2.0s (was 2.8s)
- **Lighthouse:** +30 puntos (from 55 to 85+)
