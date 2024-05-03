const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const inputDir = './input';
const outputDir = './output';

// Crea la carpeta de salida si no existe
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
}

// Lee los archivos de la carpeta de entrada
fs.readdir(inputDir, (err, files) => {
    if (err) {
        console.error('Error al leer la carpeta de entrada:', err);
        return;
    }

    // Filtra los archivos .webp
    const webpFiles = files.filter(file => path.extname(file).toLowerCase() === '.webp');

    // Convierte cada archivo .webp a .png
    webpFiles.forEach(file => {
        const inputFile = path.join(inputDir, file);
        const outputFile = path.join(outputDir, path.basename(file, '.webp') + '.png');

        sharp(inputFile)
            .png()
            .toFile(outputFile, (err, info) => {
                if (err) {
                    console.error('Error al convertir', inputFile, 'a .png:', err);
                } else {
                    console.log('Imagen convertida:', info);
                }
            });
    });
});
