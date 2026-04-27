# 🪄 Guía de Integración: Bendita Empanada Dinámica

Esta guía permite que tu cliente gestione productos, precios y ofertas desde un **Google Sheet** sin tocar el código.

## 1. Estructura del Google Sheets
Crea una hoja de cálculo llamada `Bendita_Catalog` con las siguientes pestañas y columnas exactas:

### Pestaña: `Productos`
| Nombre | Descripción | Precio | Categoría | Imagen (URL) | Activo |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Carne al Cuchillo | Tradicional nortina... | $4.500 | Saladas | assets/carne.png | Sí |
| Tentación Queso | Mix de 4 quesos... | $4.200 | Saladas | assets/queso.png | Sí |

### Pestaña: `Combos`
Esta pestaña controla los paquetes de ahorro que se muestran en el carrusel.
- **Nombre:** (Ej: Combo Pareja, Combo Familiar)
- **Descripción:** (Ej: 12 Empanadas + Bebida)
- **Precio_Original:** Precio sin descuento (Ej: 12000)
- **Precio_Oferta:** Precio final (Ej: 9900)
- **Imagen_URL:** URL de la foto del combo (Ej: `assets/combo_duo.png` o enlace de Google Drive/Imgur)
- **Activo:** (Sí/No)

| Nombre | Descripción | Precio Oferta | Precio Original | Imagen_URL | Activo |
| :--- | :--- | :--- | :--- | :--- | :--- |
| PACK DE 6 | Merienda perfecta. | $24.900 | $27.000 | assets/pack6.png | Sí |
| PACK DE 12 | Para reuniones. | $46.500 | $54.000 | assets/pack12.png | Sí |

---

## 2. Configuración de n8n (El Flujo)
Tu flujo en n8n debe exponer un **Webhook (GET)** que retorne un JSON estructurado.

### Pasos en n8n:
1.  **Webhook Node:** HTTP Method: `GET`, Path: `bendita-data`.
2.  **Google Sheets Node (Read):** Lee las pestañas `Productos` y `Combos`.
3.  **Code Node (JavaScript):** Formatea los datos para que coincidan con lo que la web espera.
4.  **Webhook Response:** Entrega el objeto JSON con las listas de productos y combos.

---

## 3. Conexión Final (index.html)
En la parte inferior de tu `index.html`, encontrarás una constante llamada `N8N_API_URL`. Solo tienes que pegar allí la URL que te genere tu Webhook de n8n:

```javascript
const N8N_API_URL = "https://tu-instancia.n8n.cloud/webhook/bendita-data";
```

## ✅ Beneficios para el Cliente:
- **Autonomía:** Cambia precios desde el celular (App de Google Sheets).
- **Estacionalidad:** Puede "Desactivar" productos o combos poniendo "No" en la columna **Activo**.
- **Cero Riesgo:** No tiene acceso al código, solo a los datos.

*Nota: He dejado el sitio con datos de ejemplo (Fallback) por si la conexión a n8n falla en algún momento.*
