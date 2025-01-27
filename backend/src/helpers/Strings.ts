export default class Strings {
    public static RepararAcentos = (texto: string) => {
        const reemplazos: any = {
            'Ã¡': 'á',
            'Ã©': 'é',
            'Ã­': 'í',
            'Ã³': 'ó',
            'Ãº': 'ú',
            'Ã±': 'ñ',
            'Ã': 'Á',
            'Ã‰': 'É',
            'Ã': 'Í',
            'Ã“': 'Ó',
            'Ãš': 'Ú',
            'Â¿': '¿',
            'Â¡': '¡'
        };
          
        return texto = texto.replace(/Ã¡|Ã©|Ã­|Ã³|Ãº|Ã±|Ã|Ã‰|Ã|Ã“|Ãš|Â¿|Â¡/g, match => reemplazos[match]);
    }
}