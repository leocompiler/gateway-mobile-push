import crypto from 'crypto';

export default (function(){
    return {

        /**
         * Gera um salt randomico.
         * @function
         * @param {number} tamanho - Tamanho da string randômica.
         */
        gerarSalt(tamanho){

            return crypto.randomBytes(Math.ceil(tamanho/2))
                    .toString('hex')
                    .slice(0 , tamanho);
        },

        /**
         * Hash da senha com sha512.
         * 
         * @function
         * @param {string} senha - Senha.
         * @param {string} salt - Salt.
         */
        gerarHashSenha(senha, salt){
            
            let hash = crypto.createHmac('sha512', salt);
            
            hash.update(senha);
            
            let valor = hash.digest('hex');

            return {
                salt:salt,
                hashSenha:valor
            };
        }
    }
})();