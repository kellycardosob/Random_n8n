import type { IExecuteFunctions } from 'n8n-workflow';
import type { INodeExecutionData, INodeType, INodeTypeDescription } from 'n8n-workflow';
import axios from 'axios';

export class Random implements INodeType {
  description: INodeTypeDescription = {
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
        type: 'number', //somente números
        default: 1,
        description: 'Número inteiro mínimo',
      },
      {
        displayName: 'Max',
        name: 'max',
        type: 'number', //somente números
        default: 100,
        description: 'Número inteiro máximo',
      },
    ],
  };

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const items = this.getInputData();
    const results: INodeExecutionData[] = [];
    const iterations = items.length || 1;

    for (let i = 0; i < iterations; i++) {
      const min = this.getNodeParameter('min', i) as number;
      const max = this.getNodeParameter('max', i) as number;

      if (max < min) throw new Error('"Máx" deve ser maior ou igual a "Mín"');

      const url = `https://www.random.org/integers/?num=1&min=${min}&max=${max}&col=1&base=10&format=plain&rnd=new`; //API do Random.org
      const response = await axios.get(url);
      const randomNumber = parseInt(String(response.data).trim(), 10);

      results.push({ json: { random: randomNumber, min, max } });
    }
    
    return this.prepareOutputData(results);
  }
}