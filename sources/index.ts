import { Portalize } from './Portalize';

Portalize.get.setPortal('./portal');
Portalize.get.setModuleName('test');

//Portalize.get.add<{data: string}>('caca.json', {data: 'lol'}, {desc: 'creation'});
//Portalize.get.set<{data: string}>('caca.json', {data: 'lel'});
//const data: {data: string} = Portalize.get.get<{data: string}>('caca.json');
//console.log(data);

//Portalize.get.rm('caca.json');

console.log(Portalize.get.requires({
    file: 'caca.json',
    action: 'rm',
    from: 'test',
    desc: 'rm'
}));
