#!/bin/bash

# Directorio de imágenes originales
ORIG_DIR="assets/Original Pics"
DEST_DIR="assets"

# Crear subcarpeta para imágenes optimizadas si no existe
mkdir -p "${DEST_DIR}/optimized"

# Copiar y renombrar imágenes reales a los nombres esperados
# Las imágenes se asignarán en secuencia a las categorías

declare -a IMAGE_FILES=(
    "${ORIG_DIR}/IMG-20260406-WA0022.jpg"
    "${ORIG_DIR}/IMG-20260406-WA0023.jpg"
    "${ORIG_DIR}/IMG-20260406-WA0024.jpg"
    "${ORIG_DIR}/IMG-20260406-WA0025.jpg"
    "${ORIG_DIR}/IMG-20260406-WA0026.jpg"
    "${ORIG_DIR}/IMG-20260406-WA0027.jpg"
)

declare -a DEST_NAMES=(
    "carne-real.jpg"
    "pollo-real.jpg"
    "queso-real.jpg"
    "hero-real.jpg"
    "hero_2-real.jpg"
    "hero_3-real.jpg"
)

# Copiar archivos
for i in ${!IMAGE_FILES[@]}; do
    if [ -f "${IMAGE_FILES[$i]}" ]; then
        cp "${IMAGE_FILES[$i]}" "${DEST_DIR}/${DEST_NAMES[$i]}"
        echo "✓ Copiado: ${DEST_NAMES[$i]}"
    fi
done

echo ""
echo "Imágenes copiadas a assets/ con sufijo -real"
echo "Ahora actualiza las referencias en index.html de:"
echo "  assets/carne.png → assets/carne-real.jpg"
echo "  assets/pollo.png → assets/pollo-real.jpg"
echo "  etc."
