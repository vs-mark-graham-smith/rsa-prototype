

class RSA_Handler {
    
    constructor() {
        this.characters = {
            'A': 1,
            'B': 2,
            'C': 3
        };

        this.keys = this.generateKeys();
    }

    /**
     * Generate a range between numbers as an array
     * bc for some reason stupid js doesn't have it even tho
     * it's so high level that an idiot like Joey essex could pick it up
     */
    

    /**
     * Returns prime numbers for use as p and q
     */
    range(min, max) {
        let range = [];
        for (let number = min; number <= max; number++) {
            range.push(number);
        }
        return range;
    }
    
    generatePrimes(min, max) {
        let primes = this.range(min, max)
            .filter(n => {
                // isPrime
                if (n < 2) return false;

                let q = Math.floor(Math.sqrt(n));

                for (let i = 2; i <= q; i++) {
                    if (n % i == 0) {
                        return false;
                    }
                }

                return true;
	    })

        return {
            'p': primes[
                Math.round(
                    Math.random() * (primes.length - 1)
                )
            ],
            'q': primes[
                Math.round(
                    Math.random() * (primes.length - 1)
                )
            ]
        }
    }

    /**
     * Return boolean to see if two numbers are coprime
     */
    areCoprimes(num1, num2) {
        const smaller = num1 > num2 ? num1 : num2

        for (let ind = 2; ind < smaller; ind++) {
	    
            const condition1 = num1 % ind === 0;
            const condition2 = num2 % ind === 0;

            if (condition1 && condition2) {
                return false;
            }
        }

        return true;
    }

    /**
     * Generates an encryption (e) for public
     */
    generatePublicLock(N, phiN) {
        return this.range(5, phiN)
            .filter(number => Boolean(
                this.areCoprimes(N, number) && this.areCoprimes(phiN, number)
            ))[0]
    }

    /**
     * Generates a descryption (d) for private decryption
     */
    generatePrivateKey(e, phiN) {
        return this.range(1, 10000)
            .filter(number => Boolean(
                (number * e) % phiN === 1
            ))[0]
    }
    
    /**
     * Returns an object containing e, d and N  
     */
    generateKeys () {
        let p = 2
        let q = 7

        let N = 14

        //	let { p, q } = this.generatePrimes(10, 30)

        let N = (p * q)
        let phiN = ( p - 1 ) * ( q - 1 )
        let e = this.generatePublicLock(N, phiN)

        return {
            'e': e,
            'd': this.generatePrivateKey(e, phiN),
            'N': N
        }
    }

    encryptMessage(message) {
        console.log({ ...this.keys })

        let cipher = message
            .split('')
            .map(character => {

                return Object.keys(this.characters)
                    .find(char => {
                        return Boolean(
                            this.characters[char]
                            === Math.pow(
                                this.characters[character],
                                this.keys.e
                            ) % this.keys.N
                        )
                    })
            })
            .join('')

        console.log({
            cipher,
            'decrypt': this.decryptMessage(cipher)
        })
    }

    decryptMessage(cipher) {
        return cipher
            .split('')
            .map(character => {
                return Object.keys(this.characters)
                    .find(char => {
                        return Boolean(
                            this.characters[char]
                            === Math.pow(
                                this.characters[character], this.keys.d
                            ) % this.keys.N
                        )
                    })
            })
            .join('')
    }
}

console.log(String.fromCharCode(30))

let rsaHandler = new RSA_Handler();

console.log({ keys: rsaHandler.keys })

rsaHandler.encryptMessage('AB')

// main();
