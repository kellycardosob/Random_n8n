"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Random = void 0;
const axios_1 = __importDefault(require("axios"));
class Random {
    description = {
        displayName: 'Random',
        name: 'random',
        icon: 'file:random.svg',
        group: ['transform'],
        version: 1,
        description: 'True Random Number Generator using Random.org',
        subtitle: '={{"True Random Number Generator"}}',
        defaults: { name: 'Random' },
        inputs: ['main'],
        outputs: ['main'],
        properties: [
            {
                displayName: 'Min',
                name: 'min',
                type: 'number', //somente númeors
                default: 1,
                description: 'Número inteiro mínimo',
            },
            {
                displayName: 'Max',
                name: 'max',
                type: 'number', //somente númeors
                default: 100,
                description: 'Número inteiro máximo',
            },
        ],
    };
    async execute() {
        const items = this.getInputData();
        const results = [];
        const iterations = items.length || 1;
        for (let i = 0; i < iterations; i++) {
            const min = this.getNodeParameter('min', i);
            const max = this.getNodeParameter('max', i);
            if (max < min)
                throw new Error('"Máx" deve ser maior ou igual a "Mín"');
            const url = `https://www.random.org/integers/?num=1&min=${min}&max=${max}&col=1&base=10&format=plain&rnd=new`; //API do Random.org
            const response = await axios_1.default.get(url);
            const randomNumber = parseInt(String(response.data).trim(), 10);
            results.push({ json: { random: randomNumber, min, max } });
        }
        return this.prepareOutputData(results);
    }
}
exports.Random = Random;
